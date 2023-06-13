import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { Trailer } from "./types"

export const  TrailerCard: React.FC<Trailer> = ({ id, attributes, image }: any) => {
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