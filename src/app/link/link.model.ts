export interface IFirestoreLink {
  destination: string;
  type: string;
  encrypted?: boolean;
}

export interface ILinkInput {
  slug: string;
  destination: string;
  password?: string;
}
