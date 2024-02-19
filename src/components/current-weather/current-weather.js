import './current-weather.scss';
//import WeatherChart from '../weather-chart/weather-chart';

const getWeatherBackgroundClass = (weather) => {
    switch (weather) {
        case 'Clear':
            return 'sunny';
        case 'Clouds':
            return 'cloudy';
        case 'Rain':
            return 'rain';
        case 'Drizzle':
            return 'drizzle';
        case 'Thunderstorm':
            return 'thunderstorm';
        case 'Snow':
            return 'snow';
        default:
            return 'sunny';
    };
};

const CurrentWeather = ({ data, onRemove }) => {
    const weatherBackgroundClass = getWeatherBackgroundClass(data.weather[0].main);

    const handleRemoveClick = () => {
        onRemove(data.id);
    }

    return (
        <li className={`weather__list-item ${weatherBackgroundClass}`}>
            <div className="weather__list-item__top">
                <div className="weather__list-item__descr">
                    <p>{data.city}</p>
                </div>
                <div className="weather__list-item__icon">
                    <img alt="weather" src={`./icons/${data.weather[0].icon}.png`} />
                    <span>{data.weather[0].description}</span>
                </div>
            </div>
            <div className="weather__list-item__middle">
                {/* <WeatherChart forecastData={data.forecast} /> */}
                {/* <img src="diagram.png" alt="" /> */}
            </div>
            <div className="weather__list-item__footer">
                <div className="weather__list-item__degree">
                    <span>{data.main.temp}</span>
                    <div className="weather__list-item__degree-switch">
                        <span className="degree-switch">°C</span>
                        <span className="degree-switch">°F</span>
                    </div>
                </div>
                <ul className="weather__list-item__params">
                    {/* Дополнительные параметры о погоде */}
                </ul>
            </div>
            <button className="remove-button" onClick={handleRemoveClick}>
                <img src="icons/icon-close.svg" alt="" />
            </button>
        </li>
    );
}

export default CurrentWeather;