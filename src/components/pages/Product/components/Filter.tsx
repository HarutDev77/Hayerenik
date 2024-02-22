import React, { useEffect, useState } from 'react'
import { AxiosResponse } from 'axios'
import { Checkbox, Collapse, Input } from 'antd'
import router from 'next/router'
import {
   FilterData,
   FilteredData,
   Products,
   ProductsList,
   PropertyData,
   PropertyFilter,
} from '@/types/main'
import { CheckboxChangeEvent } from 'antd/es/checkbox'
import { useDebounce } from '@/hooks'
import QueryApi from '@/api/query.api'
import { INPUT_DEBOUNCE_DELAY, PRODUCT_LIST_ITEMS_LIMIT } from '@/constants'

interface FilterProps {
  data: ProductsList | null;
  onFilterChange: (filteredData: Products) => void;
  currentPage: number;
}

export const Filter: React.FC<FilterProps> = ({ data, onFilterChange, currentPage }) => {
  const [fromPrice, setFromPrice] = useState<number | undefined>();
  const [toPrice, setToPrice] = useState<number | undefined>();
  const debouncedFromPrice = useDebounce(fromPrice, INPUT_DEBOUNCE_DELAY);
  const debouncedToPrice = useDebounce(toPrice, INPUT_DEBOUNCE_DELAY);

  const handlePriceChange = (key: 'from' | 'to') => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    if (key === 'from') {
      setFromPrice(value);
    } else {
      setToPrice(value);
    }
  };

  const handleCheckboxChange = (filterItem: string) => (e: CheckboxChangeEvent) => {
    const updatedFilters: any = { ...formFilters };
    updatedFilters[filterItem] = e.target.checked;
    setFormFilters(updatedFilters);
  };

  const [formFilters, setFormFilters] = useState<any>({});

  const fetchFilteredData = async () => {
    try {
      const { categoryId } = router.query;
      const filterData: FilterData = {
        categoryId: +categoryId!,
        limit: PRODUCT_LIST_ITEMS_LIMIT,
        page: currentPage,
        priceRange: { from: debouncedFromPrice, to: debouncedToPrice },
        age: [1, 2, 3, 4, 5, 6],
        subCategories: formFilters.Subcategories || [],
        propertyFilters: getSelectedPropertyFilters(),
      };

      const filterRes: AxiosResponse<FilteredData, any> = await QueryApi.filteredProductList(filterData);

      onFilterChange(filterRes.data.resData);
    } catch (error) {
      console.error('Error filtering data:', error);
    }
  };

  const getSelectedPropertyFilters = (): PropertyFilter[] => {
    const propertyFilters: PropertyFilter[] = [];

    data?.resData?.properties.forEach((property: PropertyData) => {
      if (formFilters[property.nameEn]) {
        const selectedOptions: (number | string)[] = formFilters[property.nameEn];

        const selectedProperty: PropertyFilter = {
          propertyId: property.id,
          values: selectedOptions,
        };

        propertyFilters.push(selectedProperty);
      }
    });

    return propertyFilters;
  };

  useEffect(() => {
    fetchFilteredData();
  }, [currentPage, data, debouncedFromPrice, debouncedToPrice, formFilters]);

  return (
    <div className='filter-container'>
      <div className='filters-header'>Filters</div>
      <Collapse accordion className='collapse-header'>
        <Collapse.Panel header='PRICE' key='price'>
          <div className='filter-options'>
            <Input placeholder='From' onChange={handlePriceChange('from')} />
            <Input placeholder='To' onChange={handlePriceChange('to')} />
          </div>
        </Collapse.Panel>
        <Collapse.Panel header='AGE' key='age'>
          {[1, 2, 3, 4, 5, 6].map((age) => (
            <Checkbox key={age} onChange={handleCheckboxChange(`Age-${age}`)}>
              {age}
            </Checkbox>
          ))}
        </Collapse.Panel>
        {data?.resData?.subCategories && data?.resData?.subCategories?.length > 0 && (
          <Collapse.Panel header='SUBCATEGORIES' key='subcategories'>
            {data.resData.subCategories.map((subcategory) => (
              <Checkbox
                key={subcategory.id}
                onChange={handleCheckboxChange(subcategory.titleEn)}
              >
                {subcategory.titleEn}
              </Checkbox>
            ))}
          </Collapse.Panel>
        )}
        {data?.resData?.properties.map((property) => (
          <Collapse.Panel header={property.nameEn.toUpperCase()} key={property.id}>
            <Checkbox onChange={handleCheckboxChange(property.nameEn)}>
              {property.nameEn}
            </Checkbox>
          </Collapse.Panel>
        ))}
      </Collapse>
    </div>
  );
};
