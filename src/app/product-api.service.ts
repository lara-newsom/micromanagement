import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { PRODUCTS, PRODUCT_TYPE_FILTERS } from './products';

@Injectable({
  providedIn: 'root'
})
export class ProductApiService {
  getProducts() {
    return of(PRODUCTS);
  }

  getLocationFilters(): Observable<string[]> {
    return of(['USA', 'EU', 'Canada', 'Brazil', 'China']);
  }

  getProductTypeFilters(): Observable<string[]> {
    return of(PRODUCT_TYPE_FILTERS);
  }
}
