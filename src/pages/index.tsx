import { useState, useEffect } from 'react'
import useSWR from 'swr'

import { getOptionSets } from '@/data/api/option-set'
import { getProducts } from '@/data/api/product'
import Layout from '@/components/Layout'
import Products from '@/components/Products'
import Spinner from '@/components/Spinner'
import type { TProduct } from '@/interfaces/product'

type FetcherProps = [string, number, number]

const fetcher = async ([ , page, limit ]: FetcherProps) => {
  const products = await getProducts(page, limit)
  return products
}

const HomePage = () => {
  const [ page, setPage ] = useState<number>(1)
  const [ products, setProducts ] = useState<TProduct[]>([])

  const LIMIT = 250

  const { data: newProducts, error: productsError, mutate } = useSWR(
    [ '/api/product/list', page, LIMIT ],
    fetcher,
  )
  
  const { data: optionSets, error: optionSetsError } = useSWR('option-sets', getOptionSets)

  useEffect(() => {
    if (newProducts) {
      setProducts((prevProducts) => [ ...prevProducts, ...newProducts ])
    }
  }, [ newProducts ])

  const loadMore = () => {
    setPage((prevPage) => prevPage + 1)
  }

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
      <Products 
        products={products}
        optionSets={optionSets}
        loadMore={loadMore}
        mutate={mutate}
        loadingMore={!newProducts && page > 1} // Only show loading state for "Load More" button
      />
    </Layout>
  )
}

export default HomePage
