import { useState, useEffect, useMemo } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useTable } from 'react-table';
import { editUser, deleteUser, fetchUsersByCompany } from './Api';
import Modal from 'react-modal';
import editIcon from './assets/edit.png'; // Your edit icon path
import deleteIcon from './assets/delete.png'; // Your delete icon path
import styles from './ManageUsers.module.css';
import Switch from 'react-switch'; 

// Set the app element globally to the root div of your app
Modal.setAppElement('#root');

const ManageUsers = () => {
  const [companyId] = useState(() => {
    const storedCompanyId = localStorage.getItem('companyId');
    return storedCompanyId ? parseInt(storedCompanyId, 10) : 0;
  });
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userToEdit, setUserToEdit] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersData = await fetchUsersByCompany(companyId);
        setUsers(usersData);
      } catch (error) {
        setError(`Failed to load users: ${error.message}`);
      }
    };

    if (companyId) {
      fetchData();
    }
  }, [companyId]);

  const handleDelete = async (user) => {
		const isConfirmed = window.confirm(`Are you sure you want to delete ${user.first_name} ${user.last_name}?`);
	
		if (isConfirmed) {
			try {
				await deleteUser(user.user_id);
				const updatedUsers = await fetchUsersByCompany(companyId);
				setUsers(updatedUsers);
			} catch (error) {
				window.alert(`Error deleting user: ${error.message}`);
			}
		}
	};

  const handleEdit = (user) => {
    setUserToEdit(user);
    setIsModalOpen(true);
  };

  const handleSaveEdit = async (updatedData) => {
    setLoading(true);
    try {
      await editUser(userToEdit.user_id, updatedData);
      const updatedUsers = await fetchUsersByCompany(companyId);
      setUsers(updatedUsers);
      setIsModalOpen(false);
    } catch (error) {
      setError(`Error updating user: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const columns = useMemo(
    () => [
      { Header: 'User ID', accessor: 'user_id' },
      { Header: 'First Name', accessor: 'first_name' },
      { Header: 'Last Name', accessor: 'last_name' },
      { Header: 'Role', accessor: 'role' },
      { Header: 'Email', accessor: 'email' },
      { Header: 'Updated At', accessor: 'updated_at' },
      { Header: 'Created At', accessor: 'created_at' },
      {
        Header: 'Edit',
        accessor: 'edit',
        Cell: ({ row }) => (
          <img
            src={editIcon}
            alt="Edit user"
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
            alt="Delete user"
            className={styles.icon}
            onClick={() => handleDelete(row.original)}
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
      {/* Header Section */}
      <div className={styles.headerContainer}>
				<div className={styles.leftLink}>
					<Link to="/main" className={styles.backButton}>
						Back to Main Page
					</Link>
				</div>

				<h2 className={styles.centerTitle}>User List</h2>

				<div className={styles.rightLink}>
					<Link to="/addUser" className={styles.backButton}>
						Add User
					</Link>
				</div>
			</div>

      {/* Error Message */}
      {error && <div className={styles.error}>{error}</div>}

      {/* Users Table */}
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

      {/* Edit User Modal */}
      {isModalOpen && userToEdit && (
        <Modal
          isOpen={isModalOpen}
          onRequestClose={() => setIsModalOpen(false)}
          contentLabel="Edit User"
          className={styles.modalContent}
          overlayClassName={styles.modalOverlay}
        >
          <h2>Edit User</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const updatedData = {
                first_name: e.target.first_name.value,
                last_name: e.target.last_name.value,
                email: e.target.email.value,
                role: userToEdit.role,
              };
              handleSaveEdit(updatedData);
            }}
          >
            <label style={{ display: 'block', marginBottom: '10px', fontWeight: 'bold', color: '#555' }}>
							First Name
							<input
								type="text"
								name="first_name"
								defaultValue={userToEdit.first_name}
								required
								style={{
									width: '100%',
									padding: '8px',
									fontSize: '14px',
									border: '1px solid #ccc',
									borderRadius: '5px',
									boxSizing: 'border-box',
									marginTop: '5px',
								}}
							/>
						</label>

						<label style={{ display: 'block', marginBottom: '10px', fontWeight: 'bold', color: '#555' }}>
							Last Name
							<input
								type="text"
								name="last_name"
								defaultValue={userToEdit.last_name}
								required
								style={{
									width: '100%',
									padding: '8px',
									fontSize: '14px',
									border: '1px solid #ccc',
									borderRadius: '5px',
									boxSizing: 'border-box',
									marginTop: '5px',
								}}
							/>
						</label>

						<label style={{ display: 'block', marginBottom: '10px', fontWeight: 'bold', color: '#555' }}>
							Email
							<input
								type="email"
								name="email"
								defaultValue={userToEdit.email}
								required
								style={{
									width: '100%',
									padding: '8px',
									fontSize: '14px',
									border: '1px solid #ccc',
									borderRadius: '5px',
									boxSizing: 'border-box',
									marginTop: '5px',
								}}
							/>
						</label>

						<label style={{ display: 'block', marginBottom: '10px', fontWeight: 'bold', color: '#555' }}>
							{userToEdit.role === 'admin' ? 'Admin' : 'Normal'}
							<div style={{ marginTop: '10px' }}>
								<Switch
									onChange={(e) =>
										setUserToEdit({
											...userToEdit,
											role: e ? 'admin' : 'normal', // Toggle between 'admin' and 'normal'
										})
									}
									checked={userToEdit.role === 'admin'} // Check if the role is 'admin'
									uncheckedIcon={false}
									checkedIcon={false}
									height={20}
									width={48}
									handleDiameter={24}
									offColor="#B0BEC5" // Gray when off
									onColor="#0288d1"  // Blue when on
									offHandleColor="#FFFFFF" // White handle when off
									onHandleColor="#FFFFFF"  // White handle when on
								/>
							</div>
						</label>

						<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '20px' }}>
							<button
								type="submit"
								disabled={loading}
								style={{
									backgroundColor: '#0288d1',
									color: 'white',
									border: 'none',
									borderRadius: '5px',
									padding: '10px 20px',
									cursor: 'pointer',
									fontSize: '16px',
									transition: 'background-color 0.3s',
									marginBottom: '10px', // Space between buttons
								}}
							>
								{loading ? 'Saving...' : 'Save'}
							</button>
							<button
								type="button"
								onClick={() => setIsModalOpen(false)}
								style={{
									backgroundColor: '#d32f2f',
									color: 'white',
									border: 'none',
									borderRadius: '5px',
									padding: '10px 20px',
									cursor: 'pointer',
									fontSize: '16px',
									transition: 'background-color 0.3s',
								}}
							>
								Cancel
							</button>
						</div>
          </form>
        </Modal>
      )}
    </div>
  );
};

export default ManageUsers;
