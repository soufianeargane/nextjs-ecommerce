
export interface Items{
  _id : string
  name: string 
  image: string
  price: number
  quantity: number
}

export interface ProductItems{
    _id : string
    cartId: string 
    productId: Items
    quantity: number
}