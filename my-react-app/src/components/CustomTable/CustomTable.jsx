import styles from './CustomTable.module.css';

const CustomTable = ({ data = [] }) => {
  // Define table columns
  const columns = [
    { key: 'degree', header: 'Degree' },
    { key: 'institution', header: 'Institution' },
    { key: 'year', header: 'Year' },
    { key: 'grade', header: 'Grade' }
  ];

  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.key}>{column.header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((row, index) => (
              <tr 
                key={index} 
                className={index % 2 === 0 ? styles.even : styles.odd}
              >
                {columns.map((column) => (
                  <td key={`${index}-${column.key}`}>
                    {row[column.key] || '-'}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr className={styles.emptyRow}>
              <td colSpan={columns.length} className={styles.emptyMessage}>
                No education data available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CustomTable;
