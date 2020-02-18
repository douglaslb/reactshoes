import React, { useState, useEffect } from 'react'
import { MdAddShoppingCart } from 'react-icons/md'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as CartActions from '../../store/modules/cart/actions'
import { api } from '../../services/api'
import { formatPrice } from '../../util/format'
import { ProductList } from './styles'

function Home({ addtoCart }) {
  const [products, setProducts] = useState([])

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

  const handleAddProduct = product => {
    addtoCart(product)
  }

  return (
    <ProductList>
      {products.map(product => (
        <li key={product.id}>
          <img src={product.image} alt={product.title} />
          <strong>{product.title}</strong>
          <span>{product.priceFormatted}</span>

          <button type="button" onClick={() => handleAddProduct(product)}>
            <div>
              <MdAddShoppingCart size={16} color="#fff" /> 3
            </div>

            <span>ADICIONAR AO CARRINHO</span>
          </button>
        </li>
      ))}
    </ProductList>
  )
}

const mapDispatchToProps = dispatch => bindActionCreators(CartActions, dispatch)

export default connect(null, mapDispatchToProps)(Home)
