import React, { useState, useMemo } from 'react';
import { useTable } from 'react-table';
import { Link } from 'react-router-dom';
import styles from './ManageUsers.module.css';
import editIcon from './assets/edit.png'; // Make sure to import your image
import deleteIcon from './assets/delete.png'; // Make sure to import your image

const ManageUsers = () => {
  const [users, setUsers] = useState([
    { user_id: 1, first_name: 'John', last_name: 'Doe', role: 'admin', email: 'john@example.com', updated_at: '2025-01-21 12:00:00', created_at: '2025-01-20 10:00:00' },
    { user_id: 2, first_name: 'Jane', last_name: 'Doe', role: 'user', email: 'jane@example.com', updated_at: '2025-01-21 12:05:00', created_at: '2025-01-20 11:00:00' },
    // Add more user data here as needed
  ]);

  const columns = useMemo(
    () => [
      {
        Header: 'User ID',
        accessor: 'user_id',
      },
      {
        Header: 'First Name',
        accessor: 'first_name',
      },
      {
        Header: 'Last Name',
        accessor: 'last_name',
      },
      {
        Header: 'Role',
        accessor: 'role',
      },
      {
        Header: 'Email',
        accessor: 'email',
      },
      {
        Header: 'Updated At',
        accessor: 'updated_at',
      },
      {
        Header: 'Created At',
        accessor: 'created_at',
      },
      {
        Header: 'Edit',
        accessor: 'edit', // This column will contain the edit icon
        Cell: () => (
          <img
            src={editIcon}
            alt="Edit"
            className={styles.icon}
            onClick={() => console.log('Edit clicked')} // You can replace this with actual edit logic
          />
        ),
      },
      {
        Header: 'Delete',
        accessor: 'delete', // This column will contain the delete icon
        Cell: () => (
          <img
            src={deleteIcon}
            alt="Delete"
            className={styles.icon}
            onClick={() => console.log('Delete clicked')} // You can replace this with actual delete logic
          />
        ),
      },
    ],
    []
  );

  const data = useMemo(() => users, [users]);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data,
  });

  return (
    <div className={styles.container}>
      {/* Flex container for the button and the table */}
      <div className={styles.headerContainer}>
        <div className={styles.topRightLink}>
          <Link to="/main" className={styles.backButton}>
            Back to Main Page
          </Link>
        </div>
        <h2>User List</h2>
      </div>

      <table {...getTableProps()} className={styles.table}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ManageUsers;
