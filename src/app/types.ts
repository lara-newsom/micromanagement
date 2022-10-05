export interface Sort<T> {
  direction?: string;
  active: keyof T;
}

export interface ProductGroup {
	groupId?: string;
	groupName?: string;
	type?: string;
}

export enum ColumnNames {
	HOSTNAME = 'hostname',
	DESCRIPTION = 'description',
	PRODUCT_ID = 'productid',
	CONTRACT_NUMBER = 'contractnumber',
}

export type SortableColumn = 'hostname';

export interface SearchResultsData {
	contractNumber?: string;
	contractOwner?: string;
	description?: string;
	productId?: string;
	serialNumber?: string;
	slaDescription?: string;
	solutionIds?: string;
}

export interface PaginationData {
	page?: number;
	pages?: number;
	rows?: number;
	total?: number;
}

export interface SearchResponseData {
	Pagination?: PaginationData;
	data?: SearchResultsData;
}

export interface SearchCategory {
	displayLongName?: string;
	displayShortName?: string;
}

export interface SearchResponseResults {
	search?: string;
	data?: Product[];
	category?: SearchCategory;
	error?: {
		status?: number;
	};
}

export interface SelectData {
	value: string;
	isSelected: boolean;
}

export interface ProductGroup {
  name: string;
  products: string[];
  id?: string;
}

export interface Product {
	isSelected?: boolean;
	productId: string;
  productType: string;
  origin: string;
  name?: string;
  description?: string;
  price: number;
}

export interface GetCatByUserParams {
  sortBy?: keyof Cat;
  sortOrder?: string;
  userId?: string;
}

export class Cat {
  name: string;
  age: number;
  color: string;
  sex: string;
  userId?: string;
}
