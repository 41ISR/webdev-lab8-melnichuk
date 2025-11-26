import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import UserInterface from '../_interface/UserInterface'

export const useUserStore = create<UserInterface>()(
  persist(
    (set) => ({
      session: [],
      setSession: (session) => set({session}),
      clearSession: () => set({session: []})
    }),
    {
      name: 'user-storage', // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
    }
  )
)