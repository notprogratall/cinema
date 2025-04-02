export interface Movie {
  id: number;
  name: string;
  description: string;
  poster: {
    previewUrl: string;
    url: string;
  };
  rating: {
    imdb: number;
  };
  year: number;
} 

export interface MovieQueryParams {
    page?: number;
    limit?: number;
} 

// Интерфейсы для API Кинопоиска
export interface FilterParams {
  year?: number;
  genres?: string[];
  countries?: string[];
}

export interface PaginationParams {
  page: number;
  limit: number;
  totalPages?: number;
}

export interface SortParams {
  field: string;
  type: '1' | '-1' | null;
}

export interface MovieApiParams {
  sort?: SortParams;
  filter?: FilterParams;
  pagination?: PaginationParams;
}

export interface QueryParams extends Record<string, unknown> {
  selectFields: string[];
  notNullFields: string[];
  page?: number;
  limit?: number;
  sortField?: string;
  sortType?: '1' | '-1';
  year?: number;
  'genres.name'?: string[];
  'countries.name'?: string[];
}