import { getAllCats } from '../backendAPI'
export const RECEIVE_CATS = 'RECEIVE_CAT'
export const SELECT_CAT = 'SELECT_CAT'
export const DEFAULT_CAT = 'DEFAULT_CAT'

export const recieveCats = (categories)=> {
  return {
    type: RECEIVE_CATS,
    categories
  }
}

export const selectCat = (category)=> {
  return {
    type: SELECT_CAT,
    category
  }
}

export const defaultCat = (category)=> {
  return {
    type: DEFAULT_CAT,
    category
  }
}
export const fetchCats = ()=> dispatch =>
  getAllCats().then((data)=> dispatch(recieveCats(data.categories)))
