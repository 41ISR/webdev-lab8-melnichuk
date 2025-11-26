import { create } from 'zustand'
import { api } from '../_api/api';

interface IInitialItemStore {
    items: any[],
    getItems: () => void
}

export const useItemStore = create<IInitialItemStore>((set) => ({
    items: [],
    getItems: async () => {
        try {
            const res = await api.getItems()
            set({items: res})
        } catch (error) {
            console.error(error);
        }
    }
}))