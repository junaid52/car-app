'use server';

import { put } from '@vercel/blob';
import { auth } from '@/auth/auth';
import prisma from '@/initilize-prisma/initilize-prisma';
import { revalidatePath } from 'next/cache';

export async function addCar(formData) {
  try {
    const session = await auth();
    if (!session) {
      throw new Error('Unauthorized');
    }

    const carModel = formData.get('carModel');
    const price = parseFloat(formData.get('price'));
    const phone = formData.get('phone');
    const city = formData.get('city');
    const copies = parseInt(formData.get('copies'));

    const imageUrls = [];
    for (let i = 0; i < copies; i++) {
      const image = formData.get(`image${i}`);
      if (image) {
        const blob = await put(`cars/${Date.now()}-${image.name}`, image, {
          access: 'public',
        });

        imageUrls.push(blob.url);
      }
    }

    const car = await prisma.car.create({
      data: {
        carModel,
        price,
        phone,
        city,
        copies,
        images: imageUrls,

        userId: session.user.id,
      },
      // include: {
      //   userId: true,
      // },
    });

    revalidatePath('/');
    return { success: true, message: 'Car added successfully', car };
  } catch (error) {
    return { success: false, error: error.message };
  }
}
