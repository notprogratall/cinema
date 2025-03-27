import { MovieList } from '@/features/movielist/ui/MovieList';
import About from './test_delete_later/react';
import Generics from './test_delete_later/generics';
import { MovieListProvider } from '@/features/movielist/model/context';

export default function Home() {
  return (
    <>
    < Generics />
    <MovieListProvider>
      <MovieList />
      {/* <About/> */}
      </MovieListProvider>
    </>
  );
}
