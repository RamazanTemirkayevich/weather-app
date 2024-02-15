import './weather-container.scss'
import CurrentWeather from '../current-weather/current-weather';

const WeatherContainer = () => {
    return (
        <ul className="weather__list">
            <CurrentWeather />
            <CurrentWeather />
            <CurrentWeather />
            <CurrentWeather />
        </ul>
    );
}

export default WeatherContainer;