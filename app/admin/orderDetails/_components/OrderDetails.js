import Button from '@/app/_components/Button';
import Input from '@/app/_components/Input';
import SpinnerMini from '@/app/_components/SpinnerMini';
import { formatIndianCurrency } from '@/app/_libs/formatIndianCurrency';
import axios from 'axios';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

function OrderDetails({ order, setOrder }) {
  const [isLoading, setIsLoading] = useState(false);
  const [orderStatus, setOrderStatus] = useState(order?.orderStatus || '');
  const [deliveryStatus, setDeliveryStatus] = useState(
    order?.deliveryStatus || ''
  );

  const id = order?.id;
  const address = order?.address;
  const fullAddress = `${address?.locality} , ${address?.city} , ${address?.district} , ${address?.state} , ${address?.pincode}`;

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      deliveryId: order?.deliveryId,
      trackingLink: order?.trackingLink,
    },
  });

  const onSubmit = async (info) => {
    setIsLoading(true);

    const data = { id, orderStatus, deliveryStatus, ...info };

    try {
      const res = await axios.post('/api/updateOrderStatus', data);

      setOrder(res.data);
      toast.dismiss();
      toast.success('Order Updated');
    } catch (error) {
      console.log('Error in updating order', error);
      toast.dismiss();
      toast.error('Error in updating order');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-[60rem] mx-auto border-2 rounded-md mb-32 p-3 md:p-6 md:text-lg space-y-2">
      <div>
        <div>Order ID : {order.id}</div>
        <div>
          Items :
          {order?.items.map((item) => (
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
        <div>Order Status : {order.orderStatus}</div>
        <div>Delivery Status : {order.deliveryStatus}</div>
      </div>

      <div className="flex flex-col">
        <label htmlFor="orderStatus">Change order status :</label>
        <select
          id="orderStatus"
          value={orderStatus}
          onChange={(e) => setOrderStatus(e.target.value)}
          className="text-black w-32 ml-5 h-8 mt-1 rounded-md pl-1"
        >
          <option value="" disabled>
            Select an option
          </option>
          <option value="PENDING">Pending</option>
          <option value="ACCEPTED">Accepted</option>
          <option value="CANCELLED">Cancelled</option>
        </select>
      </div>

      <div className="flex flex-col">
        <label htmlFor="deliveryStatus">Change delivery status :</label>
        <select
          id="deliveryStatus"
          value={deliveryStatus}
          onChange={(e) => setDeliveryStatus(e.target.value)}
          className="text-black w-32 ml-5 h-8 mt-1 rounded-md pl-1"
        >
          <option value="" disabled>
            Select an option
          </option>
          <option value="CANCELLED">Cancelled</option>
          <option value="PROCESSING">Processing</option>
          <option value="INTRANSIT">InTransit</option>
          <option value="DELIVERED">Delivered</option>
        </select>
      </div>

      <div className="max-w-sm">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-5 space-y-3">
            <Input
              label="Deliver ID"
              id="deliveryId"
              type="text"
              errors={errors}
              register={register}
              disabled={isLoading}
              validationRules={{
                required: '* This field is required',
              }}
            />

            <Input
              label="Tracking Link"
              id="trackingLink"
              type="url"
              errors={errors}
              register={register}
              disabled={isLoading}
              validationRules={{
                required: '* This field is required',
              }}
            />
          </div>

          <div className="ml-2">
            <Button>{isLoading ? <SpinnerMini /> : 'Submit'}</Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default OrderDetails;
