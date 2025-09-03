'use client';

import React from 'react';
import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

interface ChartDataItem {
  name: string;
  acessos: number;
  fullTitle: string;
  index: number;
}

interface TooltipProps {
  active?: boolean;
  payload?: Array<{
    payload: ChartDataItem;
    value: number;
  }>;
  label?: string;
}

interface BarChartProps {
  data: Array<{
    id: string;
    title: string;
    acessos: number;
    src: string;
    author: string;
  }>;
}

const BarChart: React.FC<BarChartProps> = ({ data }) => {
  // formatar dados
  const chartData = data.map((item, index) => ({
    name:
      item.title.length > 12 ? item.title.substring(0, 12) + '...' : item.title,
    acessos: item.acessos,
    fullTitle: item.title,
    index: index + 1,
  }));

  // tooltip
  const CustomTooltip = ({ active, payload }: TooltipProps) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-2 border border-gray-300 rounded shadow">
          <p className="font-medium text-gray-900">
            {payload[0].payload.fullTitle}
          </p>
          <p className="text-sm text-gray-600">
            {payload[0].value.toLocaleString()} acessos
          </p>
        </div>
      );
    }
    return null;
  };

  if (!data || data.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 bg-gray-50 rounded-lg">
        <div className="text-center">
          <div className="text-4xl mb-2">📊</div>
          <p className="text-gray-500">Nenhum dado disponível</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-64">
      <ResponsiveContainer width="100%" height="100%">
        <RechartsBarChart data={chartData}>
          <defs>
            <linearGradient id="colorBar" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10B981" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#10B981" stopOpacity={0.6} />
            </linearGradient>
          </defs>
          <XAxis dataKey="name" />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="acessos" fill="url(#colorBar)" />
        </RechartsBarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarChart;
