import { CacheSnapshot } from 'virtua'

export interface CacheProvider {
  get: () => [number, CacheSnapshot] | undefined
  set: (data: [number, CacheSnapshot]) => void
}
