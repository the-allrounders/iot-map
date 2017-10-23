import React from 'react';

// Data entry types
import Number from './types/number';
import ImageUrl from './types/image-url';
import Boolean from './types/boolean';

const types = {
  temperature: Number,
  humidity: Number,
  windforce: Number,
  image_url: ImageUrl,
  boolean: Boolean,
};

const DataEntry = ({ entry }) => {
  const DataEntryType = types[entry.type];
  const value = DataEntryType ? <DataEntryType entry={entry} /> : entry.value;
  return (
    <li>
      <h3>{entry.label}</h3>
      <ul>
        <li>{value}</li>
        <li>key: {entry.key}</li>
        <li>type: {entry.type}</li>
      </ul>
    </li>
  );
};

export default DataEntry;
