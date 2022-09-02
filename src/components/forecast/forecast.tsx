import React, { FC, useState } from 'react';
import styled from 'styled-components';
import { WeatherForecast } from '../../store/types';
import ForecastCurrentDay from '../forecast-current-day/forecast-current-day';
import ForecastFutureDays from '../forecast-future-days/forecast-future-days';
import TempChart from '../temp-chart/temp-chart';
import WeatherMap from '../weather-map/weather-map';

interface ForecastProps {
  forecast: WeatherForecast
}

const ForecastDiv = styled.div`
    margin-top: 20px;
    display: flex;
    justify-content: center;
    gap: 10px;
`;

const DegreeLabel = styled.small`
  color: white;
`;

const CheckBoxWrapper = styled.div`
  position: relative;
`;
const CheckBoxLabel = styled.label`
  position: absolute;
  top: 0;
  left: 0;
  width: 42px;
  height: 26px;
  border-radius: 15px;
  background: rgb(25 32 56);
  cursor: pointer;
  &::after {
    content: "";
    display: block;
    border-radius: 50%;
    width: 18px;
    height: 18px;
    margin: 3px;
    background: #ffffff;
    box-shadow: 1px 3px 3px 1px rgba(0, 0, 0, 0.2);
    transition: 0.2s;
  }
`;
const CheckBox = styled.input`
  opacity: 0;
  z-index: 1;
  border-radius: 15px;
  width: 42px;
  height: 26px;
  &:checked + ${CheckBoxLabel} {
    background: rgb(63, 76, 119);
    &::after {
      content: "";
      display: block;
      border-radius: 50%;
      width: 18px;
      height: 18px;
      margin-left: 21px;
      transition: 0.2s;
    }
  }
`;




const Forecast: FC<ForecastProps> = ({ forecast }) => {
  const [isCelsius, setIsCelsius] = useState(true);

  const onSwitchChange = (e: any) => {
    setIsCelsius(!e.target.checked);
  };

  return (
    <>
      <ForecastDiv>
        <DegreeLabel>Celsius</DegreeLabel>
        <CheckBoxWrapper>
          <CheckBox id="checkbox" type="checkbox" onClick={onSwitchChange} />
          <CheckBoxLabel htmlFor="checkbox" />
        </CheckBoxWrapper>
        <DegreeLabel>Fahrenheit</DegreeLabel>
      </ForecastDiv>
      <div>
        <ForecastCurrentDay currentDayForecast={forecast.current} isCelsius={isCelsius} cityInfo={forecast.city} />
      </div>
      <div>
        <ForecastFutureDays futureDaysForecast={forecast.future} isCelsius={isCelsius} />
      </div>
      <div>
        <TempChart futureDaysForecast={forecast.future} isCelsius={isCelsius} cityInfo={forecast.city}></TempChart>
      </div>
      <div>
        <WeatherMap cityInfo={forecast.city}></WeatherMap>
      </div>
    </>
  );
};

export default Forecast;

