'use client'
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { BsFillStarFill } from "react-icons/bs";



function MovieCard({ movie }: { movie: Movie }) {
    const [isImg, setIsImg] = useState(true)
    const router = useRouter()
    if (!isImg) return
    return (
        <li id={`${movie.id}`} className="rounded-2xl overflow-hidden shadow-md relative hover:scale-[1.02] transition-transform duration-250 cursor-pointer active:scale-[0.97]" onClick={() => router.push(`/${movie.id}`)}>
            <Image src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} width={500} height={750} alt={movie.title} onError={() => setIsImg(false)} />
            <div className="bg-gradient-black absolute h-[50%] w-full bottom-0 px-4 pb-4 flex flex-col-reverse">
                <p className="text-sm">{movie.release_date.slice(0, 4)}</p>
                <p className="text-md font-bold mb-1">{movie.title}</p>
            </div>
            <div className="absolute top-3 right-3 ml-auto flex items-center gap-1 py-1 px-2 rounded-xl bg-[rgba(46,45,45,0.7)]">
                <BsFillStarFill className="fill-yellow-500 block" /><p>{movie.vote_average.toFixed(1)}</p>
            </div>
        </li>
    );
}

export default MovieCard;