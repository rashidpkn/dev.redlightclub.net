// @mui
import PropTypes from 'prop-types';
import Table from '@mui/material/Table';
import Avatar from '@mui/material/Avatar';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import CardHeader from '@mui/material/CardHeader';
import Card from '@mui/material/Card';
import TableContainer from '@mui/material/TableContainer';
// utils
import { fCurrency } from 'src/utils/format-number';
// components
import Label from 'src/components/label';
import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';
import { TableHeadCustom } from 'src/components/table';

// ----------------------------------------------------------------------

export default function EcommerceBestSalesman({
  title,
  subheader,
  tableData,
  tableLabels,
  ...other
}) {
  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} sx={{ mb: 3 }} />

      <TableContainer sx={{ overflow: 'unset' }}>
        <Scrollbar>
          <Table sx={{ minWidth: 640 }}>
            <TableHeadCustom headLabel={tableLabels} />

            <TableBody>
              {tableData.map((row,index) => (
                <EcommerceBestSalesmanRow key={row.id} row={row} index={index} />
              ))}
            </TableBody>
          </Table>
        </Scrollbar>
      </TableContainer>
    </Card>
  );
}

EcommerceBestSalesman.propTypes = {
  subheader: PropTypes.string,
  tableData: PropTypes.array,
  tableLabels: PropTypes.array,
  title: PropTypes.string,
};

// ----------------------------------------------------------------------

function EcommerceBestSalesmanRow({ row,index }) {
  return (
    <TableRow>
      <TableCell sx={{ display: 'flex', alignItems: 'center' }}>
        <Avatar alt={row.name} src={row.profilePhoto} sx={{ mr: 2 }} />
        {row.adsTitle}
      </TableCell>

      <TableCell>{row.category || 'Individual'}</TableCell>

      <TableCell align="center">
        <Iconify icon={row.flag} sx={{ borderRadius: 0.65, width: 28 }} />
        {row.nationality}
      </TableCell>

      <TableCell align="right">{row.view}</TableCell>

      <TableCell align="right">
        <Label
          variant="soft"
          color={
            (index === 0 && 'primary') ||
            (index === 1 && 'info') ||
            (index === 2 && 'success') ||
            (index === 3 && 'warning') ||
            'error'
          }
        >
          {index+1}
        </Label>
      </TableCell>
    </TableRow>
  );
}

EcommerceBestSalesmanRow.propTypes = {
  row: PropTypes.object,
  index:PropTypes.number
};
