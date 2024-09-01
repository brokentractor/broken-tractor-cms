import type { NextApiRequest, NextApiResponse } from 'next'
import { BIGCOMMERCE_BASE_URL } from '@/config'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { id } = req.query
    
    const accessToken = process.env.BIGCOMMERCE_ACCESS_TOKEN
      
    if (!accessToken) {
      throw new Error('BIGCOMMERCE_ACCESS_TOKEN is not defined')
    }

    if (typeof id !== 'string') {
      return res.status(400).json({ error: 'Invalid product ID' })
    }

    const response = await fetch(`${BIGCOMMERCE_BASE_URL}/v2/products/${id}`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'X-Auth-Token': accessToken,
      },
      body: req.body,
    })

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`)
    }

    const responseData = await response.json()
    res.status(200).json(responseData.data)
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  catch (error: any) {
    res.status(error.response?.status || 500).json({ error: error.message })
  }
}
