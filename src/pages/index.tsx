import useSWR from 'swr'

import { getOptionSets } from '@/data/api/option-set'
import { getProducts } from '@/data/api/product'
import Layout from '@/components/Layout'
import Products from '@/components/Products'

const HomePage = () => {
  const { data: products, error: productsError, mutate } = useSWR('products', getProducts)
  const { data: optionSets, error: optionSetsError } = useSWR('option-sets', getOptionSets)

  if (productsError || optionSetsError) return <div>Failed to load products</div>
  if (!products || !optionSets) return <div>Loading...</div>

  console.log('products: ', products)
  console.log('optionSets: ', optionSets)

  return (
    <Layout>
      <Products products={products} optionSets={optionSets} mutate={mutate}/>
    </Layout>
  )
}

export default HomePage