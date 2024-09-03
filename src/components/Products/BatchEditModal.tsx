
import { useState } from 'react'
import { updateProduct } from '@/data/api/product'
import {
  Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, 
} from '@/components/ui/dialog'
import Spinner from '../Spinner'
import type { TOptionSet } from '@/interfaces/option-set'
import type { TProduct } from '@/interfaces/product'
import type { KeyedMutator } from 'swr'

type BatchEditModalProps = {
  selectedProducts: Set<number>
  optionSets: TOptionSet[]
  mutate: KeyedMutator<TProduct[]>
}

const BatchEditModal = ({ selectedProducts, optionSets, mutate }: BatchEditModalProps) => {
  const [ removeLoading, setRemoveLoading ] = useState(false)
  const [ updateLoading, setUpdateLoading ] = useState(false)
  const [ optionSetID, setOptionSetID ] = useState<number | undefined>(undefined)

  const batchRemoveOptionSetID = async () => {
    setRemoveLoading(true)
  
    try {
      const updatePromises = Array.from(selectedProducts).map((id) =>
        updateProduct(id.toString(), { option_set_id: null }),
      )
  
      await Promise.all(updatePromises)
    }
    catch (error) {
      // eslint-disable-next-line no-console
      console.error('Failed to update products:', error)
    }
    finally {
      setRemoveLoading(false)
      mutate()
    }
  }

  const batchUpdateOptionSetID = async () => {
    setUpdateLoading(true)
  
    if (optionSetID) {
      try {
        const updatePromises = Array.from(selectedProducts).map((id) =>
          updateProduct(id.toString(), { option_set_id: optionSetID }),
        )
    
        await Promise.all(updatePromises)
      }
      catch (error) {
        // eslint-disable-next-line no-console
        console.error('Failed to update products:', error)
      }
      finally {
        setUpdateLoading(false)
        mutate()
      }
    }
  }

  return (
    <Dialog>
      <DialogTrigger>
        <button 
          className="mb-4 h-10 items-center justify-center rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 disabled:cursor-not-allowed disabled:bg-gray-300 disabled:hover:bg-gray-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 disabled:dark:bg-gray-300 disabled:dark:hover:bg-gray-300"
          disabled={selectedProducts.size < 1}
        >
        Edit selected products
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Batch Update</DialogTitle>
          <DialogDescription>
            You are editing <em>{selectedProducts.size}</em> products
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={batchUpdateOptionSetID}>
          <div className="mb-6 grid gap-6">
            <div>
              <label htmlFor="optionSetSelect" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">Select an option</label>
              <select 
                id="optionSetSelect" 
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                value={optionSetID || ''}
                onChange={(e) => setOptionSetID(parseInt(e.target.value))}
              >
                <option value="">Choose an option set</option>
                {optionSets.map((optionSet) => (
                  <option key={optionSet.id} value={optionSet.id.toString()}>
                    {optionSet.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className='flex items-center justify-center gap-2'>
            <button 
              type="submit" 
              className="flex h-10 w-44 items-center justify-center rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 disabled:cursor-not-allowed disabled:bg-gray-300 disabled:hover:bg-gray-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 disabled:dark:bg-gray-300 disabled:dark:hover:bg-gray-300"
              disabled={updateLoading 
                || !optionSetID 
                || optionSetID === 0
              }
            >
              {updateLoading ? <Spinner /> : 'Batch Update'}
            </button>
            <button 
              className="flex h-10 w-44 items-center justify-center rounded-lg bg-red-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 disabled:cursor-not-allowed disabled:bg-gray-300 disabled:hover:bg-gray-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800 disabled:dark:bg-gray-300 disabled:dark:hover:bg-gray-300"
              disabled={removeLoading}
              onClick={batchRemoveOptionSetID}
            >
              {removeLoading ? <Spinner /> : 'Batch Remove'}
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default BatchEditModal