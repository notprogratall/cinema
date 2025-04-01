import { MovieListProvider } from '@/features/movielist/model/context';
import { MovieList } from '@/features/movielist/ui/MovieList';

export default function Home() {
  return (
    <>
      <MovieListProvider>
        <MovieList />
      </MovieListProvider>
    </>
  );
}
