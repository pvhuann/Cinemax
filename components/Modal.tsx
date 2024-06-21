
'use client'
import { Genre, Movie, Video } from '@/lib/types'
import { AddCircle, CancelRounded } from '@mui/icons-material'
import { useEffect, useRef, useState } from 'react'
interface Props {
    movie: Movie
    closeModal: () => void
}
const Modal = ({ movie, closeModal }: Props) => {

    const [video, setVideo] = useState("")
    const [genres, setGenres] = useState<Genre[]>([])

    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_ACCESS_TOKEN}`
        }
    };

    const getMovieDetails = async () => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/movie/${movie.id}?append_to_response=videos`, options)
            const data = await res.json()
            // console.log("movie details", data)

            if (data?.videos) {
                const index = data.videos.results.findIndex((video: Video) => video.type === "Trailer")
                // const video= data.videos.results[index]
                setVideo(data.videos.results[index].key)
            }

            if (data?.genres) {
                setGenres(data?.genres)
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => { getMovieDetails() }, [movie])

    const handleMyList = () => { }

    // close modal when user clicks outside modal
    const containerRef = useRef(null);
    useEffect(() => {
        const handleClickOutside = (event: { target: any }) => {
            const isClickedInsideContainer = containerRef.current?.contains(event.target);
            if (!isClickedInsideContainer) {
                // Handle click outside the container here
                // console.log("Clicked outside the container!");
                closeModal()
            }
        };
        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside); // Clean up on component unmount
    }, [containerRef]); // Pass containerRef as a dependency


    return (
        <div className='modal' ref={containerRef}>
            <button className='modal-close' onClick={closeModal}>
                <CancelRounded sx={{ color: 'white', fontSize: '35px', ":hover": { color: 'red' } }} />
            </button>
            <iframe src={`https://www.youtube.com/embed/${video}?autoplay=1&mute=1&loop=1`}
                className='modal-video'
                allowFullScreen
                loading='lazy' />

            {/* content */}
            <div className='modal-content'>
                <div className="flex justify-between">
                    <div className='flex gap-2'>
                        <p className='text-base-bold'>Name:</p>
                        <p className='text-base-light'>{movie?.title || movie?.name}</p>
                    </div>
                    <div className='flex gap-3'>
                        <p className='text-base-bold'>Add to list</p>
                        <AddCircle className='cursor-pointer text-pink-1' onClick={handleMyList} />
                    </div>
                </div>
                <p>{movie?.overview}</p>
                <div className='flex gap-2'>
                    <p className="text-base-bold">Rating</p>
                    <p>{movie?.vote_average}</p>
                </div>
                
                <div className="flex gap-2">
                    <p className='text-base-bold'>Genres</p>
                    <p>{genres?.map((genre) => genre.name).join(",")}</p>
                </div>
            </div>
        </div>
    )
}

export default Modal