import serializeForm from 'form-serialize'
import uniqid from 'uniqid'

export const serializeForm_with_timestamp_and_id = (e)=> {
    let obj = serializeForm(e.target, { hash: true })
    console.log(obj);
    obj.timestamp = Date.now()
    obj.id =  uniqid()
    return obj
}
