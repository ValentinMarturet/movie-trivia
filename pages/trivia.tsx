import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import ActorsCard from "../components/ActorsCard";
import {
  ICredits,
  MovieDetails,
  TopRatedMovies,
} from "../interfaces/interfaces";

const fetchTopMovies = async (): Promise<TopRatedMovies> => {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=en-US&page=1`
  );
  return res.json();
};

const fetchMovieById = async (id: any) => {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=en-US`
  );
  console.log(
    `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=en-US`
  );
  return res.json() as Promise<ICredits>;
};
const trivia = () => {
  const {
    data: topRated,
    isLoading,
    isError,
  } = useQuery(["topMovies"], fetchTopMovies);
  const {
    data: credits,
    isLoading: isLoading2,
    isError: isError2,
  } = useQuery(
    ["movieCredits"],
    () => fetchMovieById(topRated?.results[0].id),
    {
      enabled: !!topRated,
    }
  );

  useEffect(() => {
    console.log(topRated?.results[0].id);
    console.log(credits);
  }, [topRated, credits]);

  return (
    <div className="grid place-items-center">
      {!isLoading2 && (
        <ActorsCard
          name={credits?.cast[0].name}
          imagePath={credits?.cast[0].profile_path}
        />
      )}
    </div>
  );
};

export default trivia;
