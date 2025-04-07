import { MovieApiParams, QueryParams, Movie } from '../model';
import { buildQueryString } from '@/shared/lib/buildQueryString';

export class MovieApi {
  private readonly baseUrl = "https://api.kinopoisk.dev/v1.4/movie";
  private readonly v1Url = "https://api.kinopoisk.dev/v1/movie";
  private readonly apiKey = process.env.NEXT_PUBLIC_KINOPOISK_API_KEY || "";
  private readonly defaultSelectFields = [
    "id", "name", "enName", "description", "shortDescription", "year", "rating", "poster", "countries", "genres"
  ];
  private readonly defaultNotNullFields = [
    "id", "name", "description", "year", "poster.url", "rating.imdb"
  ];

  constructor() {
    if (!this.apiKey) {
      throw new Error("API-токен Кинопоиска не найден. Укажите его в .env.local как NEXT_PUBLIC_KINOPOISK_API_KEY");
    }
  }

  private async fetchApi(url: string): Promise<{ docs: Movie[]; pages: number }> {
    const response = await fetch(url, { headers: { "X-API-KEY": this.apiKey } });
    if (!response.ok) throw new Error("Ошибка при получении данных");
    const data = await response.json();
    return { docs: data.docs || [], pages: data.pages || 1 };
  }

  private buildQueryParams(params?: MovieApiParams): QueryParams {
    const queryParams: QueryParams = {
      selectFields: this.defaultSelectFields,
      notNullFields: this.defaultNotNullFields,
    };

    if (params?.pagination) {
      Object.assign(queryParams, params.pagination);
    }

    if (params?.sort?.field && params?.sort?.type) {
      queryParams.sortField = params.sort.field;
      queryParams.sortType = params.sort.type;
    }

    if (params?.filter) {
      if (params.filter.year) queryParams.year = params.filter.year;
      if (params.filter.genres?.length) queryParams["genres.name"] = params.filter.genres;
      if (params.filter.formatTypes?.length) queryParams["type"] = params.filter.formatTypes;
      if (params.filter.countries?.length) queryParams["countries.name"] = params.filter.countries;
    }

    return queryParams;
  }

  async getAll(params?: MovieApiParams): Promise<{ docs: Movie[]; pages: number }> {
    const queryString = buildQueryString(this.buildQueryParams(params));
    return this.fetchApi(`${this.baseUrl}?${queryString}`);
  }

  async search(query: string, params?: Omit<MovieApiParams, 'filter'>): Promise<{ docs: Movie[]; pages: number }> {
    const queryString = buildQueryString(this.buildQueryParams(params));
    return this.fetchApi(`${this.baseUrl}/search?query=${encodeURIComponent(query)}&${queryString}`);
  }

  async getById(id: number): Promise<Movie> {
    const queryString = buildQueryString({ selectFields: this.defaultSelectFields });
    return fetch(`${this.baseUrl}/${id}?${queryString}`, {
      headers: { "X-API-KEY": this.apiKey },
    }).then(response => {
      if (!response.ok) throw new Error("Ошибка при получении фильма");
      return response.json();
    });
  }

  async getPossibleValues(field: string): Promise<string[]> {
    const url = `${this.v1Url}/possible-values-by-field?field=${encodeURIComponent(field)}`;
    const response = await fetch(url, { headers: { "X-API-KEY": this.apiKey } });
    if (!response.ok) throw new Error("Ошибка при получении возможных значений");
    return response.json();
  }
}

export const movieApi = new MovieApi();