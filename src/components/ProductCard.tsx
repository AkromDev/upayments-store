import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

type Product = {
  createdAt: string;
  name: string;
  avatar: string;
  id: string;
  price?: string;
  category?: string;
  description?: string;
  developerEmail?: string;
};

type Props = {
  product: Product;
};

export default function ProductCard(props: Props) {
  const { product } = props;

  return (
    <div style={{ width: 150 }}>
      <div className="rounded-md bg-white py-4 px-4 hover:shadow-md">
        <Link href={`/product/${product.id}`}>
          <a>
            <Image
              alt={product.name}
              src={product.avatar}
              layout="responsive"
              width={50}
              height={60}
              unoptimized
            />
          </a>
        </Link>
      </div>

      <h2 className="mt-2 text-left text-sm">{product.name}</h2>
      <p className="mt-2 text-sm">$ {product.price}</p>
    </div>
  );
}
