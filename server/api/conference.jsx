import { PGApi, getRange, Api } from './api'
import SyncPromise from './SyncPromise'

const TABLE = 'web_conference'

const valuePOST = (isCreate, data) => {
    console.log('data', data)
    if (isCreate) return PGApi.post('/' + TABLE).send(data)
    else {
        if (data.id) {
            return PGApi.patch('/' + TABLE)
                .send(data)
                .match({ id: data.id })
        }
        return 'error'
    }
}

const valueGET = (param = {}, rangePage, filter = false, textfilter = '') => {
    if (filter) {
        textfilter = '?' + encodeURI(filter)
        console.log('textfilter', textfilter)
    }
    return PGApi.get('/' + TABLE + textfilter)
        .order('number', 'desc')
        .match(param)
        .range(rangePage.startItem, rangePage.endItem)
}

const valueDELETE = (id) => {
    console.log('valueDELETE', id)
    return PGApi.delete('/' + TABLE).match({ id: id })
}

Api.addRoute(
    TABLE,
    { authRequired: true },
    {
        get() {
            console.log('GET:' + TABLE + ' param' + this.queryParams)
            const { id, page, filter } = this.queryParams
            console.log('filter:', filter)
            let param = ''
            if (id) {
                param = { id: id }
            }

            return SyncPromise(valueGET(param, getRange(page), filter))
        },
        post() {
            console.log('POST:' + TABLE + ' param' + this.bodyParams)
            const { isCreate, data } = this.bodyParams
            console.log('isCreate:', isCreate)
            return SyncPromise(valuePOST(isCreate, data))
        },
        delete() {
            console.log('DELETE:' + TABLE + ' param' + this.queryParams)
            const { id } = this.queryParams
            if (!id) return 'error. not id'
            return SyncPromise(valueDELETE(id))
        },
    }
)
