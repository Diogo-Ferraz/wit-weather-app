import React, { FC, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import styled from 'styled-components';

import useWeatherForcast from '../../hooks/useWeatherForecast';
import Forecast from '../forecast/forecast';
import Search from '../search/search';

interface HomeProps { }

const HomeDiv = styled.div`
    width: 100%;
    min-height: 100vh;
    display: flex;
    background: linear-gradient(112.1deg, rgb(20, 25, 40) 11.4%, rgb(50, 60, 100) 70.2%);
    flex-direction: column;
    padding-top: 50px;
    padding-bottom: 50px;
    align-content: center;
    align-items: center;
`;

const RowDiv = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

const ColDiv = styled.div`
    display: flex;
    justify-content: center;
`;

const ForecastRow = styled.div`
    max-width: 1200px;
`;

const Home: FC<HomeProps> = () => {
  const { error, isLoading, forecast, submitRequest, clearError } = useWeatherForcast();
  const [isCelsius, setIsCelsius] = useState(true);

  const onSubmit = (value: string) => {
    submitRequest(value);
  };

  const handleTemperatureToggle = (celsius: boolean) => {
    setIsCelsius(celsius);
  };

  return (
    <HomeDiv>
      <Container fluid>
        <Row>
          <Col>
            <ColDiv>
              <RowDiv>
                <Search 
                  submitSearch={onSubmit} 
                  isCelsius={isCelsius}
                  onTemperatureToggle={handleTemperatureToggle}
                  error={error?.message}
                  isLoading={isLoading}
                  clearError={clearError}
                />
              </RowDiv>
            </ColDiv>
          </Col>
        </Row>
        <Row className='justify-content-center'>
          <ForecastRow>
            {forecast && !error && (
              <Forecast 
                forecast={forecast} 
                isCelsius={isCelsius}
              />
            )}
          </ForecastRow>
        </Row>
      </Container>
    </HomeDiv>
  );
};

export default Home;