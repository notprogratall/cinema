import { GenreFilterProps } from '../../model/interfaces';


export const GenreChip = ({ genres, selectedGenres, onToggleGenre, disabled = false }: GenreFilterProps) => {

    const isSelected = (genre: string) =>
        selectedGenres.some(selected => selected.includes(genre));

    return (
        <div className="space-y-2">
            <div className="flex flex-wrap gap-2">
                {genres.map(genre => (
                    <button
                        key={genre}
                        onClick={() => onToggleGenre(genre)}
                        className={`px-4 py-2 rounded-full text-sm text-white ${isSelected(genre)
                                ? 'bg-neutral-800'
                                : 'bg-neutral-600 hover:bg-neutral-700'
                            } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                        disabled={disabled}
                    >
                        {genre}
                    </button>
                ))}
            </div>
        </div>
    );
};