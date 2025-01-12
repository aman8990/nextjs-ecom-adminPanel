import { NextResponse } from 'next/server';
import prisma from '@/app/_libs/prismadb';
import getCurrentUser from '@/app/_actions/getCurrentUser';

export async function GET(request) {
  try {
    const currentUser = await getCurrentUser();
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page')) || 1;
    const limit = parseInt(searchParams.get('limit')) || 5;

    if (
      !currentUser?.id ||
      !currentUser?.email ||
      currentUser?.role !== 'admin'
    ) {
      return new NextResponse('User not authenticated', { status: 401 });
    }

    const orders = await prisma.order.findMany({
      orderBy: { updatedAt: 'desc' },
      skip: (page - 1) * limit,
      take: limit,
    });

    if (!orders) {
      return NextResponse.json([], { status: 200 });
    }

    return NextResponse.json(orders);
  } catch (error) {
    console.log('ERROR_IN_GETTING_ORDERS', error);
    return NextResponse.json('Error in fetching new orders', { status: 500 });
  }
}
