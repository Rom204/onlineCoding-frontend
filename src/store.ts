import { create } from "zustand";

export const useStore = create((set: any) => ({
  username: null,
  roomId: null,
  setUsername: (username: any) => set(() => ({ username })),
  setRoomId: (roomId: any) => set(() => ({ roomId: roomId }))
}))