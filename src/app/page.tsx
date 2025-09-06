import { MovieListProvider } from '@/features/movieList/model/context';
import { MovieList } from '@/features/movieList/ui/MovieList';
import PostPage from './test_delete_later/server_side_rendering';
import { Post } from './test_delete_later/types';


export default async function Home() {
  //const posts = await getPosts();

  return (
    <>
      {/* <PostPage posts={posts} /> */}
       <MovieListProvider>
        <MovieList />
      </MovieListProvider>
    </>
  );


}



// async function getPosts(): Promise<Post[]> {
//   const res = await fetch('https://api.vercel.app/blog', {
//     cache: 'no-store', // SSR — no cache
//   });

//   if (!res.ok) {
//     throw new Error('Failed to fetch posts');
//   }

//   return res.json();
// }