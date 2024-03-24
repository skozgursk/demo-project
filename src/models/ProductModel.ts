import { BaseModel } from "./BaseModel"

export interface ProductModel extends BaseModel {
    category: {
        id: string
        name: string
        image: string
    }
    description: string
    images: Array<string>
    price: number
    rating: { rate: number, count: number }
    title: string
}