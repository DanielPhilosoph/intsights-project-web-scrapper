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
import "./cakeSection.css";

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
          "#9DBBF7",
          "#008DC0",
          "#00C0B3",
          "#00C06D",
          "#3574F0",
          "#EF2525",
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
      tooltip: {
        callbacks: {
          title: (context: any) => {
            return context[0].label;
          },
          label: (context: any) => {
            return "Posts: " + context.formattedValue;
          },
        },
      },
      legend: {
        maxHeight: 10,
        fullSize: false,
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
    <div className="doughnutDiv">
      <Doughnut data={data} options={options}></Doughnut>
    </div>
  );
}
