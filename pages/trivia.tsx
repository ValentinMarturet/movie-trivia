import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { textChangeRangeNewSpan } from "typescript";
import ActorsCard from "../components/ActorsCard";
import MovieInput from "../components/MovieInput";
import {
  ICredits,
  IMovieID,
  MovieDetails,
  TopRatedMovies,
} from "../interfaces/interfaces";
import multipleRandomInts from "../utils/multipleInts";

const fetchTopMovies = async (): Promise<TopRatedMovies> => {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=en-US&page=1`
  );
  return res.json();
};

const fetchMovieID = async (): Promise<IMovieID> => {
  const res = await fetch(`/api/randomMovieID`);
  return res.json();
};

const fetchMovieById = async (
  id: number | undefined
): Promise<MovieDetails> => {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=en-US`
  );
  return res.json();
};

const fetchMovieCreditsById = async (id: number | undefined) => {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=en-US`
  );
  return res.json() as Promise<ICredits>;
};
const trivia = () => {
  const {
    data: movieID,
    isLoading: isLoadingID,
    isError: isErrorID,
  } = useQuery(["movieID"], fetchMovieID, { refetchOnWindowFocus: false });
  const {
    data: movieDetails,
    isLoading,
    isError,
  } = useQuery(
    ["MovieDetails", movieID?.id],
    () => fetchMovieById(movieID?.id),
    {
      enabled: !!movieID,
    }
  );
  const {
    data: credits,
    isLoading: isLoading2,
    isError: isError2,
  } = useQuery(["movieCredits"], () => fetchMovieCreditsById(movieID?.id), {
    enabled: !!movieID,
  });

  const [randomIndexes, setRandomIndexes] = useState<number[]>([]);

  useEffect(() => {
    let randoms = multipleRandomInts(
      0,
      credits?.cast.length
        ? credits?.cast.length > 8
          ? 8
          : credits?.cast.length
        : 0,
      3
    );
    console.log(randoms);
    setRandomIndexes(randoms);
  }, [credits]);

  useEffect(() => {
    console.log(movieDetails?.title);
    console.log(credits);
  }, [credits, movieDetails]);

  return (
    <div className="grid place-content-center py-12">
      <div className="flex gap-8 ">
        {!isLoading2 &&
          !isError2 &&
          randomIndexes.map((item, index) => (
            <ActorsCard
              imagePath={credits?.cast[item].profile_path}
              name={credits?.cast[item].name}
              key={index}
            />
          ))}
      </div>
      <div className="grid place-content-center">
        <MovieInput />
      </div>
      <button onClick={() => console.log(movieDetails?.title)}>Nombre</button>
    </div>
  );
};

export default trivia;
