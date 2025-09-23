// src/types/brands.type.ts
export interface Root {
  results: number
  metadata: Metadata
  data: BrandsType[]
}

export interface Metadata {
  currentPage: number
  numberOfPages: number
  limit: number
  nextPage: number
}

export interface BrandsType {
  _id: string
  name: string
  slug: string
  image: string
  createdAt: string
  updatedAt: string
}