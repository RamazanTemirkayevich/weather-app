import './current-weather.scss';
import Forecast from '../forecast/forecast';
import { useTranslation } from "react-i18next";
import { useState, useEffect} from 'react';

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

const WeatherCard = ({ data, onRemove }) => {
    const {id, city, currentWeather, forecast} = data
    const [currentTime, setCurrentTime] = useState(new Date());
    const [isCelsius, setIsCelsius] = useState(true);
    const weatherBackgroundClass = getWeatherBackgroundClass(currentWeather.weather[0].main);
    const { t } = useTranslation();
    const handleRemoveClick = () => {
        onRemove(id);
    };

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const formatTime = (time) => {
        const minutes = time.getMinutes() < 10 ? `0${time.getMinutes()}` : time.getMinutes();
        return `${time.toDateString().slice(0, 3)}, ${time.getMonth()} ${time.toDateString().slice(4, 7)}, ${time.getHours()}:${minutes}`;
    };

    const handleDegreeSwitch = () => {
        setIsCelsius(prevState => !prevState);
    };

    return (
        <li className={`weather__list-item ${weatherBackgroundClass}`}>
            <div className="weather__list-item__top">
                <div className="weather__list-item__descr">
                    <p>{city}</p>
                    <span>{formatTime(currentTime)}</span>
                </div>
                <div className="weather__list-item__icon">
                    <img alt="weather" src={`./icons/${currentWeather.weather[0].icon}.png`} />
                    <span>
                        {currentWeather.weather[0]?.description}
                    </span>
                </div>
            </div>
            <div className="weather__list-item__middle">
                {forecast && <Forecast data={forecast} isCelsius={isCelsius}/>}
            </div>
            <div className="weather__list-item__footer">
                <div className="weather__list-item__degree">
                    <div className="weather__list-item__degree-top">
                        <span>
                            {isCelsius
                                ? (currentWeather.unit === "metric" ? (currentWeather.main.temp > 0 ? "+" : null) : null) + Math.round(currentWeather.main.temp)
                                : (currentWeather.unit === "metric" ? (currentWeather.main.temp > 0 ? "+" : null) : null) + Math.round(currentWeather.main.temp * 9/5 + 32)}
                        </span>
                        <div className="weather__list-item__degree-switch" onClick={handleDegreeSwitch}>
                            <span className={`degree-switch ${isCelsius ? 'active' : ''}`}>°C</span>
                            <span className={`degree-switch ${!isCelsius ? 'active' : ''}`}>°F</span>
                        </div>
                    </div>
                    <div className="weather__list-item__degree-bottom">
                        <p>{t("card.feelsLike")}
                            <span className="feels">
                                {currentWeather.unit === "metric"
                                    ? currentWeather.main.feels_like
                                    : Math.round((currentWeather.main.feels_like))}°C
                            </span>
                        </p>
                    </div>
                </div>
                <ul className="weather__list-item__params">
                    <li className="weather__list-item__params-item">
                        {t("card.wind")}: <span className="params">{Math.round(currentWeather.wind.speed)} {t("card.speed")}</span>
                    </li>
                    <li className="weather__list-item__params-item">
                        {t("card.humidity")}: <span className="params">{Math.round(currentWeather.main.humidity)}%</span>
                    </li>
                    <li className="weather__list-item__params-item">
                        {t("card.pressure")}: <span className="params">{Math.round(currentWeather.main.pressure)} {t("card.press")}</span>
                    </li>
                </ul>
            </div>
            <button className="remove-button" onClick={handleRemoveClick}>
                <img src="icons/icon-close.svg" alt="" />
            </button>
        </li>
    );
}

export default WeatherCard;