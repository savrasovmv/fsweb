import React, { useState, useEffect } from 'react';
import {useForm} from 'react-hook-form'
import { Link as ReactLink } from 'react-router-dom'
import {

    useParams,
    useRouteMatch
} from "react-router-dom";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import Box from '@material-ui/core/Box'

import { APIClient } from '../../utils/RestApiClient'
import { directoryTables } from '../DBTables'

const fetch = require('node-fetch');

const defaultDirectory = directoryTables.map(item => {
    const container = {};
    container[item] = '';
    return container;
})
let defaultValues = defaultDirectory


export const FormField = ({ name, value = '', handleValue , register}) => {
    return (
        <Box>
        <label>
            {name}:
                    
            <input ref={register} type="text" id={name} name={name}  value={value}  onChange={(e) => handleValue(name, e.target.value)} />
        </label>
        </Box>
    );
}


//console.log("directoryTables", directoryTables)
export const Directory = () => {
    const [directory, setDirectory] = useState(defaultDirectory)
    const [open, setOpen] = useState(false)

    const {register, handleSubmit, setValue} = useForm({
        defaultValues,
        shouldUnregister: false
      })

    let { id, domain } = useParams();

    console.log("directory", directory)
    useEffect(() => {
        APIClient.v1.get('getDirectoryById', { directoryId: id })
            .then((resolve) => {
                console.log('111', resolve)
                setDirectory(resolve.result[0])
                
                //domain = resolve.result[0].domain
                setValue("domain", resolve.result[0].domain)
                setOpen(true)
                //setValue(directory)
                //setTimeout(() => setValue(directory));
            })
            .catch((error) => {
                console.log('Err = ', error)
               // setDirectoryList(defaultDirectory)
            })

    }, [])

    // useEffect(() => {
     
    //     setTimeout(() => setValue("domain", directory.domain), [3000])
            

    // }, [directory])

    const submit = e => {
        e.preventDefault();
        console.log('Submit', directory)
        

    };
    const cancel = e => {
        e.preventDefault();
        console.log('cancel')

    };

    const handleValue = (item, value) => {
        console.log("value", value)
        
        setDirectory((prev) => ({
            ...prev,
            [item]: value,

        }))
    }

    // const fieldsList = {}
    useEffect(() => {
        console.log('directoryID', directory)

    }, [directory])

    //console.log("fieldsList", fieldsList)

    const handleSubmitClick = (data) =>{
        console.log("data===", data)

        // APIClient.v1.post('UpdateDirectoryById', {}, {directoryId: id, directory: directory})
        //     .then((resolve) => {
        //         console.log('result', resolve)
        //         //setDirectory(resolve.result[0])

        //     })
        //     .catch((error) => {
        //         console.log('Err = ', error)
        //         //setDirectoryList(defaultDirectory)
        //     })

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
            <Button
                    type="text"

                    variant="contained"
                    onClick={hendleAPI}
                >

                    API
                </Button>
            <p>{directory.id}</p>
            <p>{directory.domain}</p>
            <p>{directory["number-alias"]}</p>
            <form noValidate autoComplete="off" onSubmit={handleSubmit(handleSubmitClick)}>
                <Box width="50%" m={10}>
                <FormField name="id" value={directory.id} handleValue={handleValue} register={register}/>
                <FormField name="domain" value={directory.domain} handleValue={handleValue} register={register}/>
                <FormField name="number-alias" value={directory["number-alias"]} handleValue={handleValue} register={register}/> 
                <label>
                    id:
                    {/* <input ref={register} type="text" id="id" name="id"  value={directory.id  || ''}  onChange={(e) => handleValue("id", e.target.value)} /> */}
                    <input ref={register} type="text" id="id" name="id"  value={directory.id  || ''}  onChange={(e) => handleValue("id", e.target.value)} />
                </label>
                <label>
                    domain:
                    <input ref={register} type="text" id="domain" name="domain"  value={directory.domain  || ''}  onChange={(e) => handleValue("domain", e.target.value)} />
                </label>
                { open ? (
                <TextField
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    inputRef={register}
                    id="domain"
                    label="domain"
                    name="domain"
                    //defaultValue={domain}
                    onChange={(e) => handleValue("domain", e.target.value)}
                />
                ):null}
                </Box>
                
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
                    //onClick={cancel}
                    component={ReactLink}
                    to='/directory'
                >

                    Отмена
                </Button>

            </form>

        </React.Fragment>
    );
}