import Button from '@/app/_components/Button';
import SpinnerMini from '@/app/_components/SpinnerMini';
import { formatIndianCurrency } from '@/app/_libs/formatIndianCurrency';
import axios from 'axios';
import { useState } from 'react';
import toast from 'react-hot-toast';

function InTransitOrder({ order, mutate, data }) {
  const [isLoading, setIsLoading] = useState(false);
  const id = order?.id;

  const handleClick = async () => {
    setIsLoading(true);
    try {
      const res = await axios.post('/api/updateOrderStatus', {
        id,
        deliveryStatus: 'DELIVERED',
      });

      if (res.status === 200) {
        const updatedOrders = data.filter((order) => order.id !== id);
        mutate(updatedOrders, false);

        toast.dismiss();
        toast.success('Order Updated');
      }
    } catch (error) {
      console.log(error);
      toast.dismiss();
      toast.error('Error in Updating Order');
    } finally {
      setIsLoading(false);
    }
  };

  const address = order?.address;
  const fullAddress = `${address?.locality} , ${address?.city} , ${address?.district} , ${address?.state} , ${address?.pincode}`;

  return (
    <div className="max-w-[60rem] mx-auto border-2 rounded-md mb-5 p-3 md:p-6 md:text-lg space-y-2">
      <div>
        <div>Order ID : {order.id}</div>
        <div className="no-print">
          Items :
          {order.items.map((item) => (
            <div key={item.productId} className="item">
              <h1>
                {item.quantity} x {item.productName}
              </h1>
            </div>
          ))}
        </div>
        <div>Amount : {formatIndianCurrency(order.amount)}</div>
        <div>Name : {order.name}</div>
        <div>Address : {fullAddress}</div>
        <div>Phone No : {order.phone}</div>
        <div>Email : {order.email}</div>
      </div>
      <div className="flex items-center gap-6 no-print">
        <Button color="green" onClick={() => handleClick()}>
          {isLoading ? <SpinnerMini /> : 'Delivered'}
        </Button>
      </div>
    </div>
  );
}

export default InTransitOrder;
