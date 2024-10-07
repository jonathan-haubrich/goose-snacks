import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const dynamic = "force-dynamic";

// Handler for GET and POST requests
export async function GET(_: Request) {
  try {
    const priceModifier = await prisma.priceModifiers.findFirst();

    return NextResponse.json(priceModifier);
  } catch (error) {
    console.error('Error fetching priceModifiers:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}