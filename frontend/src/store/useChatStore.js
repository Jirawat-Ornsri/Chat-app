import { create } from 'zustand'
import toast from 'react-hot-toast'
import { axiosInstance } from '../lib/axios'

export const useChatStore = create((set) => ({
    message: [],
    users: [],
    selecedUser: [],
    isUserLoading: false,
    isMessageloading: false,

    getUsers: async () => {
        set({ isUsersLoading: true });
        try {
            const res = await axiosInstance.get("/messages/users")
            set({ users: res.data });
        } catch (error) {
            toast.error(error.message.data.message)
        } finally {
            set({ isUsersLoading: false} )
        }
    },

    getMessages: async (userId) => {
        set({ isMessageloading: true });
        try {
            const res = await axiosInstance.get(`/messages/${userId}`)
            set({ message: res.data });
        } catch (error) {
            toast.error(error.message.data.message)
        } finally {
            set({ isMessageLoading: false} )
        }
    },

    setSelectedUser: (setSelectedUser) => set({ selecedUser })
}))