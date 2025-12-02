// import { create } from 'zustand'
import { api } from '../_api/api';
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

interface IInitialItemStore {
    items: any[],
    getItems: () => void
}

export const useItemStore = create<IInitialItemStore>()(
  persist(
    (set) => ({
      items: [],
      getItems: async () => {
        try {
            const res = await api.getItems()
            set({items: res})
        } catch (error) {
            console.error(error);
        }
      }
    }),
    {
      name: 'item-storage', // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
    }
  )
)