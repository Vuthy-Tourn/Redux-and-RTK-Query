export type ProductType = {
  id: number; // Unique product identifier
  // name: string;                 // Product name/title
  title: string;
  description: string; // Short product description (for cards/listings)
  // imageUrl: string;
  thumbnail: string; // URL to product image
  detailedDescription?: string; // Longer, detailed description for product page
  price: number; // Current selling price
  originalPrice?: number; // Original price (if on sale)
  sku?: string; // Stock Keeping Unit identifier
  rating: number; // Average rating (0-5 scale)
  reviewCount?: number; // Number of reviews
  colors?: string[]; // Available color variants
  features?: string[]; // Key features/bullet points
  specifications?: {
    // Technical specifications
    [key: string]: string | number;
  };
  images: string[]; // Array of image URLs for gallery
  warrantyInformation: string;
  shippingInformation: string;
  availabilityStatus: string;
};
