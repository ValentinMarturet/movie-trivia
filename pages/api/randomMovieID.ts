// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  id: number;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  let randomInt = Math.round(Math.random() * popularMovieIDs.length);
  res.status(200).json({ id: popularMovieIDs[randomInt] });
}

const popularMovieIDs: number[] = [
  238, 278, 240, 851644, 424, 389, 496243, 155, 680, 429, 13, 122,
];
