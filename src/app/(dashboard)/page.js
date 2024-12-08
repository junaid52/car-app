import { auth } from '@/auth/auth';
import { redirect } from 'next/navigation';
import { getCars } from '@/app/data/data';
import DashboardContent from './dashboard-content/dashboard-content';

export default async function DashboardPage() {
  const session = await auth();

  if (!session) {
    redirect('/login');
  }
  const userId = session.user.id;
  const cars = await getCars(userId);

  return <DashboardContent user={session.user} initialCars={cars} />;
}
