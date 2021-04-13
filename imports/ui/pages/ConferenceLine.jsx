import React, { useState, useEffect } from 'react'
import { useForm, Controller } from 'react-hook-form'
import ReactHTMLDatalist from 'react-html-datalist'
import ReactSelect from 'react-select'
import { Link as ReactLink } from 'react-router-dom'
import { useParams, useRouteMatch } from 'react-router-dom'

import history from '../../utils/history'
import TextField from '@material-ui/core/TextField'
import Alert from '@material-ui/lab/Alert'
import { Title } from '../components/Title'

import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'

import Table from '@material-ui/core/Table'
import Box from '@material-ui/core/Box'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import IconButton from '@material-ui/core/IconButton'
import EditIcon from '@material-ui/icons/Edit'
import AddIcon from '@material-ui/icons/Add'
import DeleteIcon from '@material-ui/icons/Delete'
import Dele from '@material-ui/icons/Delete'
import Button from '@material-ui/core/Button'
import Checkbox from '@material-ui/core/Checkbox'
import MenuItem from '@material-ui/core/MenuItem'
import FormControlLabel from '@material-ui/core/FormControlLabel'

import { APIClient } from '../../utils/RestApiClient'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { ButtonGroup, FormControl, Select } from '@material-ui/core'

const schema = yup.object().shape({
    'number-alias': yup.string().required().min(3, 'Минимум 3 символа'),
})

const FormField = ({ name, errors, register }) => {
    return (
        <Box>
            <input
                type="text"
                ref={register}
                id={name}
                label={name}
                name={name}
            />
            {errors[name] && (
                <font color="red">
                    {errors[name].message}
                    <br />
                </font>
            )}
        </Box>
    )
}

const TABLE = 'web_conference_line'
const LINE_TABLE = 'web_callgroup_line'

//console.log("directoryTables", directoryTables)
export const ConferenceLine = ({ isCreate = false }) => {
    const [conferenceLineList, setConferenceLineList] = React.useState([])
    const [open, setOpen] = useState(false)
    const [searchUsers, setSearchUsers] = useState([])
    const [users, setUsers] = useState([])

    const {
        register,
        errors,
        handleSubmit,
        setValue,
        control,
        getValues,
    } = useForm({
        mode: 'onBlur',
        defaultValues: {},
        resolver: yupResolver(schema),
        shouldUnregister: false,
    })
    let { path, url } = useRouteMatch()
    let { id } = useParams()

    useEffect(() => {
        if (!isCreate) {
            cg = APIClient.v1.get(TABLE, { id: id })
            cg.then((resolve) => {
                console.log('web_conference_line', resolve)
                if (resolve.length > 0) {
                    for (const [key, value] of Object.entries(resolve[0])) {
                        setValue(key, value)
                    }
                    filter = 'number-alias=eq.' + getValues('number-alias')
                    us = APIClient.v1.get('web_users', { filter: filter })
                    us.then((resolve) => {
                        console.log('web_users', resolve)
                        if (resolve.length > 0) {
                            setUsers(resolve[0].name)
                        }
                    }).catch((error) => {
                        console.log('Err = ', error)
                    })
                }
            }).catch((error) => {
                console.log('Err = ', error)
            })

            Promise.all([cg]).then(() => {
                //console.log("values", values);
                setOpen(true)
            })
        } else {
            setValue('conference_id', id)
            setOpen(true)
        }
    }, [])

    const handleSubmitClick = (data) => {
        console.log('data===', data)

        APIClient.v1
            .post(TABLE, {}, { isCreate: isCreate, data: data })
            .then((resolve) => {
                console.log('result', resolve)
                history.goBack()
            })
            .catch((error) => {
                console.log('Err = ', error)
            })
    }

    // const handleDeleteLine = (line_id) => {

    //     console.log('DELETE', directory_id)
    //     result = confirm("Вы действительно хотите удалить запись?");
    //     if (result) {
    //         APIClient.v1.delete(LINE_TABLE, { id: line_id })
    //         .then((resolve) => {
    //             console.log('result', resolve)
    //             //setDirectory(resolve.result[0])
    //             console.log('Запись удалена')
    //              history.go(0)

    //         })
    //         .catch((error) => {
    //             console.log('Err = ', error)
    //             //setConferenceLineList(defaultDirectory)
    //         })

    //     }
    // }

    const hendleSearch = (event) => {
        value = event.target.value
        filter = 'number-alias=eq.' + value
        us = APIClient.v1.get('web_users', { filter: filter })
        us.then((resolve) => {
            console.log('web_users filtering', resolve)
            if (resolve.length > 0) {
                setUsers(resolve[0].name)
            }
        }).catch((error) => {
            console.log('Err = ', error)
        })
    }
    // const handleClick = (value) => {
    //    // value = event.target.value
    //     alert(value)

    // }

    return (
        <React.Fragment>
            <Title>Участник конференции</Title>
            <form
                noValidate
                autoComplete="off"
                onSubmit={handleSubmit(handleSubmitClick)}
            >
                {open ? (
                    <Box>
                        <Box display="flex" justifyContent="flex-end">
                            <ButtonGroup>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                >
                                    Сохранить
                                </Button>

                                <Button
                                    //type="submit"
                                    variant="contained"
                                    color="secondary"
                                    onClick={() => history.goBack()}
                                >
                                    Отмена
                                </Button>
                            </ButtonGroup>
                        </Box>

                        <table>
                            <tbody>
                                {/* <tr>
                                    <td>Пользователь</td>
                                    <td>
                                        <select ref={register} name="users_id" id="users_id" placeholder="Pick a state..." >
                                            {users.map((option) => (
                                                <option key={option.id} value={option.id}>
                                                    {option["number-alias"]}-{option.name}
                                                </option>
                                            ))}
                                        </select>

                                    </td> 
                                </tr> */}
                                <tr>
                                    <td>Номер</td>
                                    <td>
                                        <input
                                            type="text"
                                            ref={register}
                                            name="number-alias"
                                            id="number-alias"
                                            onBlur={hendleSearch}
                                        />
                                        {errors[name] && (
                                            <font color="red">
                                                {errors[name].message}
                                                <br />
                                            </font>
                                        )}
                                    </td>
                                </tr>
                                <tr>
                                    <td>Пользователь</td>
                                    <td>{users}</td>
                                </tr>
                            </tbody>
                        </table>
                    </Box>
                ) : null}
            </form>
        </React.Fragment>
    )
}
