import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form'
import { Link as ReactLink } from 'react-router-dom'
import {

    useParams,
    useRouteMatch
} from "react-router-dom";

import history from "../../utils/history";
import TextField from '@material-ui/core/TextField';
import Alert from '@material-ui/lab/Alert';
import { Title } from '../components/Title';

import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';

import Table from '@material-ui/core/Table';
import Box from '@material-ui/core/Box';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';

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
    name: yup.string().required().min(3, "Минимум 3 символа"),
    mailbox: yup.string(),
    "number-alias": yup.string(),
    toll_allow: yup.string(),
    user_context: yup.string(),
    default_gateway: yup.string(),
    effective_caller_id_name: yup.string(),
    effective_caller_id_number: yup.string(),
    outbound_caller_id_name: yup.string(),
    outbound_caller_id_number: yup.string(),
    // callgroup: yup.string(),
    // uservar1: yup.string(),
    // uservar2: yup.string(),
    // uservar3: yup.string(),
});


const FormField = ({ name, errors, register }) => {
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
export const Groups = ({ isCreate = false }) => {
    //const [directory, setDirectory] = useState(defaultDirectory)
    const [direrctoryList, setDirectoryList] = React.useState([])
    const [open, setOpen] = useState(false)

    const { register, errors, handleSubmit, setValue } = useForm(
        {
            mode: 'onBlur',
            defaultValues: {},
            resolver: yupResolver(schema),
            shouldUnregister: false
        }
    )
    let { path, url } = useRouteMatch();
    let { id } = useParams();

    useEffect(() => {
        //APIClient.v1.get('getDirectoryById', { directoryId: id })
        if (!isCreate) {
            APIClient.v1.get('groups', { id: id })
                .then((resolve) => {
                    console.log('111', resolve)
                    //setDirectory(resolve.result[0])
                    if (resolve.length > 0) {

                        for (const [key, value] of Object.entries(resolve[0])) {
                            //console.log(`${key}: ${value}`);
                            setValue(key, value)
                        }
                        APIClient.v1.get('directory', {group_id: id})
                        .then((resolve) => {
                            console.log('111', resolve)
                            //console.log('222',resolve.headers.get('Content-Type'))
                            //setDirectoryList(resolve.result)
                            setDirectoryList(resolve)

                        })
                        .catch((error) => {
                            console.log('Err = ', error)
                            setDirectoryList([])
                        })

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

    const handleSubmitClick = (data) => {
        console.log("data===", data)

        APIClient.v1.post('groups', {}, { isCreate: isCreate, directory: data })
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
    
    return (
        <React.Fragment>
            <h1>Группа</h1>
            <form noValidate autoComplete="off" onSubmit={handleSubmit(handleSubmitClick)}>
                {open ? (
                    <Box width="50%" m={1}>
                        <FormField name="domain" errors={errors} register={register}/>
                        <FormField name="name" errors={errors} register={register}/>
                        <FormField name="number-alias" errors={errors} register={register}/>
                        <FormField name="mailbox" errors={errors} register={register}/>
                        <FormField name="toll_allow" errors={errors} register={register}/>
                        <FormField name="user_context" errors={errors} register={register}/>
                        <FormField name="default_gateway" errors={errors} register={register}/>
                        <FormField name="effective_caller_id_name" errors={errors} register={register}/>
                        <FormField name="effective_caller_id_number" errors={errors} register={register}/>
                        <FormField name="outbound_caller_id_name" errors={errors} register={register}/>
                        <FormField name="outbound_caller_id_number" errors={errors} register={register}/>
                        {/*<FormField name="callgroup" errors={errors} register={register}/>
                         <FormField name="uservar1" errors={errors} register={register}/>
                        <FormField name="uservar2" errors={errors} register={register}/>
                        <FormField name="uservar3" errors={errors} register={register}/>  */}
                        
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
                                onClick={()=>history.goBack()}
                            >

                                Отмена
                            </Button>
                       
                    
                    
                    </Box>


                ) : null}
            </form>
            <Title>Список директорий</Title>
      
      {direrctoryList ? (
            <>
            
            
            <Table size="small">
            <TableHead>
                <TableRow>
                <TableCell>id</TableCell>
                <TableCell>callgroup</TableCell>
                <TableCell>userid</TableCell>
                {/* <TableCell>effective_caller_id_name</TableCell>
                <TableCell >effective_caller_id_number</TableCell> */}
                <TableCell >Редак.</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>



                {direrctoryList.map((row) => (
                <TableRow key={row.id}>
                    <TableCell>{row.id}</TableCell>
                    <TableCell>{row.groups.name}</TableCell>
                    <TableCell>{row.userid}</TableCell>
                    {/* <TableCell>{row.effective_caller_id_name}</TableCell>
                    <TableCell>{row.effective_caller_id_number}</TableCell> */}
                    <TableCell>
                    <IconButton component={ReactLink} to={url+'/directory:'+row.id}>
                    <EditIcon />
                    </IconButton>
                    </TableCell>
                </TableRow>
                ))
                }

            </TableBody>
            </Table>
            </>
        ) : "Нет данных"}
     

        </React.Fragment>
    );
}