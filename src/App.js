import './App.scss';
import './variables.scss';
import './reset.sass';
import './components/weather-container/weather-container.scss'
import Search from './components/search/search';
import { v4 as uuidv4 } from 'uuid';
import CurrentWeather from './components/current-weather/current-weather';
// import WeatherContainer from './components/weather-container/weather-container'
import { WEATHER_API_URL, WEATHER_API_KEY } from './api'
import { useState } from 'react';

function App() {
  const [weatherData, setWeatherData] = useState([]);

  const handleAddCity = (searchData) => {
    const [lat, lon] = searchData.value.split(' ');

    fetch(`${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&units=metric&appid=${WEATHER_API_KEY}`)
        .then(response => response.json())
        .then(weatherResponse => {
            const { id: weatherId, ...weatherData } = weatherResponse;
            const id = uuidv4();
            const newData = { id, city: searchData.label, ...weatherData };
            setWeatherData(prevData => [...prevData, newData]);
        })
        .catch(err => console.log(err));
  };

  const handleRemoveWeatherCard = (id) => {
    setWeatherData(prevData => prevData.filter(data => data.id !== id));
  };

  console.log(weatherData);

  return (
    <div className="container">
        <Search 
          onAddCity={handleAddCity}
        />
        <ul className="weather__list">
          {weatherData.map((data) => (
            <CurrentWeather key={data.id} data={data} onRemove={() => handleRemoveWeatherCard(data.id)} />
            // <WeatherContainer key={data.id} data={data} onRemove={() => handleRemoveWeatherCard(data.id)} />
          ))}
        </ul>
    </div>
  );
}

export default App;