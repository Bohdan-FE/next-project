import Image from "next/image";
import { FiHeart } from "react-icons/fi";
import { BsFillStarFill } from "react-icons/bs";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";


async function MovieCard({ movie }: { movie: Movie }) {
    const session = await getServerSession(authOptions)
    return (
        <li className="rounded-2xl overflow-hidden shadow-md relative hover:scale-[1.02] transition-transform duration-250 cursor-pointer active:scale-[0.97]">
            <Image src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} width={500} height={750} alt={movie.title} />
            <div className="bg-gradient-black absolute h-[50%] w-full bottom-0 px-4 pb-4 flex flex-col-reverse">
                <p className="text-s">{movie.release_date.slice(0, 4)}</p>
                <p className="text-lg font-bold whitespace-nowrap truncate  mb-1">{movie.title}</p>
            </div>
            <div className="absolute bottom-4 right-4 ml-auto flex items-center gap-1 py-1 px-2 rounded-xl bg-[rgba(46,45,45,0.7)]">
                <BsFillStarFill className="fill-yellow-500 block" /><p>{movie.vote_average.toFixed(1)}</p>
            </div>
            {session && <button className="absolute top-4 right-4 p-2 bg-[rgba(0,0,0,0.5)] rounded-full" type="button"><FiHeart className="w-[1.2rem] h-[1.2rem]" /></button>}
        </li>
    );
}

export default MovieCard;