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
      formData.append(`image`, image);
    });
    console.log('formData:', formData.get('carModel'));

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
      toast('Error adding car');
    }
  };

  const handleImageChange = (e, index) => {
    const file = e.target.files[0];
    if (file) {
      const updatedImages = [...form.getValues('images')];
      updatedImages[index] = file;
      form.setValue('images', updatedImages);
    }
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
        {fields.map((field, index) => (
          <FormField
            key={field.id}
            control={form.control}
            name={`images.${index}`}
            render={({ field: imageField }) => (
              <FormItem>
                <FormLabel>Image {index + 1}</FormLabel>
                <FormControl>
                  <Input
                    type='file'
                    accept='image/*'
                    onChange={(e) => handleImageChange(e, index)}
                  />
                </FormControl>
                {imageField.value && (
                  <Card>
                    <CardContent className='p-2'>
                      <img
                        src={URL.createObjectURL(imageField.value)}
                        alt={`Preview ${index + 1}`}
                        className='w-full h-32 object-cover rounded'
                      />
                    </CardContent>
                  </Card>
                )}
                <FormMessage />
              </FormItem>
            )}
          />
        ))}
        <Button type='submit' disabled={isPending || pending}>
          {isPending || pending ? 'Submitting...' : 'Submit'}
        </Button>
      </form>
    </Form>
  );
}
