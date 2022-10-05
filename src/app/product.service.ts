import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ProductApiService } from './product-api.service';
import { Product } from './types';
import { map, combineLatestWith } from 'rxjs/operators';
import { ProductTypeFiltersService } from './product-type-filters.service';

@Injectable({providedIn: 'root'})
export class ProductService {
  private readonly products = new BehaviorSubject<Product[]>([]);

  readonly filteredProducts$ = this.products.asObservable()
    .pipe(
      combineLatestWith(
        this.productTypeFiltersService.selectedFilters$
      ),
      map(([products, selected]) => {
        if(!selected.length){
          return products;
        }
        return products.filter((product) =>
          selected.some((selected) =>
            selected === product.productType)
          );
      }),
    );

  constructor(
    private productApiService: ProductApiService,
    private productTypeFiltersService: ProductTypeFiltersService,
    ) {
      this.productApiService.getProducts()
        .subscribe((products) => {
          this.products.next(products);
        });
  }
}


