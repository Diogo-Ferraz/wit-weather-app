import {
  CategoryScale, Chart as ChartJS, Legend, LinearScale, LineElement, PointElement, Title,
  Tooltip
} from 'chart.js';
import React, { FC } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Line } from 'react-chartjs-2';
import styled from 'styled-components';
import { WeatherCity, WeatherResult } from '../../store/types';
import getCelsiusInFahrenheit from '../../utils/getCelsiusInFahrenheit';

interface TempChartProps {
  futureDaysForecast: WeatherResult[],
  cityInfo: WeatherCity,
  isCelsius: boolean
}

const PanelDiv = styled.div`
    margin: 20px 0;
    background-color: rgb(25 32 56);
    border-radius: 10px;
    padding: 0 10px;
`;
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Daily forecast',
    },
  },
};


const TempChart: FC<TempChartProps> = ({ futureDaysForecast, cityInfo, isCelsius }) => {
  return (
    <Container fluid>
      <PanelDiv>
        <Row>
          <Col>
            {futureDaysForecast?.length > 0 &&
              <Line
                options={options}
                data={{
                  labels: futureDaysForecast.map((x: WeatherResult) => x.date),
                  datasets: [
                    {
                      label: `${cityInfo.name}, ${cityInfo.country}`,
                      data: futureDaysForecast.map((x: WeatherResult) => isCelsius ? x.avgTemperature : getCelsiusInFahrenheit(x.avgTemperature)),
                      fill: false,
                      borderColor: '#42A5F5',
                      tension: .4,
                      backgroundColor: '#ffffff'
                    }
                  ]
                }}
              />}
          </Col>
        </Row>
      </PanelDiv>
    </Container>
  );
};
export default TempChart;
