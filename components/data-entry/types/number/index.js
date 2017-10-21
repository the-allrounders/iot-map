import React from 'react';
import AnimatedNumber from 'react-animated-number';

const Number = ({ entry }) => {
  let value = parseFloat(entry.value || 0);
  if(Number.stepPrecision) {
    value = parseFloat(value.toFixed(Number.stepPrecision));
  }
  return (
    <AnimatedNumber
      value={value}
      stepPrecision={Number.stepPrecision}
      formatValue={val => val.toFixed(Number.stepPrecision)}
    />
  );
};

Number.stepPrecision = 2;

export default Number;
