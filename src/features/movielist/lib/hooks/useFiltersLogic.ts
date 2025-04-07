import { useState, useMemo } from 'react';
import { useMovieList } from '../../model/context';
import { useFiltersCache } from './useFiltersCache'; // адаптируй путь
import { useDebounce } from './useDebounce';

interface Filters {
    selectedFormatTypes: string[];
    selectedGenres: string[];
    selectedCountry: string;
    releaseYear: string;
    searchQuery: string;
}

export const useFiltersLogic = () => {
    const {
        setSortType,
        getByName,
        setCountryName,
        setYear,
        setGenresName,
        setFormatTypesName
    } = useMovieList();

    const { countries, genres, formatTypes} = useFiltersCache();

    const [filters, setFilters] = useState<Filters>({
        selectedFormatTypes: [],
        selectedGenres: [],
        selectedCountry: '',
        releaseYear: '',
        searchQuery: ''
    });

    const isSearchActive = filters.searchQuery.length > 0;

    const updateFilter = <K extends keyof Filters>(key: K, value: Filters[K]) => {
        setFilters(prev => ({ ...prev, [key]: value }));
    };

    const toggleInArray = (arr: string[], value: string) =>
        arr.includes(value) ? arr.filter(v => v !== value) : [...arr, value];

    const resetFiltersExceptSearch = () => {
        setFilters(({ searchQuery }) => ({
            searchQuery,
            selectedFormatTypes: [],
            selectedGenres: [],
            selectedCountry: '',
            releaseYear: ''
        }));
        setSortType(null, null);
    };

    const handleSearchChange = (query: string) => {
        updateFilter('searchQuery', query);
        if (query.length > 0) {
            resetFiltersExceptSearch();
        }
    };

    const handleSortChange = (field: 'year' | 'rating.imdb' | null, type: '1' | '-1' | null) => {
        if (!isSearchActive) {
            setSortType(field, type);
        }
    };

    const handleCountrySelection = (country: string) => {
        if (!isSearchActive) {
            updateFilter('selectedCountry', country);
        }
    };

    const handleYearChange = (year: string) => {
        if (!isSearchActive) {
            updateFilter('releaseYear', year);
        }
    };

    const handleToggleFormatType = (formatType: string) => {
        if (!isSearchActive) {
            updateFilter('selectedFormatTypes', toggleInArray(filters.selectedFormatTypes, formatType));
        }
    };

    const handleGenresChange = (genreName: string) => {
        if (!isSearchActive) {
            updateFilter('selectedGenres', toggleInArray(filters.selectedGenres, genreName));
        }
    };

    const genreIds = useMemo(() =>
        filters.selectedGenres.map(name => genres[name]).filter(Boolean),
        [filters.selectedGenres, genres]
    );

    const formatTypeNames = useMemo(() =>
        filters.selectedFormatTypes.map(name => formatTypes[name]).filter(Boolean),
        [filters.selectedFormatTypes, formatTypes]
    );

    useDebounce(
        [
            () => {
                if (filters.searchQuery) getByName(filters.searchQuery);
            },
            () => {
                if (filters.selectedCountry) setCountryName(filters.selectedCountry);
            },
            () => {
                if (filters.releaseYear) setYear(filters.releaseYear);
            },
            () => {
                setGenresName(genreIds);
            },
            () => {
                setFormatTypesName(formatTypeNames);
            }
        ],
        700,
        [
            filters.searchQuery,
            filters.selectedCountry,
            filters.releaseYear,
            filters.selectedGenres,
            filters.selectedFormatTypes
        ]
    );

    return {
        filters,
        countries,
        genres,
        formatTypes,
        isSearchActive,
        handleSearchChange,
        handleSortChange,
        handleCountrySelection,
        handleYearChange,
        handleToggleFormatType,
        handleGenresChange
    };
};
