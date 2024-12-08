import prisma from '@/initilize-prisma/initilize-prisma';
export async function getCars(userId) {
  try {
    const cars = await prisma.car.findMany();
    return cars;
  } catch (error) {
    console.error('Error fetching cars:', error);
    throw new Error('Failed to fetch cars');
  }
}
