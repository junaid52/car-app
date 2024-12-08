import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Image from 'next/image';
export default function CarCard({ model, image, price }) {
  console.log(image);
  return (
    <Card className='w-full max-w-md overflow-hidden'>
      <CardContent className='p-0'>
        <div className='relative w-full h-48'>
          <Image
            src={image ? image : null}
            alt=''
            fill
            style={{ objectFit: 'cover' }}
          />
        </div>
        <div className='p-4'>
          <h2 className='text-2xl font-bold mb-2'>Price: {price}</h2>
          <p className='text-gray-600'>
            This is a description of the image. You can add more details here.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
