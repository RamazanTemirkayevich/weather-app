import './current-weather.scss'

const CurrentWeather = () => {
    return (
        <li className="weather__list-item">
            <div className="weather__list-item__top">
                <div className="weather__list-item__descr">
                    <p>Moscow,</p>
                    <p>RU</p>
                </div>
                <div className="weather__list-item__icon">
                    <img src="icons/Sunny.png" alt="weather"/>
                    <span>Sunny</span>
                </div>
            </div>
            <div className="weather__list-item__middle">
                <img src="diagram.png" alt="" />
            </div>
            <div className="weather__list-item__footer">
                <div className="weather__list-item__degree">
                    <span>+14</span>
                    <div className="weather__list-item__degree-switch">
                        <span className="degree-switch">°C</span>
                        <span className="degree-switch">°F</span>
                    </div>
                </div>
                <ul className="weather__list-item__params">
                    <li><span></span></li>
                </ul>
            </div>
        </li>
    );
}

export default CurrentWeather;