import { APIURL, KEY } from "@/app/constants";
import Filter from "@/components/Filter";
import React from "react";

const Games = async () => {
  const data = await fetch(`${APIURL}genres?key=${KEY}`).then((res) =>
    res.json()
  );
  const genres = data.results.slice(0, 15);
  console.log(genres); // eslint-disable-line
  return (
    <div className="relative flex flex-col gap-4">
      <h3 className="text-2xl text-gray-100 text-center">Games From Genres</h3>
      <div className="w-full grid relative grid-cols-12 gap-4">
        <Filter genres={genres} />
      </div>
    </div>
  );
};

export default Games;
