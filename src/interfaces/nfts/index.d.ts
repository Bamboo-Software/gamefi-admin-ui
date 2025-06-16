export interface NFT {
  _id: string;
  id: string;
  name: string;
  description?: string;
  image?: string;
  seasonId: string;
  priceUsd: number;
  createdAt?: Date;
  updatedAt?: Date;
  season?: Season;
  isActive: boolean
}

export interface CreateNFTRequest {
  name: string;
  description?: string;
  image?: string;
  seasonId: string;
  priceUsd: number;
}
