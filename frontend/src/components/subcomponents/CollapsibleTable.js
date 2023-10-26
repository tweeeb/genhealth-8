import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import TreatmentList from './TreatmentList';

function createData(date, display, details) {
  return {
    date,
    display,
    details,
  };
}

function createDetails1() {
  return [
    {
      timegap: "03-06-month",
      symptoms: ["Encounter for general adult medical examination without abnormal findings", ],
      services: ["Prosthetic implant, not otherwise specified", "Radiologic examination, sacroiliac joints; less than 3 views"],
      drugs: [],
    }
  ]
}

function createDetails2() {
  return [
    {
      timegap: "00-01-month",
      symptoms: ["Encounter for general adult medical examination without abnormal findings", "Neonatal jaundice from other and unspecified causes", "Adverse effects, not elsewhere classified", "Encounter for immunization"],
      services: ["Anchor/screw for opposing bone-to-bone or soft tissue-to-bone (implantable)"],
      drugs: ["[nitrostat]"],
    }
  ]
}

function createDetails3() {
  return [
    {
      timegap: "00-01-month",
      symptoms: ["Encounter for general examination without complaint, suspected or reported diagnosis", "Persons encountering health services in other circumstances"],
      services: ["Anesthesia for all procedures on esophagus, thyroid, larynx, trachea and lymphatic system of neck; not otherwise specified, age 1 year or older"],
      drugs: ["acetaminophen"],
    }
  ]
}

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.date}
        </TableCell>
        <TableCell align="left">{row.display}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              {row.details.map((detailsRow => (
                <div>
                  {TreatmentList(detailsRow)}
                </div>
              )))}
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    date: PropTypes.string.isRequired,
    display: PropTypes.number.isRequired,
    details: PropTypes.arrayOf(
      PropTypes.shape({
        timegap: PropTypes.string.isRequired,
        symptoms: PropTypes.string.isRequired,
        services: PropTypes.string.isRequired,
        drugs: PropTypes.string.isRequired,
      }),
    ).isRequired,
  }).isRequired,
};

const rows = [
  createData('16-10-2023', createDetails1()[0].symptoms[0], createDetails1()),
  createData('10-7-2023', createDetails2()[0].symptoms[0], createDetails2()),
  createData('23-5-2023', createDetails3()[0].symptoms[0], createDetails3())
];

export default function CollapsibleTable() {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Date</TableCell>
            <TableCell align="left">Sage Support Recommended Care</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <Row key={`${row.date}${row.display}`} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}