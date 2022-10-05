import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { SelectData } from './types';
import { map, combineLatestWith, scan } from 'rxjs/operators';
import { ProductApiService } from './product-api.service';


@Injectable({
  providedIn: 'root'
})
export class ProductTypeFiltersService {
  private readonly productTypeFilters = new BehaviorSubject<SelectData[]>([]);

  private readonly selectedFilter
    = new BehaviorSubject<SelectData | undefined>(undefined);

  readonly selectedFilters$: Observable<string[]> = this.selectedFilter.asObservable()
    .pipe(
      scan((acc, selected) => {
        if(!selected) {
          return acc;
        }

        if(selected.isSelected) {
          return acc.filter((filter) => filter !== selected.value);
        }

        return [
          ...acc,
          selected.value
        ];
      }, [])
    );

  readonly productTypeFilters$ = this.productTypeFilters.asObservable()
    .pipe(
      combineLatestWith(this.selectedFilters$),
      map(([filters, selected]) => {
        if(!selected.length){
          return filters;
        }

        return filters.map((filter) => {
          return {
            value: filter.value,
            isSelected: selected.some((selected) =>
              selected === filter.value),
          }
        });
      })
    );

  constructor(
    private productApiService: ProductApiService,
    ) {
      this.productApiService.getProductTypeFilters()
        .pipe(
          map((productTypeFilters) => productTypeFilters.reduce((acc, filter) => {
            return [
              ...acc,
              {
                value: filter,
                isSelected: false,
              }
            ];
          }, []))
        )
        .subscribe((productTypeFilters) => {
          this.productTypeFilters.next(productTypeFilters);
        });
  }

  changeFilterSelection(filter: SelectData){
    this.selectedFilter.next(filter);
  }
}
