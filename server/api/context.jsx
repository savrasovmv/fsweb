import {PGApi, getRange, Api } from './api'
import SyncPromise from "./SyncPromise"

const TABLE = 'web_context'

const valuePOST = (isCreate, data) => {
    console.log("111=========", {id: data.id})
    if (isCreate) return PGApi.post('/'+TABLE).send(data)
    else {
      if (data.id) {
        return PGApi.patch('/'+TABLE).send(data).match({id: data.id})
      }
      return "error" 
    }
  }
  
  const valueGET = (param={}, rangePage) => {
    return PGApi.get('/'+TABLE).order('name', 'desc').match(param).range(rangePage.startItem, rangePage.endItem)
  }
  
  Api.addRoute(TABLE, { authRequired: true }, {
    get() {
      console.log('GET:' + TABLE +' param' + this.queryParams)
      const { id, page } = this.queryParams;
      let param = ''
      if (id) {
        param = {id: id}
      } 
      return SyncPromise(valueGET(param, getRange(page)))
    },
    post() {
      console.log('POST:' + TABLE +' param' + this.bodyParams)
      const { isCreate, data } = this.bodyParams;
      return SyncPromise(valuePOST(isCreate, data ))
  
    },
  });