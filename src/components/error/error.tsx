import React, { FC } from 'react';
import styled from 'styled-components';
import { WeatherError } from '../../store/types';

interface ErrorProps {
  data: WeatherError
}

const ErrorText = styled.small`
    display: block;
    margin-top: 0.25rem;
    color: #e24c4c;
    &:first-letter{
      text-transform: capitalize;
    }
`;

const Error: FC<ErrorProps> = ({ data }) => {
  return (
    <ErrorText>{data.message}</ErrorText>
  );
};

export default Error;
