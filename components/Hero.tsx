
import { fetchTrending } from "@/actions/movieData";
import HeroCard from "./HeroCard";

const Hero = async () => {
  const trending = await fetchTrending();
  const random = Math.floor(Math.random() * trending.length);
  const movie = trending[random];
  return (
    <div>
      <HeroCard movie={movie} />
    </div>
  );
};

export default Hero;
