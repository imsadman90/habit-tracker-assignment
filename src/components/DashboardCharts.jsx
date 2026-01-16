import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer
} from "recharts";

const DashboardCharts = ({ data }) => {
  return (
    <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow">
      <h3 className="font-semibold mb-4">Habit Progress</h3>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="completed" fill="#6366f1" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DashboardCharts;