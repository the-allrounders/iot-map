import React from 'react';

// Data entry types
import Number from './types/number';
import ImageUrl from './types/image-url';

const types = {
  temperature: Number,
  humidity: Number,
  windforce: Number,
  image_url: ImageUrl,
};

const DataEntry = ({ entry }) => {
  const DataEntryType = types[entry.type];
  const value = DataEntryType ? <DataEntryType entry={entry} /> : entry.value;
  return (
    <li>
      <h3>{entry.label}</h3>
      <ul>
        <li>key: {entry.key}</li>
        <li>type: {entry.type}</li>
        <li>{value}</li>
      </ul>
    </li>
  );
};

export default DataEntry;
