import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { ReactNode } from 'react';
import { useMutation, useQuery } from 'react-query';
import { toast } from 'react-toastify';
import deleteProduct from 'src/apis/deleteProduct';
import { fetchProductDetails } from 'src/apis/fetchProductDetails';
import MainLayout from 'src/layout/MainLayout';

export default function ProductDetails() {
  const { query } = useRouter();
  const { isLoading, isError, data } = useQuery(
    ['product', { id: query.id }],
    fetchProductDetails
  );

  const router = useRouter();
  const mutation = useMutation(deleteProduct, {
    onSuccess: () => {
      toast.success('Deleting the product is successful');
      router.push('/');
    },
    onError: () => {
      toast.error('Deleting the product failed');
    },
  });

  if (isLoading) {
    return <p>Loading ...</p>;
  }
  if (!isLoading && isError) {
    return <p>Error occurred while fetching products ...</p>;
  }
  if (!isLoading && !data) {
    return (
      <p>
        No product found with id <strong>{query.id}</strong>
      </p>
    );
  }
  return (
    <main>
      <section className="flex gap-6">
        <div style={{ width: 200 }} className="rounded-md bg-white py-4 px-4">
          <Image
            alt={data.name}
            src={data.avatar}
            layout="responsive"
            width={50}
            height={60}
            unoptimized
          />
        </div>
        <div className="flex flex-col justify-between">
          <h1 className="text-xl font-semibold sm:text-2xl md:text-4xl">
            {data.name}
          </h1>
          <p className="text-xl">$ {data.price}</p>
        </div>
      </section>
      <div className="mx-3 mt-6 mb-8 h-0.5 w-full bg-slate-500" />
      <section className="max-w-2xl">
        <h2 className="mb-2 text-xl font-semibold">Description</h2>
        <p className="text-gray-500">{data.description}</p>
      </section>
      <button
        className="form-input mt-10 bg-red-500 font-semibold text-white disabled:opacity-40"
        disabled={mutation.isLoading}
        onClick={() => mutation.mutate(data.id)}
      >
        Delete
      </button>
    </main>
  );
}

ProductDetails.getLayout = function getLayout(page: ReactNode) {
  return <MainLayout>{page}</MainLayout>;
};
