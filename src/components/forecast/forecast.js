import "./forecast.scss";
import { AreaChart, XAxis, Tooltip, Area } from 'recharts';
import { PureComponent } from "react";

const WEEK_DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const Forecast = ({ data, isCelsius }) => {
    const dayInAWeek = new Date().getDay();
    const forecastDays = WEEK_DAYS.slice(dayInAWeek, WEEK_DAYS.length).concat(WEEK_DAYS.slice(0, dayInAWeek));
    if (!data || !data.list) {
        return null; // Возвращаем null, если данные или свойство list отсутствуют
    }

    const forecastDataForChart = data.list.slice(0, 9).map((item, idx) => {
        const date = new Date(item.dt_txt);
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const formattedDate = `${day}.${month < 10 ? '0' + month : month}`;
        
        return {
            day: !idx ? 'Today' : forecastDays[idx],
            date: formattedDate,
            temperature: isCelsius ? Math.round(item.main.temp) : Math.round(item.main.temp * 9/5 + 32)
        };
    });

    class CustomizedLabel extends PureComponent {
        render() {
            const { x, y, value } = this.props;

            return (
                <text x={x} y={y} dy={-4} fill="#adadad" fontSize={10} textAnchor="middle">
                    {value}
                </text>
            );
        }
    }

    return (
        <>
            <div className="forecast__wrap-list">
                <AreaChart
                    width={420}
                    height={80}
                    data={forecastDataForChart}
                    margin={{
                        top: 0,
                        right: 0,
                        left: -42,
                        bottom: 5,
                    }}
                >
                    <defs>
                        <linearGradient id="gradient1" x1="0%" y1="100%" x2="0%" y2="0%">
                            <stop offset="0%" stopColor="#E0E5FB" />
                            <stop offset="100%" stopColor="#B2C6FF" />
                        </linearGradient>
                    </defs>
                    <defs>
                        <linearGradient id="gradient2" x1="0%" y1="100%" x2="0%" y2="0%">
                            <stop offset="0%" stopColor="#FFFAF1" />
                            <stop offset="100%" stopColor="#FFE0C5" />
                        </linearGradient>
                    </defs>
                    <Tooltip />
                    <XAxis dataKey="date" />
                    <Area type="monotone" dataKey="temperature" label={<CustomizedLabel />} /* fill="url(#gradient)" */ />
                </AreaChart>
            </div>
        </>
        
    );
};

export default Forecast;