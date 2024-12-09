import prisma from '@/initilize-prisma/initilize-prisma';
export async function getCars(userId) {
  try {
    const cars = await prisma.car.findMany();
    return cars;
  } catch (error) {
    throw new Error('Failed to fetch cars');
  }
}
