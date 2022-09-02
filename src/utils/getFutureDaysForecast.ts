import { WeatherData, WeatherResponse, WeatherResult } from './../store/types';
import getSingleForecast from './getSingleForecast';
import getUTCDate from "./getUTCDate";

const futureDaysForecast = (data: WeatherResponse): WeatherResult[] => {
    if (data?.list?.length > 0) {

        const daysForecastArray = data.list;
        const todayUTC = getUTCDate(new Date());
        const res: any = [];

        for (let i = daysForecastArray.length - 1; i >= 0; i--) {
            const itDate = getUTCDate(new Date(daysForecastArray[i].dt * 1000));
            if (todayUTC.getUTCDate() === itDate.getUTCDate()) {
                continue;
            }
            if (!res.some((x: any) => getUTCDate(new Date(x.dt * 1000)).getDate() === itDate.getDate()
                && getUTCDate(new Date(x.dt * 1000)).getMonth() === itDate.getMonth()
                && getUTCDate(new Date(x.dt * 1000)).getFullYear() === itDate.getFullYear()) && itDate.getHours() <= todayUTC.getHours()) {
                res.push(daysForecastArray[i]);
            }

        }
        return res.sort((a: any, b: any) => { return (a.dt > b.dt) ? 1 : ((b.dt > a.dt) ? -1 : 0) }).map((x: WeatherData) => getSingleForecast(x));
    }
    return [];
};

export default futureDaysForecast;