import type { NextPage } from 'next';
import Head from 'next/head';
import { ReactNode, useCallback, useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { fetchProducts } from 'src/apis/fetchProducts';
import ProductCard, { Product } from 'src/components/ProductCard';
import ProductFilter from 'src/components/ProductFilter';
import MainLayout from 'src/layout/MainLayout';

export default function Home() {
  const { isLoading, isFetching, isError, data } = useQuery(
    'products',
    fetchProducts
  );

  const [filteredData, setFilteredData] = useState(data || []);

  const onFilterChange = useCallback(
    (search: string, selectedCategory: string) => {
      if (!data) {
        setFilteredData([]);
      }
      if (!search && !selectedCategory) {
        setFilteredData(data);
      } else {
        let newFilteredProducts = data as Array<Record<string, any>>;
        console.log({ newFilteredProducts });
        if (search) {
          newFilteredProducts = newFilteredProducts.filter((item) =>
            String(item.name).toLowerCase().includes(search.toLowerCase())
          );
        }
        if (selectedCategory) {
          newFilteredProducts = newFilteredProducts.filter(
            (item) => item.category === selectedCategory
          );
        }
        setFilteredData(newFilteredProducts);
      }
    },
    [data]
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
        {Array.isArray(data) && (
          <ProductFilter onFilterChange={onFilterChange} />
        )}
        {data?.length > 0 && filteredData?.length === 0 && (
          <p className="mt-10 text-center text-lg font-semibold text-red-400">
            No results found for prodivded filters
          </p>
        )}
        <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-6 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4">
          {Array.isArray(filteredData) &&
            filteredData.map((product: Product) => (
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
