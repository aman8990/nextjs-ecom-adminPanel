import getCurrentUser from '@/app/_actions/getCurrentUser';
import prisma from '@/app/_libs/prismadb';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const currentUser = await getCurrentUser();
    const body = await request.json();
    const { id } = body;

    if (
      !currentUser?.id ||
      !currentUser?.email ||
      currentUser?.role !== 'admin'
    ) {
      return new NextResponse('User not authenticated', { status: 401 });
    }

    if (!id) {
      return new NextResponse('Info not available', { status: 400 });
    }

    const deletedProduct = await prisma.product.delete({
      where: { id },
    });

    if (!deletedProduct) {
      return new NextResponse('Product not found', { status: 401 });
    }

    return NextResponse.json(deletedProduct, { status: 200 });
  } catch (error) {
    console.log('ERROR_IN_DELETING_PRODUCT', error);
    return NextResponse.json('Error in deleting product', { status: 500 });
  }
}
