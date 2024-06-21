'use client'

import { baseImgUrl } from "@/lib/constants";
import { Movie } from "@/lib/types";
import { useState } from "react";
import Modal from "./Modal";
import Image from "next/image";

const MovieCard = ({ movie }: { movie: Movie }) => {
    const [showModal, setShowModal]= useState(false)
    const openModal=()=> setShowModal(true)
    const closeModal=()=> setShowModal(false)

    return (
        <>
        
            <div className="movie-card " onClick={openModal}>
                <Image
                    src={
                        movie?.backdrop_path || movie?.poster_path
                            ? `${baseImgUrl}${movie?.backdrop_path || movie?.poster_path}`
                            : "/assets/no-image.png"
                    }
                    alt={movie.title || movie.name}
                    className="thumbnail"
                    loading="lazy"
                    title={movie.title || movie.name}
                    sizes="width:100vw"
                    fill
                    
                />
                
            </div>

            {showModal && <Modal movie={movie} closeModal= {closeModal}/>}
        </>
    );
};

export default MovieCard;
