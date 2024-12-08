'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signOut } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { PlusCircle, LogOut, Car } from 'lucide-react';

export default function DashboardContent({ user }) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSignOut = async () => {
    setIsLoading(true);
    await signOut({ callbackUrl: '/' });
  };

  const handleAddCar = () => {
    router.push('/add-car');
  };

  return (
    <div className='container mx-auto p-4'>
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
            <Button
              onClick={handleAddCar}
              className='bg-green-500 hover:bg-green-600'
            >
              <PlusCircle className='mr-2 h-4 w-4' /> Add New Car
            </Button>
            <Button
              onClick={handleSignOut}
              variant='outline'
              disabled={isLoading}
            >
              <LogOut className='mr-2 h-4 w-4' />
              {isLoading ? 'Signing out...' : 'Sign out'}
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
        {[1, 2, 3].map((i) => (
          <Card key={i}>
            <CardHeader>
              <CardTitle>Car Model {i}</CardTitle>
              <CardDescription>Details about Car {i}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className='flex items-center'>
                <Car className='mr-2 h-4 w-4' /> View Details
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
