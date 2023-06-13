export interface Trailer {
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

export interface Image {
  id: number;
  attributes: {
    url: string;
  };
}

export interface ImageHashMap<Image> {
  [key: number]: Image;
}

export interface Params {
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

