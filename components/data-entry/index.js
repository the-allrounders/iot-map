import React from 'react';

const DataEntry = ({ entry }) => (
  <li>
    <h3>{entry.label}</h3>
    <ul>
      <li>key: {entry.key}</li>
      <li>type: {entry.type}</li>
      <li>value: {entry.value}</li>
    </ul>
  </li>
);

export default DataEntry;
