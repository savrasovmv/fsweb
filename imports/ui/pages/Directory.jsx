import React, { useState, useEffect } from 'react';
import {useForm} from 'react-hook-form'
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
    domain: yup.string().required(),
    userid: yup.string().required().min(3, "Минимум 3 символа"),
    mailbox: yup.string(),
    "number-alias": yup.string(),
    cidr: yup.string(),
    password: yup.string(),
    toll_allow: yup.string(),
    user_context: yup.string(),
    default_gateway: yup.string(),
    effective_caller_id_name: yup.string(),
    effective_caller_id_number: yup.string(),
    outbound_caller_id_name: yup.string(),
    outbound_caller_id_number: yup.string(),
    callgroup: yup.string(),
    uservar1: yup.string(),
    uservar2: yup.string(),
    uservar3: yup.string(),
  });


  const FormField = ({name, errors, register}) => {
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
                    />
             {errors[name] && <font color="red">{errors[name].message}</font>}

          </>
      )
  }



//console.log("directoryTables", directoryTables)
export const Directory = ({isCreate=false}) => {
    //const [directory, setDirectory] = useState(defaultDirectory)
    const [open, setOpen] = useState(false)

    const {register, errors, handleSubmit, setValue} = useForm(
        {
            mode: 'onBlur',
            defaultValues: {},
            resolver: yupResolver(schema),
            shouldUnregister: false
        }
      )

    let { id } = useParams();

    useEffect(() => {
        //APIClient.v1.get('getDirectoryById', { directoryId: id })
        if (!isCreate){
            APIClient.v1.get('directory', { id: id })
                .then((resolve) => {
                    console.log('111', resolve)
                    //setDirectory(resolve.result[0])
                    if (resolve.length>0) {

                        for (const [key, value] of Object.entries(resolve[0])) {
                            //console.log(`${key}: ${value}`);
                            setValue(key, value)
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

    const handleSubmitClick = (data) =>{
        console.log("data===", data)

        APIClient.v1.post('directory', {}, {isCreate: isCreate, directory: data})
            .then((resolve) => {
                console.log('result', resolve)
                //setDirectory(resolve.result[0])
                history.push("/directory");

            })
            .catch((error) => {
                console.log('Err = ', error)
                //setDirectoryList(defaultDirectory)
            })

    }

    const hendleAPI = () => {
        console.log("hendleAPI")
        APIClient.v1.get('postgres', {})
            .then((resolve) => {
                console.log('postgres', resolve)
                //setDirectory(resolve.result[0])

            })
            .catch((error) => {
                console.log('Err = ', error)
                //setDirectoryList(defaultDirectory)
            })

    }


    console.log('render')
    return (
        <React.Fragment>
            <h1>Директория пользователя id: {id}</h1>
            
            <form noValidate autoComplete="off" onSubmit={handleSubmit(handleSubmitClick)}>
                <Box width="50%" m={10}>
               
                { open ? (
                    <Box>
                    <FormField name="domain" errors={errors} register={register}/>
                    <FormField name="userid" errors={errors} register={register}/>
                    <FormField name="number-alias" errors={errors} register={register}/>
                    <FormField name="mailbox" errors={errors} register={register}/>
                    <FormField name="cidr" errors={errors} register={register}/>
                    <FormField name="password" errors={errors} register={register}/>
                    <FormField name="toll_allow" errors={errors} register={register}/>
                    <FormField name="user_context" errors={errors} register={register}/>
                    <FormField name="default_gateway" errors={errors} register={register}/>
                    <FormField name="effective_caller_id_name" errors={errors} register={register}/>
                    <FormField name="effective_caller_id_number" errors={errors} register={register}/>
                    <FormField name="outbound_caller_id_name" errors={errors} register={register}/>
                    <FormField name="outbound_caller_id_number" errors={errors} register={register}/>
                    <FormField name="callgroup" errors={errors} register={register}/>
                    <FormField name="uservar1" errors={errors} register={register}/>
                    <FormField name="uservar2" errors={errors} register={register}/>
                    <FormField name="uservar3" errors={errors} register={register}/>
                    
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                        >
                            Сохранить
                        </Button>

                        <Button
                            type="submit"
                            variant="contained"
                            color="secondary"
                            component={ReactLink}
                            to='/directory'
                        >

                            Отмена
                        </Button>
                    </Box>
                ):null}
                
                </Box>

            </form>

        </React.Fragment>
    );
}