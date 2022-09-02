import React, { FC } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import styled from 'styled-components';
import useWeatherForcast from '../../hooks/useWeatherForecast';
import Error from '../error/error';
import Forecast from '../forecast/forecast';
import Loading from '../loading/loading';
import Search from '../search/search';


interface HomeProps { }

const HomeDiv = styled.div`
    width: 100%;
    height: 100%;
    min-height: 100vh;
    min-width: 100vw;
    display: flex;
    background: linear-gradient(112.1deg, rgb(32, 38, 57) 11.4%, rgb(63, 76, 119) 70.2%);
    flex-direction: column;
    padding-top: 50px;
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
  const { error, isLoading, forecast, submitRequest } = useWeatherForcast();

  const onSubmit = (value: string) => {
    submitRequest(value);
  }

  return (
    <HomeDiv>
      <Container fluid>
        <Row>
          <Col>
            <ColDiv>
              <RowDiv>
                {!isLoading && <Search submitSearch={onSubmit} />}
                {error && <Error data={error} />}
                {isLoading && <Loading />}
              </RowDiv>
            </ColDiv>
          </Col>
        </Row>
        <Row className='justify-content-center'>
          <ForecastRow>
            {forecast && !error && <Forecast forecast={forecast} />}
          </ForecastRow>
        </Row>
      </Container>
    </HomeDiv>
  );
};

export default Home;
