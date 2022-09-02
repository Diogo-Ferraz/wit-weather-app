import React, { FC } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import styled from 'styled-components';
import { WeatherCity, WeatherResult } from '../../store/types';
import getCelsiusInFahrenheit from '../../utils/getCelsiusInFahrenheit';

interface ForecastCurrentDayProps {
  currentDayForecast: WeatherResult,
  cityInfo: WeatherCity,
  isCelsius: boolean
}

const PanelDiv = styled.div`
    border-radius: 10px;
    box-shadow: 10px -2px 20px 2px rgb(0 0 0 / 30%);
    color: white;
    background-color: rgb(25 32 56);
    margin-top: 20px;
    padding: 20px 40px;
`;

const CityInfo = styled.p`
    font-weight: bold;
    font-size: larger;
    line-height: 1;
    margin: 0;
    letter-spacing: 1px;
`;

const DateInfo = styled.p`
    font-size: smaller;
    line-height: 1;
    margin: 0;
`;

const DescriptionInfo = styled.p`
    font-size: smaller;
    line-height: 1;
    margin: -20px 0 20px 0;
    text-align: center;
`;

const TemperatureInfo = styled.p`
    font-weight: bold;
    font-size: 10vw;
    width: auto;
    letter-spacing: -2px;
    white-space: nowrap;
    display: flex;
    justify-content: center;
    padding-bottom: 40px;
`;

const GeoCol = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

const IconCol = styled.div`
    height: 100%;    
    display: flex;
    flex-direction: column;
    align-items: end;
`;

const WeatherInfo = styled.div`
    font-weight: bold;
    display: flex;
    flex-direction: column;
    justify-content: center;
    white-space: nowrap;
`;

const TextAlignCenter = styled.div`
    text-align: center;
`;

const ForecastCurrentDay: FC<ForecastCurrentDayProps> = ({ currentDayForecast, cityInfo, isCelsius }) => {
  const iconSrc = process.env.PUBLIC_URL + '/images/' + currentDayForecast.icon + '@2x.png';
  return (
    <Container fluid>
      <PanelDiv>
        <Row>
          <Col xs={6} sm={6} md={4} lg={4} xl={4} xxl={4}>
            <GeoCol>
              <CityInfo>{cityInfo.name}, {cityInfo.country}</CityInfo>
              <DateInfo>{currentDayForecast.date}</DateInfo>
            </GeoCol>
          </Col>
          <Col xs={6} sm={6} md={{ span: 4, offset: 4 }} lg={{ span: 4, offset: 4 }} xl={{ span: 4, offset: 4 }} xxl={{ span: 4, offset: 4 }}>
            <IconCol>
              <img alt="icon" src={iconSrc}></img>
              <DescriptionInfo>{currentDayForecast.description}</DescriptionInfo>
            </IconCol>
          </Col>
        </Row>
        <Row>
          <Col xs={12} sm={12} md={{ span: 4, offset: 4 }} lg={{ span: 4, offset: 4 }} xl={{ span: 4, offset: 4 }} xxl={{ span: 4, offset: 4 }}>
            <TemperatureInfo>
              {isCelsius ? currentDayForecast.avgTemperature + ' ºC' : getCelsiusInFahrenheit(currentDayForecast.avgTemperature) + ' ºF'}
            </TemperatureInfo>
          </Col>
        </Row>
        <Row>
          <Col xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
            <WeatherInfo>
              <Row>
                <Col>
                  <TextAlignCenter>
                    <span>Humidity</span>
                  </TextAlignCenter>
                </Col>
                <Col>
                  <TextAlignCenter>
                    <span>Wind</span>
                  </TextAlignCenter>
                </Col>
              </Row>
              <Row>
                <Col>
                  <TextAlignCenter>
                    <span>{currentDayForecast.humidity}%</span>
                  </TextAlignCenter>
                </Col>
                <Col>
                  <TextAlignCenter>
                    <span>{currentDayForecast.wind.toFixed(2)} m/s</span>
                  </TextAlignCenter>
                </Col>
              </Row>
            </WeatherInfo>
          </Col>
          <Col xs={12} sm={12} md={{ span: 4, offset: 4 }} lg={{ span: 4, offset: 4 }} xl={{ span: 4, offset: 4 }} xxl={{ span: 4, offset: 4 }}>
            <WeatherInfo>
              <Row>
                <Col>
                  <TextAlignCenter>
                    <span>Feels Like</span>
                  </TextAlignCenter>
                </Col>
                <Col>
                  <TextAlignCenter>
                    <span>Pressure</span>
                  </TextAlignCenter>
                </Col>
              </Row>
              <Row>
                <Col>
                  <TextAlignCenter>
                    <span>{isCelsius ? currentDayForecast.feels_like + ' ºC' : getCelsiusInFahrenheit(currentDayForecast.feels_like) + ' ºF'}</span>
                  </TextAlignCenter>
                </Col>
                <Col>
                  <TextAlignCenter>
                    <span>{currentDayForecast.pressure} hPa</span>
                  </TextAlignCenter>
                </Col>
              </Row>
            </WeatherInfo>
          </Col>
        </Row>
      </PanelDiv>
    </Container>
  );
};

export default ForecastCurrentDay; 
