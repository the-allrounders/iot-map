import React from 'react';
import AnimatedNumber from 'react-animated-number';
import PropTypes from 'prop-types';

const Nr = ({ value, stepPrecision = 0 }) => {
  if (stepPrecision) {
    value = parseFloat(value.toFixed(stepPrecision));
  }
  return (
    <AnimatedNumber value={value} stepPrecision={stepPrecision} formatValue={x => x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')} />
  );
};

Nr.propTypes = {
  value: PropTypes.number.isRequired,
  stepPrecision: PropTypes.number,
};

const DataEntry = ({ entry }) => {
  const value = (typeof entry.value === 'number') ? <Nr value={entry.value} stepPrecision={2} /> : entry.value;
  return (
    <li>
      <h3>{entry.label}</h3>
      <ul>
        <li>key: {entry.key}</li>
        <li>type: {entry.type}</li>
        <li>value: {value}</li>
      </ul>
    </li>
  );
};

export default DataEntry;
