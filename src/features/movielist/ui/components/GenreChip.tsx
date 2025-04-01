interface GenreFilterProps {
    genres: string[];
    selectedGenres: string[];
    onToggleGenre: (genre: string) => void;
}

const GenreChip = ({ genres, selectedGenres, onToggleGenre }: GenreFilterProps) => {
    return (
        <div className="space-y-2">
            <span className="block mb-2 font-medium">Жанры</span>
            <div className="flex flex-wrap gap-2">
                {genres.map(genre => (
                    <button
                        key={genre}
                        onClick={() => onToggleGenre(genre)}
                        className={`px-4 py-2 rounded-full text-sm text-white ${
                            selectedGenres.includes(genre)
                                ? 'bg-neutral-800'
                                : 'bg-neutral-600 hover:bg-neutral-700'
                        }`}
                    >
                        {genre}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default GenreChip; 