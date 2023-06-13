import { useState } from "react";
import { LimitSelectProps } from "./interfaces";


export const LimitSelect: React.FC<LimitSelectProps> = ({ value, onLimitChange }: any) => {
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
