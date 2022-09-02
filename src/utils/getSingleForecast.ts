import { WeatherData, WeatherResult } from "../store/types";

const singleDayForecast = (data: WeatherData): WeatherResult => {
    return {
        date: new Date(data.dt * 1000).toLocaleDateString(
            'en-us',
            {
                year: '2-digit',
                month: 'short',
                day: 'numeric',
                timeZone: 'utc'
            }
        ),
        avgTemperature: Number(data.main.temp.toFixed()),
        minTemperature: Number(data.main.temp_min.toFixed()),
        maxTemperature: Number(data.main.temp_max.toFixed()),
        humidity: Number(data.main.humidity.toFixed()),
        pressure: data.main.pressure,
        feels_like: Number(data.main.feels_like.toFixed()),
        wind: data.wind.speed,
        description: data.weather[0].description,
        icon: data.weather[0].icon,
    }
};


export default singleDayForecast;