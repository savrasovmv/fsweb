import {PGApi, getRange, Api } from './api'
import SyncPromise from "./SyncPromise"

const groupsPOST = (isCreate, param) => {
    console.log("111=========", {id: param.id})
    if (isCreate) return PGApi.post('/groups').send(param)
    else {
      if (param.id) {
        return PGApi.patch('/groups').send(param).match({id: param.id})
      }
      return "error" 
    }
  }
  
  const groupsGET = (param={}, rangePage) => {
    console.log("rangePage",rangePage)
    console.log("param",param)
    return PGApi.get('/groups').order('name', 'desc').match(param).range(rangePage.startItem, rangePage.endItem)//.then(data => console.log(data))
  }
  
  Api.addRoute('groups', { authRequired: true }, {
    get() {
      console.log('group GET',  this.queryParams)
      const { id, page } = this.queryParams;
      let param = ''
      if (id) {
        param = {id: id}
      } 
      return SyncPromise(groupsGET(param, getRange(page)))
    },
    post() {
      console.log('group POST')
      const { isCreate, id, directory } = this.bodyParams;
      return SyncPromise(groupsPOST(isCreate, directory ))
  
    },
  });