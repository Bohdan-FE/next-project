
import StarRating from "../../UI/components/StarRating/StarRating";
import { convertToHoursAndMinutes } from "../../lib/convertToHoursAndMinutes";
import { IoMdTime } from "react-icons/io";
import { LuCalendarCheck2 } from "react-icons/lu";
import { AddToFavoriteMovie, RemoveFromFavoriteMovie } from "../../UI/components/buttons";
import Poster from "../../UI/components/Poster/Poster";
import SliderPart from "../../UI/components/SliderPart/SliderPart";
import { getMovieVideos } from "../../lib/getMovieVideos";
import { getMovieById } from "../../lib/getMovieById";
import Reviews from "../../UI/components/Reviews/Reviews";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";
import { getFavouriteMovieById } from "@/app/lib/getFavoriteMovieById";
import Link from "next/link";



async function Page({ params }: { params: { id: string } }) {
    const [movie, videos, session] = await Promise.all([getMovieById(params.id), getMovieVideos(params.id), getServerSession(authOptions)])
    let isFavouriteMovie = false
    if (session) {
        const favouriteMovie = await getFavouriteMovieById(Number(session.user.id), Number(params.id))
        if (favouriteMovie.length > 0) isFavouriteMovie = true
    }
    const backgroundImageStyle = {
        backgroundImage: `linear-gradient(0deg, rgba(23,23,23,1) 0%, rgba(0,0,0,0) 50%),
                        linear-gradient(90deg, rgba(0,0,0,0.8744747899159664) 0%, rgba(0,0,0,0) 50%, rgba(0,0,0,0.8744747899159664) 100%),
                        url("https://image.tmdb.org/t/p/original${movie.backdrop_path}") `,
        backgroundSize: 'cover',
        backgroundPosition: 'top',
        backgroundRepeat: 'no-repeat',
        width: '100%',
    };

    return (<>
        <div className='w-full mx-auto mb-5 relative' style={backgroundImageStyle}>
            <div className="max-w-7xl py-12 px-3 mx-auto">
                <div className="flex justify-between gap-12">
                    <Poster image={movie.poster_path} title={movie.title} videos={videos.results} />
                    <div className="max-w-2xl flex flex-col justify-evenly gap-4" >
                        <div>
                            <h1 className="text-7xl text-neutral-200 font-bold text-right block text-ellipsis">{movie.title}</h1>
                            <StarRating rating={movie.vote_average} />
                            <ul className="flex gap-2 justify-end text-lg mb-5 text-neutral-300">{movie.genres.map(genre => <Link href={`/?genre=${genre.id}`} className="after:content-['|'] last:after:content-[''] text-neutral-400 hover:text-neutral-300 cursor-pointer transition-colors hover:after:text-neutral-400" key={genre.id}>{genre.name + ' '}</Link>)}</ul>
                            <div className="flex items-center gap-2 text-xl justify-end mb-4">
                                <IoMdTime className="w-8 h-8" />
                                <p className="font-semibold">{convertToHoursAndMinutes(movie.runtime)}</p>
                            </div>
                            <div className="flex items-center gap-2 text-xl justify-end mb-4">
                                <LuCalendarCheck2 className="w-8 h-8" />
                                <p className="text-end text-xl text-neutral-300"><span className="font-semibold">{movie.release_date}</span></p>
                            </div>
                            <div data-te-perfect-scrollbar-init className="flex justify-end py-2 bg-[rgba(46,45,45,0.7)] rounded-lg px-4">
                                <p className="text-justify text-neutral-300 ">{movie.overview}</p>
                            </div>
                        </div>
                        <div className="flex justify-end">
                            {session && !isFavouriteMovie && <AddToFavoriteMovie movie={movie} userId={Number(session?.user.id)} type="btn" />}
                            {session && isFavouriteMovie && <RemoveFromFavoriteMovie movie={movie} userId={Number(session.user.id)} type="btn" />}
                        </div>
                    </div>
                </div>

            </div>
        </div>
        <SliderPart id={params.id} type="movie" />
        <Reviews id={params.id} />
    </>
    );
}

export default Page;



