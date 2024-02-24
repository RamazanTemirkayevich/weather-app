import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import './components/weather-container/weather-container.scss';
import Search from './components/search/search';
import WeatherCard from './components/current-weather/current-weather';
import Header from './components/header/header';

import { WEATHER_API_URL, WEATHER_API_KEY } from './api';

import './App.scss';
import './variables.scss';
import './reset.sass';


function App() {
  const [weatherData, setWeatherData] = useState([]);

  const getForecast = async ({latitude, longitude, city}) => {

    const currentWeather = await fetch(
      `${WEATHER_API_URL}/weather?lat=${latitude}&lon=${longitude}&appid=${WEATHER_API_KEY}&units=metric`
    ).then(response => response.json());
    const id = uuidv4();


    const forecast = await fetch(
      `${WEATHER_API_URL}/forecast?lat=${latitude}&lon=${longitude}&appid=${WEATHER_API_KEY}&units=metric`
    ).then(response => response.json());

    setWeatherData(prevData => [...prevData, {id, city: city || currentWeather.name, currentWeather, forecast}]);
  }

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          const { latitude, longitude } = position.coords;
          console.log(position)
          getForecast({ latitude, longitude })

        },
        error => {
          console.error('Error getting user location:', error);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }, []);


  const handleRemoveWeatherCard = (id) => {
    console.log(id, weatherData)
    setWeatherData(prevData => prevData.filter(data => data.id !== id));
  };

  return (
    <div className="container">
      <Header />
      <Search
        onSearchChange={getForecast}
      />
      <ul className="weather__list">
        {weatherData.map((data, i) => (
          <WeatherCard key={i} data={data} onRemove={() => handleRemoveWeatherCard(data.id)} />
        ))}
      </ul>
    </div>
  );
}

const mapStateProps = state => {
  return {
    data: state.weather.data
  };
}

export default connect(mapStateProps)(App);