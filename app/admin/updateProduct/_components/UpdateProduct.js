import Button from '@/app/_components/Button';
import Input from '@/app/_components/Input';
import SpinnerMini from '@/app/_components/SpinnerMini';
import Textarea from '@/app/_components/Textarea';
import axios from 'axios';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

function UpdateProduct({ product, setProduct }) {
  const [isLoading, setIsLoading] = useState(false);
  const images = product.images.map((image) => image).join('    ||||\n\n');
  const fullDescription = product.fullDescription
    .map((des) => des)
    .join('    ||||\n\n');

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      id: product?.id,
      name: product?.name,
      price: product?.price,
      photo: product?.photo,
      description: product?.description,
      images: images,
      fullDescription: fullDescription,
    },
  });

  const onSubmit = async (data) => {
    setIsLoading(true);

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

    try {
      const res = await axios.post('/api/updateProduct', transformedData);

      setProduct(res.data);

      toast.dismiss();
      toast.success('Product Updated');
    } catch (error) {
      console.log('Error in updating product', error);
      toast.dismiss();
      toast.error('Error in updating product');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="mb-32 border-2 border-primary-900 max-w-lg
      w-full mx-auto rounded-lg"
    >
      <div className="flex items-center flex-col my-10">
        <div className="w-full px-6 md:px-16">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input
              label="Product ID"
              id="id"
              type="text"
              errors={errors}
              register={register}
              disabled
              validationRules={{
                required: '* This field is required',
              }}
            />

            <Input
              label="Product Name"
              id="name"
              type="text"
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
              type="text"
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
  );
}

export default UpdateProduct;
