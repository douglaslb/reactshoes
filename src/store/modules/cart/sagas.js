import { call, put, all, takeLatest } from 'redux-saga/effects'

import { api } from '../../../services/api'
import { addtoCartSuccess } from './actions'

function* addToCart({ id }) {
  const response = yield call(api.get, `/products/${id}`)

  yield put(addtoCartSuccess(response.data))
}

export default all([takeLatest('@cart/ADD_REQUEST', addToCart)])
