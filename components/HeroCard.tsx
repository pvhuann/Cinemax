'use client'

import { baseImgUrl } from "@/lib/constants";
import { Movie } from "@/lib/types";
import React from "react";

const HeroCard = ({ movie }: { movie: Movie }) => {
  return (
    <div className="hero">
        <div className="hero-bg">
            <img src={`${baseImgUrl}${movie?.backdrop_path|| movie?.poster_path}`} alt="" />
        </div>
    </div>
  )
};

export default HeroCard;
