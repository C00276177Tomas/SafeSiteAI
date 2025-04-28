import { useState, useEffect, useMemo } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useTable } from 'react-table';
import { editCamera, deleteCamera, fetchCamerasByCompany } from './Api';
import Modal from 'react-modal';
import editIcon from './assets/edit.png'; // Your edit icon path
import deleteIcon from './assets/delete.png'; // Your delete icon path
import styles from './ManageUsers.module.css';
import Switch from 'react-switch'; 

// Set the app element globally to the root div of your app
Modal.setAppElement('#root');

const ManageCameras = () => {
  const [companyId] = useState(() => {
    const storedCompanyId = localStorage.getItem('companyId');
    return storedCompanyId ? parseInt(storedCompanyId, 10) : 0;
  });
  const [cameras, setCameras] = useState([]);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [cameraToEdit, setCameraToEdit] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const camerasData = await fetchCamerasByCompany(companyId);
        setCameras(camerasData);
      } catch (error) {
        setError(`Failed to load cameras: ${error.message}`);
      }
    };

    if (companyId) {
      fetchData();
    }
  }, [companyId]);

  const handleDelete = async (camera) => {
    const isConfirmed = window.confirm(`Are you sure you want to delete ${camera.camera_name}?`);
    
    if (isConfirmed) {
      try {
        await deleteCamera(camera.camera_id);
        const updatedCameras = await fetchCamerasByCompany(companyId);
        setCameras(updatedCameras);
      } catch (error) {
        window.alert(`Error deleting camera: ${error.message}`);
      }
    }
  };

  const handleEdit = (camera) => {
    setCameraToEdit(camera);
    setIsModalOpen(true);
  };

  const handleSaveEdit = async (updatedData) => {
    setLoading(true);
    try {
      await editCamera(cameraToEdit.camera_id, updatedData);
      const updatedCameras = await fetchCamerasByCompany(companyId);
      setCameras(updatedCameras);
      setIsModalOpen(false);
    } catch (error) {
      alert(`Error updating camera: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const columns = useMemo(
    () => [
      { Header: 'Camera ID', accessor: 'camera_id' },
      { Header: 'Company ID', accessor: 'company_id' },
      { Header: 'Camera Name', accessor: 'camera_name' },
      { Header: 'Location', accessor: 'location' },
      {
        Header: 'Edit',
        accessor: 'edit',
        Cell: ({ row }) => (
          <img
            src={editIcon}
            alt="Edit camera"
            className={styles.icon}
            onClick={() => handleEdit(row.original)}
          />
        ),
      },
      {
        Header: 'Delete',
        accessor: 'delete',
        Cell: ({ row }) => (
          <img
            src={deleteIcon}
            alt="Delete camera"
            className={styles.icon}
            onClick={() => handleDelete(row.original)}
          />
        ),
      },
    ],
    []
  );

  const data = useMemo(() => cameras, [cameras]);
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data,
  });

  return (
    <div className={styles.container}>
      <div className={styles.headerContainer}>
        <div className={styles.leftLink}>
          <Link to="/main" className={styles.backButton}>
            Back to Main Page
          </Link>
        </div>

        <h2 className={styles.centerTitle}>Camera List</h2>

        <div className={styles.rightLink}>
          <Link to="/addCamera" className={styles.backButton}>
            Add Camera
          </Link>
        </div>
      </div>

      {error && <div className={styles.error}>{error}</div>}

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

      {isModalOpen && cameraToEdit && (
        <Modal
          isOpen={isModalOpen}
          onRequestClose={() => setIsModalOpen(false)}
          contentLabel="Edit Camera"
          className={styles.modalContent}
          overlayClassName={styles.modalOverlay}
        >
          <h2>Edit Camera</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const updatedData = {
                camera_name: e.target.camera_name.value,
                location: e.target.location.value,
              };
              handleSaveEdit(updatedData);
            }}
          >
            <label>
              Camera Name
              <input type="text" name="camera_name" defaultValue={cameraToEdit.camera_name} required />
            </label>
            <label>
              Location
              <input type="text" name="location" defaultValue={cameraToEdit.location} required />
            </label>
            <button type="submit" disabled={loading} style={{
									backgroundColor: '#0288d1',
									color: 'white',
									border: 'none',
									borderRadius: '5px',
									padding: '10px 20px',
									cursor: 'pointer',
									fontSize: '16px',
									transition: 'background-color 0.3s',
									marginRight: '10px', // Space between buttons
								}}>{loading ? 'Saving...' : 'Save'}</button>
            <button type="button" onClick={() => setIsModalOpen(false)} style={{
									backgroundColor: '#d32f2f',
									color: 'white',
									border: 'none',
									borderRadius: '5px',
									padding: '10px 20px',
									cursor: 'pointer',
									fontSize: '16px',
									transition: 'background-color 0.3s',
								}}>Cancel</button>
          </form>
        </Modal>
      )}
    </div>
  );
};

export default ManageCameras;
