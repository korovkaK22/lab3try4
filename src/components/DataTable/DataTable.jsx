import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import DeleteButton from 'components/DeleteButton';

const DataTable = ({ data, columns, handleRowClick, handleDeleteClick, hoveredRow, setHoveredRow }) => {
  const styles = {
    container: {
      main: { width: '100%' },
      headCell: {
        fontWeight: 'bold',
        width: `${100 / columns.length}%`
      },
      row: (index) => ({
        backgroundColor: index % 2 ? '#f5f5f5' : '',
        position: 'relative',
        '&:hover': {
          backgroundColor: '#f0f0f0'
        }
      }),
      deleteButtonContainer: {
        position: 'absolute',
        right: '10px',
        top: '50%',
        transform: 'translateY(-50%)',
        display: 'none'
      },
      deleteButtonVisible: {
        display: 'block'
      }
    }
  };

  const handleAsyncRowClick = async (id) => {
    try {
      // Виконуйте вашу асинхронну операцію тут
      await fetch(`YOUR_API_ENDPOINT/${id}`);
      handleRowClick(id);
    } catch (error) {
      console.error('Помилка під час виконання переходу:', error);
    }
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={styles.container.main} aria-label="simple table">
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell key={column.field} sx={styles.container.headCell}>
                {column.headerName}
              </TableCell>
            ))}
            <TableCell sx={styles.container.headCell}>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, index) => (
            <TableRow
              key={index}
              sx={styles.container.row(index)}
              onMouseEnter={() => setHoveredRow(index)}
              onMouseLeave={() => setHoveredRow(null)}
            >
              {columns.map((column) => (
                <TableCell
                  key={column.field}
                >
                  {column.field === 'id' ? (
                    // eslint-disable-next-line
                    <a
                      href={`#`} 
                      onClick={(e) => { 
                        e.preventDefault();
                        handleAsyncRowClick(row.id);
                      }}
                    >
                      {row[column.field]}
                    </a>
                  ) : (
                    row[column.field]
                  )}
                </TableCell>
              ))}
              <TableCell>
                <Box
                  sx={{
                    ...styles.container.deleteButtonContainer,
                    ...(hoveredRow === index ? styles.container.deleteButtonVisible : {})
                  }}
                >
                  <DeleteButton onClick={() => handleDeleteClick(row.id)} />
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DataTable;
