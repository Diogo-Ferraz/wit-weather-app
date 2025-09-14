const celsiusInFahrenheit = (c: number): number => {
    return Number(((c * 1.8) + 32).toFixed());
};

export default celsiusInFahrenheit;