'use client'

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { MdOutlineRadioButtonChecked } from "react-icons/md";
import { MdRadioButtonUnchecked } from "react-icons/md";
import SearchMovieCard from "../SearchMovieCard/SearchMovieCard";
import SearchTVCard from "../SearchTVCard/SearchTVCard";

export default function SearchBar() {
    const pathname = usePathname()
    const [query, setQuery] = useState('')
    const [isMovieChecked, setIsMovieChecked] = useState(true)
    const [movies, setMovies] = useState<null | MoviesData | TVData>(null)
    const [focus, setFocus] = useState(false)
    const [mouse, setMouse] = useState(false)
    const router = useRouter()

    console.log(movies)
    useEffect(() => {
        setIsMovieChecked(!pathname.includes('/tv'))
    }, [pathname])

    useEffect(() => {
        if (!mouse && !focus) setMovies(null)
    }, [focus, mouse])

    useEffect(() => {
        if (query.length < 2) {
            setMovies(null)
            return
        }
        const getMovies = async (query: string) => {
            try {
                const response = await fetch(`https://api.themoviedb.org/3/search/${isMovieChecked ? 'movie' : 'tv'}?query=${query}&api_key=9efc729b95f20ce1b26304465f4ffb42`)
                const moviesData: MoviesData = await response.json()
                setMovies(moviesData)
            } catch (error) {
                setMovies(null)
                console.log(error, 'error')
            }
        }
        getMovies(query)
    }, [query, isMovieChecked])

    const handleMouseToggle = useCallback((isMouseOver: boolean) => {
        setMouse(isMouseOver);
    }, []);

    const handlerSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault()
        setMovies(null)
        if (!query) return
        if (isMovieChecked) {
            router.push(`/moviesearch?query=${query}`)
            return
        }
        router.push(`/tvsearch?query=${query}`)
        setQuery('')
    }

    const handlerOnClick = (id: string) => {
        setMovies(null)
        setQuery('')
        if (isMovieChecked) router.push(`/movies/${id}`)
        if (!isMovieChecked) router.push(`/tv/${id}`)
    }

    return (
        <div className="relative max-w-[450px] w-full min-w-[180px]">
            <form className="flex gap-1 items-center" onSubmit={handlerSubmit}>
                <div className="relative text-[16px] w-full">
                    <input className="w-full bg-transparent border-2 border-neutral-400 rounded-full outline-none focus:border-neutral-300 appearance-none px-3 py-1 transition-all" value={query} onBlur={() => setFocus(false)} onFocus={() => setFocus(true)} type="text" onChange={(e) => setQuery(e.target.value)} />
                    <button className="absolute right-3 top-1/2 translate-y-[-50%] group text-xl"><IoIosSearch className="group-hover:fill-neutral-200 transition-colors" /></button>
                </div>
                <div className=" text-[16px] flex gap-0 flex-col">
                    <div className="flex items-center gap-1">
                        <label className="cursor-pointer" htmlFor="movies">{isMovieChecked ? <MdOutlineRadioButtonChecked /> : <MdRadioButtonUnchecked />}</label>
                        <input type="radio" name="search" id="movies" hidden checked={isMovieChecked} onChange={() => setIsMovieChecked(true)} />
                        <label className="cursor-pointer leading-5" htmlFor="movies">Movie</label>
                    </div>
                    <div className="flex items-center gap-1">
                        <label className="cursor-pointer" htmlFor="tvs">{!isMovieChecked ? <MdOutlineRadioButtonChecked /> : <MdRadioButtonUnchecked />}</label>
                        <input type="radio" name="search" id="tvs" checked={!isMovieChecked} hidden onChange={() => setIsMovieChecked(false)} />
                        <label className="cursor-pointer leading-5" htmlFor="tvs" >TV</label>
                    </div>
                </div>
            </form>
            {movies && <ul className="absolute top-[120%] w-full bg-neutral-800 z-[99] rounded-md p-2" onMouseLeave={() => handleMouseToggle(false)} onMouseEnter={() => handleMouseToggle(true)}>
                {isMovieChecked && movies.results.slice(0, 5).map(movie => <SearchMovieCard key={movie.id} movie={movie} handlerOnClick={handlerOnClick} />)}
                {!isMovieChecked && movies.results.slice(0, 5).map(movie => <SearchTVCard key={movie.id} tv={movie} handlerOnClick={handlerOnClick} />)}
            </ul>}
        </div>
    )
}

