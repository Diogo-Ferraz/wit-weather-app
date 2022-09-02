import axios from 'axios';
import { useState } from 'react';
import getFutureDaysForecast from '../utils/getFutureDaysForecast';
import getSingleForecast from '../utils/getSingleForecast';
import { WeatherCity, WeatherError, WeatherForecast, WeatherResponse } from './../store/types';

const BASE_URL = 'https://api.openweathermap.org/data/2.5/forecast';

const useWeatherForecast = () => {
    const [error, setError] = useState<WeatherError | null>(null);
    const [isLoading, setLoading] = useState(false);
    const [forecast, setForecast] = useState<WeatherForecast | null>(null);

    const submitRequest = (location: string) => {
        setForecast(null);
        setError(null);
        setLoading(true);
        axios({
            method: 'GET',
            url: BASE_URL + `?q=${location}&units=metric&APPID=${process.env.REACT_APP_OPEN_WEATHER_API_KEY}`,
        })
            .then((response) => {
                if (response.status !== 200) {
                    throw new Error();
                }
                setError(null);
                setLoading(false);

                const weatherResponse: WeatherResponse = response.data;

                const currentForecast = getSingleForecast(weatherResponse.list[0]);
                const futureForecast = getFutureDaysForecast(weatherResponse);

                const geoLocation = {
                    name: weatherResponse.city.name,
                    country: weatherResponse.city.country,
                    id: weatherResponse.city.id,
                    coord: {
                        lat: weatherResponse.city.coord.lat,
                        lon: weatherResponse.city.coord.lon
                    }
                } as WeatherCity;

                const forecast = {
                    city: geoLocation,
                    current: currentForecast,
                    future: futureForecast
                } as WeatherForecast;

                setForecast(forecast);
            })
            .catch((error) => {
                setError(error?.response?.data);
                setLoading(false);
            });
    };

    return {
        error,
        isLoading,
        forecast,
        submitRequest
    }
}

export default useWeatherForecast;