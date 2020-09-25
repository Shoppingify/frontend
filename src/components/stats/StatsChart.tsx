import React, { useEffect } from 'react'
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from 'recharts'
import Heading from '../heading/Heading'

interface StatsChartProps {
    data: any[]
    title: string
    interval: string
}

const StatsChart: React.FC<StatsChartProps> = ({
    data,
    title,
    interval,
}: StatsChartProps) => {
    const getMonthFromNumber = (month: number) => {
        return [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December',
        ][month - 1]
    }

    const getMaxYValue = () => {
        const quantities = data.map((el) => parseInt(el.quantity, 10))
        return quantities.reduce((acc, current) => {
            return Math.max(acc, current)
        }, 0)
    }

    return (
        <div className="w-full md:w-3/4 h-56">
            <Heading className="font-bold mb-10" level={3}>
                {title}
            </Heading>
            <ResponsiveContainer width="90%" height="90%">
                <LineChart
                    // width={500}
                    // height={300}
                    data={data}
                    margin={{
                        top: 5,
                        right: 30,
                        left: -15,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis domain={[0, getMaxYValue()]} />
                    {interval === 'year' && (
                        <Tooltip
                            content={({ active, payload, label }: any) => {
                                return (
                                    <div className="flex flex-col bg-white p-3 border border-gray-light">
                                        <span className="mb-1">
                                            {getMonthFromNumber(label)}
                                        </span>
                                        <span className="text-primary">
                                            items : {payload[0]?.value}
                                        </span>
                                    </div>
                                )
                            }}
                        />
                    )}

                    {interval === 'month' && <Tooltip />}

                    <Legend />
                    <Line
                        type="monotone"
                        dataKey="quantity"
                        name="items"
                        stroke="#F9A109"
                        activeDot={{ r: 8 }}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    )
}

export default StatsChart
