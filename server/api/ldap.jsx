import { PGApi, getRange, Api } from './api'
import SyncPromise from './SyncPromise'
import configData from '../../config/default.json'

const ldapHostname = configData.LDAP.hostname
const ldapUser = configData.LDAP.user
const ldapPassword = configData.LDAP.password
const ldapBasedn = configData.LDAP.basedn
const ldapUsernamefield = configData.LDAP.usernamefield
const ldapNamefield = configData.LDAP.namefield

const ldap = require('ldapjs')
const parseDN = require('ldapjs').parseDN

// const client = ldap.createClient({
//     url: [ldapHostname],
// })

// client.on('error', (err) => {
//     console.log('EEEEEEEEEEEEEEEEE')
// })

// client.bind(ldapUser, ldapPassword, (err) => {
//     console.log('2222222-----EEEEEEEEEEEEEEEEE')
//     console.log(err)
// })
// const opts = {
//     filter: '(&(objectCategory=user)(objectClass=user))',
//     scope: 'sub',
//     attributes: ['dn', 'sn', 'cn'],
// }

// client.search(ldapBasedn, opts, (err, res) => {
//     //assert.ifError(err);
//     console.log('333-----EEEEEEEEEEEEEEEEE', err)

//     res.on('searchEntry', (entry) => {
//         console.log('entry: ' + JSON.stringify(entry.object))
//     })
//     res.on('searchReference', (referral) => {
//         console.log('referral: ' + referral.uris.join())
//     })
//     res.on('error', (err) => {
//         console.error('error: ' + err.message)
//     })
//     res.on('end', (result) => {
//         console.log('status: ' + result.status)
//     })
// })

const TABLE = 'ldap'

// const valuePOST = (isCreate, data) => {
//     console.log('data', data)
//     if (isCreate) return PGApi.post('/' + TABLE).send(data)
//     else {
//         if (data.id) {
//             return PGApi.patch('/' + TABLE)
//                 .send(data)
//                 .match({ id: data.id })
//         }
//         return 'error'
//     }
// }
const client = ldap.createClient({
    url: [ldapHostname],
})
// function ldapGetOne(number = false) {
//     if (number) {
//         return new Promise((resolve, reject) => {
//             // client.on('error', (err) => {
//             //     console.log('EEEEEEEEEEEEEEEEE')
//             // })

//             client.bind(ldapUser, ldapPassword, (err) => {
//                 if (err) {
//                     console.log('2222222-----EEEEEEEEEEEEEEEEE')
//                     console.log(err)
//                 } else {
//                     const opts = {
//                         filter:
//                             '(&(objectCategory=user)(objectClass=user)(ipPhone=110))',
//                         scope: 'sub',
//                         attributes: [
//                             'cn',
//                             'sAMAccountName',
//                             'department',
//                             'title',
//                             'email',
//                             'ipPhone',
//                         ],
//                     }

//                     client.search(ldapBasedn, opts),
//                         (err, res) => {
//                             //assert.ifError(err);
//                             console.log('333-----EEEEEEEEEEEEEEEEE', err)

//                             res.on('searchEntry', (entry) => {
//                                 console.log(
//                                     'entry object: ',
//                                     entry.object.title
//                                 )

//                                 // console.log(
//                                 //     'entry: ' + JSON.stringify(entry.object)
//                                 // )
//                                 resolve('OK')
//                             })
//                             res.on('searchReference', (referral) => {
//                                 console.log('referral: ' + referral.uris.join())
//                             })
//                             res.on('error', (err) => {
//                                 console.error('error: ' + err.message)
//                             })
//                             res.on('end', (result) => {
//                                 console.log('status: ' + result.status)
//                             })
//                         }
//                 }
//             })
//         })
//     } else {
//         return 'error. Не указан номер пользователя'
//     }
// }

async function test2() {
    return new Promise((resolve) => {
        client.bind(ldapUser, ldapPassword, (err) => {
            if (err) {
                console.log('2222222-----EEEEEEEEEEEEEEEEE')
                console.log(err)
            } else {
                const opts = {
                    filter:
                        '(&(objectCategory=user)(objectClass=user)(ipPhone=110))',
                    scope: 'sub',
                    attributes: [
                        'cn',
                        'sAMAccountName',
                        'department',
                        'title',
                        'email',
                        'ipPhone',
                    ],
                }

                client.search(ldapBasedn, opts, (err, res) => {
                    //assert.ifError(err);
                    console.log('333-----EEEEEEEEEEEEEEEEE', err)

                    res.on('searchEntry', (entry) => {
                        console.log(
                            'entry object: ',
                            parseDN(entry.object.dn).parent().toString()
                        )
                        let dn = parseDN(entry.object.dn).parent().toString()
                        let ar = dn.split(',')
                        console.log('split: ', ar[0].replace('ou=', ''))
                        console.log('entry: ' + JSON.stringify(entry.object))
                        resolve(JSON.stringify(entry.object))
                    })
                    res.on('searchReference', (referral) => {
                        console.log('referral: ' + referral.uris.join())
                    })
                    res.on('error', (err) => {
                        console.error('error: ' + err.message)
                    })
                    res.on('end', (result) => {
                        console.log('status: ' + result.status)
                    })
                })
            }
        })
    })
}

async function test() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve('OK')
        }, [2000])
    })
}

Api.addRoute(
    TABLE,
    { authRequired: true },
    {
        get() {
            console.log('GET:' + TABLE + ' param' + this.queryParams)

            const { number } = this.queryParams
            // console.log('filter:', filter)
            // let param = ''
            // if (id) {
            //   param = {id: id}
            // }

            return SyncPromise(test2())
        },
        // post() {
        //   console.log('POST:' + TABLE +' param' + this.bodyParams)
        //   const { isCreate, data } = this.bodyParams;
        //   console.log('isCreate:', isCreate)
        //   return SyncPromise(valuePOST(isCreate, data ))

        // },
    }
)
