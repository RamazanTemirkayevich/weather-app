import './weather-card.scss';
import Forecast from '../forecast/forecast';
import { useTranslation } from "react-i18next";
import { useState, useEffect} from 'react';

const WeatherCard = ({ data, onRemove }) => {
    const {id, city, currentWeather, forecast} = data
    const [currentTime, setCurrentTime] = useState(new Date());
    const [isCelsius, setIsCelsius] = useState(localStorage.getItem('degree') === 'C' ? true : false);
    const { t } = useTranslation();
    const handleRemoveClick = () => {
        onRemove(id);
    };

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);
        
        localStorage.setItem('weatherCards', JSON.stringify(data));
        
        return () => clearInterval(timer);
    }, [data]);

    const formatTime = (time) => {
        const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sut'];
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        
        const minutes = time.getUTCMinutes() < 10 ? `0${time.getUTCMinutes()}` : time.getUTCMinutes();
        const hours = time.getUTCHours() < 10 ? `0${time.getUTCHours()}` : time.getUTCHours();
        const dayOfWeek = daysOfWeek[time.getUTCDay()];
        const dayOfMonth = time.getUTCDate();
        const month = months[time.getUTCMonth()]; // Получаем название текущего месяца из массива months
        
        return [ t(`card.days.${dayOfWeek}`), ', ', `${dayOfMonth}`, ' ', t(`card.months.${month}`), `, `, `${hours}:${minutes}` ]
    };    

    const handleDegreeSwitch = () => {
        setIsCelsius(prevState => !prevState);
        localStorage.setItem("degree", isCelsius ? 'F' : 'C')
    };

    const calculateLocalTime = (currentTime, timezoneOffset) => {
        const timezoneOffsetMillis = timezoneOffset * 1000;
        const localTimeMillis = currentTime.getTime() + timezoneOffsetMillis;
        return new Date(localTimeMillis);
    };

    const localTime = calculateLocalTime(currentTime, currentWeather.timezone);

    return (
        <li className={`weather__list-item ${(currentWeather.weather[0].main)}`}>
            <div className="weather__list-item__top">
                <div className="weather__list-item__descr">
                    <p>{city}</p>
                    <span>{formatTime(localTime)}</span>
                </div>
                <div className="weather__list-item__icon">
                    <img alt="weather" src={`./icons/${currentWeather.weather[0].icon}.png`} />
                    <span>
                        {t(`card.weather.${currentWeather.weather[0]?.main}`)}
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
                            {(currentWeather.unit === "metric" 
                                ? (currentWeather.main.temp > 0 ? "+" : null) : null) + Math.round(isCelsius ? currentWeather.main.temp : (currentWeather.main.temp * 9/5 + 32))}
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