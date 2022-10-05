import { createSpyFromClass } from 'jest-auto-spies';
import { ProductApiService } from './product-api.service';
import { subscribeSpyTo } from '@hirez_io/observer-spy';

import { ProductTypeFiltersService } from './product-type-filters.service';
import { PRODUCT_TYPE_FILTERS } from './products';

describe('ProductTypeFiltersService', () => {
  function setup(filters: string[] = PRODUCT_TYPE_FILTERS) {
    const productApiService = createSpyFromClass(ProductApiService);
    productApiService.getProductTypeFilters.nextWith(filters);

    const service = new ProductTypeFiltersService(productApiService);
    return {
      service,
    }
  }

  it('returns filters', () => {
    const filter1 = 'cat';
    const filter2 = 'dog';
    const filter3 = 'horse';
    const FILTERS = [filter1, filter2, filter3];
    const expectedFilters = [
      {
        value: filter1,
        isSelected: false
      },
      {
        value: filter2,
        isSelected: false
      },
      {
        value: filter3,
        isSelected: false
      },
    ];

    const {service} = setup(FILTERS);


    const productTypeFiltersSpy = subscribeSpyTo(service.productTypeFilters$);

    expect(productTypeFiltersSpy.getLastValue()).toEqual(expectedFilters);
  });

  it('adds selected filters', () => {
    const filter1 = 'cat';
    const filter2 = 'dog';
    const filter3 = 'horse';
    const FILTERS = [filter1, filter2, filter3];

    const {service} = setup(FILTERS);

    const expectedFilters1 = [filter2];

    const expectedFilters2 = [filter2,filter3];

    const expectedFilters3 = [filter3];

    const selectedFilterSpy = subscribeSpyTo(service.selectedFilters$);
    service.changeFilterSelection({
      value: filter2,
      isSelected: false
    });

    service.changeFilterSelection({
      value: filter3,
      isSelected: false
    });

    service.changeFilterSelection({
      value: filter2,
      isSelected: true
    });


    expect(selectedFilterSpy.getFirstValue()).toEqual([]);
    expect(selectedFilterSpy.getValueAt(1)).toEqual(expectedFilters1);
    expect(selectedFilterSpy.getValueAt(2)).toEqual(expectedFilters2);

    expect(selectedFilterSpy.getLastValue()).toEqual(expectedFilters3);
  });

  it('selects filters', () => {
    const filter1 = 'cat';
    const filter2 = 'dog';
    const filter3 = 'horse';
    const FILTERS = [filter1, filter2, filter3];

    const {service} = setup(FILTERS);

    const expectedFilters1 = [
      {
        value: filter1,
        isSelected: false
      },
      {
        value: filter2,
        isSelected: false
      },
      {
        value: filter3,
        isSelected: false
      },
    ];

    const expectedFilters2 = [
      {
        value: filter1,
        isSelected: false
      },
      {
        value: filter2,
        isSelected: true
      },
      {
        value: filter3,
        isSelected: false
      },
    ];


    const productTypeFiltersSpy = subscribeSpyTo(service.productTypeFilters$);
    service.changeFilterSelection({
      value: filter2,
      isSelected: false
    });

    expect(productTypeFiltersSpy.getFirstValue()).toEqual(expectedFilters1);
    expect(productTypeFiltersSpy.getLastValue()).toEqual(expectedFilters2);
  });
});
