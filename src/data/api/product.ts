import type { TProduct } from '@/interfaces/product'

export const getProducts = async (): Promise<TProduct[]> => {
  const response = await fetch('/api/product/list')
  if (!response.ok) {
    throw new Error('Failed to fetch products')
  }
  return response.json()
}