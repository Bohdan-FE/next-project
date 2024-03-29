'use server'
const { API_KEY } = process.env

export const getTVById = async (id: string): Promise<TVShowDetails> => {
    const res = await fetch(`https://api.themoviedb.org/3/tv/${id}?api_key=${API_KEY}`);
    if (!res.ok) {
    throw new Error('Failed to fetch data')
    }
    return res.json()
}

