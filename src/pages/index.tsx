import type { NextPage } from 'next';
import Head from 'next/head';
import { ReactNode } from 'react';
import { useQuery } from 'react-query';
import { fetchProducts } from 'src/apis/fetchProducts';
import ProductCard, { Product } from 'src/components/ProductCard';
import MainLayout from 'src/layout/MainLayout';

export default function Home() {
  const { isLoading, isFetching, isError, data } = useQuery(
    'products',
    fetchProducts
  );

  return (
    <>
      <Head>
        <title>UPayments Store</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        {isLoading && <p className="my-4 text-center text-xl">Loading ...</p>}
        {isError && !isFetching && (
          <p className="my-4 text-center text-xl">
            Error occured while fetching ...
          </p>
        )}
        <div className="my-4 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {Array.isArray(data) &&
            data.map((product: Product) => (
              <ProductCard product={product} key={product.id} />
            ))}
        </div>
      </main>
    </>
  );
}

Home.getLayout = function getLayout(page: ReactNode) {
  return <MainLayout>{page}</MainLayout>;
};
