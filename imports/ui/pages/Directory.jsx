import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form'
import { Link as ReactLink } from 'react-router-dom'
import {

    useParams,
    useRouteMatch
} from "react-router-dom";

import { Title } from '../components/Title';

import history from "../../utils/history";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { ButtonGroup, FormControl, Select } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';

import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';

import Box from '@material-ui/core/Box'

import { APIClient } from '../../utils/RestApiClient'
//import { directoryTables } from '../DBTables'

import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";


// const fetch = require('node-fetch');

// const defaultDirectory = directoryTables.map(item => {
//     const container = {};
//     container[item] = '';
//     return container;
// })
// let defaultValues = defaultDirectory

const schema = yup.object().shape({
    // domain: yup.string().required(),
    regname: yup.string().required().min(3, "Минимум 3 символа"),
    // mailbox: yup.string(),
    // "number-alias": yup.string(),
    // cidr: yup.string(),
    password: yup.string().required().min(6, "Минимум 6 символа"),
    // toll_allow: yup.string(),
    // user_context: yup.string(),
    // default_gateway: yup.string(),
    // effective_caller_id_name: yup.string(),
    // effective_caller_id_number: yup.string(),
    // outbound_caller_id_name: yup.string(),
    // outbound_caller_id_number: yup.string(),
    // callgroup: yup.string(),
    // uservar1: yup.string(),
    // uservar2: yup.string(),
    // uservar3: yup.string(),
});

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

            {errors[name] && <font color="red">{errors[name].message}<br /></font>}

        </Box>
    )
}

// const FormField = ({ name, errors, register, disabled=false }) => {
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
//                 disabled = {disabled ? true : false }
//             />
//             {errors[name] && <font color="red">{errors[name].message}<br/></font>}

//         </>
//     )
// }



//console.log("directoryTables", directoryTables)
export const Directory = ({ isCreate = false }) => {
    const [phoneModel, setPhoneModel] = useState([])
    const [open, setOpen] = useState(false)

    
    const { register, errors, handleSubmit, setValue, unregister } = useForm(
        {
            mode: 'onBlur',
            defaultValues: {},
            resolver: yupResolver(schema),
            shouldUnregister: false
        }
    )

    let { id, users } = useParams();

    useEffect(() => {
        //APIClient.v1.get('getDirectoryById', { directoryId: id })
        
        if (!isCreate) {
            dir = APIClient.v1.get('web_directory', { id: id })
            dir.then((resolve) => {
                    console.log('web_directory', resolve)
                    //setDirectory(resolve.result[0])
                    if (resolve.length > 0) {

                        for (const [key, value] of Object.entries(resolve[0])) {
                            console.log(`${key}: ${value}`);
                            if (key === 'web_users') {
                                setValue(key, value.name)

                            } else {
                                setValue(key, value)
                            }
                        }

                       
                    }
                })
                .catch((error) => {
                    console.log('Err = ', error)
                })

            model = APIClient.v1.get('web_phone_model', {})
            model.then((resolve) => {
                console.log('web_phone_model', resolve)
                //setDirectory(resolve.result[0])
                if (resolve.length > 0) {
                    setPhoneModel(resolve)
                }
            })
            .catch((error) => {
                console.log('Err = ', error)
            })

            Promise.all([dir, model]).then(() => {
                //console.log("values", values);
                setOpen(true)
            });
        } else {
            model = APIClient.v1.get('web_phone_model', {})
            model.then((resolve) => {
                console.log('web_phone_model', resolve)
                //setDirectory(resolve.result[0])
                if (resolve.length > 0) {
                    setPhoneModel(resolve)
                }
            })
            .catch((error) => {
                console.log('Err = ', error)
            })
            Promise.all([model]).then(() => {
                //console.log("values", values);
                setOpen(true)
            });
            setValue('users_id', id)
            setValue('web_users', users)
            //setOpen(true)
        }
        


    }, [])

   
    const handleSubmitClick = (data) => {
        console.log("data===", data)
        delete data.web_users
        APIClient.v1.post('web_directory', {}, { isCreate: isCreate, data: data })
            .then((resolve) => {
                console.log('result', resolve)
                // console.log('history.goBack()', history)
                history.goBack()

            })
            .catch((error) => {
                console.log('Err = ', error)
                //setDirectoryList(defaultDirectory)
            })

    }

    //const handleCancel = () =
    //console.log("history.location.pathname", history)
    return (
        <React.Fragment>
            <Title>Директория пользователя</Title>
            <form noValidate autoComplete="off" onSubmit={handleSubmit(handleSubmitClick)}>
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
                                    <td>Пользователь</td>
                                    <td><input type="text" readOnly ref={register} id="web_users" name="web_users"/></td>
                                </tr>
                                <tr>
                                    <td>Регистрационное имя</td>
                                    <td><FormField name="regname" errors={errors} register={register} /></td>
                                </tr>
                                <tr>
                                    <td>cidr</td>
                                    <td><FormField name="cidr" errors={errors} register={register} /></td>
                                </tr>
                                <tr>
                                    <td>Пароль</td>
                                    <td><FormField name="password" errors={errors} register={register} /></td>
                                </tr>
                                <tr>
                                    <td>Стационарный телефон</td>
                                    <td><input type="checkbox" ref={register} name="isphone" id="isphone" /></td>
                                </tr>
                                <tr>
                                    <td>Mac адрес телефона</td>
                                    <td><FormField name="mac_address" errors={errors} register={register} /></td>
                                </tr>
                                <tr>
                                    <td>Модель</td>
                                    <td>
                                        <select ref={register} name="phone_model_id" id="phone_model_id" >
                                            {phoneModel.map((option) => (
                                                <option key={option.id} value={option.id}>
                                                    {option.name}
                                                </option>
                                            ))}
                                        </select>

                                    </td>
                                </tr>

                            </tbody>
                        </table>
                        {/* <FormField name="users" disabled={true} errors={errors} register={register}/>
                        <FormField name="regname" errors={errors} register={register}/>
                        <FormField name="cidr" errors={errors} register={register}/>
                        <FormField name="password" errors={errors} register={register}/>
                        <FormField name="mac_address" errors={errors} register={register}/>
                        <FormField name="password" errors={errors} register={register}/>
                        <FormField name="password" errors={errors} register={register}/> */}
                        
                        
                            {/* <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                            >
                                Сохранить
                            </Button>

                            <Button
                                variant="contained"
                                color="secondary"
                                onClick={()=>history.goBack()}
                            >

                                Отмена
                            </Button> */}
                       
                    
                    
                    </Box>


                ) : null}
            </form>
        </React.Fragment>
    );
}