import useSWR from 'swr'

import { getProducts } from '@/data/api/product'
import Layout from '@/components/Layout'

const fetcher = () => getProducts()

const HomePage = () => {
  const { data, error } = useSWR('products', fetcher)

  if (error) return <div>Failed to load products</div>
  if (!data) return <div>Loading...</div>

  console.log('data: ', data)

  return (
    <Layout>
      <h1>Products</h1>
      <ul>
        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
        {data.map((product: any) => (
          <li key={product.id}>
            {product.name} - ${product.price}
          </li>
        ))}
      </ul>
    </Layout>
  )
}

export default HomePage