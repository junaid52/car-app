import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Link from 'next/link';
import { PlusCircle } from 'lucide-react';
export default function DashboardHeader({ user }) {
  return (
    <div>
      <Card className='mb-8'>
        <CardHeader>
          <CardTitle className='text-2xl'>
            Welcome to your Dashboard, {user.name}
          </CardTitle>
          <CardDescription>
            Manage your car listings and add new ones
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className='flex justify-between items-center'>
            <Link
              href='/add-car'
              className='flex items-center px-4 py-2 text-white bg-green-500 hover:bg-green-600'
            >
              <PlusCircle className='mr-2 h-4 w-4' /> Add New Car
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
