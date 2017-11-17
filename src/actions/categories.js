import { getAllCats } from '../backendAPI'
export const RECEIVE_CATS = 'RECEIVE_CATS'

export const recieveCats = (categories)=> {
  return {
    type: RECEIVE_CATS,
    categories
  }
}
export const fetchCats = ()=> dispatch =>
  getAllCats().then((data)=> dispatch(recieveCats(data.categories)))
