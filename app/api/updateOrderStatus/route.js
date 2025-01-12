import getCurrentUser from '@/app/_actions/getCurrentUser';
import prisma from '@/app/_libs/prismadb';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const currentUser = await getCurrentUser();
    const body = await request.json();
    console.log(body);
    const { id, orderStatus, deliveryStatus, deliveryId, trackingLink } = body;

    if (
      !currentUser?.id ||
      !currentUser?.email ||
      currentUser?.role !== 'admin'
    ) {
      return new NextResponse('User not authenticated', { status: 401 });
    }

    if (
      (!orderStatus && !deliveryStatus && !deliveryId && !trackingLink) ||
      !id
    ) {
      return new NextResponse('Info not available', { status: 401 });
    }

    const updatedData = {};

    if (orderStatus) updatedData.orderStatus = orderStatus;
    if (deliveryStatus) updatedData.deliveryStatus = deliveryStatus;
    if (deliveryId) updatedData.deliveryId = deliveryId;
    if (trackingLink) updatedData.trackingLink = trackingLink;

    if (!updatedData) {
      return new NextResponse('Info not available', { status: 400 });
    }

    const updatedOrder = await prisma.order.update({
      where: { id },
      data: updatedData,
    });

    if (!updatedOrder) {
      return new NextResponse('Order not found', { status: 400 });
    }

    return NextResponse.json(updatedOrder, { status: 200 });
  } catch (error) {
    console.log('ERROR_IN_UPDATING_ORDER', error);
    return NextResponse.json('Error in updating order', { status: 500 });
  }
}
