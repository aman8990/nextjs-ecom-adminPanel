'use client';

import Spinner from '@/app/_components/Spinner';
import Button from '@/app/_components/Button';
import useCancelledOrders from '@/app/_hooks/useCancelledOrders';
import CancelledOrder from './CancelledOrder';
import { useEffect, useState } from 'react';

function CancelledOrdersData() {
  const [page, setPage] = useState(1);
  const [orders, setOrders] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [nextPageData, setNextPageData] = useState([]);
  const { data, error, isLoading } = useCancelledOrders();
  const { data: nextPageOrders } = useCancelledOrders(page + 1);

  useEffect(() => {
    if (data) {
      setOrders(data);
    }
  }, [data]);

  useEffect(() => {
    if (nextPageOrders) {
      if (nextPageOrders.length > 0) {
        setNextPageData(nextPageOrders);
      } else {
        setHasMore(false);
      }
    }
  }, [nextPageOrders]);

  const handleViewMore = () => {
    setPage((prevPage) => prevPage + 1);
    setOrders((prevOrders) => [...prevOrders, ...nextPageData]);
    setNextPageData([]);
  };

  if (isLoading && page === 1) return <Spinner />;
  if (error)
    return (
      <div className="text-center mt-20 text-3xl">Error Loading Orders!</div>
    );

  if (orders?.length === 0)
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
      <h1 className="text-center text-4xl my-10">Cancelled Orders</h1>

      <div>
        {orders.map((order) => (
          <div key={order.id}>
            <CancelledOrder order={order} />
          </div>
        ))}

        {hasMore && (
          <div className="flex justify-center mt-5">
            <button
              onClick={handleViewMore}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              View More
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default CancelledOrdersData;
