import type { TProduct } from '@/interfaces/product'

export const getProducts = async (page = 1, limit = 5): Promise<TProduct[]> => {
  const response = await fetch(`/api/product/list?page=${page}&limit=${limit}`)
  if (!response.ok) {
    throw new Error('Failed to fetch products')
  }
  return response.json()
}

export const updateProduct = async (id: string, body: Partial<TProduct>): Promise<TProduct> => {
  const response = await fetch(`/api/product/${id}`, { 
    method: 'PUT',
    body: JSON.stringify(body),
  })
  if (!response.ok) {
    throw new Error('Failed to update product')
  }
  return response.json()
}