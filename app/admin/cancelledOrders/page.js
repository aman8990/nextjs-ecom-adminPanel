import CancelledOrdersData from './_components/CancelledOrdersData';

export const metadata = {
  title: 'Cancelled Orders',
};

function Page() {
  return (
    <div>
      <CancelledOrdersData />
    </div>
  );
}

export default Page;
