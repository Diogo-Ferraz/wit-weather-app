import React, { FC } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { LayerGroup, LayersControl, MapContainer, Marker, TileLayer } from 'react-leaflet';
import styled from 'styled-components';

import { WeatherCity } from '../../store/types';

interface WeatherMapProps {
  cityInfo: WeatherCity
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

const MapTitle = styled.h2`
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

const MapWrapper = styled.div`
  border-radius: 12px;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.05);
  padding: 4px;
  backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

  .leaflet-container {
    border-radius: 8px;
    min-width: 100%;
    min-height: 50vh;
    
    @media (max-width: 768px) {
      min-height: 40vh;
    }
    
    @media (max-width: 480px) {
      min-height: 35vh;
    }
  }

  .leaflet-control-layers {
    background: rgba(255, 255, 255, 0.9) !important;
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.2) !important;
    border-radius: 8px !important;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1) !important;
  }

  .leaflet-control-layers-toggle {
    background-color: rgba(255, 255, 255, 0.9) !important;
    backdrop-filter: blur(10px);
    border-radius: 6px !important;
  }

  .leaflet-control-zoom {
    border: none !important;
    
    a {
      background: rgba(255, 255, 255, 0.9) !important;
      backdrop-filter: blur(10px);
      border: 1px solid rgba(255, 255, 255, 0.2) !important;
      color: #333 !important;
      
      &:hover {
        background: rgba(255, 255, 255, 1) !important;
      }
    }
    
    a:first-child {
      border-radius: 6px 6px 0 0 !important;
    }
    
    a:last-child {
      border-radius: 0 0 6px 6px !important;
    }
  }

  .leaflet-control-attribution {
    background: rgba(255, 255, 255, 0.8) !important;
    backdrop-filter: blur(5px);
    border-radius: 4px !important;
    margin: 8px !important;
    padding: 4px 8px !important;
    font-size: 10px !important;
  }
`;

const LocationInfo = styled.div`
  text-align: center;
  margin-bottom: 16px;
  padding: 12px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

const LocationText = styled.p`
  margin: 0;
  font-size: 0.9rem;
  opacity: 0.9;
  font-weight: 400;
`;

const WeatherMap: FC<WeatherMapProps> = ({ cityInfo }) => {
  return (
    <Container fluid>
      <PanelDiv>
        <MapTitle>Temperature Map</MapTitle>

        <LocationInfo>
          <LocationText>
            {cityInfo.name}, {cityInfo.country}
            <span style={{ opacity: 0.7, fontSize: '0.8rem', marginLeft: '8px' }}>
              ({cityInfo.coord.lat.toFixed(2)}, {cityInfo.coord.lon.toFixed(2)})
            </span>
          </LocationText>
        </LocationInfo>

        <Row>
          <Col>
            <MapWrapper>
              <MapContainer
                center={[cityInfo.coord.lat, cityInfo.coord.lon]}
                zoom={10}
                scrollWheelZoom={true}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={[cityInfo.coord.lat, cityInfo.coord.lon]}>
                </Marker>
                <LayersControl>
                  <LayersControl.Overlay name="Temperature Layer">
                    <LayerGroup>
                      <TileLayer
                        attribution='&copy; OpenWeatherMap'
                        url={`https://tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid=${process.env.REACT_APP_OPEN_WEATHER_API_KEY}`}
                      />
                    </LayerGroup>
                  </LayersControl.Overlay>
                </LayersControl>
              </MapContainer>
            </MapWrapper>
          </Col>
        </Row>
      </PanelDiv>
    </Container>
  );
};

export default WeatherMap;