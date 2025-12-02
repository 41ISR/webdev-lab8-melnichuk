import axios from "axios";
import { useUserStore } from "../_store/useUserStore";

const apiInstance = axios.create({
    // baseURL: "https://kitek.ktkv.dev/marketplace/api/",
    baseURL: "https://sturdy-capybara-g479rjwpr7wwcv45v-3001.app.github.dev/api/",
    headers: {
        "Content-Type": "application/json"
    }
})

apiInstance.interceptors.request.use((config) => {
    const {session} = useUserStore.getState()

    if (session?.token) {
        config.headers.Authorization = `Bearer ${session.token}`
    }

    return config
})

const getItems = async () => {
    const res = await apiInstance.get("/items")    
    return res.data
}

const getStats = async () => {
    const res = await apiInstance.get("/stats")    
    return res.data
}

const getMyBids = async () => {
    const res = await apiInstance.get("/bids/my")
    return res
}

const regUser = async (user:{username: string, email:string, password:string}) => {
    const res = await apiInstance.post('/auth/register', user)
    return res
}

const logUser = async (user:{username: string, password:string}) => {
    const res = await apiInstance.post('/auth/login', user)
    return res
}

const createItem = async (item:{title: string, description:string, price: string, imageUrl?:string}) => {
    const res = await apiInstance.post('/items', item)
    return res
}

const getItemBids = async (id:string) => {
    const res = await apiInstance.get(`/items/${id}/bids`)
    return res.data
}

const deleteItem = async (id:string) => {
    const res = await apiInstance.delete(`/items/${id}`)
    return res
}

const createBid = async (bid:{amount: string}, id:string) => {
    const res = await apiInstance.post(`/items/${id}/bids`, bid)
    return res
}

export const api = {
    getItems,
    getStats,
    regUser,
    logUser,
    getMyBids,
    createItem,
    getItemBids,
    deleteItem,
    createBid
}