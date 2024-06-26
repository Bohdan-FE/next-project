

const { API_KEY } = process.env

export const getTVReviews = async (id: string): Promise<Review> => {
    const resp = await fetch(`https://api.themoviedb.org/3/tv/${id}/reviews?api_key=${API_KEY}`);
    if (!resp.ok) {
    throw new Error('Failed to fetch data')
    }
    return resp.json()
}