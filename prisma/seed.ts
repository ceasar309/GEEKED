import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const categories = await Promise.all([
    prisma.category.create({
      data: { name: "Tops", slug: "tops", image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400" },
    }),
    prisma.category.create({
      data: { name: "Bottoms", slug: "bottoms", image: "https://images.unsplash.com/photo-1594623930572-210a2311bdf4?w=400" },
    }),
    prisma.category.create({
      data: { name: "Dresses", slug: "dresses", image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400" },
    }),
    prisma.category.create({
      data: { name: "Outerwear", slug: "outerwear", image: "https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=400" },
    }),
    prisma.category.create({
      data: { name: "Accessories", slug: "accessories", image: "https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?w=400" },
    }),
    prisma.category.create({
      data: { name: "Footwear", slug: "footwear", image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=400" },
    }),
  ]);

  const productData = [
    { name: "Classic Silk Blouse", price: 89.99, gender: "women", category: "Tops", sizes: "XS,S,M,L,XL", colors: "Black,White,Beige", isNew: true, stock: 50 },
    { name: "Tailored Wool Blazer", price: 249.99, comparePrice: 329.99, gender: "women", category: "Outerwear", sizes: "XS,S,M,L,XL", colors: "Black,Navy", isNew: true, stock: 30 },
    { name: "High-Waist Denim Jeans", price: 79.99, gender: "women", category: "Bottoms", sizes: "XS,S,M,L,XL", colors: "Blue,Black", isSale: true, stock: 45 },
    { name: "Cashmere Crew Neck", price: 129.99, comparePrice: 189.99, gender: "women", category: "Tops", sizes: "XS,S,M,L", colors: "Beige,Black,White", stock: 35 },
    { name: "Leather Mini Skirt", price: 159.99, gender: "women", category: "Bottoms", sizes: "XS,S,M,L", colors: "Black,Brown", isNew: true, stock: 25 },
    { name: "Oversized Knit Sweater", price: 99.99, gender: "women", category: "Tops", sizes: "S,M,L,XL", colors: "Beige,Grey,Black", stock: 40 },
    { name: "Slim Fit Oxford Shirt", price: 69.99, gender: "men", category: "Tops", sizes: "S,M,L,XL,XXL", colors: "White,Blue,Black", isNew: true, stock: 60 },
    { name: "Tailored Trousers", price: 119.99, gender: "men", category: "Bottoms", sizes: "S,M,L,XL", colors: "Black,Navy,Grey", stock: 35 },
    { name: "Leather Bomber Jacket", price: 399.99, comparePrice: 549.99, gender: "men", category: "Outerwear", sizes: "M,L,XL", colors: "Black,Brown", isSale: true, stock: 15 },
    { name: "Premium Hoodie", price: 89.99, gender: "men", category: "Tops", sizes: "S,M,L,XL,XXL", colors: "Black,White,Grey", isNew: true, stock: 80 },
    { name: "Woven Leather Belt", price: 49.99, gender: "unisex", category: "Accessories", sizes: "S,M,L", colors: "Black,Brown", stock: 100 },
    { name: "Aviator Sunglasses", price: 129.99, comparePrice: 199.99, gender: "unisex", category: "Accessories", colors: "Gold,Black,Silver", stock: 55 },
    { name: "Canvas Sneakers", price: 69.99, gender: "unisex", category: "Footwear", sizes: "S,M,L,XL", colors: "White,Black", stock: 90 },
    { name: "Silk Evening Gown", price: 499.99, gender: "women", category: "Dresses", sizes: "XS,S,M,L", colors: "Black,Red,Navy", stock: 10 },
  ];

  for (const data of productData) {
    const category = categories.find((c) => c.name === data.category)!;
    const { category: catName, ...rest } = data;
    const slug = rest.name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");

    await prisma.product.create({
      data: {
        ...rest,
        slug,
        sku: `GEEKED-${slug.toUpperCase().replace(/-/g, "").slice(0, 6)}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`,
        categoryId: category.id,
        description: `Premium quality ${rest.name.toLowerCase()} from GEEKED. Crafted with the finest materials for ultimate comfort and style.`,
        tags: [rest.gender || "unisex", data.category.toLowerCase(), "premium"].join(","),
        images: {
          create: [
            { url: `https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&q=80`, alt: rest.name, order: 0 },
            { url: `https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&q=80`, alt: `${rest.name} side`, order: 1 },
          ],
        },
      },
    });
  }

  await prisma.heroSlide.createMany({
    data: [
      { imageUrl: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=1920&q=90", title: "NEW SEASON", subtitle: "Where Streetwear Meets Luxury", buttonText: "Shop Now", buttonLink: "/shop", displayOrder: 1 },
      { imageUrl: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1920&q=90", title: "SUMMER COLLECTION", subtitle: "Effortless Style for Every Moment", buttonText: "Explore", buttonLink: "/shop?gender=women", displayOrder: 2 },
      { imageUrl: "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=1920&q=90", title: "URBAN ESSENTIALS", subtitle: "Redefining Modern Streetwear", buttonText: "Shop Men", buttonLink: "/shop?gender=men", displayOrder: 3 },
    ],
  });

  await prisma.coupon.createMany({
    data: [
      { code: "GEEKED10", discount: 10, type: "PERCENTAGE", minAmount: 50, maxUses: 100 },
      { code: "WELCOME20", discount: 20, type: "PERCENTAGE", minAmount: 100, maxUses: 50 },
    ],
  });

  const existingAdmin = await prisma.user.findUnique({ where: { email: "admin@geeked.com" } });
  if (!existingAdmin) {
    const hashed = await bcrypt.hash("admin123", 12);
    await prisma.user.create({
      data: {
        name: "Admin",
        email: "admin@geeked.com",
        password: hashed,
        role: "ADMIN",
      },
    });
    console.log("Admin user created: admin@geeked.com / admin123");
  }

  console.log("Seed completed successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
