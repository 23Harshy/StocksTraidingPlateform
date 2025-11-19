import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  maintainAspectRatio: false, // 👈 important so height works
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Holdings",
    },
  },
};

export function VerticalGraph({ data }) {
  // Debug: see what data you're passing
  console.log("Chart data:", data);

  // Optional safety: avoid rendering when empty
  if (!data || !data.labels || data.labels.length === 0) {
    return <p>No chart data yet</p>;
  }

  return (
    <div
      style={{
        width: "100%",
        maxWidth: "600px",
        height: "300px",
        marginTop: "20px",
      }}
    >
      <Bar options={options} data={data} />
    </div>
  );
}
