import { searchFieldValues } from '../api/movieService';

interface Item {
    name: string;
    slug?: string;
}


export const getCountries = async (): Promise<string[]> => {
    if (typeof window !== 'undefined') {
        const cached = localStorage.getItem('countries');
        if (cached) return JSON.parse(cached);
    }

    const data = await searchFieldValues("countries.name").catch(() => []) as Item[];
    const countries = data.map((item: Item) => item.name);

    if (typeof window !== 'undefined') {
        localStorage.setItem('countries', JSON.stringify(countries));
    }

    return countries;
};

export const getGenres = async (): Promise<Record<string, string>> => {
    if (typeof window !== 'undefined') {
        const cached = localStorage.getItem('genres');
        if (cached) return JSON.parse(cached);
    }

    const data = await searchFieldValues("genres.name").catch(() => []) as Item[];
    const genres = data.reduce((acc: Record<string, string>, genre: Item) => {
        acc[genre.name] = `+${genre.name}`;
        return acc;
    }, {});

    if (typeof window !== 'undefined') {
        localStorage.setItem('genres', JSON.stringify(genres));
    }

    return genres;
};


export const getFormatTypes = async (): Promise<Record<string, string>> => {
    if (typeof window !== 'undefined') {
        const cached = localStorage.getItem('types');
        if (cached) return JSON.parse(cached);
    }

    const data = await searchFieldValues("type").catch(() => []) as Item[];
    const types = data.reduce((acc: Record<string, string>, type: Item) => {
        acc[type.name] = `${type.name}`;
        return acc;
    }, {});

    if (typeof window !== 'undefined') {
        localStorage.setItem('types', JSON.stringify(types));
    }

    return types;
};


