import { formatIndianCurrency } from '@/app/_libs/formatIndianCurrency';
import Image from 'next/image';

function Product({ product }) {
  function isValidUrl(url) {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  }

  const photo = isValidUrl(product?.photo) ? product.photo : '/default.jpg';

  return (
    <div className="max-w-[60rem] mx-auto border-2 rounded-md mb-5 p-3 md:p-6 md:text-lg space-y-2">
      <div>
        <div>Product ID : {product?.id}</div>
        <div>Product Name : {product.name}</div>
        <div>Product Price : {formatIndianCurrency(product.price)}</div>
        <Image src={photo} alt="product-photo" width={100} height={100} />
      </div>
    </div>
  );
}

export default Product;
