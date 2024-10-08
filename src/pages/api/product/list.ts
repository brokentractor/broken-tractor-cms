import type { NextApiRequest, NextApiResponse } from 'next'

import { BIGCOMMERCE_BASE_URL } from '@/config'

export default async function handler(_req: NextApiRequest, res: NextApiResponse) {
  try {
    const accessToken = process.env.BIGCOMMERCE_ACCESS_TOKEN
    
    if (!accessToken) {
      throw new Error('BIGCOMMERCE_ACCESS_TOKEN is not defined')
    }

    const { page = '1', limit = '5' } = _req.query

    const response = await fetch(`${BIGCOMMERCE_BASE_URL}/products?page=${page}&limit=${limit}`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'X-Auth-Token': accessToken,
      },
    })

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`)
    }

    const responseData = await response.json()
    res.status(200).json(responseData)
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  catch (error: any) {
    res.status(error.response?.status || 500).json({ error: error.message })
  }
}
