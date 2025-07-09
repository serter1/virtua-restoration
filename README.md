<img src="./virtua-restoration.png" alt="Virtua Restoration" style="max-width: 1000px; width: 100%; display: block; margin: 0 auto 20px auto;">

[![NPM Version](https://img.shields.io/npm/v/virtua-restoration?style=flat-square&labelColor=261f58&color=362c7e)](https://www.npmjs.com/package/virtua-restoration)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-06172C?labelColor=261f58&color=362c7e&style=flat-square)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-06172C?labelColor=261f58&color=362c7e&style=flat-square)](https://opensource.org/licenses/MIT)
[![npm downloads](https://img.shields.io/npm/dm/virtua-restoration?color=362c7e&labelColor=261f58&style=flat-square)](https://www.npmjs.com/package/virtua-restoration)
[![CI](https://img.shields.io/github/actions/workflow/status/serter1/virtua-restoration/publish.yml?color=362c7e&labelColor=261f58&style=flat-square&label=CI)](https://github.com/serter1/virtua-restoration/actions)

# Virtua Restoration
It is a wrapper component that facilitates virtual listing with the [`virtua`](https://github.com/inokawa/virtua) library by storing scroll position and cache information in React applications.

## 🧪 Demo
https://virtua-restoration.vercel.app

## ✨ Features
- Maintains scroll position when doing virtual listing.
- Provides cache management with `sessionStorage`, `localStorage` or custom (e.g. Zustand).
- Works with the [`virtua`](https://github.com/inokawa/virtua) library.
- Prevents scroll and cache loss on route transitions or page refreshes.

## 📦 Installation
```bash
pnpm add virtua-restoration
# veya
npm install virtua-restoration
# veya
yarn add virtua-restoration
```

## 🚀 Usage

### Basic Usage (with `sessionStorage`) | [Demo](https://virtua-restoration.vercel.app/sessionstorage)
```typescript
import { WindowVirtualizedList } from 'virtua-restoration'

export default function Example() {
  return (
    <WindowVirtualizedList cacheKey="feed">
      {[...Array(200)].map((_, i) => (
        <div key={i} style={{ height: 80, borderBottom: '1px solid #ddd' }}>
          Row {i}
        </div>
      ))}
    </WindowVirtualizedList>
  )
}

```

### Use with `localStorage` | [Demo](https://virtua-restoration.vercel.app/localstorage)
```typescript
import { WindowVirtualizedList } from 'virtua-restoration'

export default function Example() {
  return (
    <WindowVirtualizedList cacheKey="feed" cacheSource="localStorage">
      {[...Array(200)].map((_, i) => (
        <div key={i} style={{ height: 80, borderBottom: '1px solid #ddd' }}>
          Row {i}
        </div>
      ))}
    </WindowVirtualizedList>
  )
}

```

### Usage with `zustand` | [Demo](https://virtua-restoration.vercel.app/zustand)
```typescript
// store/virtualListStore.ts
import { create } from 'zustand'
import { CacheSnapshot } from 'virtua'

interface VirtualListState {
  cacheMap: Record<string, [number, CacheSnapshot]>
  get: (key: string) => [number, CacheSnapshot] | undefined
  set: (key: string, data: [number, CacheSnapshot]) => void
}

export const useVirtualListStore = create<VirtualListState>((set, get) => ({
  cacheMap: {},
  get: (key) => get().cacheMap[key],
  set: (key, data) =>
    set((state) => ({
      cacheMap: {
        ...state.cacheMap,
        [key]: data,
      },
    })),
}))
```
```typescript
// pages/list.tsx
import { WindowVirtualizedList } from 'virtua-restoration'
import { useVirtualListStore } from './store/virtualListStore'

const cacheProvider = {
  get: () => useVirtualListStore.getState().get('feed'),
  set: (data) => useVirtualListStore.getState().set('feed', data),
}

<WindowVirtualizedList cacheKey="feed" cacheSource="custom" customProvider={cacheProvider}>
  {/* children */}
</WindowVirtualizedList>

```

## ⚙️ Props
| Prop             |Type                                        | Description                                                          |
| ---------------- | ------------------------------------------ | -------------------------------------------------------------------- |
| cacheKey         |string                                      | Unique outline where scroll/cache data will be stored                |
| children         |React.ReactNode                             | List content (items to be rendered virtually)                        |
| cacheSource      |`sessionStorage` `localStorage` `custom`    |  Where to store the cache (default: `sessionStorage`)                |
| customProvider   | CacheProvider                              | Get/set functions to use if `cacheSource` is `custom`                |

## 🛠 Contributing
Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License
MIT License - see the [LICENSE](LICENSE) file for details.
