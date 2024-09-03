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
  const [ page, setPage ] = useState<number>(1)

  const LIMIT = 20

  const { data: products, error: productsError, mutate } = useSWR(
    [ '/api/product/list', page, LIMIT ],
    fetcher,
  )
  
  const { data: optionSets, error: optionSetsError } = useSWR('option-sets', getOptionSets)

  const loadMore = () => {
    const newPage = page + 1
    setPage(newPage)
  
    getProducts(newPage, LIMIT).then((newProducts) => {
      if (newProducts && products) {
        mutate([ ...products, ...newProducts ], false)  // Append new products to existing ones
      }
    }).catch((error) => {
      console.error('Failed to load more products:', error)
    })
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
        mutate={mutate}
        loadMore={loadMore}
      />
    </Layout>
  )
}

export default HomePage