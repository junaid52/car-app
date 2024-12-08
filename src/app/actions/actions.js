'use server';

// import { put } from '@vercel/blob';
import { auth } from '@/auth/auth';
import prisma from '@/initilize-prisma/initilize-prisma';
import { revalidatePath } from 'next/cache';

export async function addCar(formData) {
  try {
    console.log(formData);
    const session = await auth();
    if (!session) {
      throw new Error('Unauthorized');
    }

    const carModel = formData.get('carModel');
    const price = parseFloat(formData.get('price'));
    const phone = formData.get('phone');
    const city = formData.get('city');
    const copies = parseInt(formData.get('copies'));

    // const imageUrls = [];
    // for (let i = 0; i < copies; i++) {
    //   const image = formData.get(`image${i}`);
    //   if (image) {
    //     const blob = await put(`cars/${Date.now()}-${image.name}`, image, {
    //       access: 'public',
    //     });
    //     imageUrls.push(blob.url);
    //   }
    // }
    console.log(session.user.id);
    const car = await prisma.car.create({
      data: {
        carModel,
        price,
        phone,
        city,
        copies,
        images: ['/test'],

        userId: session.user.id,
      },
      // include: {
      //   userId: true,
      // },
    });

    revalidatePath('/');
    return { success: true, message: 'Car added successfully', car };
  } catch (error) {
    console.log('in catch block');
    console.log(error.message);
    return { success: false, error: error.message };
  }
}

export async function getCars() {
  try {
    await dbConnect();
    const cars = await Car.find().sort({ createdAt: -1 });
    return cars;
  } catch (error) {
    console.error('Error fetching cars:', error);
    throw new Error('Failed to fetch cars');
  }
}
