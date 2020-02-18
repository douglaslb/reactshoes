export function addtoCart(product) {
  return {
    type: '@cart/ADD',
    product,
  }
}

export function removeFromCart(id) {
  return { type: '@cart/REMOVE', id }
}
