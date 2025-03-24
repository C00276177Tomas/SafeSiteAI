import { useTable } from 'react-table';
import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import styles from './ManageUsers.module.css';
import { fetchDetectionsById } from './Api';
import Modal from 'react-modal';

Modal.setAppElement('#root');


const ImageModal = ({ isOpen, imageData, onClose }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Image Modal"
      className={styles.modalContent}
      overlayClassName={styles.modalOverlay}
    >
      <div style={{ textAlign: 'center' }}>
        <h2>Image Preview</h2>
        <img
          src={`data:image/jpeg;base64,${imageData}`}
          alt="Detection"
          style={{
            maxWidth: '100%',
            height: 'auto',
            marginTop: '20px',
            borderRadius: '8px',
          }}
        />
        <div style={{ marginTop: '20px' }}>
          <button
            onClick={onClose}
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
            Close
          </button>
        </div>
      </div>
    </Modal>
  );
};

const Detections = () => {
	const [companyId] = useState(() => {
			const storedCompanyId = localStorage.getItem('companyId');
			return storedCompanyId ? parseInt(storedCompanyId, 10) : 0;
		});
	const [detections, setDetections] = useState([]);
	const [error, setError] = useState(null);

	const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [imageData, setImageData] = useState(null);

  const openImageModal = (imageData) => {
    setImageData(imageData);
    setIsImageModalOpen(true);
  };

  const closeImageModal = () => {
    setIsImageModalOpen(false);
    setImageData(null);
  };

	useEffect(() => {
		const fetchData = async () => {
			try {
				const detectionData = await fetchDetectionsById(companyId);
				
				setDetections(Array.isArray(detectionData) ? detectionData : []);

				console.log("Detections");
				console.log(detectionData);
			} catch (error) {
				setError(`Failed to load users: ${error.message}`);
			}
		};

		if (companyId) {
			console.log(companyId);
			fetchData();
		}
	}, [companyId]);

	const data = useMemo(() => detections, [detections]);

	const sortedData = useMemo(() => {
		return [...data].sort((a, b) => a.detection_id - b.detection_id);
	}, [data]);

  // Example detection data
  // const data = useMemo(
  //   () => [
  //     {
  //       detection_id: 4,
  //       camera_id: 1,
  //       detection_type: 'Person',
  //       confidence: 0.92,
  //       detection_datetime: 'Mon, 13 Jan 2025 10:30:00 GMT',
  //       user_id: 6,
  //     },
  //     {
  //       detection_id: 5,
  //       camera_id: 2,
  //       detection_type: 'Car',
  //       confidence: 0.87,
  //       detection_datetime: 'Mon, 13 Jan 2025 10:35:00 GMT',
  //       user_id: 7,
  //     },
  //     {
  //       detection_id: 6,
  //       camera_id: 3,
  //       detection_type: 'Bag',
  //       confidence: 0.95,
  //       detection_datetime: 'Mon, 13 Jan 2025 10:40:00 GMT',
  //       user_id: 8,
  //     },
  //   ],
  //   []
  // );

  const columns = useMemo(
    () => [
      { Header: 'Detection ID', accessor: 'detection_id' },
      { Header: 'Camera ID', accessor: 'camera_id' },
      { Header: 'Object', accessor: 'detection_type' },
      { Header: 'Confidence', accessor: d => `${(d.confidence * 100).toFixed(1)}%` },
      { Header: 'Timestamp', accessor: d => new Date(d.detection_datetime).toLocaleString() },
      { 
				Header: 'Detected By', 
				accessor: d => `${d.first_name} ${d.last_name}` 
			},
			{
        Header: 'Image',
        accessor: 'image_data',
        Cell: ({ value }) => (
          <img
            src={`data:image/jpeg;base64,${value}`}
            alt="Detection"
            style={{ width: '50px', height: '50px', cursor: 'pointer' }}
            onClick={() => openImageModal(value)}
          />
        ),
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({ columns, data:sortedData });

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

			<ImageModal
        isOpen={isImageModalOpen}
        imageData={imageData}
        onClose={closeImageModal}
      />
    </div>
  );
};

export default Detections;