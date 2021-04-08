//import { Meteor } from 'meteor/meteor';
import {PGApi, getRange, Api } from './api'
import SyncPromise from "./SyncPromise"


const TABLE = 'web_directory'

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
    console.log("rangePage",rangePage)
    return PGApi.get('/'+TABLE+'?select=*,web_users(name)').order('regname', 'desc').match(param).range(rangePage.startItem, rangePage.endItem)
  }
  const valueDELETE = (id) => {
    console.log("valueDELETE",id)
    return PGApi.delete('/'+TABLE).match({id: id})
  }
  
  Api.addRoute('web_directory', { authRequired: true }, {
    get() {
      console.log('GET:' + TABLE +' param' + this.queryParams)
      const { id, page, users_id } = this.queryParams;
      let param = ''
      if (id) {
        param = {id: id}
      } 
      if (users_id) {
        param = {users_id: users_id}
      }
      return SyncPromise(valueGET(param, getRange(page)))
    },
    post() {
      console.log('POST:' + TABLE +' param' + this.bodyParams)
      const { isCreate, id, data } = this.bodyParams;
      return SyncPromise(valuePOST(isCreate, data ))
  
    },
    delete() {
      console.log('DELETE:' + TABLE +' param' + this.queryParams)
      const { id } = this.queryParams;
      if (!id) return "error. not id"
      return SyncPromise(valueDELETE(id))
  
    },
  });
  