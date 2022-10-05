import { Component } from '@angular/core';
import { ProductTypeFiltersService } from '../product-type-filters.service';
import { ProductService } from '../product.service';
import { SelectData } from '../types';

@Component({
	selector: 'reactive-product-group',
	styleUrls: ['./reactive-product-group.component.scss'],
	templateUrl: './reactive-product-group.component.html',
})
export class ReactiveProductGroupComponent {
  readonly productTypeFilters$
    = this.productTypeFiltersService.productTypeFilters$;

  readonly products$ = this.productService.filteredProducts$;

  constructor(
    private readonly productService: ProductService,
    private readonly productTypeFiltersService: ProductTypeFiltersService
  ){
  }

  changeFilterSelection(filter: SelectData) {
    this.productTypeFiltersService.changeFilterSelection(filter);
  }
}




