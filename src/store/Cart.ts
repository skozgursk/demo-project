import { create } from 'zustand'
import { CartStoreModel, ProductModel } from '../models'


function addToStorage(data: Array<ProductModel>) {
    localStorage.setItem('cart-data', JSON.stringify(data))
}

export const useCartStore = create<CartStoreModel>((set) => ({
    products: JSON.parse(localStorage.getItem('cart-data') ?? '[]'),
    addToCart: (item: ProductModel) => set((state: CartStoreModel) => {
        if (state.products.some((product: ProductModel) => product.id === item.id)) {
            const product = state.products.find((product: ProductModel) => product.id === item.id)
            if (product)
                product.count++
            addToStorage([...state.products])
            return { products: [...state.products] }
        } else {
            addToStorage([...state.products, { ...item, count: 1 }])
            return { products: [...state.products, { ...item, count: 1 }] }
        }
    }),
    removeAllItems: () => set(() => {
        addToStorage([])
        return { products: [] }
    }),
    removeItem: (productId: number) => set((state: CartStoreModel) => {
        const product = state.products.find((product: ProductModel) => product.id === productId)
        if (!product || (product && product.count === 1)) {
            addToStorage(state.products.filter((item: ProductModel) => item.id !== productId))
            return { products: state.products.filter((item: ProductModel) => item.id !== productId) }
        } else {
            product.count--
            addToStorage([...state.products])
            return { products: [...state.products] }
        }
    }),
}))
