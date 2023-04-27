export interface Episode {
  map(arg0: (podcast: any) => boolean): import("react").ReactNode;
  find(arg0: (episode: { trackId: number }) => boolean): any;
  trackId: number;
  artworkUrl160: string;
  trackName: string;
  description: string;
  previewUrl: string;
}
export interface PodcastTypes {
  length: Array<number>;
  map(arg0: (podcast: any) => JSX.Element): import("react").ReactNode;
  0: any;
  trackName: string;
  episodes: Object[];
  results: Object[];
  artworkUrl160: string;
  trackId: string;
}
