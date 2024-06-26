import { getFavouriteMovies } from "../lib/getFavoriteMovies";
import { getServerSession } from "next-auth";
import { authOptions } from "../lib/auth";
import { getFavouriteTVs } from "../lib/getFavoriteTVs";
import PickFavourite from "../UI/components/PickFavourite/pickFavourite";

export default async function Page() {
    const session = await getServerSession(authOptions)
    const [movies, tvs] = await Promise.all([getFavouriteMovies(Number(session?.user.id)), getFavouriteTVs(Number(session?.user.id))])
    const favouriteMovies = movies?.map(item => ({ ...item, id: item.movieId })).reverse()
    const favouriteTVs = tvs?.map(item => ({ ...item, id: item.tvId })).reverse()

    if (favouriteMovies.length === 0 && favouriteTVs.length === 0) {
        return <div className="max-w-7xl mx-auto p-4"><div className="flex items-center h-[70vh] justify-center"><p className='text-3xl text-neutral-400'>No favorite movies/tvs yet</p></div></div>
    }

    return (
        <div className="max-w-7xl mx-auto p-4">
            <PickFavourite favouriteMovies={favouriteMovies} favouriteTVs={favouriteTVs} userId={session?.user.id} />
        </div>

    )
}

