import { Meteor } from 'meteor/meteor';
import { Restivus } from 'meteor/mrest:restivus';
const { Client } = require('pg')

import SyncPromise from "./SyncPromise"

export const Api = new Restivus({
  apiPath: 'api/v1/',
  useDefaultAuth: true,
  prettyJson: true
});

const client = new Client({
  user: 'freeswitch',
  host: '192.168.1.8',
  database: 'freeswitch',
  password: 'freeswitch',
  port: 5432,
})

const getDirectoryList = new Promise((resolve, reject) => {

  
  client.connect()
  client
    .query('SELECT * from directory')
    .then(res => {
      resolve({
        "status": "success",
        "result": res.rows
      })

    }).catch(e => {
      console.log("Server ERR = ", e)
      //reject(e)
      resolve({
        "status": "error",
        "result": "Error"
      })
    })

})

const getDirectoryById = new Promise((resolve, reject) => {

  
  client.connect()
  client
    .query('SELECT * from directory')
    .then(res => {
      resolve({
        "status": "success",
        "result": res.rows
      })

    }).catch(e => {
      console.log("Server ERR = ", e)
      //reject(e)
      resolve({
        "status": "error",
        "result": "Error"
      })
    })

})


Api.addRoute('getDirectoryList', { authRequired: true }, {
  get() {
    return SyncPromise(getDirectoryList)
  },

});
Api.addRoute('getDirectoryById', { authRequired: true }, {
  get() {
    const { directoryId } = this.queryParams;
    console.log('directoryID', directoryId)
    return SyncPromise(getDirectoryById)
  },

});