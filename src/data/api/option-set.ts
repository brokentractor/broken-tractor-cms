import type { TOptionSet } from '@/interfaces/option-set'

export const getOptionSets = async (): Promise<TOptionSet[]> => {
  const response = await fetch('/api/option-set/list')
  if (!response.ok) {
    throw new Error('Failed to fetch optionSets')
  }
  return response.json()
}