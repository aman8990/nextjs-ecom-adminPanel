'use client';

import Spinner from '@/app/_components/Spinner';
import Button from '@/app/_components/Button';
import useAllProducts from '@/app/_hooks/useAllProducts';
import Product from './Product';

function AllProductsData() {
  const { data, error, isLoading } = useAllProducts();

  if (isLoading) return <Spinner />;
  if (error)
    return (
      <div className="text-center mt-20 text-3xl">Error Loading Products!</div>
    );

  if (data?.length === 0)
    return (
      <div>
        <div className="text-center mt-48 text-3xl">No Products Found</div>
        <div className="flex justify-center mt-5">
          <Button onClick={() => window.location.reload()}>Refresh</Button>
        </div>
      </div>
    );

  return (
    <div className="mb-32">
      <h1 className="text-center text-4xl my-10">All Products</h1>

      <div>
        {data.map((product) => (
          <div key={product.id}>
            <Product product={product} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default AllProductsData;
