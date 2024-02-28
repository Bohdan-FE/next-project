'use server'
const { API_KEY } = process.env

export const getTVVideos = async (id: string) => {
    const resp = await fetch(`https://api.themoviedb.org/3/tv/${id}/videos?api_key=${API_KEY}`);
    if (!resp.ok) {
    throw new Error('Failed to fetch data')
    }
    return resp.json()
}