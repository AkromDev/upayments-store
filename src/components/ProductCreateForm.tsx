import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useMutation, useQuery } from 'react-query';
import Select from 'react-select';
import createNewProduct from 'src/apis/createNewProduct';
import { fetchCategories } from 'src/apis/fetchCategories';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';

const RegisterForm = () => {
  const { isFetching: categoriesFetching, data: categories } = useQuery(
    'categories',
    fetchCategories
  );
  const router = useRouter();
  const { mutate: createProduct, isLoading } = useMutation(createNewProduct, {
    onSuccess: () => {
      toast.success('Creating a new product is successful');
      router.push('/');
    },
    onError: () => {
      toast.error('Creating a new product failed');
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    mode: 'onBlur',
  });

  const selectOptions = Array.isArray(categories)
    ? categories.map(({ name }) => ({ value: name, label: name }))
    : [];

  const handleCreateProduct = (data: Record<string, any>) => {
    const { category, ...product } = data;
    createProduct({ ...product, category: category.value });
  };

  const handleError = (errors: any) => {
    console.log(errors);
  };

  const renderError = (fieldName: string) => {
    if (errors[fieldName])
      return (
        <div className="text-normal mt-1 mb-2 text-sm text-red-500">
          {errors[fieldName]?.message || 'This field is required'}
        </div>
      );
  };

  return (
    <form
      onSubmit={handleSubmit(handleCreateProduct, handleError)}
      className="mt-10 max-w-2xl"
    >
      <div className="form-group">
        <input
          {...register('name', { required: 'Please enter name' })}
          placeholder="Product name"
          className="form-input"
        />
        {renderError('name')}
      </div>
      <div className="form-group">
        <textarea
          placeholder="Description"
          {...register('description', { required: true })}
          className="form-input"
        />
        {renderError('description')}
      </div>
      <div className="form-group">
        <input
          placeholder="Image Url"
          {...register('avatar', { required: true })}
          className="form-input"
        />
        {renderError('avatar')}
      </div>
      <div className="form-group">
        <Controller
          name="category"
          control={control}
          render={({ field }) => (
            <Select
              options={selectOptions}
              {...field}
              placeholder="Category"
              isLoading={categoriesFetching}
            />
          )}
          defaultValue=""
          rules={{ required: true }}
        />
        {renderError('category')}
      </div>
      <div className="form-group">
        <input
          placeholder="Price"
          type={'number'}
          {...register('price', { required: true })}
          className="form-input"
        />
        {renderError('price')}
      </div>
      <button
        className="form-input mt-4 bg-white font-semibold disabled:opacity-40"
        type="submit"
        disabled={isLoading}
      >
        Submit
      </button>
    </form>
  );
};

export default RegisterForm;
