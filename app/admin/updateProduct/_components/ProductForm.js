'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Input from '@/app/_components/Input';
import Button from '@/app/_components/Button';
import toast from 'react-hot-toast';
import axios from 'axios';
import SpinnerMini from '@/app/_components/SpinnerMini';
import dynamic from 'next/dynamic';
import UpdateProduct from './UpdateProduct';

function ProductForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [product, setProduct] = useState(null);

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      id: '',
    },
  });

  const onSubmit = async (data) => {
    setIsLoading(true);

    try {
      const res = await axios.post('/api/getProduct', data);

      setProduct(res.data);
      toast.dismiss();
      toast.success('Product Fetched');
    } catch (error) {
      toast.dismiss();
      toast.error(error.response.data || 'Error in fetching product details');
      setProduct(null);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div
        className="mt-10 border-2 border-primary-900 max-w-lg
      w-full mx-auto rounded-lg"
      >
        <div className="flex items-center flex-col my-10">
          <h1 className="text-3xl md:text-4xl mb-8">Update Product</h1>
          <div className="w-full px-6 md:px-16">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <Input
                label="Product ID"
                id="id"
                type="text"
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

      {product && <UpdateProduct product={product} setProduct={setProduct} />}
    </>
  );
}

export default dynamic(() => Promise.resolve(ProductForm), { ssr: false });
