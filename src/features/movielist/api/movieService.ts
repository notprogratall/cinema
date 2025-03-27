import { 
  Movie,
  movieApi,
  FilterParams,
  PaginationParams,
  MovieApiParams
} from '@/entities/movie';

/**
 * Сервис для работы с фильмами в UI компонентах
 * Использует movieApi из entities/movie/api
 */
class MovieService {
  /**
   * Получить все фильмы с учетом параметров
   */
  async fetchMovies(params?: MovieApiParams): Promise<{ docs: Movie[], pages: number }> {
    return movieApi.getAll(params);
  }

  /**
   * Получить фильм по ID
   */
  async fetchMovieById(id: number): Promise<Movie> {
    return movieApi.getById(id);
  }

  /**
   * Фильтрация фильмов
   */
  async filterMovies(filter: FilterParams, params?: Omit<MovieApiParams, 'filter'>): Promise<Movie[]> {
    return movieApi.filter(filter, params);
  }
}

// Экспорт экземпляра сервиса
export const movieService = new MovieService();

// Экспорт вспомогательных функций
export const fetchMovies = (params?: MovieApiParams) => movieService.fetchMovies(params);
export const fetchMovieById = (id: number) => movieService.fetchMovieById(id);
export const filterMovies = (filter: FilterParams, params?: Omit<MovieApiParams, 'filter'>) => movieService.filterMovies(filter, params);

// Экспорт типов
export type { 
  FilterParams,
  PaginationParams,
  MovieApiParams
}; 