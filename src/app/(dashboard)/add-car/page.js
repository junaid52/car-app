import AddCarForm from './add-car-form';
import { auth } from '@/auth/auth';
export default async function AddCarPage() {
  const session = await auth();

  if (!session) {
    redirect('/login');
  }
  return (
    <div className='container mx-auto p-4'>
      <h1 className='text-2xl font-bold mb-4'>Add New Car</h1>
      <AddCarForm />
    </div>
  );
}
