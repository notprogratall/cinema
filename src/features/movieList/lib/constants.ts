export const FILTER_DEBOUNCE_TIME = 700

export const SORT_OPTIONS = [
    { value: 'year-1', label: 'По году ↑', field: 'year', order: '1' as const },
    { value: 'year--1', label: 'По году ↓', field: 'year', order: '-1' as const },
    { value: 'rating-1', label: 'По рейтингу ↑', field: 'rating.imdb', order: '1' as const },
    { value: 'rating--1', label: 'По рейтингу ↓', field: 'rating.imdb', order: '-1' as const }
]

export const DEFAULT_COUNTRIES = ['США', 'Россия', 'Великобритания', 'Франция', 'Германия'];

export const DEFAULT_GENRES = {
    драма: '+драма',
    комедия: '+комедия',
    боевик: '+боевик',
    фантастика: '+фантастика',
    ужасы: '+ужасы',
    детектив: '+детектив',
};

export const INITIAL_FILTERS = {
    types: [] as string[],
    genres: [] as string[],
    country: '',
    year: '',
    searchQuery: '',
};