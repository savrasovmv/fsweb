import { Meteor } from 'meteor/meteor';
import { Restivus } from 'meteor/mrest:restivus';
const { Client } = require('pg')

import SyncPromise from "./SyncPromise"

export const Api = new Restivus({
  apiPath: 'api/v1/',
  useDefaultAuth: true,
  prettyJson: true
});


const r4 = new Promise((resolve, reject) => {

  const client = new Client({
    user: 'freeswitch',
    host: '192.168.1.8',
    database: 'freeswitch',
    password: 'freeswitch',
    port: 5432,
  })
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


Api.addRoute('users', { authRequired: true }, {
  get() {
    return SyncPromise(r4)
  },

});