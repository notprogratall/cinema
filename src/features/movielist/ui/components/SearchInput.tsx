import { SearchInputProps } from "../../model/interfaces"

export const SearchInput = ({ value, onSearchChange, disabled = false }: SearchInputProps) => {
    return (
        <input
            type="text"
            placeholder="Поиск по названию"
            className={`flex-3 p-2 border rounded-md ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
            value={value}
            onChange={(e) => onSearchChange(e.target.value)}
            disabled={disabled}
        />
    );
};