import React, { FC } from 'react';
import { Container } from 'react-bootstrap';
import styled from 'styled-components';

import { WeatherCity, WeatherResult } from '../../store/types';
import getCelsiusInFahrenheit from '../../utils/getCelsiusInFahrenheit';

interface ForecastCurrentDayProps {
  currentDayForecast: WeatherResult,
  cityInfo: WeatherCity,
  isCelsius: boolean
}

const PanelDiv = styled.div`
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.05);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: white;
  margin-top: 20px;
  padding: 32px;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
  }

  @media (max-width: 768px) {
    padding: 24px;
    margin-top: 16px;
  }
`;

const HeaderSection = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-align: center;
  margin-bottom: 24px;

  @media (max-width: 768px) {
    margin-bottom: 20px;
  }
`;

const CityInfo = styled.h2`
  font-weight: 600;
  font-size: 1.5rem;
  line-height: 1.2;
  margin: 0 0 4px 0;
  letter-spacing: 0.5px;

  @media (max-width: 768px) {
    font-size: 1.3rem;
  }
`;

const DateInfo = styled.p`
  font-size: 0.9rem;
  line-height: 1;
  margin: 0;
  opacity: 0.8;
  font-weight: 300;
`;

const TemperatureSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 24px;
  min-height: 140px;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 12px;
    min-height: 120px;
  }
`;

const TemperatureInfo = styled.div`
  font-weight: 300;
  font-size: clamp(3.5rem, 10vw, 6rem);
  letter-spacing: -2px;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
`;

const WeatherIcon = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  img {
    width: 80px;
    height: 80px;
    filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2));
  }
`;

const DescriptionInfo = styled.p`
  font-size: 0.85rem;
  line-height: 1;
  margin: 8px 0 0 0;
  text-align: center;
  opacity: 0.9;
  font-weight: 300;
  text-transform: capitalize;
`;

const WeatherDetailsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 24px;
  margin-top: 32px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
    margin-top: 24px;
  }
`;

const WeatherDetail = styled.div`
  text-align: center;
  padding: 16px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(5px);
  transition: all 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    transform: translateY(-1px);
  }
`;

const DetailLabel = styled.div`
  font-size: 0.8rem;
  opacity: 0.7;
  margin-bottom: 4px;
  font-weight: 400;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const DetailValue = styled.div`
  font-size: 1.1rem;
  font-weight: 600;
  color: white;
`;

const ForecastCurrentDay: FC<ForecastCurrentDayProps> = ({ currentDayForecast, cityInfo, isCelsius }) => {
  const iconSrc = process.env.PUBLIC_URL + '/images/' + currentDayForecast.icon + '@2x.png';

  return (
    <Container fluid>
      <PanelDiv>
        <HeaderSection>
          <CityInfo>{cityInfo.name}, {cityInfo.country}</CityInfo>
          <DateInfo>{currentDayForecast.date}</DateInfo>
        </HeaderSection>

        <TemperatureSection>
          <TemperatureInfo>
            {isCelsius 
              ? `${currentDayForecast.avgTemperature}°C` 
              : `${getCelsiusInFahrenheit(currentDayForecast.avgTemperature)}°F`
            }
          </TemperatureInfo>

          <WeatherIcon>
            <img alt="weather icon" src={iconSrc} />
            <DescriptionInfo>{currentDayForecast.description}</DescriptionInfo>
          </WeatherIcon>
        </TemperatureSection>

        <WeatherDetailsGrid>
          <WeatherDetail>
            <DetailLabel>Feels Like</DetailLabel>
            <DetailValue>
              {isCelsius 
                ? `${currentDayForecast.feels_like}°C` 
                : `${getCelsiusInFahrenheit(currentDayForecast.feels_like)}°F`
              }
            </DetailValue>
          </WeatherDetail>
          
          <WeatherDetail>
            <DetailLabel>Humidity</DetailLabel>
            <DetailValue>{currentDayForecast.humidity}%</DetailValue>
          </WeatherDetail>
          
          <WeatherDetail>
            <DetailLabel>Wind Speed</DetailLabel>
            <DetailValue>{currentDayForecast.wind.toFixed(1)} m/s</DetailValue>
          </WeatherDetail>
          
          <WeatherDetail>
            <DetailLabel>Pressure</DetailLabel>
            <DetailValue>{currentDayForecast.pressure} hPa</DetailValue>
          </WeatherDetail>
        </WeatherDetailsGrid>
      </PanelDiv>
    </Container>
  );
};

export default ForecastCurrentDay;
