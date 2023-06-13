export type Trailer = {
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
    location: {
      city: string;
      state: string;
      country: string;
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

export type Image = {
  id: number;
  attributes: {
    url: string;
  };
}

export type ImageHashMap<Image> = {
  [key: number]: Image;
}

export type Params = {
  filter: {
    keywords: string | "";
  };
  page: {
    limit: number;
    offset: number | null;
  };
}

export interface LimitSelectProps {
  value: number;
  onLimitChange: (limit: number) => void;
}

