import React, { useEffect } from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Title } from '../components/Title';
import { APIClient } from '../../utils/RestApiClient'
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import { Link as ReactLink, useRouteMatch } from 'react-router-dom'


//import { ContactlessTwoTone } from '@material-ui/icons';

// Generate Order Data
const createData = (id, date, name, shipTo, paymentMethod, amount) => {
  return { id, date, name, shipTo, paymentMethod, amount };
}

const rows = [
  createData(0, '16 Mar, 2019', 'Elvis Presley', 'Tupelo, MS', 'VISA ⠀•••• 3719', 312.44),
  createData(1, '16 Mar, 2019', 'Paul McCartney', 'London, UK', 'VISA ⠀•••• 2574', 866.99),
  createData(2, '16 Mar, 2019', 'Tom Scholz', 'Boston, MA', 'MC ⠀•••• 1253', 100.81),
  createData(3, '16 Mar, 2019', 'Michael Jackson', 'Gary, IN', 'AMEX ⠀•••• 2000', 654.39),
  createData(4, '15 Mar, 2019', 'Bruce Springsteen', 'Long Branch, NJ', 'VISA ⠀•••• 5919', 212.79),
];



const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

const thisPath = window.location.pathname

export const DirectoryList = () => {
  const [direrctoryList, setDirectoryList] = React.useState([])
  const classes = useStyles();

  useEffect(()=>{
    APIClient.v1.get('getDirectoryList', {})
      .then((resolve) => {
        console.log('111', resolve)
        setDirectoryList(resolve.result)

      })
      .catch((error) => {
        console.log('Err = ', error)
        setDirectoryList([])
      })

  },[])
  let { path, url } = useRouteMatch();
  console.log('path', path)
  console.log('url', url)

  return (
    <React.Fragment>
      <Title>Список директорий</Title>
      {direrctoryList ? (
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>domain</TableCell>
              <TableCell>name</TableCell>
              <TableCell>id</TableCell>
              <TableCell>effective_caller_id_name</TableCell>
              <TableCell >effective_caller_id_number</TableCell>
              <TableCell >Редак.</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>



            {direrctoryList.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.domain}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.effective_caller_id_name}</TableCell>
                <TableCell>{row.effective_caller_id_number}</TableCell>
                <TableCell>
                <IconButton component={ReactLink} to={url+':'+row.id}>
                  <EditIcon />
                </IconButton>
                </TableCell>
              </TableRow>
            ))
            }

          </TableBody>
        </Table>
      ) : "Нет данных"}
      {/* <div className={classes.seeMore}>
        <Link color="primary" href="#" onClick={preventDefault}>
          See more orders
        </Link>
      </div> */}

    </React.Fragment>
  );
}