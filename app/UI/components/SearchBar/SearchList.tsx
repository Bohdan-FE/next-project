import { memo } from "react"
import SearchMovieCard from "../SearchMovieCard/SearchMovieCard"
import SearchTVCard from "../SearchTVCard/SearchTVCard"
import { ImCross } from "react-icons/im"

export default memo(function SearchList({ movies, closeSearch, isMovieChecked, handlerOnClick, handleMouseToggle }: { movies: MoviesData | TVData, closeSearch: () => void, isMovieChecked: boolean, handlerOnClick: (id: string) => void, handleMouseToggle: (arg: boolean) => void }) {
    return (
        <ul className="absolute left-0 top-[100%] w-[100vw] bg-neutral-800 z-[99] rounded-md p-2 cardlisttab:top-[120%] cardlisttab:w-full" onMouseLeave={() => handleMouseToggle(false)} onMouseEnter={() => handleMouseToggle(true)}>
            {isMovieChecked && movies.results.slice(0, 5).map(movie => <SearchMovieCard key={movie.id} movie={movie} handlerOnClick={handlerOnClick} />)}
            {!isMovieChecked && movies.results.slice(0, 5).map(movie => <SearchTVCard key={movie.id} tv={movie} handlerOnClick={handlerOnClick} />)}
            <button className="rounded-full bg-[rgba(46,45,45,0.7)] p-2 cardlisttab:hidden absolute top-3 right-4 w-8 h-8 flex items-center justify-center" onClick={closeSearch}><ImCross className="text-neutral-400" /></button>
        </ul>
    )
})