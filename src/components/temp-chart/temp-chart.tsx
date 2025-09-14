import { CategoryScale, Chart as ChartJS, Legend, LinearScale, LineElement, PointElement, Title, Tooltip } from 'chart.js';
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
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.05);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: white;
  margin-top: 20px;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
  }

  @media (max-width: 768px) {
    margin-top: 16px;
  }
`;

const ChartWrapper = styled.div`
  position: relative;
  border-radius: 12px;
  padding: 20px;
  backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 255, 255, 0.1);

  @media (max-width: 768px) {
    padding: 16px;
  }
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

const TempChart: FC<TempChartProps> = ({ futureDaysForecast, cityInfo, isCelsius }) => {
  const options = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          color: 'white',
          font: {
            size: 14,
            weight: '500'
          },
          padding: 20,
          usePointStyle: true
        }
      },
      title: {
        display: true,
        text: 'Temperature Trend',
        color: 'rgba(255,255,255,0.9)',
        font: {
          size: 20,
          weight: '600'
        },
        padding: {
          top: 10,
          bottom: 30
        }
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: 'white',
        bodyColor: 'white',
        borderColor: 'rgba(255, 255, 255, 0.2)',
        borderWidth: 1,
        cornerRadius: 8,
        padding: 12,
        displayColors: true,
        callbacks: {
          label: function(context: any) {
            return `${context.dataset.label}: ${context.parsed.y}${isCelsius ? '°C' : '°F'}`;
          }
        }
      }
    },
    scales: {
      x: {
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
          drawBorder: false
        },
        ticks: {
          color: 'rgba(255, 255, 255, 0.8)',
          font: {
            size: 12
          }
        }
      },
      y: {
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
          drawBorder: false
        },
        ticks: {
          color: 'rgba(255, 255, 255, 0.8)',
          font: {
            size: 12
          },
          callback: function(value: any) {
            return `${value}${isCelsius ? '°C' : '°F'}`;
          }
        }
      }
    },
    elements: {
      point: {
        radius: 6,
        hoverRadius: 8,
        borderWidth: 2
      },
      line: {
        borderWidth: 3
      }
    },
    interaction: {
      intersect: false,
      mode: 'index' as const
    }
  };

  return (
    <Container fluid>
      <PanelDiv>
        <Row>
          <Col>
            <ChartWrapper>
              {futureDaysForecast?.length > 0 && (
                <Line
                  options={options}
                  data={{
                    labels: futureDaysForecast.map((x: WeatherResult) => x.date),
                    datasets: [
                      {
                        label: `${cityInfo.name}, ${cityInfo.country}`,
                        data: futureDaysForecast.map((x: WeatherResult) => 
                          isCelsius ? x.avgTemperature : getCelsiusInFahrenheit(x.avgTemperature)
                        ),
                        fill: false,
                        borderColor: '#60A5FA',
                        backgroundColor: '#60A5FA',
                        pointBackgroundColor: '#60A5FA',
                        pointBorderColor: '#FFFFFF',
                        pointHoverBackgroundColor: '#FFFFFF',
                        pointHoverBorderColor: '#60A5FA',
                        tension: 0.4,
                        borderCapStyle: 'round' as const,
                        borderJoinStyle: 'round' as const
                      }
                    ]
                  }}
                />
              )}
            </ChartWrapper>
          </Col>
        </Row>
      </PanelDiv>
    </Container>
  );
};

export default TempChart;