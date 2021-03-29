import React, { useState, useEffect } from 'react';
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

//console.log("directoryTables", directoryTables)
export const Directory = () => {
    const [directory, setDirectory] = useState(
        {
            domain: '',
            id: '',
            "number-alias": '',
            effective_caller_id_name: '',
            effective_caller_id_number: ''
        }
    )
    let { id } = useParams();

    useEffect(() => {
        APIClient.v1.get('getDirectoryById', { directoryId: id })
            .then((resolve) => {
                console.log('111', resolve)
                setDirectory(resolve.result[0])

            })
            .catch((error) => {
                console.log('Err = ', error)
                setDirectoryList([])
            })

    }, [])

    const submit = e => {
        e.preventDefault();
        console.log('Submit')

    };
    const cancel = e => {
        e.preventDefault();
        console.log('cancel')

    };

    const fieldsList = directoryTables.map((item, index) => 
        
        <TextField
                    key={index}
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    
                    id={item}
                    label={item}
                    name={item}
                    value={directory[item]  || ''}
                />

    )
    console.log("fieldsList", fieldsList)
    

    return (
        <React.Fragment>
            <h1>Директория пользователя id: {id}</h1>
            <p>{directory.id}</p>
            <p>{directory.domain}</p>
            <p>{directory["number-alias"]}</p>
            <form noValidate onSubmit={submit}>
                <Box width="50%" m={10}>
                {fieldsList}
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