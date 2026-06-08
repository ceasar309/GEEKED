export interface ProductType {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  comparePrice?: number | null;
  sku: string;
  brand?: string | null;
  gender?: string | null;
  categoryId: string;
  category: { id: string; name: string; slug: string };
  sizes: string;
  colors: string;
  tags: string;
  images: { url: string; alt?: string | null }[];
  stock: number;
  isFeatured: boolean;
  isNew: boolean;
  isSale: boolean;
  rating: number;
  reviewCount: number;
  createdAt: string;
}

export interface CartItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  quantity: number;
  size?: string;
  color?: string;
  image?: string;
}

export interface OrderType {
  id: string;
  userId?: string | null;
  email: string;
  status: string;
  items: OrderItemType[];
  subtotal: number;
  tax: number;
  shipping: number;
  discount: number;
  total: number;
  paymentMethod?: string | null;
  createdAt: string;
}

export interface OrderItemType {
  id: string;
  productId: string;
  name: string;
  price: number;
  quantity: number;
  size?: string | null;
  color?: string | null;
  image?: string | null;
}

export interface UserType {
  id: string;
  name?: string | null;
  email: string;
  image?: string | null;
  role: string;
  phone?: string | null;
}

export interface AddressType {
  id: string;
  label?: string | null;
  street: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  isDefault: boolean;
}

export interface ReviewType {
  id: string;
  rating: number;
  comment?: string | null;
  userId: string;
  user: { name?: string | null; image?: string | null };
  productId: string;
  createdAt: string;
}

export interface HeroSlideType {
  id: string;
  imageUrl: string;
  title: string;
  subtitle?: string | null;
  buttonText?: string | null;
  buttonLink?: string | null;
  displayOrder: number;
  isActive: boolean;
  displayDuration: number;
}

export interface VideoType {
  id: string;
  title: string;
  description?: string | null;
  videoUrl: string;
  thumbnailUrl?: string | null;
  category?: string | null;
  duration?: string | null;
  views: number;
  isFeatured: boolean;
  isActive: boolean;
  publishDate?: string | null;
  createdAt: string;
}
