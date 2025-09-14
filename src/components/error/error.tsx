import React, { FC } from 'react';
import styled from 'styled-components';

interface ErrorProps {
  message: string
}

const ErrorText = styled.small`
  color: #ff6b6b;
  font-weight: 500;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
  background: rgba(255, 107, 107, 0.1);
  padding: 4px 12px;
  border-radius: 6px;
  backdrop-filter: blur(5px);
`;

const Error: FC<ErrorProps> = ({ message }) => {
  return (
    <ErrorText>{message}</ErrorText>
  );
};

export default Error;
