import { ProductModel } from "./ProductModel";


export type ProductStoreModel = ProductModel & { count: number }

export interface CartStoreModel {
    products: Array<ProductStoreModel>
    addToCart: (item: ProductModel) => void
    removeAllItems: () => void
    removeItem: (productId: number) => void

}