import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form'
import { Link as ReactLink } from 'react-router-dom'
import {

    useParams,
    useRouteMatch
} from "react-router-dom";

import history from "../../utils/history";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
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
    userid: yup.string().required().min(3, "Минимум 3 символа"),
    // mailbox: yup.string(),
    // "number-alias": yup.string(),
    // cidr: yup.string(),
    password: yup.string(),
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


const FormField = ({ name, errors, register, disabled=false }) => {
    return (
        <>

            <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                inputRef={register}
                id={name}
                label={name}
                name={name}
                disabled = {disabled ? true : false }
            />
            {errors[name] && <font color="red">{errors[name].message}<br/></font>}

        </>
    )
}



//console.log("directoryTables", directoryTables)
export const Directory = ({ isCreate = false, redirect='/directory' }) => {
    //const [directory, setDirectory] = useState(defaultDirectory)
    const [open, setOpen] = useState(false)

    
    const { register, errors, handleSubmit, setValue, unregister } = useForm(
        {
            mode: 'onBlur',
            defaultValues: {},
            resolver: yupResolver(schema),
            shouldUnregister: false
        }
    )

    let { id, group_id } = useParams();

    useEffect(() => {
        //APIClient.v1.get('getDirectoryById', { directoryId: id })
        
        if (!isCreate) {
            APIClient.v1.get('directory', { id: id })
                .then((resolve) => {
                    console.log('111', resolve)
                    //setDirectory(resolve.result[0])
                    if (resolve.length > 0) {

                        for (const [key, value] of Object.entries(resolve[0])) {
                            //console.log(`${key}: ${value}`);
                            if (key === 'groups') {
                                setValue(key, value.name)

                            } else {
                                setValue(key, value)
                            }
                        }

                        setOpen(true)
                    }
                })
                .catch((error) => {
                    console.log('Err = ', error)
                })
        } else {
            setOpen(true)
        }
        


    }, [])

   
    const handleSubmitClick = (data, event) => {
        console.log("event===", event)
        console.log("data===", data)
        delete data.groups
        APIClient.v1.post('directory', {}, { isCreate: isCreate, data: data })
            .then((resolve) => {
                console.log('result', resolve)
                console.log('history.goBack()', history)
                history.goBack()

            })
            .catch((error) => {
                console.log('Err = ', error)
                //setDirectoryList(defaultDirectory)
            })

    }

    //const handleCancel = () =
    console.log("history.location.pathname", history)
    return (
        <React.Fragment>
            <h1>Директория пользователя</h1>
            <form noValidate autoComplete="off" onSubmit={handleSubmit(handleSubmitClick)}>
                {open ? (
                    <Box width="50%" m={1}>
                        <FormField name="groups" disabled={true} errors={errors} register={register}/>
                        <FormField name="userid" errors={errors} register={register}/>
                        {/* <FormField name="number-alias" errors={errors} register={register}/>
                        <FormField name="mailbox" errors={errors} register={register}/>*/}
                        <FormField name="cidr" errors={errors} register={register}/>
                        <FormField name="password" errors={errors} register={register}/>
                        {/* <FormField name="toll_allow" errors={errors} register={register}/>
                        <FormField name="user_context" errors={errors} register={register}/>
                        <FormField name="default_gateway" errors={errors} register={register}/>
                        <FormField name="effective_caller_id_name" errors={errors} register={register}/>
                        <FormField name="effective_caller_id_number" errors={errors} register={register}/>
                        <FormField name="outbound_caller_id_name" errors={errors} register={register}/>
                        <FormField name="outbound_caller_id_number" errors={errors} register={register}/>
                        <FormField name="callgroup" errors={errors} register={register}/>
                        <FormField name="uservar1" errors={errors} register={register}/>
                        <FormField name="uservar2" errors={errors} register={register}/>
                        <FormField name="uservar3" errors={errors} register={register}/> */}
                        
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
                                onClick={()=>history.goBack()}
                                //component={ReactLink}
                                //to={history.location.pathname}
                            >

                                Отмена
                            </Button>
                       
                    
                    
                    </Box>


                ) : null}
            </form>
        </React.Fragment>
    );
}