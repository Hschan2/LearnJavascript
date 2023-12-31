export interface IVideo {
  title: string;
  url: string;
  image: string;
}

export interface IVideoCategory {
  videoCategory: IVideo[];
  categoryTitle: string;
}