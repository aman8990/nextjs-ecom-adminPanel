'use client';

import Spinner from '@/app/_components/Spinner';
import useInTransitOrders from '@/app/_hooks/useInTransitOrders';
import InTransitOrder from './InTransitOrder';
import Button from '@/app/_components/Button';

function InTransitOrdersData() {
  const { data, error, isLoading, mutate } = useInTransitOrders();

  if (isLoading) return <Spinner />;
  if (error)
    return (
      <div className="text-center mt-20 text-3xl">Error Loading Orders!</div>
    );

  if (data?.length === 0)
    return (
      <div>
        <div className="text-center mt-48 text-3xl">No Orders Found</div>
        <div className="flex justify-center mt-5">
          <Button onClick={() => window.location.reload()}>Refresh</Button>
        </div>
      </div>
    );

  return (
    <div className="mb-32">
      <h1 className="text-center text-4xl my-10">InTransit Orders</h1>
      <div>
        {data.map((order) => (
          <div key={order.id}>
            <InTransitOrder order={order} mutate={mutate} data={data} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default InTransitOrdersData;
