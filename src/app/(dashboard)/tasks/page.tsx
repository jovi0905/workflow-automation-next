import { TaskPriority, TaskStatus } from '@prisma/client';
import { requireUser } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { createTaskAction, deleteTaskAction, updateTaskAction } from './actions';

const priorities: TaskPriority[] = ['LOW', 'MEDIUM', 'HIGH'];
const statuses: TaskStatus[] = ['TODO', 'IN_PROGRESS', 'DONE'];

function toDateTimeLocal(date: Date) {
  const offset = date.getTimezoneOffset();
  const adjusted = new Date(date.getTime() - offset * 60 * 1000);
  return adjusted.toISOString().slice(0, 16);
}

export default async function TasksPage() {
  const session = await requireUser();

  const [projects, users, tasks] = await Promise.all([
    prisma.project.findMany({ orderBy: { name: 'asc' } }),
    prisma.user.findMany({ orderBy: { name: 'asc' } }),
    prisma.task.findMany({
      where: session.role === 'ADMIN' ? {} : { assignedToId: session.userId },
      include: {
        project: true,
        assignedTo: true,
        createdBy: true
      },
      orderBy: { deadline: 'asc' }
    })
  ]);

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold text-slate-900">Tasks</h1>
        <p className="text-sm text-slate-600">Assign deadlines, priorities, status, and ownership.</p>
      </header>

      {session.role === 'ADMIN' ? (
        <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="mb-4 text-base font-semibold text-slate-900">Create Task</h2>
          <form action={createTaskAction} className="grid gap-3 md:grid-cols-3">
            <input name="title" required placeholder="Task title" className="rounded-md border border-slate-300 px-3 py-2 text-sm" />
            <input name="description" placeholder="Description" className="rounded-md border border-slate-300 px-3 py-2 text-sm md:col-span-2" />

            <select name="projectId" required className="rounded-md border border-slate-300 px-3 py-2 text-sm">
              <option value="">Select project</option>
              {projects.map((project) => (
                <option key={project.id} value={project.id}>
                  {project.name}
                </option>
              ))}
            </select>

            <select name="assignedToId" required className="rounded-md border border-slate-300 px-3 py-2 text-sm">
              <option value="">Assign to user</option>
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name} ({user.role})
                </option>
              ))}
            </select>

            <input type="datetime-local" name="deadline" required className="rounded-md border border-slate-300 px-3 py-2 text-sm" />

            <select name="priority" required className="rounded-md border border-slate-300 px-3 py-2 text-sm">
              {priorities.map((priority) => (
                <option key={priority} value={priority}>
                  {priority}
                </option>
              ))}
            </select>

            <select name="status" required className="rounded-md border border-slate-300 px-3 py-2 text-sm">
              {statuses.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>

            <button type="submit" className="rounded-md bg-brand-600 px-4 py-2 text-sm font-semibold text-white md:col-span-3">
              Add Task
            </button>
          </form>
        </section>
      ) : null}

      <section className="space-y-4">
        {tasks.map((task) => {
          const isOverdue = task.status !== 'DONE' && task.deadline < new Date();

          return (
            <article key={task.id} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
              {session.role === 'ADMIN' ? (
                <>
                  <form action={updateTaskAction} className="grid gap-3 md:grid-cols-3">
                    <input type="hidden" name="id" value={task.id} />
                    <input name="title" defaultValue={task.title} className="rounded-md border border-slate-300 px-3 py-2 text-sm" />
                    <input
                      name="description"
                      defaultValue={task.description || ''}
                      className="rounded-md border border-slate-300 px-3 py-2 text-sm md:col-span-2"
                    />

                    <select name="projectId" defaultValue={task.projectId} className="rounded-md border border-slate-300 px-3 py-2 text-sm">
                      {projects.map((project) => (
                        <option key={project.id} value={project.id}>
                          {project.name}
                        </option>
                      ))}
                    </select>

                    <select name="assignedToId" defaultValue={task.assignedToId} className="rounded-md border border-slate-300 px-3 py-2 text-sm">
                      {users.map((user) => (
                        <option key={user.id} value={user.id}>
                          {user.name}
                        </option>
                      ))}
                    </select>

                    <input
                      type="datetime-local"
                      name="deadline"
                      defaultValue={toDateTimeLocal(task.deadline)}
                      className="rounded-md border border-slate-300 px-3 py-2 text-sm"
                    />

                    <select name="priority" defaultValue={task.priority} className="rounded-md border border-slate-300 px-3 py-2 text-sm">
                      {priorities.map((priority) => (
                        <option key={priority} value={priority}>
                          {priority}
                        </option>
                      ))}
                    </select>

                    <select name="status" defaultValue={task.status} className="rounded-md border border-slate-300 px-3 py-2 text-sm">
                      {statuses.map((status) => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
                    </select>

                    <div className="md:col-span-3 flex flex-wrap items-center gap-3">
                      <button type="submit" className="rounded-md bg-slate-900 px-3 py-2 text-sm font-medium text-white">
                        Save
                      </button>
                      {isOverdue ? <span className="rounded-full bg-rose-100 px-2 py-1 text-xs font-medium text-rose-700">Overdue</span> : null}
                    </div>
                  </form>

                  <form action={deleteTaskAction} className="mt-3">
                    <input type="hidden" name="id" value={task.id} />
                    <button type="submit" className="rounded-md border border-rose-300 px-3 py-2 text-sm font-medium text-rose-700 hover:bg-rose-50">
                      Delete
                    </button>
                  </form>
                </>
              ) : (
                <form action={updateTaskAction} className="grid gap-3">
                  <input type="hidden" name="id" value={task.id} />
                  <div>
                    <h2 className="text-lg font-semibold text-slate-900">{task.title}</h2>
                    {task.description ? <p className="mt-1 text-sm text-slate-600">{task.description}</p> : null}
                    <div className="mt-2 flex flex-wrap gap-3 text-xs text-slate-500">
                      <span>Project: {task.project.name}</span>
                      <span>Priority: {task.priority}</span>
                      <span>Deadline: {task.deadline.toLocaleString()}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    <select name="memberStatus" defaultValue={task.status} className="rounded-md border border-slate-300 px-3 py-2 text-sm">
                      {statuses.map((status) => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
                    </select>

                    <button type="submit" className="rounded-md bg-slate-900 px-3 py-2 text-sm font-medium text-white">
                      Update Status
                    </button>

                    {isOverdue ? <span className="rounded-full bg-rose-100 px-2 py-1 text-xs font-medium text-rose-700">Overdue</span> : null}
                  </div>
                </form>
              )}
            </article>
          );
        })}

        {tasks.length === 0 ? <p className="text-sm text-slate-600">No tasks found.</p> : null}
      </section>
    </div>
  );
}
