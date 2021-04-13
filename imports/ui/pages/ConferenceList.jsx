import React, { useEffect } from 'react'
import Link from '@material-ui/core/Link'
import { makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import Box from '@material-ui/core/Box'
import TableContainer from '@material-ui/core/TableContainer'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import { Title } from '../components/Title'
import { APIClient } from '../../utils/RestApiClient'
import IconButton from '@material-ui/core/IconButton'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'
import AddIcon from '@material-ui/icons/Add'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import Pagination from '@material-ui/lab/Pagination'
import { Link as ReactLink, useRouteMatch } from 'react-router-dom'
const { utoa, atou } = require('unicode-encode')

// const config = require('config');

// const maxRowList = config.get('maxRowList');
import configData from '../../../config/default.json'

const maxRowList = configData.Pages.maxRowList

const useStyles = makeStyles((theme) => ({
    seeMore: {
        marginTop: theme.spacing(3),
    },
}))

const thisPath = window.location.pathname

const TABLE = 'web_conference'

export const ConferenceList = () => {
    console.log('render', TABLE)

    const [item, setItem] = React.useState([])
    const [filter, setFilter] = React.useState('')
    const [countPage, setCountPage] = React.useState(0)
    const [page, setPage] = React.useState(1)
    const [totalItem, setTotalItem] = React.useState(0)
    const classes = useStyles()

    useEffect(() => {
        APIClient.v1
            .get(TABLE, { page: page, filter: filter })
            .then((resolve) => {
                console.log('web_conference', resolve)
                setItem(resolve)
            })
            .catch((error) => {
                console.log('Err = ', error)
                setItem([])
            })

        APIClient.v1
            .get('countRowTable', { tableName: TABLE, filter: filter })
            .then((resolve) => {
                console.log('COUNT', resolve)
                if (resolve.length > 0) {
                    count = resolve[0].count
                    if (maxRowList > 0) {
                        setCountPage(count / maxRowList)
                    }
                    console.log('COUNT', resolve[0].count)
                    setTotalItem(count)
                }
            })
            .catch((error) => {
                console.log('Err = ', error)
            })
    }, [page, filter])

    let { path, url } = useRouteMatch()
    // console.log('path', path)
    // console.log('url', url)

    const handleChange = (event, value) => {
        setPage(value)
    }

    const hendleSearch = (event) => {
        //setPage(value);
        if (event.keyCode === 13) {
            //alert(event.target.value)
            value = event.target.value

            setFilter(
                'or=(name.ilike.*' + value + '*,number.ilike.*' + value + '*)'
            )
            console.log(filter)
        }
    }

    const handleDelete = (id) => {
        console.log('DELETE', id)
        result = confirm('Вы действительно хотите удалить запись?')
        if (result) {
            APIClient.v1
                .delete(TABLE, { id: id })
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

    return (
        <React.Fragment>
            <Title>Конференции</Title>
            <Box display="flex" p={1} m={1} width="100%">
                <Box flexGrow={1}>
                    <Box display="flex">
                        <Box p={1}>
                            <input
                                type="text"
                                placeholder="Поиск по Номеру или Имени"
                                onKeyDown={hendleSearch}
                            />
                        </Box>
                        <Box p={1}>Всего: {totalItem}</Box>
                        <Box alignItems="center">
                            <Pagination
                                count={countPage}
                                shape="rounded"
                                page={page}
                                onChange={handleChange}
                            />
                        </Box>
                    </Box>
                </Box>
                <Box alignItems="center">
                    <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        startIcon={<AddIcon />}
                        component={ReactLink}
                        to={'/' + TABLE + 'Create'}
                    >
                        Добавить
                    </Button>
                </Box>
            </Box>
            {item ? (
                <>
                    <TableContainer component={Paper}>
                        <Table size="small">
                            <TableHead>
                                <TableRow>
                                    <TableCell>id</TableCell>
                                    <TableCell>Номер</TableCell>
                                    <TableCell>Наименование</TableCell>
                                    <TableCell>Редак.</TableCell>
                                    <TableCell>Удалить</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {item.map((row) => (
                                    <TableRow key={row.id}>
                                        <TableCell>{row.id}</TableCell>
                                        <TableCell>{row.number}</TableCell>
                                        <TableCell>{row.name}</TableCell>
                                        <TableCell>
                                            <IconButton
                                                component={ReactLink}
                                                to={url + ':' + row.id}
                                            >
                                                <EditIcon fontSize="small" />
                                            </IconButton>
                                        </TableCell>
                                        <TableCell>
                                            <IconButton
                                                onClick={() =>
                                                    handleDelete(row.id)
                                                }
                                            >
                                                <DeleteIcon />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </>
            ) : (
                'Нет данных'
            )}
        </React.Fragment>
    )
}
