import React, { useEffect } from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import Box from '@material-ui/core/Box';
import TableContainer from '@material-ui/core/TableContainer';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Title } from '../components/Title';
import { APIClient } from '../../utils/RestApiClient'
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper'
import Pagination from '@material-ui/lab/Pagination';
import { Link as ReactLink, useRouteMatch } from 'react-router-dom'

// const config = require('config');

// const maxRowList = config.get('maxRowList');
import configData from "../../../config/default.json";

const maxRowList = configData.Pages.maxRowList


const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

const thisPath = window.location.pathname

const TABLE = 'web_users'

export const UsersList = () => {

  const [item, setItem] = React.useState([])
  //const [direrctoryList, setDirectoryList] = React.useState([])
  const [countPage, setCountPage] = React.useState(0)
  const [page, setPage] = React.useState(1)
  const [totalItem, setTotalItem] = React.useState(0)
  const classes = useStyles();

  useEffect(()=>{
    APIClient.v1.get(TABLE, {page: page})
      .then((resolve) => {
        console.log('111', resolve)
        setItem(resolve)
      })
      .catch((error) => {
        console.log('Err = ', error)
        setItem([])
      })

      APIClient.v1.get('countRowTable', {tableName : TABLE})
      .then((resolve) => {
        console.log('COUNT', resolve)
        if (resolve.length>0){ 
          count = resolve[0].count
            if (maxRowList>0) {
              setCountPage(count/maxRowList)
            }
           console.log('COUNT', resolve[0].count)
           setTotalItem(count)
          }
      })
      .catch((error) => {
        console.log('Err = ', error)
      })

  },[page])
  let { path, url } = useRouteMatch();
  console.log('path', path)
  console.log('url', url)

  const handleChange = (event, value) => {
    setPage(value);
  };

  return (
    <React.Fragment>
      <Title>Группы</Title>
      <Box display="flex" p={1} m={1} width="100%">
      

        <Box flexGrow={1}  >
          <Box display="flex">
            <Box   p={1}>
              Всего: {totalItem}
            </Box>
            <Box alignItems="center">
              <Pagination count={countPage} shape="rounded" page={page} onChange={handleChange} />
            </Box>
          </Box> 
        </Box>
        <Box  alignItems="center">
          <Button
            variant="contained"
            color="primary"
            size="small"
            startIcon={<AddIcon />}
            component={ReactLink}
            to={'/'+ TABLE+'Create'}
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
              <TableCell>domain</TableCell>
              <TableCell>name</TableCell>
              <TableCell>effective_caller_id_name</TableCell>
              <TableCell >effective_caller_id_number</TableCell>
              <TableCell >Редак.</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>



            {item.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.domain}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.effective_caller_id_name}</TableCell>
                <TableCell>{row.effective_caller_id_number}</TableCell>
                <TableCell>
                <IconButton component={ReactLink} to={url+':'+row.id}>
                  <EditIcon fontSize="small"/>
                </IconButton>
                </TableCell>
              </TableRow>
            ))
            }

          </TableBody>
        </Table>
        </TableContainer>
        </>
      ) : "Нет данных"}
      {/* <div className={classes.seeMore}>
        <Link color="primary" href="#" onClick={preventDefault}>
          See more orders
        </Link>
      </div> */}

    </React.Fragment>
  );
}