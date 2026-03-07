'use server';

import { TaskPriority, TaskStatus } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import { requireUser } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

function parseDate(value: FormDataEntryValue | null) {
  if (!value) return null;
  const date = new Date(String(value));
  return Number.isNaN(date.getTime()) ? null : date;
}

export async function createTaskAction(formData: FormData) {
  const session = await requireUser();
  if (session.role !== 'ADMIN') {
    throw new Error('Only admins can create tasks');
  }

  const title = String(formData.get('title') || '').trim();
  const description = String(formData.get('description') || '').trim();
  const deadline = parseDate(formData.get('deadline'));
  const priority = String(formData.get('priority') || '') as TaskPriority;
  const status = String(formData.get('status') || '') as TaskStatus;
  const projectId = Number(formData.get('projectId'));
  const assignedToId = Number(formData.get('assignedToId'));

  if (!title || !deadline || !projectId || !assignedToId || !priority || !status) {
    throw new Error('Invalid task details');
  }

  await prisma.task.create({
    data: {
      title,
      description: description || null,
      deadline,
      priority,
      status,
      projectId,
      assignedToId,
      createdById: session.userId,
      completedAt: status === 'DONE' ? new Date() : null
    }
  });

  revalidatePath('/tasks');
  revalidatePath('/dashboard');
}

export async function updateTaskAction(formData: FormData) {
  const session = await requireUser();
  const id = Number(formData.get('id'));
  if (!id) {
    throw new Error('Task id is required');
  }

  if (session.role === 'ADMIN') {
    const title = String(formData.get('title') || '').trim();
    const description = String(formData.get('description') || '').trim();
    const deadline = parseDate(formData.get('deadline'));
    const priority = String(formData.get('priority') || '') as TaskPriority;
    const status = String(formData.get('status') || '') as TaskStatus;
    const projectId = Number(formData.get('projectId'));
    const assignedToId = Number(formData.get('assignedToId'));

    if (!title || !deadline || !projectId || !assignedToId || !priority || !status) {
      throw new Error('Invalid task update');
    }

    await prisma.task.update({
      where: { id },
      data: {
        title,
        description: description || null,
        deadline,
        priority,
        status,
        projectId,
        assignedToId,
        completedAt: status === 'DONE' ? new Date() : null,
        overdueNotifiedAt: status === 'DONE' ? null : undefined
      }
    });
  } else {
    const status = String(formData.get('memberStatus') || '') as TaskStatus;
    if (!status) {
      throw new Error('Status is required');
    }

    const task = await prisma.task.findUnique({ where: { id } });
    if (!task || task.assignedToId !== session.userId) {
      throw new Error('Task not found');
    }

    await prisma.task.update({
      where: { id },
      data: {
        status,
        completedAt: status === 'DONE' ? new Date() : null
      }
    });
  }

  revalidatePath('/tasks');
  revalidatePath('/dashboard');
}

export async function deleteTaskAction(formData: FormData) {
  const session = await requireUser();
  if (session.role !== 'ADMIN') {
    throw new Error('Only admins can delete tasks');
  }

  const id = Number(formData.get('id'));
  if (!id) {
    throw new Error('Task id is required');
  }

  await prisma.task.delete({ where: { id } });

  revalidatePath('/tasks');
  revalidatePath('/dashboard');
}
