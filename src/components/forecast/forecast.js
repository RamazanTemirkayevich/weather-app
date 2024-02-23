import "./forecast.scss";
import { AreaChart, XAxis, Tooltip, Area } from 'recharts';
import { PureComponent } from "react";

const WEEK_DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const Forecast = ({ data }) => {
    const dayInAWeek = new Date().getDay();
    const forecastDays = WEEK_DAYS.slice(dayInAWeek, WEEK_DAYS.length).concat(WEEK_DAYS.slice(0, dayInAWeek));

    const forecastDataForChart = data.list.slice(0, 9).map((item, idx) => {
        const date = new Date(item.dt_txt);
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const formattedDate = `${day}.${month < 10 ? '0' + month : month}`;
        
        return {
            day: !idx ? 'Today' : forecastDays[idx],
            date: formattedDate,
            temperature: Math.round(item.main.temp)
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
            <div allowZeroExpanded className="forecast__wrap-list">
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
                        <linearGradient id="gradient" x1="0%" y1="100%" x2="0%" y2="0%">
                            <stop offset="0%" stopColor="#E0E5FB" />
                            <stop offset="100%" stopColor="#459DE9" />
                        </linearGradient>
                    </defs>
                    <Tooltip />
                    <XAxis dataKey="date" />
                    <Area type="monotone" dataKey="temperature" label={<CustomizedLabel />} fill="url(#gradient)" />
                </AreaChart>
            </div>
        </>
    );
};

export default Forecast;