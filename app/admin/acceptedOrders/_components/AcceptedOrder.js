import React, { useRef, useState } from 'react';
import Button from '@/app/_components/Button';
import { formatIndianCurrency } from '@/app/_libs/formatIndianCurrency';
import axios from 'axios';
import SpinnerMini from '@/app/_components/SpinnerMini';
import toast from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import Input from '@/app/_components/Input';

function AcceptedOrder({ order, data, mutate }) {
  const [isLoading, setIsLoading] = useState(false);
  const id = order?.id;
  const printRef = useRef();

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      deliveryId: '',
      trackingLink: '',
    },
  });

  const handleClick = async (info) => {
    setIsLoading(true);
    try {
      const res = await axios.post('/api/updateOrderStatus', {
        ...info,
        id,
        deliveryStatus: 'INTRANSIT',
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

  const handlePrint = () => {
    const printContent = printRef.current;
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <html>
        <head>
          <title>Print Order</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              margin: 20px;
            }
            .order-details {
              max-width: 600px;
              margin: auto;
              padding: 20px;
              border: 1px solid #ddd;
              border-radius: 8px;
              font-size: 18px; 
              line-height: 1.5;
            }
            .order-details .item {
              font-size: 10px; 
            }
              @media print {
                .no-print {
                  display: none;
                }
                .order-container {
                  page-break-after: always; 
                }
          </style>
        </head>
        <body>
          <div class="order-details">${printContent.innerHTML}</div>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
    printWindow.close();
  };

  const address = order?.address;
  const fullAddress = `${address?.locality} , ${address?.city} , ${address?.district} , ${address?.state} , ${address?.pincode}`;

  return (
    <div className="max-w-[60rem] mx-auto border-2 rounded-md mb-5 p-3 md:p-6 md:text-lg space-y-2">
      <div ref={printRef}>
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
        <div className="no-print">
          Amount : {formatIndianCurrency(order.amount)}
        </div>
        <div>Name : {order.name}</div>
        <div>Address : {fullAddress}</div>
        <div>Phone No : {order.phone}</div>
        <div>Email : {order.email}</div>
      </div>

      <div className="max-w-sm">
        <form onSubmit={handleSubmit(handleClick)}>
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

          <div className="flex items-center gap-6 no-print">
            <Button color="green" type="submit">
              {isLoading ? <SpinnerMini /> : 'InTransit'}
            </Button>
            <Button type="button" onClick={() => handlePrint()}>
              Print
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AcceptedOrder;
