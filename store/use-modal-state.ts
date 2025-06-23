import { create } from "zustand";

type ModalState = {
    isOpen: boolean;
    open: () => void;
    close: () => void;
};

export const useAskSetupProfileModal = create<ModalState>((set) =>({
    isOpen: false,
    open: () => set({ isOpen: true }),
    close: () => set({ isOpen: false })
}))



export const useAnothereModal = create<ModalState>((set) =>({
    isOpen: false,
    open: () => set({ isOpen: true }),
    close: () => set({ isOpen: false })
}))