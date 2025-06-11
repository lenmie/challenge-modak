
export interface Dimensions {
    depth: number;
    height: number;
    width: number;
}

export interface Meta {
    barcode: string;
    createdAt: string; 
    qrCode: string;
    updatedAt: string; 
}

export interface Review {
    comment: string;
    date: string; 
    rating: number;
    reviewerEmail: string;
    reviewerName: string;
}

export interface Product {
    availabilityStatus: string;
    brand: string;
    category: string;
    description: string;
    dimensions: Dimensions;
    discountPercentage: number;
    id: number;
    images: string[];
    meta: Meta;
    minimumOrderQuantity: number;
    price: number;
    rating: number;
    returnPolicy: string;
    reviews: Review[];
    shippingInformation: string;
    sku: string;
    stock: number;
    tags: string[];
    thumbnail: string;
    title: string;
    warrantyInformation: string;
    weight: number;
}

export interface ProductsResponse {
    products: Product[];
    total: number;
    limit: number;
    skip: number;
}