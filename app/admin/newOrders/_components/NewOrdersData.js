'use client';

import { useRef } from 'react';
import Spinner from '@/app/_components/Spinner';
import useNewOrders from '@/app/_hooks/useNewOrders';
import NewOrder from './NewOrder';
import Button from '@/app/_components/Button';

function NewOrdersData() {
  const { data, error, isLoading, mutate } = useNewOrders();

  const printRef = useRef();

  const handlePrintAll = () => {
    const printContent = printRef.current;
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <html>
        <head>
          <title>Print Orders</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              margin: 0;
              padding: 0;
            }
            .order-container {
              max-width: 600px;
              margin: 20px auto;
              padding: 20px;
              border: 1px solid #ddd;
              border-radius: 8px;
              font-size: 18px; 
              line-height: 1.5;
              page-break-inside: avoid; 
            }
            .order-container .item {
              font-size: 10px; 
            }
            @media print {
              .no-print {
                display: none;
              }
              .order-container {
                page-break-after: always; 
              }
            }
          </style>
        </head>
        <body>
          <div>${printContent.innerHTML}</div>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
    printWindow.close();
  };

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
      <h1 className="text-center text-4xl my-10">New Orders</h1>
      <div className="text-center my-4">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 no-print"
          onClick={handlePrintAll}
        >
          Print All Orders
        </button>
      </div>
      <div ref={printRef}>
        {data.map((order) => (
          <div key={order.id} className="order-container">
            <NewOrder order={order} data={data} mutate={mutate} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default NewOrdersData;
