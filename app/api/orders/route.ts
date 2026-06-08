import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const session = await auth();
    const body = await req.json();

    const order = await prisma.order.create({
      data: {
        userId: session?.user?.id,
        email: body.email,
        subtotal: body.total - body.total * 0.08,
        tax: body.total * 0.08,
        total: body.total,
        paymentMethod: body.paymentMethod,
        shippingName: `${body.firstName} ${body.lastName}`,
        shippingStreet: body.address,
        shippingCity: body.city,
        shippingState: body.state,
        shippingZip: body.zip,
        shippingCountry: body.country,
        items: {
          create: body.items.map((item: any) => ({
            productId: item.productId,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            size: item.size,
            color: item.color,
            image: item.image,
          })),
        },
      },
    });

    return NextResponse.json({ id: order.id, orderId: order.id });
  } catch {
    return NextResponse.json(
      { error: "Failed to create order" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ orders: [] });
    }

    const orders = await prisma.order.findMany({
      where: { userId: session.user.id },
      include: { items: true },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ orders });
  } catch {
    return NextResponse.json({ orders: [] });
  }
}
