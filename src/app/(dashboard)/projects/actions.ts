'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { requireAdmin } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

const createProjectSchema = z.object({
  name: z.string().min(2),
  description: z.string().optional()
});

export async function createProjectAction(formData: FormData) {
  const session = await requireAdmin();
  const parsed = createProjectSchema.safeParse({
    name: formData.get('name'),
    description: formData.get('description') || undefined
  });

  if (!parsed.success) {
    throw new Error('Invalid project data');
  }

  await prisma.project.create({
    data: {
      name: parsed.data.name,
      description: parsed.data.description,
      createdById: session.userId
    }
  });

  revalidatePath('/projects');
  revalidatePath('/dashboard');
}

export async function updateProjectAction(formData: FormData) {
  await requireAdmin();

  const id = Number(formData.get('id'));
  const name = String(formData.get('name') || '').trim();
  const description = String(formData.get('description') || '').trim();

  if (!id || name.length < 2) {
    throw new Error('Invalid project update');
  }

  await prisma.project.update({
    where: { id },
    data: {
      name,
      description: description || null
    }
  });

  revalidatePath('/projects');
}

export async function deleteProjectAction(formData: FormData) {
  await requireAdmin();

  const id = Number(formData.get('id'));
  if (!id) {
    throw new Error('Project id is required');
  }

  await prisma.project.delete({
    where: { id }
  });

  revalidatePath('/projects');
  revalidatePath('/tasks');
  revalidatePath('/dashboard');
}
