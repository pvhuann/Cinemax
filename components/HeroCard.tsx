'use client'

import { baseImgUrl } from "@/lib/constants";
import { Movie } from "@/lib/types";
import { InfoOutlined, PlayCircleOutlineOutlined } from "@mui/icons-material";
import { useState } from "react";
import Modal from "./Modal";
import Image from "next/image";

const HeroCard = ({ movie }: { movie: Movie }) => {
  const [showModal, setShowModal] = useState(false)

  return (
    <div className="hero">
      <div className="hero-bg">
        <Image
          src={`${baseImgUrl}${movie?.backdrop_path || movie?.poster_path}`}
          alt="trending-movie"
          className="hero-bg-image"
          fill
          priority={true}
        />
        {/* <img src={`${baseImgUrl}${movie?.backdrop_path || movie?.poster_path}`} alt="trending-movie" className="hero-bg-image" /> */}
      </div>
      <h1 className="hero-title">{movie?.title || movie?.name}</h1>
      <p className="hero-overview">{movie.overview}</p>
      <div className="hero-btns">
        <button className="hero-btn"><PlayCircleOutlineOutlined />Play Now</button>
        <button className="hero-btn" onClick={() => setShowModal(!showModal)}><InfoOutlined />More Info</button>
      </div>
      {showModal && <Modal movie={movie} closeModal={() => setShowModal(!showModal)} />}
    </div>
  )
};

export default HeroCard;
