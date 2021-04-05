//import { Meteor } from 'meteor/meteor';
import {PGApi, getRange, Api } from './api'
import SyncPromise from "./SyncPromise"

const directoryPOST = (isCreate, param) => {
    console.log("111=========", {id: param.id})
    if (isCreate) return PGApi.post('/directory').send(param)
    else {
      if (param.id) {
        return PGApi.patch('/directory').send(param).match({id: param.id})
      }
      return "error" 
  
    }
  }
  
  const directoryGET = (param={}, rangePage) => {
    console.log("rangePage",rangePage)
    return PGApi.get('/directory?select=*,groups(name)').order('userid', 'desc').match(param).range(rangePage.startItem, rangePage.endItem)//.then(data => console.log(data))
  }
  
  Api.addRoute('directory', { authRequired: true }, {
    get() {
      console.log('directory GET',  this.queryParams)
      const { id, page, group_id } = this.queryParams;
      let param = ''
      if (id) {
        param = {id: id}
      } 
      if (group_id) {
        param = {group_id: group_id}
      }
      // if (!page) { page=1}
  
      return SyncPromise(directoryGET(param, getRange(page)))
    },
    post() {
      console.log('directory POST')
      const { isCreate, id, directory } = this.bodyParams;
      return SyncPromise(directoryPOST(isCreate, directory ))
  
    },
    // head() {
      
    //   console.log('directory HEAD')
    //   return SyncPromise(directoryHEAD())
    // },
  
  });
  