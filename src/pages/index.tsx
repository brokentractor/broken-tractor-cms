import { useState } from 'react'
import useSWR from 'swr'

import { getOptionSets } from '@/data/api/option-set'
import { getProducts } from '@/data/api/product'
import Layout from '@/components/Layout'
import Products from '@/components/Products'
import Spinner from '@/components/Spinner'

type FetcherProps = [string, number, number]

const fetcher = async ([ , page, limit ]: FetcherProps) => {
  const products = await getProducts(page, limit)
  return products
}

const HomePage = () => {
  const [ page ] = useState<number>(1)

  const { data: products, error: productsError, mutate } = useSWR(
    [ '/api/product/list', page, 20 ],
    fetcher,
  )
  const { data: optionSets, error: optionSetsError } = useSWR('option-sets', getOptionSets)

  if (productsError || optionSetsError) {
    return (
      <Layout>
        <div className="flex min-h-screen items-center justify-center">
          <div className="text-center">
            <p className="text-lg font-medium">Failed to load products</p>
          </div>
        </div>
      </Layout>
    )
  }

  if (!products || !optionSets) {
    return (
      <Layout>
        <div className="flex min-h-screen items-center justify-center">
          <div className="text-center">
            <Spinner />
          </div>
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      <Products products={products} optionSets={optionSets} mutate={mutate}/>
    </Layout>
  )
}

export default HomePage