import { MovieApiParams, QueryParams, Movie } from '../model';
import { buildQueryString } from '@/shared/lib/buildQueryString';

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
    
    return this.getResponse(url)
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
    
    return this.getResponse(url)
  }

  async getResponse(url: string): Promise<{ docs: Movie[], pages: number }> {
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
}




// Экспортируем экземпляр API для использования в приложении
export const movieApi = new MovieApi(); 