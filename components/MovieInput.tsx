import { useState } from "react";
import { Combobox } from "@headlessui/react";

const movies: string[] = [
  "The Godfather",
  "Parasite",
  "The Good, the Bad and the Ugly",
  "The Dark Knight",
  "20th Century Girl",
  "Pulp Fiction",
  "The Lord of the Rings: The Return of the King",
  "Forrest Gump",
  "The Shawshank Redemption",
  "12 Angry Men",
  "Schindler's List",
  "The Godfather Part II",
];

const MovieInput = ({
  handleSuccess,
  handleFail,
  currentMovieTitle,
}: IMovieInput) => {
  const [selectedPerson, setSelectedPerson] = useState("");
  const [query, setQuery] = useState("");

  const filterMovies =
    query === ""
      ? movies
      : movies.filter((person) => {
          return person.toLowerCase().includes(query.toLowerCase());
        });

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (selectedPerson === currentMovieTitle) {
      handleSuccess ? handleSuccess() : null;
    } else if (movies.find((item) => item === currentMovieTitle)) {
      handleFail ? handleFail() : null;
    } else {
      console.log("try aghain");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="py-10">
      <Combobox value={selectedPerson} onChange={setSelectedPerson}>
        <Combobox.Input
          onChange={(event) => setQuery(event.target.value)}
          className="text-xl w-96 h-10 rounded-md border-none py-2 pl-3 pr-10 leading-5 text-gray-900 focus:ring-0"
          placeholder="Enter movie name..."
        />
        <Combobox.Options className="absolute mt-1 max-h-60 overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm w-96">
          {filterMovies.map((movie) => (
            <Combobox.Option
              key={movie}
              value={movie}
              className={({ active }) =>
                `relative cursor-default select-none py-2 pl-10 pr-4 ${
                  active ? "bg-teal-600 text-white" : "text-gray-900"
                }`
              }
            >
              {movie}
            </Combobox.Option>
          ))}
        </Combobox.Options>
      </Combobox>
    </form>
  );
};

export default MovieInput;

interface IMovieInput {
  handleSuccess?: () => void;
  handleFail?: () => void;
  currentMovieTitle?: string;
}
