import React, { FC } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import styled from 'styled-components';
import { WeatherResult } from '../../store/types';
import getCelsiusInFahrenheit from '../../utils/getCelsiusInFahrenheit';

interface ForecastFutureDaysProps {
  futureDaysForecast: WeatherResult[],
  isCelsius: boolean
}

const weekday = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const PanelDiv = styled.div`
    border-radius: 10px;
    box-shadow: 10px -2px 20px 2px rgb(0 0 0 / 30%);
    color: white;
    background-color: rgb(25 32 56);
    margin-top: 20px;
    padding: 20px 40px;
`;

const TextCenter = styled.div`
    text-align: center;
`;

const FontBold = styled.p`
    font-weight: bold;
`;

const TemperatureRow = styled.p`
    font-weight: bold;
    font-size: large;
`;

const ForecastFutureDays: FC<ForecastFutureDaysProps> = ({ futureDaysForecast, isCelsius }) => {
  return (
    <Container fluid>
      <PanelDiv>
        <Row>
          {
            futureDaysForecast.map((singleDayForecast: WeatherResult, idx: number) => {
              const iconSrc = process.env.PUBLIC_URL + '/images/' + singleDayForecast.icon + '@2x.png';
              return <Col key={idx}>
                <TextCenter>
                  <div>
                    <FontBold>{weekday[new Date(singleDayForecast.date).getDay()]}</FontBold>
                    <p>{singleDayForecast.date}</p>
                  </div>
                  <img alt="icon" src={iconSrc}></img>
                  <div>
                    <p>{singleDayForecast.description}</p>
                    <TemperatureRow>{isCelsius ? singleDayForecast.avgTemperature + ' ºC' : getCelsiusInFahrenheit(singleDayForecast.avgTemperature) + ' ºF'}</TemperatureRow>
                  </div>
                </TextCenter>
              </Col>
            })
          }
        </Row>
      </PanelDiv>
    </Container>
  );
};

export default ForecastFutureDays;
