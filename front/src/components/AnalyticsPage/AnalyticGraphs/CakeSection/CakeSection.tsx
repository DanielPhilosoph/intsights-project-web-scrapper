import React from "react";
import {
  Chart,
  PointElement,
  LinearScale,
  BarController,
  BarElement,
  CategoryScale,
  ArcElement,
  Tooltip,
  Legend,
  Title,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { useSelector } from "react-redux";
import { getSectionsPercentage } from "../../../../helper/functions";

export default function CakeSection() {
  const state: StateType = useSelector((state: StateType) => state);

  Chart.register(
    PointElement,
    LinearScale,
    BarController,
    BarElement,
    CategoryScale,
    ArcElement,
    Tooltip,
    Legend,
    Title
  );

  const labels = [
    "general",
    "hacking",
    "computers",
    "crypto",
    "drugs",
    "sex",
    "guns",
  ];

  const data = {
    labels: labels,
    datasets: [
      {
        label: "My First Dataset",
        data: getSectionsPercentage(state.data, labels),
        backgroundColor: [
          "rgb(255, 99, 132)",
          "rgb(54, 162, 235)",
          "rgb(255, 205, 86)",
          "gray",
          "blue",
          "lightblue",
          "black",
        ],
        hoverOffset: 4,
      },
    ],
  };

  let right: "right" = "right";
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: right,
        labels: {
          boxWidth: 11,
          boxHeight: 11,
        },
      },
      title: {
        display: true,
        text: "Sections",
        padding: {
          top: 10,
        },
      },
    },
  };

  return (
    <div style={{ width: "53%", margin: "auto" }}>
      <Doughnut data={data} options={options}></Doughnut>;
    </div>
  );
}
