
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Label } from 'recharts';

interface ScoreDonutChartProps {
  score: number;
}

const ScoreDonutChart: React.FC<ScoreDonutChartProps> = ({ score }) => {
  const data = [
    { name: 'Score', value: score },
    { name: 'Remaining', value: 100 - score },
  ];

  const getColor = (value: number) => {
    if (value > 75) return '#4ade80'; // green-400
    if (value > 45) return '#facc15'; // yellow-400
    return '#f87171'; // red-400
  };

  const color = getColor(score);

  return (
    <div style={{ width: '150px', height: '150px', position: 'relative' }}>
        <ResponsiveContainer>
            <PieChart>
            <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={65}
                fill="#8884d8"
                paddingAngle={0}
                dataKey="value"
                startAngle={90}
                endAngle={-270}
            >
                <Cell fill={color} stroke={color} />
                <Cell fill="rgba(255, 255, 255, 0.1)" stroke="rgba(255, 255, 255, 0.1)" />
            </Pie>
            </PieChart>
        </ResponsiveContainer>
        <div 
            className="absolute inset-0 flex items-center justify-center text-3xl font-bold"
            style={{ color: color }}
        >
            {score}
        </div>
    </div>
  );
};

export default ScoreDonutChart;
