import React from "react";
import "./forecast.scss"

const WEEK_DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const Forecast = ({ data }) => {
    const dayInAWeek = new Date().getDay();
    const forecastDays = WEEK_DAYS.slice(dayInAWeek, WEEK_DAYS.length).concat(WEEK_DAYS.slice(0, dayInAWeek));
    
    return (
        <>
            <div allowZeroExpanded className="forecast__wrap-list">
                {data.list.splice(0, 7).map((item, idx) => (
                    <div className="forecast__wrap-list__item">
                        <img src={`icons/${item.weather[0].icon}.png`} className="icon-small" alt="weather" />
                        <label className="day">{forecastDays[idx]}</label>
                        <label className="description">{item.weather[0].description}</label>
                        <label className="min-max">{Math.round(item.main.temp_max)}°C /{Math.round(item.main.temp_min)}°C</label>
                    </div>
                ))}
            </div>
        </>
    );
};

export default Forecast;