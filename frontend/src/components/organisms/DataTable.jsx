import React from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper,
  Box,
  TablePagination
} from '@mui/material';
import { Typography, Chip } from '../atoms';
import { SearchBar, ActionButtons } from '../molecules';
import { COLORS } from '../../constants/theme';

const DataTable = ({ 
  title,
  columns = [],
  data = [],
  searchable = true,
  searchValue = '',
  onSearchChange,
  actions = [],
  pagination = true,
  page = 0,
  rowsPerPage = 10,
  totalRows,
  onPageChange,
  onRowsPerPageChange,
  renderCell,
  sx,
  ...props 
}) => {
  const handleChangePage = (event, newPage) => {
    if (onPageChange) {
      onPageChange(newPage);
    }
  };

  const handleChangeRowsPerPage = (event) => {
    const newRowsPerPage = parseInt(event.target.value, 10);
    if (onRowsPerPageChange) {
      onRowsPerPageChange(newRowsPerPage);
    }
  };

  const getStatusColor = (status) => {
    const statusMap = {
      'In Stock': 'success',
      'Low Stock': 'warning', 
      'Critical': 'error',
      'Out of Stock': 'error',
      'Active': 'success',
      'Inactive': 'error',
      'Pending': 'warning',
      'Completed': 'success',
      'Cancelled': 'error'
    };
    return statusMap[status] || 'default';
  };

  const defaultRenderCell = (item, column) => {
    const value = item[column.field];
    
    if (column.type === 'status') {
      return <Chip label={value} color={getStatusColor(value)} size="small" />;
    }
    
    if (column.type === 'currency') {
      return `$${value?.toLocaleString() || '0'}`;
    }
    
    if (column.type === 'number') {
      return value?.toLocaleString() || '0';
    }
    
    return value || '-';
  };

  return (
    <Paper sx={{ width: '100%', ...sx }} {...props}>
      {(title || searchable || actions.length > 0) && (
        <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
            {title && (
              <Typography variant="h6" gutterBottom>
                {title}
              </Typography>
            )}
            {searchable && (
              <Box sx={{ maxWidth: 400 }}>
                <SearchBar
                  value={searchValue}
                  onChange={onSearchChange}
                  placeholder="Search items..."
                />
              </Box>
            )}
          </Box>
          
          {actions.length > 0 && (
            <ActionButtons actions={actions} />
          )}
        </Box>
      )}
      
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: COLORS.background.paper }}>
              {columns.map((column) => (
                <TableCell
                  key={column.field}
                  align={column.align || 'left'}
                  sx={{ fontWeight: 'bold', color: COLORS.text.primary }}
                >
                  {column.headerName}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item, index) => (
              <TableRow 
                key={item.id || index}
                sx={{ 
                  '&:hover': { backgroundColor: COLORS.background.paper },
                  '&:last-child td, &:last-child th': { border: 0 }
                }}
              >
                {columns.map((column) => (
                  <TableCell key={column.field} align={column.align || 'left'}>
                    {renderCell ? renderCell(item, column) : defaultRenderCell(item, column)}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      
      {pagination && (
        <TablePagination
          component="div"
          count={totalRows || data.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={[5, 10, 25, 50]}
        />
      )}
    </Paper>
  );
};

export default DataTable;