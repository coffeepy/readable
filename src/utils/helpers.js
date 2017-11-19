import serializeForm from 'form-serialize'
import uniqid from 'uniqid'

export const serializeForm_with_timestamp_and_id = (e)=> {
    let obj = serialize_form(e)
    obj.timestamp = Date.now()
    obj.id =  uniqid()
    return obj
}

export const serialize_form = (e)=> {
  let obj = serializeForm(e.target, { hash: true })
  return obj
}
