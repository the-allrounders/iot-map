import React from 'react';
import DataEntry from '../data-entry';

const DevicePanel = ({ device }) => {
  if(!device) {
    return (
      <div>
        <p>Please first select a marker on the map to show its info.</p>
      </div>
    );
  }
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
