import React, { FC, useState } from 'react';
import styled from 'styled-components';
import { WeatherForecast } from '../../store/types';
import ForecastCurrentDay from '../forecast-current-day/forecast-current-day';
import ForecastFutureDays from '../forecast-future-days/forecast-future-days';
import TempChart from '../temp-chart/temp-chart';
import WeatherMap from '../weather-map/weather-map';

interface ForecastProps {
  forecast: WeatherForecast
  isCelsius: boolean
}

const CardsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0;
  margin-top: 20px;
`;

const Forecast: FC<ForecastProps> = ({ forecast, isCelsius }) => {
  return (
    <CardsContainer>
      <ForecastCurrentDay 
        currentDayForecast={forecast.current} 
        isCelsius={isCelsius} 
        cityInfo={forecast.city} 
      />
      
      <ForecastFutureDays 
        futureDaysForecast={forecast.future} 
        isCelsius={isCelsius} 
      />
      
      <TempChart 
        futureDaysForecast={forecast.future} 
        isCelsius={isCelsius} 
        cityInfo={forecast.city} 
      />
      
      <WeatherMap cityInfo={forecast.city} />
    </CardsContainer>
  );
};

export default Forecast;