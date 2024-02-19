// import React from 'react';
// import Highcharts from 'highcharts';
// import HighchartsReact from 'highcharts-react-official';
// import moment from 'moment';

// const WeatherChart = ({ forecastData }) => {
//     const options = {
//         title: {
//             text: 'Weather Forecast for the Week'
//         },
//         xAxis: {
//             categories: forecastData.map(entry => moment(entry.date).format('ddd, MMM D')), // форматируем даты для оси X
//             labels: {
//                 rotation: -45, // поворачиваем метки на оси X для лучшей читаемости
//                 step: 1 // задаем шаг для меток
//             }
//         },
//         yAxis: {
//             title: {
//                 text: 'Temperature (°C)'
//             }
//         },
//         series: [{
//             name: 'Temperature',
//             data: forecastData.map(entry => entry.temperature)
//         }]
//     };
//     console.log(forecastData);

//     return (
//         <div>
//             <h3>Weather Forecast</h3>
//             <HighchartsReact
//                 highcharts={Highcharts}
//                 options={options}
//             />
//         </div>
//     );
// };

// export default WeatherChart;
