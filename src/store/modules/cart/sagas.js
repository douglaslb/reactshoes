import { call, select, put, all, takeLatest } from 'redux-saga/effects'
import { toast } from 'react-toastify'

import { api } from '../../../services/api'
import { formatPrice } from '../../../util/format'
import { addtoCartSuccess, updateAmount } from './actions'

function* addToCart({ id }) {
  const productExists = yield select(state => state.cart.find(p => p.id === id))

  const stock = yield call(api.get, `/stock/${id}`)

  const stockAmount = stock.data.amount
  const amount = productExists ? productExists.amount : 0

  const currentAmount = amount + 1

  if (currentAmount > stockAmount) {
    toast.error('Quantidade solicitada fora do estoque')
    return
  }

  if (productExists) {
    yield put(updateAmount(id, currentAmount))
  } else {
    const response = yield call(api.get, `/products/${id}`)

    const data = {
      ...response.data,
      amount: 1,
      priceFormatted: formatPrice(response.data.price),
    }

    yield put(addtoCartSuccess(data))
  }
}

export default all([takeLatest('@cart/ADD_REQUEST', addToCart)])
