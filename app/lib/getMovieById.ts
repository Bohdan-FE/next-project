'use server'
const { API_KEY } = process.env

export const getMovieById = async (id: string): Promise<MovieDetailed> => {
    const res = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`);
    if (!res.ok) {
    throw new Error('Failed to fetch data')
    }
    return res.json()
}