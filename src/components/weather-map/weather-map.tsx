import React, { FC } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { LayerGroup, LayersControl, MapContainer, Marker, TileLayer } from 'react-leaflet';
import { WeatherCity } from '../../store/types';

interface WeatherMapProps {
    cityInfo: WeatherCity
}

const mapContainer = {
    minWidth: '60vw',
    minHeight: '60vh',
    borderRadius: '10px'

};

const WeatherMap: FC<WeatherMapProps> = ({ cityInfo }) => {
    return (
        <Container fluid>
            <Row>
                <Col>
                    <MapContainer style={mapContainer} center={[cityInfo.coord.lat, cityInfo.coord.lon]} zoom={14} scrollWheelZoom={true}>
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <Marker position={[cityInfo.coord.lat, cityInfo.coord.lon]}>
                        </Marker>
                        <LayersControl>
                            <LayersControl.Overlay name="Temperature">
                                <LayerGroup>
                                    <TileLayer
                                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                        url={`https://tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid=${process.env.REACT_APP_OPEN_WEATHER_API_KEY}`}
                                    />
                                </LayerGroup>
                            </LayersControl.Overlay>
                        </LayersControl>
                    </MapContainer>
                </Col>
            </Row>
        </Container>
    );
};

export default WeatherMap;
