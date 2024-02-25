// components/ResultsTable.js
import React from 'react';

const ResultsTable = ({ data }) => {
  if (!data.columns || !data.rows) {
    return null;  // If no data, don't render the table
  }

  return (
    <table>
      <thead>
        <tr>
          {data.columns.map((column, index) => <th key={index}>{column}</th>)}
        </tr>
      </thead>
      <tbody>
        {data.rows.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {row.map((cell, cellIndex) => <td key={cellIndex}>{cell}</td>)}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ResultsTable;
