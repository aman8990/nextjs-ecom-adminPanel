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

    const queries = await prisma.contactUs.findMany({});

    if (!queries) {
      return NextResponse.json([]);
    }

    return NextResponse.json(queries);
  } catch (error) {
    console.log('ERROR_IN_GETTING_QUERIES', error);
    return NextResponse.json('Error in fetching new queries', { status: 500 });
  }
}
