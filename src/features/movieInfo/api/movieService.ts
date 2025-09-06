import {
    Movie,
    movieApi,
    MovieApiParams,

} from '@/entities/movie';


class MovieService {

    /**
     * Получить фильм по ID
     */
    async fetchMovieById(id: number): Promise<Movie> {
        return movieApi.getById(id);
    }
}

export const movieService = new MovieService();
// Экспорт вспомогательных функций
export const fetchMovieById = (id: number) => movieService.fetchMovieById(id);


// Экспорт типов
export type {
  Movie,
  MovieApiParams,
}; 