import useSWR from 'swr'

import { getProducts } from '@/data/api/product'
import Layout from '@/components/Layout'
import Products from '@/components/Products'

const fetcher = () => getProducts()

const HomePage = () => {
  const { data, error } = useSWR('products', fetcher)

  if (error) return <div>Failed to load products</div>
  if (!data) return <div>Loading...</div>

  console.log('data: ', data)

  return (
    <Layout>
      <h1>Products</h1>
      <Products products={data} />
    </Layout>
  )
}

export default HomePage