import { Meteor } from 'meteor/meteor';
import { Restivus } from 'meteor/mrest:restivus';
//const { Client } = require('pg')
import configData from "../../config/default.json";
import SyncPromise from "./SyncPromise"

export const maxRowList = configData.Pages.maxRowList
const pgUrl = configData.PostgREST.url
// var url1 = require('postgrest-url').url
//import {url as pgUrl} from 'postgrest-url'
//console.log(url)

var PostgREST = require('postgrest-client')
export var PGApi = new PostgREST(pgUrl)

//const fetch = require('node-fetch');

export const getRange = (page=1) => {
  startItem = (page-1)*maxRowList
  endItem = startItem+maxRowList -1
  return {
    startItem: startItem,
    endItem: endItem
  }

}

export const Api = new Restivus({
  apiPath: 'api/v1/',
  useDefaultAuth: true,
  prettyJson: true
});


export const countRowTable = (tableName) => {
  console.log('countRowTable', tableName)
  return PGApi.get('/'+tableName+'?select=count')
}

Api.addRoute('countRowTable', { authRequired: false }, {
  get() {
    console.log('countRowTable')
    const { tableName } = this.queryParams;
    return SyncPromise(countRowTable(tableName))
  },

});

// Api.addRoute('postgres', { authRequired: false }, {
//   get() {
//     console.log('postgres')
//     return SyncPromise(postgres())
//   },

// });


// const directoryGET = (param='') => {
//   return PGApi.get('/directory'+ param)//.then(data => console.log(data))
//   // console.log("111=========")
//   // return new Promise((resolve, reject) => {

//   //   let url = 'http://127.0.0.1:3030/directory' + param;
//   //   let response = fetch(url);
//   //   response.then(response => {
//   //     console.log("222=========")
//   //     resolve(response.json())

//   //   })

//   // })
// }


  // return new Promise((resolve, reject) => {

  //   let url = 'http://127.0.0.1:3030/directory';
  //   //data = { id: "user5", domain: "1111" }
  //   console.log("data", JSON.stringify(data))
  //   let response = fetch(url, {
  //     method: 'POST',
  //     mode: 'cors', // no-cors, *cors, same-origin
  //     cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
  //     credentials: 'same-origin', // include, *same-origin, omit
  //     headers: {
  //       'Content-Type': 'application/json'
  //       // 'Content-Type': 'application/x-www-form-urlencoded',
  //     },
  //     body: JSON.stringify(data)
  //   });
  //   response.then(response => {
  //     console.log("222=========")
  //     resolve({
  //       "status": "success",

  //     })

  //   })


  // })

// const client = new Client({
//   user: 'freeswitch',
//   host: '192.168.1.8',
//   database: 'freeswitch',
//   password: 'freeswitch',
//   port: 5432,
// })

// client.connect()

// const getDirectoryList = new Promise((resolve, reject) => {


//   //client.connect()
//   client
//     .query('SELECT * from directory')
//     .then(res => {
//       resolve({
//         "status": "success",
//         "result": res.rows
//       })
//      // client.end()

//     }).catch(e => {
//       console.log("Server ERR = ", e)
//       //reject(e)
//       resolve({
//         "status": "error",
//         "result": "Error"
//       })
//     })
//     //client.end()
// })

// const getDirectoryById = (directoryId) => {
//   return new Promise((resolve, reject) => {
//     client.on('error', err => {
//       console.error('something bad has happened!', err.stack)
//     })
//   console.log("updateDirectory directoryId", directoryId)
//   console.log("client PG status", client.status)
//   const text = 'SELECT * from directory where id=$1'
//   const values = [directoryId, ]

//   //client.connect()
//   client
//     .query(text, values)
//     .then(res => {
//       resolve({
//         "status": "success",
//         "result": res.rows
//       })
//      // client.end()

//     }).catch(e => {
//       console.log("Server ERR = ", e)
//       //reject(e)
//       resolve({
//         "status": "error",
//         "result": "Error"
//       })
//     })

//     //client.end()
// })
// }


// const getDirectory = new Promise((resolve, reject) => {


//   client.connect()
//   client
//     .query('SELECT * from directory')
//     .then(res => {
//       resolve(res.rows)

//     }).catch(e => {
//       console.log("Server ERR = ", e)
//       //reject(e)
//       resolve({
//         "status": "error",
//         "result": "Error"
//       })
//     })

// })



// Api.addRoute('getDirectoryList', { authRequired: false }, {
//   get() {
//     return SyncPromise(getDirectoryList)
//   },

// });
// Api.addRoute('getDirectoryById', { authRequired: true }, {
//   get() {

//     const { directoryId } = this.queryParams;
//     console.log('directoryID', directoryId)
//     return SyncPromise(getDirectoryById(directoryId))
//   },

// });

// // Api.addRoute('directory', { authRequired: false }, {
// //   get() {
// //      return SyncPromise(getDirectory)
// //   },

// // });


// const updateDirectory = (directoryId, directory) => {
//   return new Promise((resolve, reject) => {

//   console.log("updateDirectory directoryId", directoryId)
//   //client.connect()
//   client
//     .query('INSERT INTO directory(data) VALUES($1)', [directory])
//     .then(res => {
//       resolve({
//         "status": "success",
//         "result": res
//       })

//     }).catch(e => {
//       console.log("Server ERR = ", e)
//       //reject(e)
//       resolve({
//         "status": "error",
//         "result": "Error"
//       })
//     })

// })
// }

// Api.addRoute('UpdateDirectoryById', { authRequired: true }, {
//   post() {

//     const { directoryId, directory } = this.bodyParams;
//     console.log('queryParams', this.bodyParams)
//     console.log('directoryID', directoryId)
//     console.log('directory', directory)
//     return SyncPromise(updateDirectory)
//   },

// });




