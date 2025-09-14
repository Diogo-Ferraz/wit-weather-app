export interface WeatherForecast {
  city: WeatherCity,
  current: WeatherResult,
  future: WeatherResult[]
}

export interface WeatherResult {
  date: string,
  avgTemperature: number,
  minTemperature: number,
  maxTemperature: number,
  humidity: number,
  pressure: number,
  feels_like: number,
  wind: number,
  description: string,
  icon: string,
}


export interface WeatherCityCoordinates {
  lat: number,
  lon: number
}


export interface WeatherCity {
  coord: WeatherCityCoordinates,
  country: string,
  id: number,
  name: string
}

export interface WeatherResponse {
  city: WeatherCity,
  cnt: number,
  list: WeatherData[]
}

export interface Weather {
  description: string;
  icon: string;
  id: number;
  main: string;
}

export interface WeatherData {
  base: string;
  clouds: {
    all: number;
  };
  cod: number;
  coord: {
    lon: number;
    lat: number;
  };
  dt: number;
  id: number;
  main: {
    feels_like: number;
    humidity: number;
    pressure: number;
    temp: number;
    temp_max: number;
    temp_min: number;
  };
  name: string;
  sys: {
    country: string;
    id: number;
    sunrise: number;
    sunset: number;
    type: number;
  };
  timezone: number;
  visibility: number;
  weather: Weather[];
  wind: {
    speed: number;
    deg: number;
  };
}

export interface WeatherError {
  cod: string;
  message: string;
}