
import { useState } from 'react'
import { updateProduct } from '@/data/api/product'
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, 
} from '@/components/ui/dialog'
import type { TProduct } from '@/interfaces/product'

type EditModalProps = {
  product: TProduct
}

const EditModal = ({ product }: EditModalProps) => {
  const [ loading, setLoading ] = useState(false)
  const [ optionSetID, setOptionSetID ] = useState<string | undefined>(
    product.option_set_id !== null ? product.option_set_id.toString() : undefined,
  )
  
  console.log('optionSetID; ', optionSetID)

  const removeOptionSetID = async () => {
    setLoading(true)

    try {
      await updateProduct(product.id.toString(), { option_set_id: null })
    }
    catch (error) {
      console.error('Failed to update product:', error)
    }
    finally {
      setLoading(false)
    }
  }

  return (
    <Dialog>
      <DialogTrigger>
        <a href="#" className="font-medium text-blue-600 hover:underline dark:text-blue-500">
          Edit
        </a>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{product.name}</DialogTitle>
        </DialogHeader>
        
        <form>
          <div className="mb-6 grid gap-6">
            <div>
              <label 
                htmlFor="option_set_id"
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
              >
                Option Set ID
              </label>
              <input 
                type="text" 
                id="option_set_id"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                placeholder="Enter Option Set ID"
                required
                onChange={(e) => setOptionSetID(e.target.value)}
                value={optionSetID}
              />
            </div>
          </div>
          <div className='flex items-center justify-center gap-2'>
            <button 
              type="submit" 
              className="rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 disabled:cursor-not-allowed disabled:bg-gray-300 disabled:hover:bg-gray-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 disabled:dark:bg-gray-300 disabled:dark:hover:bg-gray-300"
              disabled={!optionSetID || optionSetID === product.option_set_id?.toString() || optionSetID === '0'}
            >
              Update Option Set
            </button>
            <button 
              type="submit" 
              className="rounded-lg bg-red-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 disabled:cursor-not-allowed disabled:bg-gray-300 disabled:hover:bg-gray-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800 disabled:dark:bg-gray-300 disabled:dark:hover:bg-gray-300"
              disabled={!product.option_set_id}
              onClick={removeOptionSetID}
            >
              {loading ? 'Loading' : 'Remove Option Set'}
            </button>

          </div>

        </form>
      </DialogContent>
    </Dialog>
  )
}

export default EditModal