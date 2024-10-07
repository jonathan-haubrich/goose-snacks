import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const dynamic = "force-dynamic";

// Handler for GET and POST requests
export async function GET(_: Request) {
  try {
    const products = await prisma.products.findMany({
      orderBy: {
        Votes: {
          _count: 'desc'
        }
      }
    });

    return NextResponse.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}