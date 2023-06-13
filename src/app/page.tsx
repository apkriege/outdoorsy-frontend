"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faMoon } from "@fortawesome/free-solid-svg-icons";

// NEEDS
// 1. Search bar
// 2. List of trailers
// 3. Trailer details
// 4. Trailer images
// 5. Filter by keyword search
// 6. Limit number of trailers per page

interface Trailer {
  id: number;
  attributes: {
    name: string;
    description: string;
    price_per_day: number;
    primary_image_url: string;
    type: string;
    average_ratings: {
      score: number | null;
    };
  };
  relationships: {
    primary_image: {
      data: {
        id: number;
      };
    };
  };
}

interface Image {
  id: number;
  attributes: {
    url: string;
  };
}

interface ImageHashMap<Image> {
  [key: number]: Image;
}

interface Params {
  filter: {
    keywords: string | "";
  };
  page: {
    limit: number;
    offset: number | null;
  };
}

interface LimitSelectProps {
  value: number;
  onLimitChange: (limit: number) => void;
}

const LimitSelect: React.FC<LimitSelectProps> = ({ value, onLimitChange }: any) => {
  const [limit, setLimit] = useState(value); // Initial limit value

  const handleLimitChange = (event: any) => {
    const selectedLimit = parseInt(event.target.value);
    setLimit(selectedLimit);
    onLimitChange(selectedLimit);
  };

  return (
    <div className="">
      <label htmlFor="limit">Items:</label>
      <select
        id="limit"
        className="border border-gray-300 rounded-md py-1 px-3 text-sm ml-3"
        value={limit}
        onChange={handleLimitChange}
      >
        <option value={5}>5</option>
        <option value={10}>10</option>
        <option value={15}>15</option>
        <option value={20}>20</option>
      </select>
    </div>
  );
};

const TrailerCard: React.FC<Trailer> = ({ id, attributes, image }: any) => {
  return (
    <div className="trailer-card border border-gray-300 rounded-md p-3 my-2" key={id}>
      <div className="grid grid-cols-5 gap-4">
        <div className="col-span-1">
          <div className="overflow-hidden h-full rounded-md">
            <img
              src={attributes.primary_image_url || ""}
              alt="Image"
              className="w-full h-full transform transition-transform hover:scale-110 duration-200"
            />
          </div>
        </div>
        <div className="col-span-4">
          <div className="flex justify-between">
            <div className="flex flex-col">
              <span className="text-xs d-flex align-middle font-bold text-blue-600">
                <FontAwesomeIcon icon={faStar} className="mr-1" />
                {attributes.average_ratings?.score || 0}
              </span>
            </div>
            <p className="text-sm font-bold text-slate-600">
              ${(attributes.price_per_day / 100).toFixed(2)}
              <small> / Night</small>
            </p>
          </div>
          <div className="leading-none">
            <h2 className="text-xl font-normal mb-0 text-slate-800 hover:text-blue-600 hover:cursor-pointer hover:font-medium">
              {attributes.name}
            </h2>
            <span className="text-xs capitalize mt-0 italic">{attributes.type}</span>
          </div>
          <div className="text-sm mt-6">
            <p className="line-clamp-2 text-xs">{attributes.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function Home() {
  const [trailers, setTrailers] = useState<Trailer[]>([]);
  const [images, setImages] = useState<ImageHashMap<Image>>([]);
  const [params, setParams] = useState<Params>({ filter: { keywords: "" }, page: { limit: 10, offset: null } });

  useEffect(() => {
    getTrailers();
  }, []);

  const getTrailers = async () => {
    try {
      const trailers = await axios.get(`https://search.outdoorsy.com/rentals`, { params: params });
      console.log(trailers.data.data[0]);

      const images = createHashMapForImages(trailers.data.included);
      setImages(images);

      const modeledTrailers = modelTrailers(trailers.data.data);
      setTrailers(modeledTrailers);
    } catch (err) {
      console.log(err);
    }
  };

  const createHashMapForImages = (images: Image[]) => {
    const hashMap: ImageHashMap<Image> = images.reduce((acc, image) => {
      return { ...acc, [image.id]: image };
    }, {});

    return hashMap;
  };

  const modelTrailers = (trailers: Trailer[]) => {
    return trailers.map((trailer: Trailer) => {
      const imageId = trailer.relationships.primary_image.data.id;
      return { ...trailer, image: images[imageId] };
    });
  };

  return (
    <main>
      <div className="p-5 bg-gray-100">
        <div className="container mx-auto w-5/6">
          <h1 className="text-3xl font-light">Find Your Dream Trailer Rental</h1>
          <div className="filters mt-3 flex">
            <div className="search-bar">
              {/* <label className="block">Search</label> */}
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
          {trailers.map((trailer) => (
            <TrailerCard key={trailer.id} {...trailer} />
          ))}
        </div>
      </div>
    </main>
  );
}
