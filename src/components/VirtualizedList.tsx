import React, { useLayoutEffect, useMemo, useRef } from 'react'
import { VList, VListHandle } from 'virtua'
import { CacheProvider } from '../types/cacheProvider'
import { CacheSource } from '../types/cacheSource'
import getCacheProvider from './getCacheProvider'

interface Props {
  cacheKey: string
  children: React.ReactNode
  cacheSourceType?: CacheSource
  customProvider?: CacheProvider
  className?: string
  style?: React.CSSProperties
}

export const VirtualizedList = ({ cacheKey, children, cacheSourceType = 'sessionStorage', customProvider, className, style }: Props) => {
  const ref = useRef<VListHandle>(null)
  const provider = useMemo(() => getCacheProvider(cacheKey, cacheSourceType, customProvider), [cacheKey, cacheSourceType, customProvider])

  const [offset, cache] = useMemo(() => {
    return provider?.get() ?? []
  }, [provider])

  useLayoutEffect(() => {
    if (!ref.current) return
    const handle = ref.current

    if (offset) {
      handle.scrollTo(offset)
    }

    return () => {
      if (provider) {
        provider.set([handle.scrollOffset, handle.cache])
      }
    }
  }, [offset, provider])

  return (
    <VList ref={ref} cache={cache} className={className} style={style ?? { height: '100vh', overflow: 'auto' }}>
      {children}
    </VList>
  )
}
