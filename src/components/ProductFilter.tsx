import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import Select from 'react-select';
import { fetchCategories } from 'src/apis/fetchCategories';

type ProductFilterProps = {
  onFilterChange: (search: string, category: string) => void;
};
export default function ProductFilter({ onFilterChange }: ProductFilterProps) {
  const [category, setCategory] = useState('');
  const [search, setSearch] = useState('');

  const { isFetching: categoriesFetching, data: categories } = useQuery(
    'categories',
    fetchCategories
  );
  useEffect(() => {
    onFilterChange(search, category);
  }, [category, search, onFilterChange]);

  const selectOptions = [];
  if (Array.isArray(categories)) {
    selectOptions.push({ value: '', label: 'All' });
    categories.forEach(({ name }) =>
      selectOptions.push({ value: name, label: name })
    );
  }

  return (
    <div className="flex w-full flex-1 flex-col items-center justify-between gap-5 sm:flex-row sm:gap-10">
      <input
        placeholder="Apple watch, Samsung S21, Macbook Pro ..."
        className="form-input flex-1 sm:max-w-sm"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <Select
        options={selectOptions}
        placeholder="Categories"
        isLoading={categoriesFetching}
        className="w-full flex-1 sm:flex-initial sm:basis-1/3"
        value={{ value: category, label: category || 'All' }}
        onChange={(val) => setCategory(val?.value || '')}
      />
    </div>
  );
}
