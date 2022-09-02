import React, { FC } from 'react';
import styled, { keyframes } from 'styled-components';

interface LoadingProps {}

const loadingAnimation = keyframes`
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
`;

const LoadingDiv = styled.div`
    border: 5px solid #f3f3f3;
    animation: ${loadingAnimation} 1s linear infinite;
    border-top: 5px solid #555;
    border-radius: 50%;
    width: 50px;
    height: 50px;
`;


const Loading: FC<LoadingProps> = () => (
  <LoadingDiv></LoadingDiv>
);

export default Loading;
