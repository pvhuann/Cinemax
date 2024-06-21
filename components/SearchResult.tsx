import { searchMovies } from '@/actions/movieData'
import { Movie } from '@/lib/types'
import MovieCard from './MovieCard'

const SearchResult = async ({ query }: { query: string }) => {
    let searchResultMovies: Movie[] = []
    searchResultMovies = await searchMovies(query)
    return searchResultMovies.length !== 0
        ? (
            <div className='search-page'>
                <h1 className='text-heading2-bold text-white'>Results for <u className='text-pink-1'>{query}</u></h1>
                <div className="list">
                    {
                        searchResultMovies.map((movie) => (
                            <MovieCard key={movie.id} movie={movie} />
                        ))
                    }
                </div>
            </div>
        )
        : (
            <div className="search-page">
                <h1 className='text-heading2-bold text-white'>No result found</h1>
            </div>
        )
}

export default SearchResult