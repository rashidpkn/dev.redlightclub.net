import { useState, useCallback } from 'react';
import { alpha } from '@mui/material/styles';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import Container from '@mui/material/Container';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hook';
import { _orders } from 'src/_mock';
import Label from 'src/components/label';
import Scrollbar from 'src/components/scrollbar';
import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import {
  useTable,
  TableHeadCustom,
} from 'src/components/table';
import OrderTableRow from '../order-table-row';

const STATUS_OPTIONS = [{ value: 'all', label: 'All' }, { value: 'pending', label: 'Pending' }, { value: 'completed', label: 'Completed' }];
const TABLE_HEAD = [{ id: 'name', label: 'Customer' }, { id: 'createdAt', label: 'Date' }, { id: 'reason', label: 'Reason' }, { id: 'status', label: 'Status' }];

export default function OrderListView() {
  const table = useTable({ defaultOrderBy: 'orderNumber' })
  const settings = useSettingsContext();
  const router = useRouter();
  const handleViewRow = useCallback(
    (id) => {
      router.push(paths.dashboard.order.details(id));
    },
    [router]
  );

  const report = [
    {
      satus: true, 
      createdAt: Date().toString(),
      customer: {name: 'Muhammed Rashid',email: 'muhammed916rashid@gmail.com'},
      reason: 'Cheeted me',
    },
    {
      satus: false,
       createdAt: Date().toString(),
       customer: {name: 'Muhammed Rashid',email: 'muhammed916rashid@gmail.com'},
      reason: 'Cheeted me',
    },
    {
      satus: true, 
      createdAt: Date().toString(),
      customer: {name: 'Muhammed Rashid',email: 'muhammed916rashid@gmail.com'},
      reason: 'Cheeted me',
    },
    {
      satus: false, 
      createdAt: Date().toString(),
      customer: {name: 'Muhammed Rashid',email: 'muhammed916rashid@gmail.com'},
      reason: 'Cheeted me',
    },
    {
      satus: true, 
      createdAt: Date().toString(),
      customer: {name: 'Muhammed Rashid',email: 'muhammed916rashid@gmail.com'},
      reason: 'Cheeted me',
    },
  ]

  const [filter, setFilter] = useState('all')

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="List"
        links={[
          {
            name: 'Dashboard',
            href: paths.dashboard.root,
          },
          {
            name: 'Order',
            href: paths.dashboard.order.root,
          },
          { name: 'List' },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <Card>
        <Tabs
          value={filter}
          onChange={(e, v) => setFilter(v)}
          sx={{
            px: 2.5,
            boxShadow: (theme) => `inset 0 -2px 0 0 ${alpha(theme.palette.grey[500], 0.08)}`,
          }}
        >
          {STATUS_OPTIONS.map((tab) => (
            <Tab
              key={tab.value}
              value={tab.value}
              label={tab.label}
              icon={
                <Label
                  variant={(tab.value === 'all' && 'filled') || 'soft'}
                  color={(tab.value === 'completed' && 'success') || (tab.value === 'pending' && 'warning') || (tab.value === 'cancelled' && 'error') || 'default'
                  }
                >
                  {tab.value === 'all' && report.length}
                  {tab.value === 'completed' && report.filter((order) => order.status).length}
                  {tab.value === 'pending' && report.filter((order) => !order.status).length}
                </Label>
              }
            />
          ))}
        </Tabs>

        <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
          <Scrollbar>
            <Table size={table.dense ? 'small' : 'medium'} sx={{ minWidth: 960 }}>
              <TableHeadCustom
                order={table.order}
                orderBy={table.orderBy}
                headLabel={TABLE_HEAD}
                rowCount={_orders.length}
                numSelected={table.selected.length}
                onSort={table.onSort}
                onSelectAllRows={(checked) =>
                  table.onSelectAllRows(
                    checked,
                    _orders.map((row) => row.id)
                  )
                }
              />
              <TableBody>
                {report.filter(e => {
                  if (filter === 'all') return e
                  if (filter === 'pending' && !e.status) return e
                  if (filter === 'completed' && e.status) return e
                  return null
                }).map((row) => (
                  <OrderTableRow
                    key={row.id}
                    row={row}
                    selected={table.selected.includes(row.id)}
                    onSelectRow={() => table.onSelectRow(row.id)}
                    onViewRow={() => handleViewRow(row.id)}
                  />
                ))}
              </TableBody>
            </Table>
          </Scrollbar>
        </TableContainer>
      </Card>
    </Container>
  );
}