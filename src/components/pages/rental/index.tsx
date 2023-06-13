import { useEffect, useState } from "react";
import axios from "axios";
import { Trailer, ImageHashMap, Image, Params } from "./types";
import { LimitSelect } from "./limitSelect";
import { TrailerCard } from "./trailerCard";
import { rentalApiCall } from "./apiCall";

// NEEDS
// 1. Search bar
// 2. List of trailers
// 3. Trailer details
// 4. Trailer images
// 5. Filter by keyword search
// 6. Limit number of trailers per page

export default function Index() {
  const [trailers, setTrailers] = useState<Trailer[]>([]);
  const [images, setImages] = useState<ImageHashMap<Image>>([]);
  const [params, setParams] = useState<Params>({ filter: { keywords: "" }, page: { limit: 10, offset: null } });

  useEffect(() => {
    getTrailers();
  }, []);

  const getTrailers = async () => {
    try {
      const { trailers, images }: any = await rentalApiCall(params);
      setTrailers(trailers);
      setImages(images);

    } catch (err) {
      console.log(err);
    }
  };

  const handleKeyDown = (e: any) => {
    if (e.key === 'Enter') {
      getTrailers();
    }
  }
  
  return (
    <main>
      <div className="p-5">
        <div className="container mx-auto w-5/6">
          <h1 className="text-3xl font-light">Find Your Dream Trailer Rental</h1>
          <div className="filters mt-3 flex">
            <div className="search-bar">
              <input
                placeholder="Search by keywords"
                type="text"
                className="border border-gray-300 rounded-md h-10 p-3 w-96"
                onChange={(e) =>
                  setParams({
                    ...params,
                    filter: { ...params.filter, keywords: e.target.value },
                  })
                }
                onKeyDown={handleKeyDown}
              />
            </div>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-normal py-2 px-3 text-sm rounded ml-2"
              onClick={() => getTrailers()}
            >
              Search
            </button>
          </div>
          <div className="flex justify-between">
            <h3 className="text-xl font-bold my-3">Results</h3>
            <LimitSelect
              value={params.page.limit}
              onLimitChange={(limit: number) => setParams({ ...params, page: { ...params.page, limit: limit } })}
            />
          </div>
          {(trailers.length === 0) && <div className="text-center">No results found</div>}
          {trailers.map((trailer) => (
            <TrailerCard key={trailer.id} {...trailer} />
          ))}
        </div>
      </div>
    </main>
  );
}
