import { PrismaClient, Role } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const adminPasswordHash = await bcrypt.hash('admin123', 10);
  const memberPasswordHash = await bcrypt.hash('member123', 10);

  const admin = await prisma.user.upsert({
    where: { email: 'admin@workflow.local' },
    update: {},
    create: {
      name: 'System Admin',
      email: 'admin@workflow.local',
      passwordHash: adminPasswordHash,
      role: Role.ADMIN
    }
  });

  const member = await prisma.user.upsert({
    where: { email: 'member@workflow.local' },
    update: {},
    create: {
      name: 'Team Member',
      email: 'member@workflow.local',
      passwordHash: memberPasswordHash,
      role: Role.MEMBER
    }
  });

  const project = await prisma.project.upsert({
    where: { id: 1 },
    update: {},
    create: {
      name: 'Launch Workflow App',
      description: 'Initial rollout tasks for the workflow automation product',
      createdById: admin.id
    }
  });

  await prisma.task.upsert({
    where: { id: 1 },
    update: {},
    create: {
      title: 'Design login and role middleware',
      description: 'Ensure ADMIN and MEMBER routes are enforced.',
      status: 'IN_PROGRESS',
      priority: 'HIGH',
      deadline: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
      projectId: project.id,
      assignedToId: member.id,
      createdById: admin.id
    }
  });

  await prisma.task.upsert({
    where: { id: 2 },
    update: {},
    create: {
      title: 'Deploy to Render',
      description: 'Prepare production deployment docs and env setup.',
      status: 'TODO',
      priority: 'MEDIUM',
      deadline: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
      projectId: project.id,
      assignedToId: admin.id,
      createdById: admin.id
    }
  });

  console.log('Seed complete');
  console.log('Admin: admin@workflow.local / admin123');
  console.log('Member: member@workflow.local / member123');
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
