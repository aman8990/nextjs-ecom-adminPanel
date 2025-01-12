import { formatIndianCurrency } from '@/app/_libs/formatIndianCurrency';

function CancelledOrder({ order }) {
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
    </div>
  );
}

export default CancelledOrder;
