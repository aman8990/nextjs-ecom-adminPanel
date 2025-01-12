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

    const products = await prisma.product.findMany({});

    if (!products) {
      return NextResponse.json('No Product Found', { status: 400 });
    }

    return NextResponse.json(products);
  } catch (error) {
    console.log('ERROR_IN_GETTING_PRODUCTS', error);
    return NextResponse.json('Error in fetching products', { status: 500 });
  }
}
