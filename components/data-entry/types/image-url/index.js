import React from 'react';
import styled from 'styled-components';

const Image = styled.img`
  max-width: 100%;
`;
const ImageUrl = ({ entry }) => {
  return (
    <Image
      src={entry.value || 'https://placehold.it/355x280'}
      title={entry.label}
    />
  );
};

export default ImageUrl;
