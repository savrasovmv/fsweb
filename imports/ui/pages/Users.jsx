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
//import { directoryTables } from '../DBTables'

import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { ButtonGroup, FormControl, Select } from '@material-ui/core'

// const fetch = require('node-fetch');

// const defaultDirectory = directoryTables.map(item => {
//     const container = {};
//     container[item] = '';
//     return container;
// })
// let defaultValues = defaultDirectory

const schema = yup.object().shape({
    domain_id: yup.number().required().positive().integer(),
    name: yup.string().required().min(3, 'Минимум 3 символа'),
    mailbox: yup.string(),
    'number-alias': yup.string().required().min(2, 'Минимум 2 символа'),
    toll_allow: yup.string(),
    context_id: yup.number().required().positive().integer(),
    default_gateway: yup.string(),
    effective_caller_id_name: yup.string(),
    effective_caller_id_number: yup.string(),
    outbound_caller_id_name: yup.string(),
    outbound_caller_id_number: yup.string(),
    // callgroup: yup.string(),
    // uservar1: yup.string(),
    // uservar2: yup.string(),
    // uservar3: yup.string(),
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

// const FormField = ({ name, errors, register }) => {
//     return (
//         <>

//             <TextField
//                 variant="outlined"
//                 margin="normal"
//                 fullWidth
//                 inputRef={register}
//                 id={name}
//                 label={name}
//                 name={name}
//                 size="small"
//             />
//             {errors[name] && <font color="red">{errors[name].message}<br /></font>}

//         </>
//     )
// }
const CheckBoxField = ({ name, lable, errors, register, control }) => {
    return (
        <>
            <Controller
                name={name}
                control={control}
                defaultValue={false}
                //rules={{ required: true }}
                render={() => (
                    <FormControlLabel
                        control={
                            <Checkbox
                                inputRef={register}
                                color="primary"
                                id={name}
                                label={name}
                                name={name}
                            />
                        }
                        label={lable}
                    />
                )}
            />
            {errors[name] && (
                <font color="red">
                    {errors[name].message}
                    <br />
                </font>
            )}
        </>
    )
}

const SelectField = ({ name, errors, register, control, value, values }) => {
    console.log('VALUE', value)
    return (
        <>
            <Controller
                name={name}
                control={control}
                defaultValue={false}
                render={() => (
                    <FormControl
                        control={
                            <TextField
                                id={name}
                                inputRef={register}
                                select
                                label={name}
                                name={name}
                                //value={value}
                                variant="filled"
                            >
                                {values.map((option) => (
                                    <MenuItem key={option.id} value={option.id}>
                                        {option.id} {option.name}
                                    </MenuItem>
                                ))}
                            </TextField>
                        }
                    />
                )}
            />
            {errors[name] && (
                <font color="red">
                    {errors[name].message}
                    <br />
                </font>
            )}
        </>
    )
}

const TABLE = 'web_users'
const DIRECTORY_TABLE = 'web_directory'

//console.log("directoryTables", directoryTables)
export const Users = ({ isCreate = false }) => {
    //const [directory, setDirectory] = useState(defaultDirectory)
    const [domain, setDomain] = React.useState([])
    const [context, setContext] = React.useState([])
    const [domainId, setDomainId] = React.useState()
    const [direrctoryList, setDirectoryList] = React.useState([])
    const [open, setOpen] = useState(false)

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
        //APIClient.v1.get('getDirectoryById', { directoryId: id })
        dom = APIClient.v1.get('/web_domain', {})
        dom.then((resolve) => {
            console.log('domain', resolve)
            setDomain(resolve)
        }).catch((error) => {
            console.log('Err = ', error)
            setDomain([])
        })
        con = APIClient.v1.get('/web_context', {})
        con.then((resolve) => {
            console.log('context', resolve)
            setContext(resolve)
        }).catch((error) => {
            console.log('Err = ', error)
            setContext([])
        })

        if (!isCreate) {
            users = APIClient.v1.get(TABLE, { id: id })
            users
                .then((resolve) => {
                    console.log('111', resolve)
                    //setDirectory(resolve.result[0])
                    if (resolve.length > 0) {
                        for (const [key, value] of Object.entries(resolve[0])) {
                            //console.log(`${key}: ${value}`);
                            setValue(key, value)
                        }
                        APIClient.v1
                            .get(DIRECTORY_TABLE, { users_id: id })
                            .then((resolve) => {
                                console.log('DIRECTORY_TABLE', resolve)
                                setDirectoryList(resolve)
                            })
                            .catch((error) => {
                                console.log('Err = ', error)
                                setDirectoryList([])
                            })

                        //setDomainId(getValues('domain_id'))
                        //setOpen(true)
                        //console.log('domain_id', domainId)
                        //console.log('OPEN')

                        //console.log('domain_id', domain_id)
                    }
                })
                .catch((error) => {
                    console.log('Err = ', error)
                })

            Promise.all([users, dom, con]).then(() => {
                //console.log("values", values);
                setOpen(true)
            })
        } else {
            Promise.all([dom, con]).then(() => {
                //console.log("values", values);
                setOpen(true)
            })
        }
    }, [])

    const handleSubmitClick = (data) => {
        console.log('data===', data)

        APIClient.v1
            .post(TABLE, {}, { isCreate: isCreate, data: data })
            .then((resolve) => {
                console.log('result', resolve)
                //setDirectory(resolve.result[0])
                history.goBack()
            })
            .catch((error) => {
                console.log('Err = ', error)
                //setDirectoryList(defaultDirectory)
            })
    }

    const handleDeleteDirectory = (directory_id) => {
        console.log('DELETE', directory_id)
        result = confirm('Вы действительно хотите удалить запись?')
        if (result) {
            APIClient.v1
                .delete(DIRECTORY_TABLE, { id: directory_id })
                .then((resolve) => {
                    console.log('result', resolve)
                    //setDirectory(resolve.result[0])
                    console.log('Запись удалена')
                    history.go(0)
                })
                .catch((error) => {
                    console.log('Err = ', error)
                    //setDirectoryList(defaultDirectory)
                })
        }
    }

    const hendleUpdateLDAP = () => {
        console.log('hendleUpdateLDAP')
        const number = getValues('number-alias')
        if (number === '') {
            alert('Номер не может быть пустым')
            return
        }
        APIClient.v1
            .get('/ldap', { number: number })
            .then((resolve) => {
                console.log('result', resolve)
                console.log('result typeof', typeof resolve)
                res = JSON.parse(resolve)
                let ar = res.dn.split(',')
                let fil = ar[1].replace('OU=', '')
                console.log('fil', fil)
                setValue('ldap_sAMAccountName', res.sAMAccountName)
                setValue('ldap_ou', fil)
                setValue('ldap_department', res.department)
                setValue('ldap_title', res.title)
                setValue('name', res.cn)
            })
            .catch((error) => {
                console.log('Err = ', error)
                //setDirectoryList(defaultDirectory)
            })
    }

    return (
        <React.Fragment>
            <Title>Поьзователь</Title>
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

                        {/* <TextField
                            id="domain_id"
                            inputRef={register}
                            select
                            label="domain_id"
                            name="domain_id"
                            //value={domain_id}
                            //onChange={handleChange}
                            //helperText="Please select your currency"
                            //variant="filled"
                            >
                            {domain.map((option) => (
                                <MenuItem key={option.id} value={option.id}>
                                {option.id} {option.name}
                                </MenuItem>
                            ))}
                        </TextField> */}
                        {/* {...register("domain_id")} */}
                        {/* <label> Домен
                        <select ref={register} name="domain_id" id="domain_id" >
                            {domain.map((option) => (
                                <option
                                     key={option.id} 
                                     value={option.id}
                                     //{...domainId===option.id ? "selected" : null}
                                     >
                                         {option.name}
                                </option>
                               
                            ))}
                        </select> 
                        </label> */}

                        {/*  <FormField name="domain_id" errors={errors} register={register} /> */}
                        <table>
                            <tbody>
                                <tr>
                                    <td>Отключен</td>
                                    <td>
                                        <input
                                            type="checkbox"
                                            ref={register}
                                            name="isdisable"
                                            id="isdisable"
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td>Домен</td>
                                    <td>
                                        <select
                                            ref={register}
                                            name="domain_id"
                                            id="domain_id"
                                        >
                                            {domain.map((option) => (
                                                <option
                                                    key={option.id}
                                                    value={option.id}
                                                >
                                                    {option.name}
                                                </option>
                                            ))}
                                        </select>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Контекст</td>
                                    <td>
                                        <select
                                            ref={register}
                                            name="context_id"
                                            id="context_id"
                                        >
                                            {context.map((option) => (
                                                <option
                                                    key={option.id}
                                                    value={option.id}
                                                >
                                                    {option.name}
                                                </option>
                                            ))}
                                        </select>
                                    </td>
                                </tr>
                                <tr>
                                    <td>ФИО</td>
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
                                            name="number-alias"
                                            errors={errors}
                                            register={register}
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td>Филиал</td>
                                    <td>
                                        <FormField
                                            name="ldap_ou"
                                            errors={errors}
                                            register={register}
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td>Отдел</td>
                                    <td>
                                        <FormField
                                            name="ldap_department"
                                            errors={errors}
                                            register={register}
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td>Должность</td>
                                    <td>
                                        <FormField
                                            name="ldap_title"
                                            errors={errors}
                                            register={register}
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td>E-mail</td>
                                    <td>
                                        <FormField
                                            name="email"
                                            errors={errors}
                                            register={register}
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td>Голосовая почта</td>
                                    <td>
                                        <FormField
                                            name="mailbox"
                                            errors={errors}
                                            register={register}
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td>Маршруты</td>
                                    <td>
                                        <FormField
                                            name="toll_allow"
                                            errors={errors}
                                            register={register}
                                        />
                                    </td>
                                </tr>
                                {/* <tr>
                                    <td>Контекст</td>
                                    <td><FormField name="context_id" errors={errors} register={register} /></td>
                                </tr> */}
                                <tr>
                                    <td>default_gateway</td>
                                    <td>
                                        <FormField
                                            name="default_gateway"
                                            errors={errors}
                                            register={register}
                                        />
                                    </td>
                                </tr>

                                <tr>
                                    <td>outbound_caller_id_name</td>
                                    <td>
                                        <FormField
                                            name="outbound_caller_id_name"
                                            errors={errors}
                                            register={register}
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td>outbound_caller_id_number</td>
                                    <td>
                                        <FormField
                                            name="outbound_caller_id_number"
                                            errors={errors}
                                            register={register}
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td>LDAP</td>
                                    <td>
                                        <input
                                            type="checkbox"
                                            ref={register}
                                            name="isldap"
                                            id="isldap"
                                        />
                                        <Button
                                            //type="submit"
                                            variant="contained"
                                            color="primary"
                                            onClick={hendleUpdateLDAP}
                                        >
                                            Обновить
                                        </Button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>sAMAccountName</td>
                                    <td>
                                        <FormField
                                            name="ldap_sAMAccountName"
                                            errors={errors}
                                            register={register}
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td>Переадресация</td>
                                    <td>
                                        <input
                                            type="checkbox"
                                            ref={register}
                                            name="istransfer"
                                            id="istransfer"
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td>transfer_number</td>
                                    <td>
                                        <FormField
                                            name="transfer_number"
                                            errors={errors}
                                            register={register}
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td>Запись разговоров</td>
                                    <td>
                                        <input
                                            type="checkbox"
                                            ref={register}
                                            name="isrecord"
                                            id="isrecord"
                                        />
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        {/* <FormField name="name" errors={errors} register={register} />
                        <FormField name="number-alias" errors={errors} register={register} />
                        <FormField name="email" errors={errors} register={register} />
                        <FormField name="mailbox" errors={errors} register={register} />
                        <FormField name="toll_allow" errors={errors} register={register} />
                        <FormField name="context_id" errors={errors} register={register} />
                        <FormField name="default_gateway" errors={errors} register={register} />
                        <FormField name="effective_caller_id_name" errors={errors} register={register} />
                        <FormField name="effective_caller_id_number" errors={errors} register={register} />
                        <FormField name="outbound_caller_id_name" errors={errors} register={register} />
                        <FormField name="outbound_caller_id_number" errors={errors} register={register} />


                      
                        <CheckBoxField
                            name="isldap"
                            errors={errors}
                            register={register}
                            lable="LDAP user"
                            control={control}
                        />
                        <FormField name="sAMAccountName" errors={errors} register={register} />
                        <CheckBoxField
                            name="istransfer"
                            errors={errors}
                            register={register}
                            lable="Переадресация"
                            control={control}
                        />
                        <FormField name="transfer_number" errors={errors} register={register} />
                        <CheckBoxField
                            name="isrecord"
                            errors={errors}
                            register={register}
                            lable="Запись разговора"
                            control={control}
                        /> */}
                    </Box>
                ) : null}
            </form>
            <Box mt={3}>
                <Title>Список директорий</Title>

                {direrctoryList ? (
                    <>
                        {id ? (
                            <Box display="flex" justifyContent="flex-end">
                                <ButtonGroup>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        size="small"
                                        startIcon={<AddIcon />}
                                        component={ReactLink}
                                        to={
                                            '/web_users:' +
                                            id +
                                            '/web_directoryCreate' +
                                            getValues('name')
                                        }
                                    >
                                        Добавить
                                    </Button>
                                </ButtonGroup>
                            </Box>
                        ) : null}
                        <Table size="small">
                            <TableHead>
                                <TableRow>
                                    <TableCell>id</TableCell>
                                    <TableCell>Рег. имя</TableCell>
                                    <TableCell>Стац.тел</TableCell>
                                    <TableCell>Mac</TableCell>
                                    <TableCell>Редак.</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {direrctoryList.map((row) => (
                                    <TableRow key={row.id}>
                                        <TableCell>{row.id}</TableCell>
                                        <TableCell>{row.regname}</TableCell>
                                        <TableCell>
                                            {row.isphone ? 'Да' : 'Нет'}
                                        </TableCell>
                                        <TableCell>{row.mac_address}</TableCell>
                                        {/* <TableCell>{row.effective_caller_id_name}</TableCell>
                    <TableCell>{row.effective_caller_id_number}</TableCell> */}
                                        <TableCell>
                                            <IconButton
                                                component={ReactLink}
                                                to={
                                                    '/' +
                                                    DIRECTORY_TABLE +
                                                    ':' +
                                                    row.id
                                                }
                                            >
                                                <EditIcon />
                                            </IconButton>
                                        </TableCell>
                                        <TableCell>
                                            <IconButton
                                                onClick={() =>
                                                    handleDeleteDirectory(
                                                        row.id
                                                    )
                                                }
                                            >
                                                <DeleteIcon />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </>
                ) : (
                    'Нет данных'
                )}
            </Box>
        </React.Fragment>
    )
}
