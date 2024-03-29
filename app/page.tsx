import { getServerSession } from "next-auth"
import MovieCard from "./UI/components/MovieCard/MovieCard"
import Pagination from "./UI/components/Pagination/Pagination"
import { getMovies } from "./lib/getMovies"
import { authOptions } from "./lib/auth"
import { getFavouriteMovies } from "./lib/getFavoriteMovies"
import FilterMovie from "./UI/components/Filter/FilterMovie"
import MovieList from "./UI/components/MovieList/MovieList"

export default async function Home({ searchParams }: { searchParams: { page: string, genre: string, sortby: string, year: string } }) {
  const session = await getServerSession(authOptions)
  const moviesData = await getMovies(searchParams.page, searchParams.genre, searchParams.sortby, searchParams.year)

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h2 className="text-4xl mb-10">Trending Movies</h2>
      <FilterMovie />
      <MovieList movies={moviesData} />
    </div>
  )
}
