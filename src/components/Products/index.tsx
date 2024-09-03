import { useEffect, useState } from 'react'
import dayjs from 'dayjs'

import Spinner from '../Spinner'
import BatchEditModal from './BatchEditModal'
import EditModal from './EditModal'
import type { TOptionSet } from '@/interfaces/option-set'
import type { TProduct } from '@/interfaces/product'
import type { KeyedMutator } from 'swr'

type ProductsProps = {
  products: TProduct[]
  optionSets: TOptionSet[]
  mutate: KeyedMutator<TProduct[]>
  loadMore: () => void
  loadingMore: boolean
}

const Products = ({
  products, optionSets, mutate, loadMore, loadingMore, 
}: ProductsProps) => {
  const [ selectedProducts, setSelectedProducts ] = useState<Set<number>>(new Set())
  const [ selectAll, setSelectAll ] = useState(false)
  const [ filterOptionSetID, setFilterOptionSetID ] = useState<number | undefined>(undefined)
  const [ filteredProducts, setFilteredProducts ] = useState<TProduct[]>(products)

  const handleCheckboxChange = (productId: number) => {
    setSelectedProducts((prevSelected) => {
      const newSelected = new Set(prevSelected)
      if (newSelected.has(productId)) {
        newSelected.delete(productId)
      }
      else {
        newSelected.add(productId)
      }
      return newSelected
    })
  }

  const handleSelectAllChange = () => {
    setSelectAll((prevSelectAll) => {
      const newSelectAll = !prevSelectAll
      if (newSelectAll) {
        const allIds = products.map((product) => product.id)
        setSelectedProducts(new Set(allIds))
      }
      else {
        setSelectedProducts(new Set())
      }
      return newSelectAll
    })
  }

  useEffect(() => {
    if (filterOptionSetID) {
      setFilteredProducts(products.filter((product) => product.option_set_id === filterOptionSetID))
    }
    else {
      setFilteredProducts(products)
    }
  }, [ filterOptionSetID, products ])
  
  return (
    <div className="my-20 w-[900px]">
      <div className='mb-2 flex w-full justify-between gap-4'>
        <div>
          <select 
            id="optionSetSelect" 
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            value={filterOptionSetID || ''}
            onChange={(e) => setFilterOptionSetID(parseInt(e.target.value))}
          >
            <option value={undefined}>Filter by option set</option>
            {optionSets.map((optionSet) => (
              <option key={optionSet.id} value={optionSet.id.toString()}>
                {optionSet.name}
              </option>
            ))}
          </select>
        </div>
        <BatchEditModal 
          selectedProducts={selectedProducts}
          mutate={mutate}
          optionSets={optionSets}
        />
      </div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full table-fixed text-left text-sm text-gray-500 dark:text-gray-400 rtl:text-right">
          <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="w-8 p-4">
                <div className="flex items-center">
                  <input 
                    id="checkbox-all-search" 
                    type="checkbox"
                    checked={selectAll}
                    onChange={handleSelectAllChange}
                    className="size-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-0 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
                  />
                  <label htmlFor="checkbox-all-search" className="sr-only">checkbox</label>
                </div>
              </th>
              <th scope="col" className="px-6 py-3">
                Product name
              </th>
              <th scope="col" className="w-40 px-6 py-3">
                Option Set
              </th>
              <th scope="col" className="w-36 px-6 py-3">
                Date Created
              </th>
              <th scope="col" className="w-24 px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product) => (
              <tr key={product.id} className="border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600">
                <td className="w-4 p-4">
                  <div className="flex items-center">
                    <input 
                      id="checkbox-table-search-1"
                      type="checkbox"
                      checked={selectedProducts.has(product.id)}
                      onChange={() => handleCheckboxChange(product.id)}
                      className="size-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600 dark:focus:ring-offset-gray-800"
                    />
                    <label htmlFor="checkbox-table-search-1" className="sr-only">checkbox</label>
                  </div>
                </td>
                <th scope="row" className="w-80 truncate whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white">
                  {product.name}
                </th>
                <td className="px-6 py-4">
                  {product.option_set_id ? 
                    optionSets.find((optionSet) => optionSet.id === product.option_set_id)?.name 
                    : '-'}
                </td>
                <td className="px-6 py-4">
                  {dayjs(product.date_created).format('MM/DD/YYYY')}
                </td>
                <td className="flex items-center px-6 py-4">
                  <EditModal product={product} optionSets={optionSets} mutate={mutate} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-8 text-center">
        <button 
          className={`rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 ${loadingMore ? 'cursor-not-allowed' : ''}`}
          onClick={loadMore}
          disabled={loadingMore}
        >
          {loadingMore ? <Spinner /> : 'Load More'}
        </button>
      </div>
    </div>
  )
}

export default Products