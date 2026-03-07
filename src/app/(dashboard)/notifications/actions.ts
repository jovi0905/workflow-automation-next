'use server';

import { revalidatePath } from 'next/cache';
import { requireUser } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function markNotificationReadAction(formData: FormData) {
  const session = await requireUser();
  const id = Number(formData.get('id'));

  if (!id) {
    throw new Error('Notification id is required');
  }

  await prisma.notification.updateMany({
    where: {
      id,
      userId: session.userId
    },
    data: {
      isRead: true
    }
  });

  revalidatePath('/notifications');
}

export async function markAllNotificationsReadAction() {
  const session = await requireUser();

  await prisma.notification.updateMany({
    where: {
      userId: session.userId,
      isRead: false
    },
    data: {
      isRead: true
    }
  });

  revalidatePath('/notifications');
}
