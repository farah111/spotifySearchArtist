
export class Artist {
  id: number;
  name: string;
  imageUrl: string;
  stars: number;
  followers: number;
  constructor(artist) {
    this.id = artist.id;
    this.name = artist.name;
    this.imageUrl = artist.images[0]? artist.images[0].url : '';
    this.stars = Math.floor(artist.popularity * 0.05);
    this.followers = artist.followers.total;
  }
}

