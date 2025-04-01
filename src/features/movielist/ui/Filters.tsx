// Фильтрация по стране производства
// Фильтрация по году выпуска
// Только сериалы / Только фильмы
// Сортировка по рейтингу или году выпуска
// Фильтрация жанров
// Поиск по названию
import { useState } from 'react';
import SearchInput from './components/SearchInput';
import SortSelect from './components/SortSelect';
import CountrySelect from './components/CountrySelect';
import YearInput from './components/YearInput';
import TypeFilter from './components/TypeFilter';
import GenreChip from './components/GenreChip';
import { useMovieList } from '../model/context';


const Filters = () => {
    const { setSortType,  getByName} = useMovieList();
    const [isFiltersOpen, setIsFiltersOpen] = useState(false);
    const [selectedType, setSelectedType] = useState<string[]>([]);
    const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
    const [selectedCountry, setSelectedCountry] = useState<string>('');
    const [releaseYear, setReleaseYear] = useState<string>('');
    const [searchQuery, setSearchQuery] = useState<string>('');

    const countries: string[] = ['США', 'Россия', 'Великобритания', 'Франция', 'Германия'];
    const genres: string[] = ['Драма', 'Комедия', 'Боевик', 'Фантастика', 'Ужасы', 'Детектив'];

    const toggleGenre = (genre: string): void => {
        setSelectedGenres(prev =>
            prev.includes(genre)
                ? prev.filter(g => g !== genre)
                : [...prev, genre]
        );
    };

    const toggleType = (type: 'movie' | 'series'): void => {
        setSelectedType(prev =>
            prev.includes(type)
                ? prev.filter(t => t !== type)
                : [...prev, type]
        );
    };

    const handleSortChange = (field: 'year' | 'rating.imdb' | null, type: '1' | '-1' | null) => {
        setSortType(field, type);
    };

    const handleSearchChange = (query: string) => {
        setSearchQuery(query);
        clearTimeout((window as any).searchTimeout);
        (window as any).searchTimeout = setTimeout(() => {
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
                                onChange={setSelectedCountry}
                                countries={countries}
                            />
                            <YearInput
                                value={releaseYear}
                                onChange={setReleaseYear}
                            />
                        </div>

                        <TypeFilter
                            selectedTypes={selectedType}
                            onToggleType={toggleType}
                        />

                        <GenreChip
                            genres={genres}
                            selectedGenres={selectedGenres}
                            onToggleGenre={toggleGenre}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default Filters;