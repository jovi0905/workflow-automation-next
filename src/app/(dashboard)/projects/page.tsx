import { requireUser } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { createProjectAction, deleteProjectAction, updateProjectAction } from './actions';

export default async function ProjectsPage() {
  const session = await requireUser();

  const projects = await prisma.project.findMany({
    include: {
      tasks: true,
      createdBy: true
    },
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold text-slate-900">Projects</h1>
        <p className="text-sm text-slate-600">Create, update, and track projects.</p>
      </header>

      {session.role === 'ADMIN' ? (
        <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="mb-4 text-base font-semibold text-slate-900">Create Project</h2>
          <form action={createProjectAction} className="grid gap-3 md:grid-cols-3">
            <input
              name="name"
              required
              placeholder="Project name"
              className="rounded-md border border-slate-300 px-3 py-2 text-sm"
            />
            <input
              name="description"
              placeholder="Description"
              className="rounded-md border border-slate-300 px-3 py-2 text-sm md:col-span-2"
            />
            <button type="submit" className="rounded-md bg-brand-600 px-4 py-2 text-sm font-semibold text-white md:col-span-3">
              Add Project
            </button>
          </form>
        </section>
      ) : null}

      <section className="space-y-4">
        {projects.map((project) => (
          <article key={project.id} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
            {session.role === 'ADMIN' ? (
              <form action={updateProjectAction} className="grid gap-3 md:grid-cols-3">
                <input type="hidden" name="id" value={project.id} />
                <input
                  name="name"
                  defaultValue={project.name}
                  className="rounded-md border border-slate-300 px-3 py-2 text-sm"
                />
                <input
                  name="description"
                  defaultValue={project.description || ''}
                  className="rounded-md border border-slate-300 px-3 py-2 text-sm md:col-span-2"
                />
                <div className="md:col-span-3 flex flex-wrap gap-2">
                  <button type="submit" className="rounded-md bg-slate-900 px-3 py-2 text-sm font-medium text-white">
                    Update
                  </button>
                </div>
              </form>
            ) : (
              <h2 className="text-lg font-semibold text-slate-900">{project.name}</h2>
            )}

            {session.role !== 'ADMIN' && project.description ? <p className="mt-2 text-sm text-slate-600">{project.description}</p> : null}

            <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-slate-500">
              <span>Owner: {project.createdBy.name}</span>
              <span>Tasks: {project.tasks.length}</span>
            </div>

            {session.role === 'ADMIN' ? (
              <form action={deleteProjectAction} className="mt-4">
                <input type="hidden" name="id" value={project.id} />
                <button type="submit" className="rounded-md border border-rose-300 px-3 py-2 text-sm font-medium text-rose-700 hover:bg-rose-50">
                  Delete Project
                </button>
              </form>
            ) : null}
          </article>
        ))}

        {projects.length === 0 ? <p className="text-sm text-slate-600">No projects found.</p> : null}
      </section>
    </div>
  );
}
