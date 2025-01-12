import { NextResponse } from 'next/server';
import prisma from '@/app/_libs/prismadb';
import getCurrentUser from '@/app/_actions/getCurrentUser';

export async function GET(req) {
  try {
    const currentUser = await getCurrentUser();

    if (
      !currentUser?.id ||
      !currentUser?.email ||
      currentUser?.role !== 'admin'
    ) {
      return new NextResponse('User not authenticated', { status: 401 });
    }

    const orders = await prisma.order.findMany({
      where: {
        paymentStatus: 'PAID',
        orderStatus: 'PENDING',
        deliveryStatus: 'PROCESSING',
      },
    });

    if (!orders) {
      return NextResponse.json([]);
    }

    return NextResponse.json(orders);
  } catch (error) {
    console.log('ERROR_IN_GETTING_ORDERS', error);
    return NextResponse.json('Error in fetching new orders', { status: 500 });
  }
}
