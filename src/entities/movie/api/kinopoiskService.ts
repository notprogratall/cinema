import { Movie } from '../model/interfaces';
import { buildQueryString } from '@/shared/lib/buildQueryString';

// Интерфейс для параметров фильтрации
export interface FilterParams {
  year?: number;
  genres?: string[];
  countries?: string[];
}

// Интерфейс для pagination
export interface PaginationParams {
  page: number;
  limit: number;
  totalPages?: number;
}

// Интерфейс для сортировки
export interface SortParams {
  field: string;
  type: '1' | '-1' | null;
}

// Базовый интерфейс для параметров запроса
export interface MovieApiParams {
  sort?: SortParams;
  filter?: FilterParams;
  pagination?: PaginationParams;
}

// Интерфейс для параметров запроса к API
interface QueryParams extends Record<string, unknown> {
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

// Класс для работы с API фильмов
export class MovieApi {
  private baseUrl: string;
  private apiKey: string;
  private defaultSelectFields: string[];
  private defaultNotNullFields: string[];

  constructor() {
    this.baseUrl = "https://api.kinopoisk.dev/v1.4/movie";
    this.apiKey = process.env.NEXT_PUBLIC_KINOPOISK_API_KEY || "";
    
    // Проверка наличия API-токена
    if (!this.apiKey) {
      throw new Error("API-токен Кинопоиска не найден. Убедитесь, что он указан в .env.local как NEXT_PUBLIC_KINOPOISK_API_KEY");
    }
    
    this.defaultSelectFields = [
      "id", "name", "enName", "description", 
      "shortDescription", "year", "rating", "poster"
    ];

    this.defaultNotNullFields = [
      "id", "name", "description", "year", 
      "poster.url", "rating.imdb"
    ];
  }

  // Метод для получения всех фильмов с учётом параметров
  async getAll(params?: MovieApiParams): Promise<{ docs: Movie[], pages: number }> {
    
    const queryParams: QueryParams = {
      selectFields: this.defaultSelectFields,
      notNullFields: this.defaultNotNullFields,
    };
    
    if (params?.pagination) {
      queryParams.page = params.pagination.page;
      queryParams.limit = params.pagination.limit;
    }

    if (params?.sort?.field && params?.sort?.type) {
      queryParams.sortField = params.sort.field;
      queryParams.sortType = params.sort.type;
    }
    
    if (params?.filter?.year) {
      queryParams.year = params.filter.year;
    }
    
    if (params?.filter?.genres && params.filter.genres.length > 0) {
      queryParams['genres.name'] = params.filter.genres;
    }
    
    if (params?.filter?.countries && params.filter.countries.length > 0) {
      queryParams['countries.name'] = params.filter.countries;
    }
    
    // Формируем строку запроса
    const queryString = buildQueryString(queryParams);
    const url = `${this.baseUrl}?${queryString}`;
    
    // Отправляем запрос
    const response = await fetch(url, {
      headers: { "X-API-KEY": this.apiKey },
    });
    
    if (!response.ok) {
      throw new Error("Ошибка при получении данных");
    }
    
    const data = await response.json();
    return {
      docs: data.docs || [],
      pages: data.pages || 1
    };
  }
  
  // Метод для фильтрации фильмов
  async filter(filterParams: FilterParams, params?: Omit<MovieApiParams, 'filter'>): Promise<Movie[]> {
    return this.getAll({
      ...params,
      filter: filterParams
    }).then(data => data.docs);
  }
  
  // Метод для получения фильма по ID
  async getById(id: number): Promise<Movie> {
    
    const url = `${this.baseUrl}/${id}?${buildQueryString({
      selectFields: this.defaultSelectFields,
    })}`;
    
    const response = await fetch(url, {
      headers: { "X-API-KEY": this.apiKey },
    });
    
    if (!response.ok) {
      throw new Error("Ошибка при получении фильма");
    }
    
    return response.json();
  }

  // Метод для поиска фильмов по названию
  async search(query: string, params?: Omit<MovieApiParams, 'filter'>): Promise<{ docs: Movie[], pages: number }> {
    const searchUrl = `${this.baseUrl}/search?query=${encodeURIComponent(query)}`;
    const queryParams: QueryParams = {
      selectFields: this.defaultSelectFields,
      notNullFields: this.defaultNotNullFields,
    };
    
    if (params?.pagination) {
      queryParams.page = params.pagination.page;
      queryParams.limit = params.pagination.limit;
    }

    const queryString = buildQueryString(queryParams);
    const url = `${searchUrl}&${queryString}`;
    
    const response = await fetch(url, {
      headers: { "X-API-KEY": this.apiKey },
    });
    
    if (!response.ok) {
      throw new Error("Ошибка при поиске фильмов");
    }
    
    const data = await response.json();
    return {
      docs: data.docs || [],
      pages: data.pages || 1
    };
  }
}

// Экспортируем экземпляр API для использования в приложении
export const movieApi = new MovieApi(); 