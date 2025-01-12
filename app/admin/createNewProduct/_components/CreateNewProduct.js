'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Input from '@/app/_components/Input';
import Button from '@/app/_components/Button';
import toast from 'react-hot-toast';
import axios from 'axios';
import SpinnerMini from '@/app/_components/SpinnerMini';
import dynamic from 'next/dynamic';
import Textarea from '@/app/_components/Textarea';

function Page() {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: '',
      price: '',
      photo: '',
      description: '',
      images: '',
      fullDescription: '',
    },
  });

  const onSubmit = async (data) => {
    setIsLoading(true);

    try {
      const transformedData = {
        ...data,
        images: data.images
          .split('||||')
          .map((item) => item.trim())
          .filter((item) => item !== ''),

        fullDescription: data.fullDescription
          .split('||||')
          .map((item) => item.trim())
          .filter((item) => item !== ''),
      };

      const res = await axios.post('/api/createNewProduct', transformedData);

      toast.dismiss();
      toast.success(`Product Created with ID - ${res.data.id}`);
    } catch (error) {
      toast.dismiss();
      toast.error(error.response.data || 'Error in creating Product');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div
        className="mt-10 mb-32 border-2 border-primary-900 max-w-lg
      w-full mx-auto rounded-lg"
      >
        <div className="flex items-center flex-col my-10">
          <h1 className="text-3xl md:text-4xl mb-8">Create New Product</h1>
          <div className="w-full px-6 md:px-16">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <Input
                label="Product Name"
                id="name"
                type="text"
                placeholder="Samsung S24"
                errors={errors}
                register={register}
                disabled={isLoading}
                validationRules={{
                  required: '* This field is required',
                }}
              />

              <Input
                label="Product Price"
                id="price"
                type="number"
                placeholder="₹ 1,25,999"
                errors={errors}
                register={register}
                disabled={isLoading}
                validationRules={{
                  required: '* This field is required',
                }}
              />

              <Input
                label="Product Photo"
                id="photo"
                type="text"
                placeholder="Cover Photo"
                errors={errors}
                register={register}
                disabled={isLoading}
                validationRules={{
                  required: '* This field is required',
                }}
              />

              <Textarea
                label="Product Description"
                id="description"
                type="text"
                placeholder="Meet Galaxy S24, the ultimate device"
                errors={errors}
                register={register}
                disabled={isLoading}
                validationRules={{
                  required: '* This field is required',
                }}
              />

              <Textarea
                label="Product Images"
                id="images"
                type="url"
                placeholder="Image1Url |||| Image2Url |||| Image3Url"
                errors={errors}
                register={register}
                disabled={isLoading}
                validationRules={{
                  required: '* This field is required',
                }}
              />

              <Textarea
                label="Full Description"
                id="fullDescription"
                type="text"
                placeholder="Description1 |||| Description2 |||| Description3"
                errors={errors}
                register={register}
                disabled={isLoading}
                validationRules={{
                  required: '* This field is required',
                }}
              />

              <div className="flex justify-center">
                <Button type="submit">
                  {isLoading ? <SpinnerMini /> : 'Submit'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default dynamic(() => Promise.resolve(Page), { ssr: false });
