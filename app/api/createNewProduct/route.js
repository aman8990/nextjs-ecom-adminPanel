import getCurrentUser from '@/app/_actions/getCurrentUser';
import prisma from '@/app/_libs/prismadb';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const currentUser = await getCurrentUser();
    const body = await request.json();
    console.log(body);
    const { name, price, photo, description, images, fullDescription } = body;

    if (
      !currentUser?.id ||
      !currentUser?.email ||
      currentUser?.role !== 'admin'
    ) {
      return new NextResponse('User not authenticated', { status: 401 });
    }

    if (
      !name ||
      !price ||
      !photo ||
      !images ||
      !description ||
      !fullDescription
    ) {
      return new NextResponse('Info not available', { status: 400 });
    }

    const newProduct = await prisma.product.create({
      data: {
        name,
        price: parseInt(price, 10),
        photo,
        description,
        images,
        fullDescription,
      },
    });

    if (!newProduct) {
      return new NextResponse('Error in creating Product', { status: 400 });
    }

    return NextResponse.json(newProduct, { status: 200 });
  } catch (error) {
    console.log('ERROR_IN_CREATING_PRODUCT', error);
    return NextResponse.json('Error in creating product', { status: 500 });
  }
}
