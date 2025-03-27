import { useState } from 'react';
import { fetchMovies } from "../../../lib/fetchMovies";

type Movie = {
    id: number;
    name: string;
}

type Props = {
    movies: Movie[]
}

export async function getStaticProps() {
    try {
        const movies = await fetchMovies();

        return {
            props: { movies },
            revalidate: 3600, // 3600 секунд
        };
    } catch (error) {
        console.error(error);
        return { props: { movies: [] } };
    }
}

const ITEMS_PER_PAGE = 10; // Количество фильмов на странице

export default function Catalogue({ movies }: Props) {
    const [currentPage, setCurrentPage] = useState(1);

    // Вычисляем индексы для отображаемых фильмов
    const indexOfLastMovie = currentPage * ITEMS_PER_PAGE;
    const indexOfFirstMovie = indexOfLastMovie - ITEMS_PER_PAGE;
    const currentMovies = movies.slice(indexOfFirstMovie, indexOfLastMovie);

    // Функции для переключения страниц
    const nextPage = () => {
        if (currentPage < Math.ceil(movies.length / ITEMS_PER_PAGE)) {
            setCurrentPage(currentPage + 1);
        }
    };

    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <div className="container mt-4">
            <h1 className="mb-3">Список фильмов</h1>
            <ul className="list-group">
                {currentMovies.map((movie: Movie) => (
                    <li key={movie.id} className="list-group-item">
                        {movie.name || "Без названия"}
                    </li>
                ))}
            </ul>
            <div className="mt-3">
                <button
                    onClick={prevPage}
                    disabled={currentPage === 1}
                    className="btn btn-primary me-2"
                >
                    Назад
                </button>
                <button
                    onClick={nextPage}
                    disabled={currentPage === Math.ceil(movies.length / ITEMS_PER_PAGE)}
                    className="btn btn-primary"
                >
                    Вперед
                </button>
            </div>
            <div className="mt-2">
                Страница {currentPage} из {Math.ceil(movies.length / ITEMS_PER_PAGE)}
            </div>
        </div>
    );
}