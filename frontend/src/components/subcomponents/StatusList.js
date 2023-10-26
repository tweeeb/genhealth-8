import * as React from 'react';
import PropTypes from 'prop-types';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import List from '@mui/material/List';

Row.propTypes = {
    row: PropTypes.shape({
      date: PropTypes.string.isRequired,
      display: PropTypes.string.isRequired,
      class: PropTypes.string.isRequired,
      status: PropTypes.string.isRequired,
    }).isRequired,
  };

function Row(props) {
    const { row } = props;

    return (
        <React.Fragment>
          <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
            <TableCell component="th" scope="row">{row.date}</TableCell>
            <TableCell align="left" sx={{display:'flex'}}>{row.display}</TableCell>
            <TableCell align="left">{row.status}</TableCell>
            <TableCell align="left">{row.class}</TableCell>
          </TableRow>
        </React.Fragment>
      );
}

export default function StatusList(entry) {
    return (
        <TableContainer component={Paper}>
            <List sx={{
            width: '100%',
            maxWidth: window.screen.width-20,
            bgcolor: 'background.paper',
            position: 'relative',
            overflow: 'auto',
            maxHeight: 200,
            '& ul': { padding: 0 },
          }}>
                <TableHead>
                    <TableRow>
                        <TableCell>Date</TableCell>
                        <TableCell align="left">Display</TableCell>
                        <TableCell align="left">Status</TableCell>
                        <TableCell align="left">Class</TableCell>
                    </TableRow>
                </TableHead>
            <TableBody>
                {entry.map((row) => (
                    <Row key={`${row.date}-${row.display}`} row={row} />
                ))}
            </TableBody>
        </List>
    </TableContainer>
    );
}