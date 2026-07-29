import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

function RiskChart({ scans }) {

  const dataByDate = {};

  scans.forEach((scan) => {
    const date = new Date(scan.createdAt).toLocaleDateString();
    if (!dataByDate[date]) {
      dataByDate[date] = { date, count: 0 };
    }
    dataByDate[date].count += 1;
  });

  const chartData = Object.values(dataByDate).sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  if (chartData.length === 0) {
    return <p>No data yet to display a trend.</p>;
  }

  return (
    <div style={{ width: "100%", height: 300, marginTop: "20px" }}>
      <h3>Scan Activity Over Time</h3>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Line type="monotone" dataKey="count" stroke="#4ea8de" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default RiskChart;
