import { atom, selector } from 'recoil'

export enum ModalType {
    Canceled = 'canceled',
    Completed = 'completed',
    Deleted = 'deleted',
}

interface ModalState {
    show: boolean
    type: ModalType
}

export const modalState = atom<ModalState>({
    key: 'modalState',
    default: {
        type: ModalType.Canceled,
        show: false,
    },
})

export const showModalState = selector({
    key: 'showModal',
    get: ({ get }) => {
        return get(modalState).show
    },
})

export const typeModalState = selector({
    key: 'typeModal',
    get: ({ get }) => {
        return get(modalState).type
    },
})
