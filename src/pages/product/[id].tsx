import { useRouter } from 'next/router';
import React from 'react';
import { useQuery } from 'react-query';
import { fetchProductDetails } from 'src/apis/fetchProductDetails';

export default function ProductDetails() {
  const { query } = useRouter();
  const { isLoading, isFetching, isError, data } = useQuery(
    ['product', { id: query.id }],
    fetchProductDetails
  );

  return (
    <div>
      <h1>ProductDetails</h1>
      <p>id: {query.id}</p>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
