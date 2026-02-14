"use client";

import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
    { name: 'Jan', mrr: 8500 },
    { name: 'Feb', mrr: 9200 },
    { name: 'Mar', mrr: 10400 },
    { name: 'Apr', mrr: 11100 },
    { name: 'May', mrr: 11800 },
    { name: 'Jun', mrr: 12450 },
];

export function RevenueChart() {
    return (
        <ResponsiveContainer width="100%" height="100%">
            <AreaChart
                data={data}
                margin={{
                    top: 10,
                    right: 30,
                    left: 0,
                    bottom: 0,
                }}
            >
                <defs>
                    <linearGradient id="colorMrr" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                    </linearGradient>
                </defs>
                <XAxis
                    dataKey="name"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 10, fontWeight: 900, fill: '#94a3b8' }}
                    dy={10}
                />
                <YAxis
                    hide={true}
                />
                <Tooltip
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                    itemStyle={{ fontSize: '12px', fontWeight: 'bold', color: '#10b981' }}
                />
                <Area
                    type="monotone"
                    dataKey="mrr"
                    stroke="#10b981"
                    strokeWidth={3}
                    fill="url(#colorMrr)"
                />
            </AreaChart>
        </ResponsiveContainer>
    );
}
