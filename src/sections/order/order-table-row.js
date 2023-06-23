import PropTypes from 'prop-types';
import { format } from 'date-fns';

import Avatar from '@mui/material/Avatar';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import TableCell from '@mui/material/TableCell';
import ListItemText from '@mui/material/ListItemText';
import Label from 'src/components/label';

export default function OrderTableRow({ row, selected, onSelectRow }) {
  const { status, createdAt, customer, reason } = row;
  const {name,email,avatarUrl} = customer

  return (
    <TableRow hover selected={selected}>
      <TableCell padding="checkbox">
        <Checkbox checked={selected} onClick={onSelectRow} />
      </TableCell>

      <TableCell sx={{ display: 'flex', alignItems: 'center' }}>
        <Avatar alt={name} src={avatarUrl} sx={{ mr: 2 }} />
        <ListItemText
          primary={name}
          secondary={email}
          primaryTypographyProps={{ typography: 'body2' }}
          secondaryTypographyProps={{ component: 'span', color: 'text.disabled' }}
        />
      </TableCell>
      <TableCell>
        <ListItemText
          primary={format(new Date(createdAt), 'dd MMM yyyy')}
          secondary={format(new Date(createdAt), 'p')}
          primaryTypographyProps={{ typography: 'body2', noWrap: true }}
          secondaryTypographyProps={{
            mt: 0.5,
            component: 'span',
            typography: 'caption',
          }}
        />
      </TableCell>
      <TableCell align="center"> {reason} </TableCell>

      <TableCell>
        <Label
          variant="soft"
          color={
            (status === true && 'success') ||
            (status === false && 'warning') ||
            (status === 'cancelled' && 'error') ||
            'default'
          }
        >
          {status ? 'Completed' : 'Pending'}
        </Label>
      </TableCell>
    </TableRow>
  );

}

OrderTableRow.propTypes = {
  onSelectRow: PropTypes.func,
  row: PropTypes.object,
  selected: PropTypes.bool,
};
