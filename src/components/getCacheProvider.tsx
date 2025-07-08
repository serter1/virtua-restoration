import { CacheSnapshot } from 'virtua'
import { CacheProvider } from '../types/cacheProvider'
import { CacheSource } from '../types/cacheSource'

export default function getCacheProvider(cacheKey: string, cacheSource: CacheSource = 'sessionStorage', customProvider?: CacheProvider): CacheProvider | undefined {
  if (cacheSource === 'custom' && customProvider) return customProvider

  const storage = cacheSource === 'localStorage' ? window.localStorage : window.sessionStorage

  return {
    get: () => {
      const serialized = storage.getItem(cacheKey)
      if (!serialized) return undefined
      try {
        return JSON.parse(serialized) as [number, CacheSnapshot]
      } catch (e) {
        console.error('Error parsing storage cache:', e)
        return undefined
      }
    },
    set: (data: [number, CacheSnapshot]) => {
      storage.setItem(cacheKey, JSON.stringify(data))
    },
  }
}
