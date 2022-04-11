import React, { ReactNode } from 'react';
import RegisterForm from 'src/components/ProductCreateForm';
import MainLayout from 'src/layout/MainLayout';

export default function CreateProduct() {
  return (
    <main className="form-container w-full">
      <h1 className="text-center text-2xl font-semibold">Create Product</h1>
      <RegisterForm />
    </main>
  );
}

CreateProduct.getLayout = function getLayout(page: ReactNode) {
  return <MainLayout contentClassname="w-full sm:w-fit">{page}</MainLayout>;
};
