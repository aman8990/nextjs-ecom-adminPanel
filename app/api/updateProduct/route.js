import getCurrentUser from '@/app/_actions/getCurrentUser';
import prisma from '@/app/_libs/prismadb';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const currentUser = await getCurrentUser();
    const body = await request.json();
    const { id, name, price, photo, description, images, fullDescription } =
      body;

    if (
      !currentUser?.id ||
      !currentUser?.email ||
      currentUser?.role !== 'admin'
    ) {
      return new NextResponse('User not authenticated', { status: 401 });
    }

    if (
      !id ||
      !name ||
      !price ||
      !photo ||
      !images ||
      !description ||
      !fullDescription
    ) {
      return new NextResponse('Info not available', { status: 400 });
    }

    const updatedProduct = await prisma.product.update({
      where: { id },
      data: {
        name,
        price: parseInt(price, 10),
        photo,
        description,
        images,
        fullDescription,
      },
    });

    if (!updatedProduct) {
      return new NextResponse('Product not found', { status: 401 });
    }

    return NextResponse.json(updatedProduct, { status: 200 });
  } catch (error) {
    console.log('ERROR_IN_UPDATING_PRODUCT', error);
    return NextResponse.json('Error in updating product', { status: 500 });
  }
}
