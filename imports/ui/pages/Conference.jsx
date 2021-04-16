import React, { useState, useEffect } from 'react'
import { useForm, Controller } from 'react-hook-form'
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
import configData from '../../../config/default.json'

const profileList = configData.Conference.Profile

const schema = yup.object().shape({
    name: yup.string().required().min(3, 'Минимум 3 символа'),
    number: yup.string().required().min(3, 'Минимум 3 символа'),
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

const TABLE = 'web_conference'

//console.log("directoryTables", directoryTables)
export const Conference = ({ isCreate = false }) => {
    const [open, setOpen] = useState(false)
    const [profileRow, setProfileRow] = useState(profileList.split(','))

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
                console.log('web_conference', resolve)
                if (resolve.length > 0) {
                    for (const [key, value] of Object.entries(resolve[0])) {
                        setValue(key, value)
                    }
                }
            }).catch((error) => {
                console.log('Err = ', error)
            })

            Promise.all([cg]).then(() => {
                //console.log("values", values);
                setOpen(true)
            })
        } else {
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

    return (
        <React.Fragment>
            <Title>Конференция</Title>
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
                                <tr>
                                    <td>Наименование</td>
                                    <td>
                                        <FormField
                                            name="name"
                                            errors={errors}
                                            register={register}
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td>Номер</td>
                                    <td>
                                        <FormField
                                            name="number"
                                            errors={errors}
                                            register={register}
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td>profile</td>
                                    <td>
                                        <select
                                            ref={register}
                                            name="profile"
                                            id="profile"
                                        >
                                            {profileRow.map((option) => (
                                                <option
                                                    key={option}
                                                    value={option}
                                                >
                                                    {option}
                                                </option>
                                            ))}
                                        </select>
                                        {/* <FormField
                                            name="profile"
                                            errors={errors}
                                            register={register}
                                        /> */}
                                    </td>
                                    <td>
                                        <em>
                                            Профиль с -rec означает запись
                                            конференции
                                        </em>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Использовать пароль</td>
                                    <td>
                                        <input
                                            type="checkbox"
                                            ref={register}
                                            name="issecret"
                                            id="issecret"
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td>Пароль</td>
                                    <td>
                                        <FormField
                                            name="password"
                                            errors={errors}
                                            register={register}
                                        />
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </Box>
                ) : null}
            </form>
        </React.Fragment>
    )
}
