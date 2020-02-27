/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react'
import {
  MdRemoveCircleOutline,
  MdAddCircleOutline,
  MdDelete,
} from 'react-icons/md'

import { useDispatch, useSelector } from 'react-redux'

import { formatPrice } from '../../util/format'
import * as CartActions from '../../store/modules/cart/actions'
import { Container, ProductTable, Total } from './styles'

export default function Cart() {
  const total = useSelector(state =>
    formatPrice(
      state.cart.reduce((total, product) => {
        return total + product.price * product.amount
      }, 0)
    )
  )

  const cart = useSelector(state =>
    state.cart.map(product => ({
      ...product,
      subTotal: formatPrice(product.price * product.amount),
    }))
  )

  const dispatch = useDispatch()

  const increment = product => {
    dispatch(CartActions.updateAmountRequest(product.id, product.amount + 1))
  }

  const decrement = product => {
    dispatch(CartActions.updateAmountRequest(product.id, product.amount - 1))
  }

  return (
    <Container>
      <ProductTable>
        <thead>
          <tr>
            <th />
            <th>PRODUTO</th>
            <th>QUANTIDADE</th>
            <th>SUBTOTAL</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {cart.map(product => (
            <tr>
              <td>
                <img src={product.image} alt={product.title} />
              </td>
              <td>
                <strong>{product.title}</strong>
                <span>{product.priceFormatted} </span>
              </td>
              <td>
                <div>
                  <button type="button">
                    <MdRemoveCircleOutline
                      color="#7159c1"
                      size={20}
                      onClick={() => decrement(product)}
                    />
                  </button>
                  <input type="number" readOnly value={product.amount} />
                  <button type="button">
                    <MdAddCircleOutline
                      color="#7159c1"
                      size={20}
                      onClick={() => increment(product)}
                    />
                  </button>
                </div>
              </td>
              <td>
                <span>{product.subTotal}</span>
              </td>
              <td>
                <button type="button">
                  <MdDelete
                    size={20}
                    color="#7159c1"
                    onClick={() =>
                      dispatch(CartActions.removeFromCart(product.id))
                    }
                  />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </ProductTable>

      <footer>
        <button type="button">Finalizar Pedido</button>
        <Total>
          <span>TOTAL</span>
          <strong>{total}</strong>
        </Total>
      </footer>
    </Container>
  )
}
