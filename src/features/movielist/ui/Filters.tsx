import { useState, useRef, useEffect } from 'react';
import { SearchInput, SortSelect, CountrySelect, YearInput, TypeFilter, GenreChip } from './components';
import { useMovieList } from '../model/context';

const Filters = () => {
    const { setSortType, getByName, setCountryName } = useMovieList();



    const [isFiltersOpen, setIsFiltersOpen] = useState(false);
    const [selectedType, setSelectedType] = useState<string[]>([]);
    const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
    const [selectedCountry, setSelectedCountry] = useState<string>('');
    const [releaseYear, setReleaseYear] = useState<string>('');
    const [searchQuery, setSearchQuery] = useState<string>('');

    const delayTimerRef = useRef<NodeJS.Timeout | null>(null);

    const countries: string[] = ['США', 'Россия', 'Великобритания', 'Франция', 'Германия'];
    const genres: string[] = ['Драма', 'Комедия', 'Боевик', 'Фантастика', 'Ужасы', 'Детектив'];

    const isSearchActive = searchQuery.length > 0;

    // Очистка таймера при размонтировании
    useEffect(() => {
        return () => {
            if (delayTimerRef.current) {
                clearTimeout(delayTimerRef.current);
            }
        };
    }, []);

    const resetFilters = () => {
        setSelectedType([]);
        setSelectedGenres([]);
        setSelectedCountry('');
        setReleaseYear('');
        setSortType(null, null);
    };

    const toggleGenre = (genre: string): void => {
        if (isSearchActive) return;
        setSelectedGenres(prev =>
            prev.includes(genre)
                ? prev.filter(g => g !== genre)
                : [...prev, genre]
        );
    };

    const toggleType = (type: 'movie' | 'series'): void => {
        if (isSearchActive) return;
        setSelectedType(prev =>
            prev.includes(type)
                ? prev.filter(t => t !== type)
                : [...prev, type]
        );
    };

    const handleSortChange = (field: 'year' | 'rating.imdb' | null, type: '1' | '-1' | null) => {
        if (isSearchActive) return;
        setSortType(field, type);
    };

    const handleCountrySelection = (country: string) => {
        if (isSearchActive) return;
        setSelectedCountry(country);
        if (delayTimerRef.current) {
            clearTimeout(delayTimerRef.current);
        }
        delayTimerRef.current = setTimeout(() => {
            setCountryName(country)
        }, 700);
    };

    const handleSearchChange = (query: string) => {
        setSearchQuery(query);
        if (query.length > 0) {
            resetFilters();
        }

        if (delayTimerRef.current) {
            clearTimeout(delayTimerRef.current);
        }
        delayTimerRef.current = setTimeout(() => {
            getByName(query);
        }, 700);
    };


    return (
        <div className="p-4 mb-6">
            <div className="flex flex-wrap gap-4 mb-4">
                <SearchInput
                    value={searchQuery}
                    onSearchChange={handleSearchChange}
                />
                <SortSelect
                    onSortChange={handleSortChange}
                    disabled={isSearchActive}
                />
            </div>

            <div className="w-full my-3 p-3 font-medium shadow-md rounded-lg">
                <button
                    onClick={() => setIsFiltersOpen(!isFiltersOpen)}
                    className="w-full font-medium mb-4 h-4"
                >
                    {isFiltersOpen ? 'Скрыть фильтры' : 'Показать дополнительные фильтры'}
                </button>

                {isFiltersOpen && (
                    <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <CountrySelect
                                value={selectedCountry}
                                onChange={handleCountrySelection}
                                countries={countries}
                                disabled={isSearchActive}
                            />
                            <YearInput
                                value={releaseYear}
                                onChange={setReleaseYear}
                                disabled={isSearchActive}
                            />
                        </div>

                        <TypeFilter
                            selectedTypes={selectedType}
                            onToggleType={toggleType}
                            disabled={isSearchActive}
                        />

                        <GenreChip
                            genres={genres}
                            selectedGenres={selectedGenres}
                            onToggleGenre={toggleGenre}
                            disabled={isSearchActive}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default Filters;