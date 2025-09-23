export interface catType {
  results: number
  metadata: Metadata
  data: categoryData[]
}

export interface Metadata {
  currentPage: number
  numberOfPages: number
  limit: number
}

export interface categoryData {
  _id: string
  name: string
  slug: string
  image: string
  createdAt: string
  updatedAt: string
}
