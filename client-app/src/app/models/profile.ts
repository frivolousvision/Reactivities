import { User } from "./user";

export interface Profile {
  username: string;
  displayName: string;
  image?: string;
  bio?: string;
  photos?: Photo[];
}

export class Profile implements Profile {
  constructor(user: User) {
    this.username = user.username;
    this.displayName = user.displayName;
    this.image = user.image;
  }
}

export interface Photo {
  id: string;
  url: string;
  isMain: boolean;
}

export class ProfileFormValues {
  bio?: string | null | undefined = "";
  displayName: string = "";
  image?: string | undefined = "";
  username: string = "";
  photos?: Photo[] | undefined = [];

  constructor(profile?: ProfileFormValues) {
    if (profile) {
      this.bio = profile.bio;
      this.displayName = profile.displayName;
      this.image = profile.image;
      this.username = profile.username;
      this.photos = profile.photos;
    }
  }
}
