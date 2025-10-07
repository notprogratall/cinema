import { useState, useEffect } from "react";
import { getCountries, getGenres, getFormatTypes } from '../filtersCache';


export const useFiltersCache = () => {
    const [countries, setCountries] = useState<string[]>([]);
    const [genres, setGenres] = useState<Record<string, string>>({});
    const [formatTypes, setFormatTypes] = useState<Record<string, string>>({});

    useEffect(() => {
        const load = async () => {
            try {
                setCountries(await getCountries());
                setGenres(await getGenres());
                setFormatTypes(await getFormatTypes());
            } catch (err) {
                console.error('Error loading filters data:', err);
            }
        };
        load();
    }, []);

    return { countries, genres, formatTypes };
};
