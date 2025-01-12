'use client';

import SpinnerMini from '@/app/_components/SpinnerMini';
import useAcceptedOrders from '@/app/_hooks/useAcceptedOrders';
import useInTransitOrders from '@/app/_hooks/useInTransitOrders';
import useNewOrders from '@/app/_hooks/useNewOrders';
import useUserQueries from '@/app/_hooks/useUserQueries';
import { useRouter } from 'next/navigation';
import { HiAnnotation, HiBadgeCheck, HiTruck } from 'react-icons/hi';
import { HiMiniRectangleStack } from 'react-icons/hi2';

function DashboardUI() {
  const router = useRouter();
  const {
    data: newOrders,
    isLoading: isLoadingNewOrders,
    error: newOrdersError,
  } = useNewOrders();

  const {
    data: acceptedOrders,
    isLoading: isLoadingAcceptedOrders,
    error: acceptedOrdersError,
  } = useAcceptedOrders();

  const {
    data: inTransitOrders,
    isLoading: isLoadingInTransitOrders,
    error: inTransitOrdersError,
  } = useInTransitOrders();

  const {
    data: usersQueries,
    isLoading: isLoadingUsersQueries,
    error: usersQueriesError,
  } = useUserQueries();

  return (
    <div className="grid gap-2 sm:gap-4 grid-cols-2 mt-32 mx-2 sm:mx-5">
      <div
        onClick={() => router.push('/admin/newOrders')}
        className="flex items-center justify-center gap-2 sm:gap-4 p-2 sm:p-4 bg-white rounded-md cursor-pointer"
      >
        <div className="flex items-center justify-center text-white bg-green-700 rounded-full p-1 sm:p-2 text-xl sm:text-4xl md:text-3xl xl:text-6xl">
          <HiMiniRectangleStack />
        </div>
        <div>
          <h1 className="text-sm md:text-base font-semibold text-gray-600">
            New Orders
          </h1>
          <h1 className="text-xl font-bold text-gray-600">
            {isLoadingNewOrders ? <SpinnerMini /> : newOrders?.length}
          </h1>
        </div>
      </div>

      <div
        onClick={() => router.push('/admin/acceptedOrders')}
        className="flex items-center justify-center gap-2 sm:gap-4 p-2 sm:p-4 bg-white rounded-md cursor-pointer"
      >
        <div className="flex items-center justify-center text-white bg-green-700 rounded-full p-1 sm:p-2 text-xl sm:text-4xl md:text-3xl xl:text-6xl">
          <HiBadgeCheck />
        </div>
        <div>
          <h1 className="text-sm md:text-base font-semibold text-gray-600">
            Accepted
          </h1>
          <h1 className="text-xl font-bold text-gray-600">
            {isLoadingAcceptedOrders ? <SpinnerMini /> : acceptedOrders?.length}
          </h1>
        </div>
      </div>

      <div
        onClick={() => router.push('/admin/inTransitOrders')}
        className="flex items-center justify-center gap-2 sm:gap-4 p-2 sm:p-4 bg-white rounded-md cursor-pointer"
      >
        <div className="flex items-center justify-center text-white bg-green-700 rounded-full p-1 sm:p-2 text-xl sm:text-4xl md:text-3xl xl:text-6xl">
          <HiTruck />
        </div>
        <div>
          <h1 className="text-sm md:text-base font-semibold text-gray-600">
            InTransit
          </h1>
          <h1 className="text-xl font-bold text-gray-600">
            {isLoadingInTransitOrders ? (
              <SpinnerMini />
            ) : (
              inTransitOrders?.length
            )}
          </h1>
        </div>
      </div>

      <div
        onClick={() => router.push('/admin/userQueries')}
        className="flex items-center justify-center gap-2 sm:gap-4 p-2 sm:p-4 bg-white rounded-md cursor-pointer"
      >
        <div className="flex items-center justify-center text-white bg-green-700 rounded-full p-1 sm:p-2 text-xl sm:text-4xl md:text-3xl xl:text-6xl">
          <HiAnnotation />
        </div>
        <div>
          <h1 className="text-sm md:text-base font-semibold text-gray-600">
            Queries
          </h1>
          <h1 className="text-xl font-bold text-gray-600">
            {isLoadingUsersQueries ? <SpinnerMini /> : usersQueries?.length}
          </h1>
        </div>
      </div>
    </div>
  );
}

export default DashboardUI;
