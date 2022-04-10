import type { NextPage } from 'next';
import Head from 'next/head';
import ProductCard from 'src/components/ProductCard';
import productsJson from 'src/data/products.json';

const Home: NextPage = () => {
  return (
    <div className="min-h-screen py-2">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
        <div className="mt-5 flex w-full items-center justify-between rounded-md bg-white px-5 py-2 font-semibold italic shadow-sm">
          <a href="">UPayments Store</a>
          <a href="">Register</a>
        </div>
        <div className="my-4 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {productsJson.products.map((product) => (
            <ProductCard product={product} key={product.id} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Home;
