import React from 'react';

const Boolean = ({ entry }) => {
  return <span>value: {entry.value ? 'true' : 'false'}</span>;
};

export default Boolean;
