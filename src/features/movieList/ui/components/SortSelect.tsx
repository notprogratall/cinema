import { SortProps, SortSelectProps } from '../../model/interfaces';

const sortOptions: SortProps[] = [
    { label: 'Без сортировки', value: '', field: null, type: null },
    { label: 'Рейтинг по возрастанию', value: 'rating_asc', field: 'rating.imdb', type: '1' },
    { label: 'Рейтинг по убыванию', value: 'rating_desc', field: 'rating.imdb', type: '-1' },
    { label: 'Год выпуска по возрастанию', value: 'year_asc', field: 'year', type: '1' },
    { label: 'Год выпуска по убыванию', value: 'year_desc', field: 'year', type: '-1' },
];

export const SortSelect = ({ onSortChange, disabled = false }: SortSelectProps) => {
    const handleSortTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedOption = sortOptions.find(option => option.value === e.target.value);
        if (selectedOption) {
            onSortChange(selectedOption.field, selectedOption.type);
        }
    };

    return (
        <select
            onChange={handleSortTypeChange}
            className={`p-2 border rounded-md ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={disabled}
        >
            {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
    );
};