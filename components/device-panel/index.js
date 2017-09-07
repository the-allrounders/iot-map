import React from 'react';
import DataEntry from '../data-entry';

const DevicePanel = ({ device }) => {
  const data = device.data.map(entry => <DataEntry entry={entry} key={entry.key} />);
  return (
    <div>
      <h2>{device.name}</h2>
      <ul>
        {data}
      </ul>
    </div>
  );
};

export default DevicePanel;
