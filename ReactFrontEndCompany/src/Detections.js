import { useMemo } from 'react';
import { useTable } from 'react-table';
import { Link } from 'react-router-dom';
import styles from './ManageUsers.module.css';

const Detections = () => {
  // Example detection data
  const data = useMemo(
    () => [
      {
        detection_id: 4,
        camera_id: 1,
        detection_type: 'Person',
        confidence: 0.92,
        detection_datetime: 'Mon, 13 Jan 2025 10:30:00 GMT',
        user_id: 6,
      },
      {
        detection_id: 5,
        camera_id: 2,
        detection_type: 'Car',
        confidence: 0.87,
        detection_datetime: 'Mon, 13 Jan 2025 10:35:00 GMT',
        user_id: 7,
      },
      {
        detection_id: 6,
        camera_id: 3,
        detection_type: 'Bag',
        confidence: 0.95,
        detection_datetime: 'Mon, 13 Jan 2025 10:40:00 GMT',
        user_id: 8,
      },
    ],
    []
  );

  const columns = useMemo(
    () => [
      { Header: 'Detection ID', accessor: 'detection_id' },
      { Header: 'Camera ID', accessor: 'camera_id' },
      { Header: 'Object', accessor: 'detection_type' },
      { Header: 'Confidence', accessor: d => `${(d.confidence * 100).toFixed(1)}%` },
      { Header: 'Timestamp', accessor: d => new Date(d.detection_datetime).toLocaleString() },
      { Header: 'User ID', accessor: 'user_id' },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({ columns, data });

  return (
    <div className={styles.container}>
      <div className={styles.headerContainer}>
        <div className={styles.leftLink}>
          <Link to="/main" className={styles.backButton}>
            Back to Main Page
          </Link>
        </div>
        <h2 className={styles.centerTitle}>Detections</h2>
      </div>

      <table {...getTableProps()} className={styles.table}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map(row => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => (
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

export default Detections;