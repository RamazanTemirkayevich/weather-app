import './current-weather.scss';
import Forecast from '../forecast/forecast';
import { useTranslation } from "react-i18next";
// import WeatherChart from '../weather-chart/weather-chart';
// import DegreeSwitcher from '../degree-switcher/degree-switcher';

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

const CurrentWeather = ({ data, onRemove, forecast }) => {
    const weatherBackgroundClass = getWeatherBackgroundClass(data.weather[0].main);
    const { t } = useTranslation();

    const handleRemoveClick = () => {
        onRemove(data.id);
    };


    return (
        <li className={`weather__list-item ${weatherBackgroundClass}`}>
            <div className="weather__list-item__top">
                <div className="weather__list-item__descr">
                    <p>{data.city}</p>
                    {/* <span>Fri, 12 May, 10:25</span> */}
                </div>
                <div className="weather__list-item__icon">
                    <img alt="weather" src={`./icons/${data.weather[0].icon}.png`} />
                    <span>
                        {t(`card.weather.${data.weather[0].description}`)}
                        {/* {data.weather[0]?.description} */}
                    </span>
                </div>
            </div>
            <div className="weather__list-item__middle">
                {forecast && <Forecast data={forecast} />}
            </div>
            <div className="weather__list-item__footer">
                <div className="weather__list-item__degree">
                    <div className="weather__list-item__degree-top">    
                        <span>
                            {data.main.temp > 0 ? "+" : null}
                            {data.unit === "metric"
                                ? data.main.temp
                                : Math.round((data.main.temp))}
                        </span>
                        <div className="weather__list-item__degree-switch">
                            <span className="degree-switch">°C</span>
                            <span className="degree-switch">°F</span>
                        </div>
                    </div>
                    <div className="weather__list-item__degree-bottom">
                        <p>{t("card.feelsLike")}
                            <span className="feels">
                                {data.unit === "metric"
                                    ? data.main.feels_like
                                    : Math.round((data.main.feels_like))}°C
                            </span>
                        </p>
                    </div>
                </div>
                <ul className="weather__list-item__params">
                    <li className="weather__list-item__params-item">
                        Wind: <span>{Math.round(data.wind.speed)} m/s</span>
                    </li>
                    <li className="weather__list-item__params-item">
                        Humidity: <span>{Math.round(data.main.humidity)}%</span>
                    </li>
                    <li className="weather__list-item__params-item">
                        Pressure: <span>{Math.round(data.main.pressure)}Pa</span>
                    </li>
                </ul>
            </div>
            <button className="remove-button" onClick={handleRemoveClick}>
                <img src="icons/icon-close.svg" alt="" />
            </button>
        </li>
    );
}

export default CurrentWeather;