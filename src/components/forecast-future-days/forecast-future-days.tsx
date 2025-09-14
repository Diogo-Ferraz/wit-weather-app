import React, { FC } from 'react';
import { Container } from 'react-bootstrap';
import styled from 'styled-components';

import { WeatherResult } from '../../store/types';
import getCelsiusInFahrenheit from '../../utils/getCelsiusInFahrenheit';

interface ForecastFutureDaysProps {
  futureDaysForecast: WeatherResult[],
  isCelsius: boolean
}

const weekday = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const PanelDiv = styled.div`
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.05);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
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

const ForecastGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 16px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 16px;
  }
`;

const DayCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 12px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(5px);
  transition: all 0.2s ease;
  min-height: 220px;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    transform: translateY(-4px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  }

  @media (max-width: 768px) {
    min-height: 200px;
    padding: 16px 12px;
  }
`;

const DayHeader = styled.div`
  text-align: center;
  margin-bottom: 16px;
`;

const DayName = styled.h3`
  font-weight: 600;
  font-size: 1.1rem;
  margin: 0 0 4px 0;
  letter-spacing: 0.5px;
`;

const DateText = styled.p`
  font-size: 0.8rem;
  margin: 0;
  opacity: 0.7;
  font-weight: 300;
`;

const WeatherIcon = styled.div`
  margin: 12px 0;
  
  img {
    width: 60px;
    height: 60px;
    filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
  }

  @media (max-width: 768px) {
    img {
      width: 50px;
      height: 50px;
    }
  }
`;

const WeatherDescription = styled.p`
  font-size: 0.8rem;
  text-align: center;
  margin: 8px 0;
  opacity: 0.9;
  font-weight: 300;
  text-transform: capitalize;
  line-height: 1.3;
  min-height: 32px;
  display: flex;
  align-items: center;
`;

const Temperature = styled.div`
  font-weight: 600;
  font-size: 1.3rem;
  margin-top: auto;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
  letter-spacing: -0.5px;

  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

const ForecastTitle = styled.h2`
  font-size: 1.2rem;
  font-weight: 600;
  margin: 0 0 24px 0;
  text-align: center;
  opacity: 0.9;
  letter-spacing: 0.5px;

  @media (max-width: 768px) {
    font-size: 1.1rem;
    margin-bottom: 20px;
  }
`;

const ForecastFutureDays: FC<ForecastFutureDaysProps> = ({ futureDaysForecast, isCelsius }) => {
  return (
    <Container fluid>
      <PanelDiv>
        <ForecastTitle>5-Day Forecast</ForecastTitle>
        <ForecastGrid>
          {futureDaysForecast.map((singleDayForecast: WeatherResult, idx: number) => {
            const iconSrc = process.env.PUBLIC_URL + '/images/' + singleDayForecast.icon + '@2x.png';
            return (
              <DayCard key={idx}>
                <DayHeader>
                  <DayName>{weekday[new Date(singleDayForecast.date).getDay()]}</DayName>
                  <DateText>{singleDayForecast.date}</DateText>
                </DayHeader>
                
                <WeatherIcon>
                  <img alt="weather icon" src={iconSrc} />
                </WeatherIcon>
                
                <WeatherDescription>
                  {singleDayForecast.description}
                </WeatherDescription>
                
                <Temperature>
                  {isCelsius 
                    ? `${singleDayForecast.avgTemperature}°C` 
                    : `${getCelsiusInFahrenheit(singleDayForecast.avgTemperature)}°F`
                  }
                </Temperature>
              </DayCard>
            );
          })}
        </ForecastGrid>
      </PanelDiv>
    </Container>
  );
};

export default ForecastFutureDays;