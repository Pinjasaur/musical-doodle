// Powered by: https://transform.tools/json-to-typescript

/**
 * Last.fm
 */

export interface Root {
  toptracks: Toptracks;
}

export interface Toptracks {
  track: Track[];
  "@attr": Attr2;
}

export interface Track {
  streamable: Streamable;
  mbid: string;
  name: string;
  image: Image[];
  artist: Artist;
  url: string;
  duration: string;
  "@attr": Attr;
  playcount: string;
}

export interface Streamable {
  fulltrack: string;
  "#text": string;
}

export interface Image {
  size: string;
  "#text": string;
}

export interface Artist {
  url: string;
  name: string;
  mbid: string;
}

export interface Attr {
  rank: string;
}

export interface Attr2 {
  perPage: string;
  totalPages: string;
  page: string;
  total: string;
  user: string;
}

/**
 * iTunes Search
 */

export interface Root2 {
  resultCount: number;
  results: Result[];
}

export interface Result {
  wrapperType: string;
  kind: string;
  artistId: number;
  collectionId: number;
  trackId: number;
  artistName: string;
  collectionName: string;
  trackName: string;
  collectionCensoredName: string;
  trackCensoredName: string;
  artistViewUrl: string;
  collectionViewUrl: string;
  trackViewUrl: string;
  previewUrl: string;
  artworkUrl30: string;
  artworkUrl60: string;
  artworkUrl100: string;
  collectionPrice: number;
  trackPrice: number;
  releaseDate: string;
  collectionExplicitness: string;
  trackExplicitness: string;
  discCount: number;
  discNumber: number;
  trackCount: number;
  trackNumber: number;
  trackTimeMillis: number;
  country: string;
  currency: string;
  primaryGenreName: string;
  contentAdvisoryRating?: string;
  isStreamable: boolean;
}
