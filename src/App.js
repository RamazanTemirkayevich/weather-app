import './App.scss';
import './variables.scss';
import './reset.sass';
import './components/weather-container/weather-container.scss';
import Search from './components/search/search';
import { v4 as uuidv4 } from 'uuid';
import { connect } from 'react-redux';
import CurrentWeather from './components/current-weather/current-weather';
import Header from './components/header/header';
import { WEATHER_API_URL, WEATHER_API_KEY } from './api';
import { useState, useEffect } from 'react';

function App() {
  const [weatherData, setWeatherData] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const [forecast, setForecast] = useState(null);

  useEffect(() => {
    const getUserLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          position => {
            const { latitude, longitude } = position.coords;
            setUserLocation({ latitude, longitude });
          },
          error => {
            console.error('Error getting user location:', error);
          }
        );
      } else {
        console.error('Geolocation is not supported by this browser.');
      }
    };

    getUserLocation();
  }, []);

  useEffect(() => {
    localStorage.setItem('weatherData', JSON.stringify(weatherData));
  }, [weatherData]);

  useEffect(() => {
    const savedWeatherData = localStorage.getItem('weatherData');
    if (savedWeatherData) {
      setWeatherData(JSON.parse(savedWeatherData));
    }
  }, []);

  useEffect(() => {
    if (userLocation) {
      const { latitude, longitude } = userLocation;
      fetch(`${WEATHER_API_URL}/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${WEATHER_API_KEY}`)
        .then(response => response.json())
        .then(weatherResponse => {
          const { id: weatherId, ...weatherData } = weatherResponse;
          const id = uuidv4();
          const newData = { id, city: weatherData.name, ...weatherData };
          setWeatherData(prevData => [...prevData, newData]);
        })
        .catch(err => console.error('Error fetching weather data:', err));
    }
  }, [userLocation]);

  const handleOnSearchChange = (searchData) => {
    const [lat, lon] = searchData.value.split(" ");

    const currentWeatherFetch = fetch(
      `${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
    );
    const forecastFetch = fetch(
      `${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
    );

    Promise.all([currentWeatherFetch, forecastFetch])
      .then(async (response) => {
        const weatherResponse = await response[0].json();
        const forecastResponse = await response[1].json();

        const { id: weatherId, ...weatherData } = weatherResponse;
        const id = uuidv4();
        const newData = { id, city: searchData.label, ...weatherData };
        setWeatherData(prevData => [...prevData, newData]);

        setForecast({ city: searchData.label, ...forecastResponse });
      }, [userLocation])
      .catch(console.log('error'));
  };

  const handleRemoveWeatherCard = (id) => {
    setWeatherData(prevData => prevData.filter(data => data.id !== id));
  };

  console.log(weatherData);
  console.log(forecast);

  return (
    <div className="container">
      <Header />
      <Search
        onSearchChange={handleOnSearchChange}
      />
      <ul className="weather__list">
        {weatherData.map((data, i) => (
          <CurrentWeather key={i} forecast={forecast} data={data} onRemove={() => handleRemoveWeatherCard(data.id)} />
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