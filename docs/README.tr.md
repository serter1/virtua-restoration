<img src="../virtua-restoration.png" alt="Virtua Restoration" style="max-width: 1000px; width: 100%; display: block; margin: 0 auto 20px auto;">

[![NPM Version](https://img.shields.io/npm/v/virtua-restoration?style=flat-square&labelColor=261f58&color=362c7e)](https://www.npmjs.com/package/virtua-restoration)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-06172C?labelColor=261f58&color=362c7e&style=flat-square)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-06172C?labelColor=261f58&color=362c7e&style=flat-square)](https://opensource.org/licenses/MIT)
[![npm downloads](https://img.shields.io/npm/dy/virtua-restoration?color=362c7e&labelColor=261f58&style=flat-square)](https://www.npmjs.com/package/virtua-restoration)
[![CI](https://img.shields.io/github/actions/workflow/status/serter1/virtua-restoration/publish.yml?color=362c7e&labelColor=261f58&style=flat-square&label=CI)](https://github.com/serter1/virtua-restoration/actions)

_Bu dokümanı farklı bir dilde okuyun: [English](../README.md), [Türkçe](README.tr.md)_

# Virtua Restoration

React uygulamalarında kaydırma (scroll) pozisyonunu ve önbellek (cache) bilgilerini saklayarak [`virtua`](https://github.com/inokawa/virtua) kütüphanesi ile sanal listelemeyi (virtual listing) kolaylaştıran bir sarmalayıcı (wrapper) bileşendir.

## 🧪 Demo

https://virtua-restoration.vercel.app

## ✨ Özellikler

- Sanal listeleme yaparken kaydırma (scroll) pozisyonunu korur.
- `sessionStorage`, `localStorage` veya özel (ör. Zustand) yöntemlerle önbellek yönetimi sağlar.
- [`virtua`](https://github.com/inokawa/virtua) kütüphanesi ile sorunsuz çalışır.
- Rota geçişlerinde (route transitions) veya sayfa yenilemelerinde kaydırma ve önbellek kaybını önler.

## 📦 Kurulum

```bash
pnpm add virtua virtua-restoration
```

```bash
bun add virtua virtua-restoration
```

```bash
npm install virtua virtua-restoration
```

```bash
yarn add virtua virtua-restoration
```

## 📚 Gereksinimler (Peer Dependencies)

| Paket     | Sürüm    |
| --------- | -------- |
| react     | >=19.0.0 |
| react-dom | >=19.0.0 |
| virtua    | >=0.41.5 |

## 🚀 Kullanım

### Temel Kullanım (`sessionStorage` ile) | [Demo](https://virtua-restoration.vercel.app/sessionstorage)

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

### `localStorage` ile Kullanım | [Demo](https://virtua-restoration.vercel.app/localstorage)

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

### `zustand` ile Kullanım | [Demo](https://virtua-restoration.vercel.app/zustand)

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

## ⚙️ Proplar

| Prop           | Tür                                      | Açıklama                                                             |
| -------------- | ---------------------------------------- | -------------------------------------------------------------------- |
| cacheKey       | string                                   | Kaydırma/önbellek verilerinin saklanacağı benzersiz anahtar (key)    |
| children       | React.ReactNode                          | Liste içeriği (sanal olarak oluşturulacak öğeler)                    |
| cacheSource    | `sessionStorage` `localStorage` `custom` | Önbelleğin nerede saklanacağı (varsayılan: `sessionStorage`)         |
| customProvider | CacheProvider                            | `cacheSource` değeri `custom` ise kullanılacak get/set fonksiyonları |

## 🛠 Katkıda Bulunma

Katkılarınızı bekliyorum! Lütfen Pull Request (Çekme İsteği) göndermekten çekinmeyin.

## 📄 Lisans

MIT Lisansı - detaylar için [LICENSE](LICENSE) dosyasına göz atabilirsiniz.
