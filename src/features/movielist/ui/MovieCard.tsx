import React from 'react';
import { Movie } from '@/entities/movie/model/interfaces';
import Image from 'next/image';

interface MovieCardProps {
    movie: Movie;
    children?: React.ReactNode;
}

const MovieCard = ({ movie }: MovieCardProps) => {
    return (
        <div className="rounded shadow-md dark:bg-gray-800 dark:text-white hover-scale">
            <div className="relative h-96">
                <Image
                    src={movie.poster?.previewUrl || 'https://placebear.com/400/400'}
                    alt={movie.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 315px"
                    className="object-cover rounded-t"
                />
            </div>
            <div className='p-4'>
            <h3 className="text-xl font-normal mb-2">{movie.name}</h3>
            <p className="text-md text-gray-300">Рейтинг: {movie.rating.imdb}</p>
                <p className="text-md text-gray-300">Год: {movie.year}</p>
            </div>
        </div>
    );
};

export default MovieCard