import Image from "next/image";
import React from "react";
import { IActorsCardProps } from "../interfaces/interfaces";

const ActorsCard = ({ imagePath, name }: IActorsCardProps) => {
  return (
    <div className="p-2 border-zinc-100 shadow-2xl shadow-rose-800">
      <Image
        src={`https://image.tmdb.org/t/p/w500${imagePath}`}
        alt="Actor Image"
        width={250}
        height={250 * 0.6}
      />
      <h3 className="p-3 text-2xl text-center">{name}</h3>
    </div>
  );
};

export default ActorsCard;
