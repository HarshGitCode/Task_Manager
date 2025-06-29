import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from 'recharts';

function StatusBar() {
  const tasks = useSelector(state => state.user.tasks);

  const [statusData, setStatusData] = useState([
    { name: 'Completed', value: 0 },
    { name: 'In Progress', value: 0 },
    { name: 'Pending', value: 0 },
    { name: 'On Hold', value: 0 },
  ]);

  useEffect(() => {
    const statusCount = {
      'Completed': 0,
      'In Progress': 0,
      'Pending': 0,
      'On Hold': 0
    };

    tasks.forEach(task => {
      if (statusCount.hasOwnProperty(task.status)) {
        statusCount[task.status] += 1;
      }
    });

    const updatedData = Object.entries(statusCount).map(([name, value]) => ({ name, value }));
    setStatusData(updatedData);
  }, [tasks]); // <-- runs only when tasks change

  const total = statusData.reduce((a, v) => a + v.value, 0);
  const COLORS = ['#4ade80', '#60a5fa', '#facc15', '#f87171'];

  return (
    <div className="w-full flex-1 p-4 space-y-6 bg-white">
      <div className="flex flex-wrap gap-4 justify-center">
        <div className="bg-white shadow rounded-2xl p-4 text-center flex-1 min-w-[150px]">
          <h3 className="text-gray-500 text-sm">All Tasks</h3>
          <p className="text-2xl font-bold">{total}</p>
        </div>
        {statusData.map((item, i) => (
          <div key={item.name}
            className={`shadow rounded-2xl p-4 text-center flex-1 min-w-[150px] ${
              item.name === 'Completed' ? 'bg-green-100 text-green-700' :
              item.name === 'In Progress' ? 'bg-blue-100 text-blue-700' :
              item.name === 'Pending' ? 'bg-yellow-100 text-yellow-700' :
              'bg-red-100 text-red-700'
            }`}
          >
            <h3 className="text-sm">{item.name}</h3>
            <p className="text-2xl font-bold">{item.value}</p>
          </div>
        ))}
      </div>

      <div className="bg-white shadow rounded-2xl p-4">
        <h2 className="text-xl font-semibold mb-4 text-center">Task Status Overview</h2>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie data={statusData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label>
              {statusData.map((_, idx) => <Cell key={idx} fill={COLORS[idx % COLORS.length]} />)}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default StatusBar;
