
export class Album {
  id: number;
  name: string;
  imageUrl: string;
  tracks: number;
  date: string;
  previewLink: string;
  constructor(album) {
    this.id = album.id;
    this.name = album.name;
    this.imageUrl = album.images[0] ? album.images[0].url : '';
    this.tracks = album.total_tracks;
    this.date = album.release_date;
    this.previewLink = album.external_urls.spotify;
  }
}

