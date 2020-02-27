import React, { useState, useEffect } from 'react'
import { MdAddShoppingCart } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'

import * as CartActions from '../../store/modules/cart/actions'
import { api } from '../../services/api'
import { formatPrice } from '../../util/format'
import { ProductList } from './styles'

export default function Home() {
  const [products, setProducts] = useState([])
  const amount = useSelector(state =>
    state.cart.reduce((amount, product) => {
      amount[product.id] = product.amount

      return amount
    }, {})
  )

  const dispatch = useDispatch()

  useEffect(() => {
    async function fetchProducts() {
      const response = await api.get('products')

      const data = response.data.map(product => ({
        ...product,
        priceFormatted: formatPrice(product.price),
      }))

      setProducts(data)
    }
    fetchProducts()
  }, [])

  const handleAddProduct = id => {
    dispatch(CartActions.addtoCartRequest(id))
  }

  return (
    <ProductList>
      {products.map(product => (
        <li key={product.id}>
          <img src={product.image} alt={product.title} />
          <strong>{product.title}</strong>
          <span>{product.priceFormatted}</span>

          <button type="button" onClick={() => handleAddProduct(product.id)}>
            <div>
              <MdAddShoppingCart size={16} color="#fff" />{' '}
              {amount[product.id] || 0}
            </div>

            <span>ADICIONAR AO CARRINHO</span>
          </button>
        </li>
      ))}
    </ProductList>
  )
}
