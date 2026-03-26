import { TaskStatus } from '@prisma/client';
import { prisma } from '@/lib/prisma';
import { sendReminderEmail } from '@/lib/mailer';

const PENDING_REMINDER_HOURS = Number(process.env.PENDING_REMINDER_HOURS ?? 48);
const PENDING_REMINDER_COOLDOWN_HOURS = Number(process.env.PENDING_REMINDER_COOLDOWN_HOURS ?? 24);

function isNumber(value: number) {
  return !Number.isNaN(value) && value > 0;
}

function getPendingWindowEnd(now: Date) {
  const hours = isNumber(PENDING_REMINDER_HOURS) ? PENDING_REMINDER_HOURS : 48;
  return new Date(now.getTime() + hours * 60 * 60 * 1000);
}

function getPendingCooldownThreshold(now: Date) {
  const hours = isNumber(PENDING_REMINDER_COOLDOWN_HOURS) ? PENDING_REMINDER_COOLDOWN_HOURS : 24;
  return new Date(now.getTime() - hours * 60 * 60 * 1000);
}

export async function runOverdueAutomation() {
  const now = new Date();
  const overdueTasks = await prisma.task.findMany({
    where: {
      status: {
        not: TaskStatus.DONE
      },
      deadline: {
        lt: now
      },
      overdueNotifiedAt: null
    },
    include: {
      assignedTo: true,
      project: true
    }
  });

  let processed = 0;

  for (const task of overdueTasks) {
    const message = `Task "${task.title}" in project "${task.project.name}" is overdue.`;
    const emailed = await sendReminderEmail(
      task.assignedTo.email,
      'Overdue Task Reminder',
      `${message} Deadline was ${task.deadline.toISOString()}.`
    );

    await prisma.notification.create({
      data: {
        userId: task.assignedToId,
        message,
        type: 'OVERDUE_REMINDER',
        sentEmailAt: emailed ? new Date() : null
      }
    });

    await prisma.task.update({
      where: { id: task.id },
      data: { overdueNotifiedAt: now }
    });

    processed += 1;
  }

  return { processed };
}

export async function runPendingAutomation() {
  const now = new Date();
  const windowEnd = getPendingWindowEnd(now);
  const cooldownThreshold = getPendingCooldownThreshold(now);

  const pendingTasks = await prisma.task.findMany({
    where: {
      status: {
        not: TaskStatus.DONE
      },
      deadline: {
        gte: now,
        lte: windowEnd
      },
      AND: [
        {
          OR: [
            { pendingNotifiedAt: null },
            { pendingNotifiedAt: { lt: cooldownThreshold } }
          ]
        }
      ]
    },
    include: {
      assignedTo: true,
      project: true
    }
  });

  let processed = 0;

  for (const task of pendingTasks) {
    const message = `Task "${task.title}" in project "${task.project.name}" is still pending and due on ${task.deadline.toISOString()}.`;
    const emailed = await sendReminderEmail(
      task.assignedTo.email,
      'Pending Task Reminder',
      `${message} Please update the status if work is already under way.`
    );

    await prisma.notification.create({
      data: {
        userId: task.assignedToId,
        message,
        type: 'PENDING_REMINDER',
        sentEmailAt: emailed ? new Date() : null
      }
    });

    await prisma.task.update({
      where: { id: task.id },
      data: { pendingNotifiedAt: now }
    });

    processed += 1;
  }

  return { processed };
}

export async function getDashboardData(userId: number, role: 'ADMIN' | 'MEMBER') {
  const taskFilter = role === 'ADMIN' ? {} : { assignedToId: userId };

  const [tasks, pendingCount, completedCount, overdueCount, users] = await Promise.all([
    prisma.task.findMany({
      where: taskFilter,
      include: {
        project: true,
        assignedTo: true
      },
      orderBy: { createdAt: 'desc' }
    }),
    prisma.task.count({ where: { ...taskFilter, status: { not: TaskStatus.DONE } } }),
    prisma.task.count({ where: { ...taskFilter, status: TaskStatus.DONE } }),
    prisma.task.count({
      where: {
        ...taskFilter,
        status: { not: TaskStatus.DONE },
        deadline: { lt: new Date() }
      }
    }),
    prisma.user.findMany({
      where: role === 'ADMIN' ? {} : { id: userId },
      include: {
        assignedTasks: true
      }
    })
  ]);

  const statusChart = [
    { label: 'To Do', value: tasks.filter((t) => t.status === 'TODO').length },
    { label: 'In Progress', value: tasks.filter((t) => t.status === 'IN_PROGRESS').length },
    { label: 'Done', value: tasks.filter((t) => t.status === 'DONE').length }
  ];

  const priorityChart = [
    { label: 'High', value: tasks.filter((t) => t.priority === 'HIGH').length },
    { label: 'Medium', value: tasks.filter((t) => t.priority === 'MEDIUM').length },
    { label: 'Low', value: tasks.filter((t) => t.priority === 'LOW').length }
  ];

  const productivity = users.map((user) => {
    const total = user.assignedTasks.length;
    const done = user.assignedTasks.filter((task) => task.status === 'DONE').length;
    const score = total === 0 ? 0 : Math.round((done / total) * 100);

    return {
      userId: user.id,
      name: user.name,
      role: user.role,
      score
    };
  });

  return {
    pendingCount,
    completedCount,
    overdueCount,
    statusChart,
    priorityChart,
    productivity
  };
}
