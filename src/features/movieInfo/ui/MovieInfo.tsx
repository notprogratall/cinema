import { Movie, fetchMovieById } from '../api/movieService';

type Props = {
    params: {
        id: number
    };
};


export const revalidate = 60
export const dynamicParams = true


// // Функция, которая сообщает Next.js, какие страницы нужно создать
// export async function generateStaticParams() {
//     const res = await fetch('https://api.vercel.app/blog');

//     const movies: Movie[] = await res.json();

//     return movies.map((movie) => ({
//         id: movie.id,
//     }))
// }


export default async function PostPage({ params }: Props) {
    const { id } = await params;
    const movie = await fetchMovieById(id);

    return (
        <>
            <div
                className='flex flex-col'
            >
                <div key={movie.id}>
                    <p>{movie.poster.previewUrl}</p>
                    <p>{movie.name}</p>
                    <p>{movie.description}</p>
                </div>
            </div>
        </>
    );
};

// https://nextjs.org/docs/app/building-your-application/data-fetching/incremental-static-regeneration
