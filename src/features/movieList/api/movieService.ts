import {
  Movie,
  movieApi,
  FilterParams,
  PaginationParams,
  MovieApiParams,
  SortParams,
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
   * Сортировка фильмов
   */
  async sortMovies(sort: SortParams, params?: Omit<MovieApiParams, 'sort'>): Promise<Movie[]> {
    return movieApi.getAll({
      ...params,
      sort
    }).then(data => data.docs);
  }

  /**
   * Поиск фильмов по названию
   */
  async searchMovies(query: string, params?: Omit<MovieApiParams, 'filter'>): Promise<{ docs: Movie[], pages: number }> {
    return movieApi.search(query, params);
  }

  /**
 * Поиск значений поля 
 */
  async searchFieldValues(field: string): Promise<string[]> {
    return movieApi.getPossibleValues(field);
  }
}

// Экспорт экземпляра сервиса
export const movieService = new MovieService();

// Экспорт вспомогательных функций
export const fetchMovies = (params?: MovieApiParams) => movieService.fetchMovies(params);
export const fetchMovieById = (id: number) => movieService.fetchMovieById(id);
export const sortMovies = (sort: SortParams, params?: Omit<MovieApiParams, 'sort'>) => movieService.sortMovies(sort, params);
export const searchMovies = (query: string, params?: Omit<MovieApiParams, 'filter'>) => movieService.searchMovies(query, params);
export const searchFieldValues = (field: string) => movieService.searchFieldValues(field);

// Экспорт типов
export type {
  Movie,
  FilterParams,
  PaginationParams,
  MovieApiParams,
  SortParams
}; 