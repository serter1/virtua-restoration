import React, { useLayoutEffect, useMemo, useRef } from 'react'
import { WindowVirtualizer, WindowVirtualizerHandle } from 'virtua'
import { CacheProvider } from '../types/cacheProvider'
import { CacheSource } from '../types/cacheSource'
import getCacheProvider from './getCacheProvider'

interface Props {
  cacheKey: string
  children: React.ReactNode
  cacheSourceType?: CacheSource
  customProvider?: CacheProvider
}

export const WindowVirtualizedList = ({ cacheKey, children, cacheSourceType = 'sessionStorage', customProvider }: Props) => {
  const ref = useRef<WindowVirtualizerHandle>(null)
  const provider = useMemo(() => getCacheProvider(cacheKey, cacheSourceType, customProvider), [cacheKey, cacheSourceType, customProvider])

  const [offset, cache] = useMemo(() => {
    return provider?.get() ?? []
  }, [provider])

  useLayoutEffect(() => {
    if (!ref.current) return
    const handle = ref.current

    window.scrollTo(0, offset ?? 0)

    let scrollY = 0
    const onScroll = () => {
      scrollY = window.scrollY
    }

    window.addEventListener('scroll', onScroll)
    onScroll()

    return () => {
      window.removeEventListener('scroll', onScroll)
      if (provider) {
        provider.set([scrollY, handle.cache])
      }
    }
  }, [offset, provider])

  return (
    <WindowVirtualizer ref={ref} cache={cache}>
      {children}
    </WindowVirtualizer>
  )
}
