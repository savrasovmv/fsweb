import { Meteor } from 'meteor/meteor';
import { Restivus } from 'meteor/mrest:restivus';
const { Client } = require('pg')
var url1 = require('postgrest-url').url
//import {url as pgUrl} from 'postgrest-url'
//console.log(url)
import SyncPromise from "./SyncPromise"
var PostgREST = require('postgrest-client')
var PGApi = new PostgREST('http://127.0.0.1:3030')

const fetch = require('node-fetch');

export const Api = new Restivus({
  apiPath: 'api/v1/',
  useDefaultAuth: true,
  prettyJson: true
});

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


const directoryGET = (param={}) => {
  return PGApi.get('/directory').set('Prefer', 'count=exact').match(param).range(0, 3)//.then(data => console.log(data))
}




Api.addRoute('directory', { authRequired: false }, {
  get() {
    
    console.log('directory GET')
    const { id } = this.queryParams;
    let param = ''
    if (id) {
      //param = '?id=eq.' + directoryId
      param = {id: id}
    } 
    return SyncPromise(directoryGET(param))
  },
  post() {
    console.log('directory POST')
     
    const { isCreate, id, directory } = this.bodyParams;
    let param = ''
    if (isCreate) {
      param = directory
    }
    console.log('queryParams', this.bodyParams)
    console.log('isCreate', isCreate)
    console.log('directoryID', id)
   // console.log('directory', directory)
    return SyncPromise(directoryPOST(isCreate, directory ))

  },
  head() {
    
    console.log('directory HEAD')
    return SyncPromise(directoryHEAD())
  },

});

const directoryHEAD = (param={}) => {
  const res =PGApi.request('HEAD', '/directory').set('Prefer', 'count=exact')
  .set('transform', '_include_headers')
  //var headers = res.getAllResponseHeaders().toLowerCase();
  //console.log("rrrrrrrrrrr", headers)
  // res.then(response=>{
  //   var headers = response.getAllResponseHeaders().toLowerCase();
  //   console.log("rrrrrrrrrrr", headers)
  // })
  //console.log("res count", res)
  return PGApi.request('get', '/directory')//.set('Prefer', 'count=planned')
              
               
              
              //.type('Prefer: count=exact')
}
Api.addRoute('countDirectory', { authRequired: false }, {
  get() {
    console.log('directory HEAD')
    return SyncPromise(directoryHEAD())
  },

});

Api.addRoute('postgres', { authRequired: false }, {
  get() {
    console.log('postgres')
    return SyncPromise(postgres())
  },

});


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




