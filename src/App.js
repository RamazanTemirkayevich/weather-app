// import './App.scss';
// import './variables.scss';
// import './reset.sass';
// import './components/weather-container/weather-container.scss'
// import Search from './components/search/search';
// import { v4 as uuidv4 } from 'uuid';
// import CurrentWeather from './components/current-weather/current-weather';
// import Header from './components/header/header';
// import { WEATHER_API_URL, WEATHER_API_KEY } from './api'
// import { useState } from 'react';

// function App() {
//   const [ weatherData, setWeatherData] = useState([]);

//   const handleAddCity = (searchData) => {
//     const [lat, lon] = searchData.value.split(' ');

//     fetch(`${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&units=metric&appid=${WEATHER_API_KEY}`)
//         .then(response => response.json())
//         .then(weatherResponse => {
//             const { id: weatherId, ...weatherData } = weatherResponse;
//             const id = uuidv4();
//             const newData = { id, city: searchData.label, ...weatherData };
//             setWeatherData(prevData => [...prevData, newData]);
//         })
//         .catch(err => console.log(err));
//   };

//   const handleRemoveWeatherCard = (id) => {
//     setWeatherData(prevData => prevData.filter(data => data.id !== id));
//   };

//   console.log(weatherData);

//   return (
//     <div className="container">
//         <Header />
//         <Search 
//           onAddCity={handleAddCity}
//         />
//         <ul className="weather__list">
//           {weatherData.map((data) => (
//             <CurrentWeather key={data.id} data={data} onRemove={() => handleRemoveWeatherCard(data.id)} />
//           ))}
//         </ul>
//     </div>
//   );
// }

// export default App;

import './App.scss';
import './variables.scss';
import './reset.sass';
import './components/weather-container/weather-container.scss';
import Search from './components/search/search';
import { v4 as uuidv4 } from 'uuid';
import CurrentWeather from './components/current-weather/current-weather';
import Header from './components/header/header';
import { WEATHER_API_URL, WEATHER_API_KEY } from './api';
import { useState, useEffect } from 'react';

function App() {
  const [weatherData, setWeatherData] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const [setCurrentWeather] = useState(null);
  const [setForecast] = useState(null);

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
        const forcastResponse = await response[1].json();

        const { id: weatherId, ...weatherData } = weatherResponse;
        const id = uuidv4();
        const newData = { id, city: searchData.label, ...weatherData };
        setWeatherData(prevData => [...prevData, newData]);

        setCurrentWeather({ city: searchData.label, ...weatherResponse });
        setForecast({ city: searchData.label, ...forcastResponse });
      }, [userLocation])
      .catch(console.log);
  };
  
  // const handleAddCity = (searchData) => {
  //   const [lat, lon] = searchData.value.split(' ');

  //   fetch(`${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&units=metric&appid=${WEATHER_API_KEY}`)
  //     .then(response => response.json())
  //     .then(weatherResponse => {
  //       const { id: weatherId, ...weatherData } = weatherResponse;
  //       const id = uuidv4();
  //       const newData = { id, city: searchData.label, ...weatherData };
  //       setWeatherData(prevData => [...prevData, newData]);
  //     })
  //     .catch(err => console.error('Error adding city:', err));
  // };

  const handleRemoveWeatherCard = (id) => {
    setWeatherData(prevData => prevData.filter(data => data.id !== id));
  };

  console.log(weatherData);

  return (
    <div className="container">
      <Header />
      {/* <Search 
        onAddCity={handleAddCity}
      /> */}
      <Search
        onSearchChange={handleOnSearchChange}
      />
      <ul className="weather__list">
        {weatherData.map((data) => (
          <CurrentWeather key={data.id} data={data} onRemove={() => handleRemoveWeatherCard(data.id)} />
        ))}
      </ul>
    </div>
  );
}

export default App;