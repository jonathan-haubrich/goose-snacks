import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Handler for GET and POST requests
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const productId = Number(searchParams.get('productId'));

  if (!productId) {
    return NextResponse.json({ error: 'Missing productId' }, { status: 400 });
  }

  try {
    // Retrieve the IP address
    const ipAddress = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'Unknown';

    // Count the number of votes for the given product
    const votes = await prisma.votes.count({
      where: { productId: productId },
    });

    const yourVotes = await prisma.votes.count({
        where: { 
            AND : [
                { productId: productId },
                { ipAddress: ipAddress }
            ]
        }
    });

    return NextResponse.json({ votes, yourVotes });
  } catch (error) {
    console.error('Error fetching votes:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const body = await request.json();
  const { productId } = body;

  if (!productId) {
    return NextResponse.json({ error: 'Missing productId or ipAddress' }, { status: 400 });
  }

  try {
    // Retrieve the IP address
    const ipAddress = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'Unknown';

    // Add a new vote for the product
    await prisma.votes.create({
      data: {
        productId: productId,
        ipAddress: ipAddress,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error submitting vote:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
