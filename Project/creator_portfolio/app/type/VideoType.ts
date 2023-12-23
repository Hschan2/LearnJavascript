export interface IVideo {
  title: string;
  url: string;
}

export interface IVideoCategory {
  videoCategory: IVideo[];
  categoryTitle: string;
}