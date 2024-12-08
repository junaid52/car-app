'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import toast from 'react-hot-toast';
import { addCar } from '@/app/actions/actions';
import { useFormStatus } from 'react-dom';
import { X } from 'lucide-react';

const formSchema = z.object({
  carModel: z.string().min(2, {
    message: 'Car model must be at least 2 characters.',
  }),
  price: z.string().refine((val) => !isNaN(val) && parseFloat(val) > 0, {
    message: 'Price must be a positive number.',
  }),
  phone: z.string().min(10, {
    message: 'Phone number must be at least 10 digits.',
  }),
  city: z.string().min(2, {
    message: 'City must be at least 2 characters.',
  }),
  copies: z.enum(['1', '2', '3', '4']),
  images: z
    .array(z.instanceof(File))
    .refine((files) => files.every((file) => file instanceof File), {
      message: 'All images must be valid files.',
    }),
});

export default function AddCarForm() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const { pending } = useFormStatus();
  const [previews, setPreviews] = useState([]);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      carModel: '',
      price: '',
      phone: '',
      city: '',
      copies: '1',
      images: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'images',
  });

  const onSubmit = async (values) => {
    const formData = new FormData();
    formData.append('carModel', values.carModel);
    formData.append('price', values.price);
    formData.append('phone', values.phone);
    formData.append('city', values.city);
    formData.append('copies', values.copies);
    values.images.forEach((image, index) => {
      formData.append(`image${index}`, image);
    });
    console.log('formData:', formData.get('image'));

    try {
      const result = await addCar(formData);
      if (result.success) {
        toast.success(result.message);
        router.push('/');
      } else {
        throw new Error(result.error);
      }
    } catch (error) {
      console.error('Error adding car:', error);
      toast.error('Error adding car');
    }
  };

  const handleImageChange = (e, index) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const newPreviews = [...previews];
        newPreviews[index] = reader.result;
        setPreviews(newPreviews);
      };
      reader.readAsDataURL(file);

      const updatedImages = [...form.getValues('images')];
      updatedImages[index] = file;
      form.setValue('images', updatedImages);
    }
  };

  const removeImage = (index) => {
    const updatedImages = [...form.getValues('images')];
    updatedImages.splice(index, 1);
    form.setValue('images', updatedImages);

    const newPreviews = [...previews];
    newPreviews.splice(index, 1);
    setPreviews(newPreviews);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
        <FormField
          control={form.control}
          name='carModel'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Car Model</FormLabel>
              <FormControl>
                <Input placeholder='Enter car model' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='price'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price</FormLabel>
              <FormControl>
                <Input type='number' placeholder='Enter price' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='phone'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone</FormLabel>
              <FormControl>
                <Input placeholder='Enter phone number' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='city'
          render={({ field }) => (
            <FormItem>
              <FormLabel>City</FormLabel>
              <FormControl>
                <Input placeholder='Enter city' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='copies'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Number of Copies</FormLabel>
              <Select
                onValueChange={(value) => {
                  field.onChange(value);
                  const currentImages = form.getValues('images');
                  const newCopies = parseInt(value);
                  if (currentImages.length < newCopies) {
                    for (let i = currentImages.length; i < newCopies; i++) {
                      append(null);
                    }
                  } else if (currentImages.length > newCopies) {
                    for (
                      let i = currentImages.length - 1;
                      i >= newCopies;
                      i--
                    ) {
                      remove(i);
                    }
                  }
                }}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder='Select number of copies' />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {['1', '2', '3', '4'].map((value) => (
                    <SelectItem key={value} value={value}>
                      {value}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormDescription>
          You can upload up to {form.watch('copies')} image
          {form.watch('copies') !== '1' ? 's' : ''}. (
          {form.watch('images').filter(Boolean).length} / {form.watch('copies')}{' '}
          uploaded)
        </FormDescription>
        <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
          {Array.from({ length: parseInt(form.watch('copies')) }).map(
            (_, index) => (
              <FormField
                key={index}
                control={form.control}
                name={`images.${index}`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='sr-only'>Image {index + 1}</FormLabel>
                    <FormControl>
                      <div className='relative'>
                        <Input
                          type='file'
                          accept='image/*'
                          onChange={(e) => handleImageChange(e, index)}
                          className='absolute inset-0 w-full h-full opacity-0 cursor-pointer'
                        />
                        <div className='w-full h-32 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center'>
                          {previews[index] ? (
                            <div className='relative w-full h-full'>
                              <img
                                src={previews[index]}
                                alt={`Preview ${index + 1}`}
                                className='w-full h-full object-cover rounded-lg'
                              />
                              <button
                                type='button'
                                onClick={() => removeImage(index)}
                                className='absolute top-1 right-1 bg-red-500 text-white rounded-full p-1'
                              >
                                <X size={16} />
                              </button>
                            </div>
                          ) : (
                            <span className='text-gray-500'>Add Image</span>
                          )}
                        </div>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )
          )}
        </div>
        <Button type='submit' disabled={isPending || pending}>
          {isPending || pending ? 'Submitting...' : 'Submit'}
        </Button>
      </form>
    </Form>
  );
}
