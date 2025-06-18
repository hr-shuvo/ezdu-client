'use client';

import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
} from 'recharts';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import isToday from 'dayjs/plugin/isToday';

dayjs.extend(utc);
dayjs.extend(isToday);

const rawXpData = [
    { day: new Date(), xp: 21 },
];

const formatData = (data: typeof rawXpData) => {
    const today = dayjs().utc().startOf('day');

    // Create 7-day range
    const last7Days = Array.from({ length: 7 }).map((_, i) => {
        const date = today.subtract(6 - i, 'day');
        return {
            fullDate: date.format('YYYY-MM-DD'),
            day: date.format('ddd'),
            isToday: date.isToday(),
            xp: 0,
        };
    });

    // Fill XP values
    data.forEach(entry => {
        const entryDate = dayjs(entry.day).utc().format('YYYY-MM-DD');
        const match = last7Days.find(d => d.fullDate === entryDate);
        if (match) match.xp += entry.xp;
    });

    return last7Days;
};

const CustomDot = (props: any) => {
    const { cx, cy, payload } = props;
    const color = payload.isToday ? '#22C55E' : '#60A5FA';
    return (
        <circle cx={cx} cy={cy} r={8} stroke="#fff" strokeWidth={2} fill={color} />
    );
};

type Props = {
    xpData?: []
}

const XpWeeklyLineChart = ({ xpData }: Props) => {
    const data = xpData ? formatData(xpData) : formatData(rawXpData);

    const maxXp = Math.max(...data.map((d) => d.xp), 0);
    const yMax = Math.ceil(maxXp * 1.2 / 10) * 10;

    const tickStep = yMax / 5;
    const ticks = Array.from({ length: 6 }, (_, i) => i * tickStep);


    return (
        <div className="w-full h-80">
            <ResponsiveContainer width="100%" height="100%">
                <LineChart
                    data={data}
                    margin={{ right: 30, bottom: 20 }}
                >
                    <CartesianGrid vertical={false} strokeDasharray="3 3" />

                    <XAxis
                        dataKey="day"
                        tick={{
                            fontSize: 16,
                            fontWeight: 600,
                            fill: '#4B5563',
                            dy: 15
                        }}
                        axisLine={false}
                        tickLine={false}
                    />

                    <YAxis
                        tick={{
                            fontSize: 16,
                            dx: -15
                        }}
                        domain={[0, yMax]}
                        ticks={ticks}
                        tickFormatter={(val) => `${val}`}
                        allowDecimals={false}
                        axisLine={false}
                        tickLine={false}
                    />


                    <Tooltip formatter={(value) => `${value} XP`} />
                    <Line
                        type="linear"
                        dataKey="xp"
                        stroke="#3B82F6"
                        strokeWidth={5}
                        dot={<CustomDot />}
                        activeDot={{ r: 8 }}
                    >
                        {/* <LabelList dataKey="xp" position="top" formatter={(val: any) => (val > 0 ? val : '')} /> */}
                    </Line>
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default XpWeeklyLineChart;

