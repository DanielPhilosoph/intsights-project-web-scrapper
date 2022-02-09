import React from "react";
import { useSelector } from "react-redux";
import {
  Chart,
  PointElement,
  LinearScale,
  BarController,
  BarElement,
  CategoryScale,
  Tooltip,
  Legend,
  Title,
} from "chart.js";
import {
  getNumbersArray,
  getSentimentScoreBar,
} from "../../../../helper/functions";
import { Bar } from "react-chartjs-2";

export default function BarSentimentTotal() {
  const state: StateType = useSelector((state: StateType) => state);

  Chart.register(
    PointElement,
    LinearScale,
    BarController,
    BarElement,
    CategoryScale,
    Tooltip,
    Legend,
    Title
  );

  const data = {
    labels: getNumbersArray(-20, 21),
    datasets: [
      {
        label: "Posts",
        data: getSentimentScoreBar(state.data),
        borderWidth: 2,
        backgroundColor: ["lightblue"],
        borderColor: ["lightblue"],
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          boxWidth: 11,
          boxHeight: 11,
        },
      },
      tooltip: {
        callbacks: {
          title: (context: any) => {
            return "Score: " + context[0].label;
          },
        },
      },
      title: {
        display: true,
        text: "Sentiment score total ",
        padding: {
          top: 10,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Amount of posts",
        },
      },
      x: {
        title: {
          display: true,
          text: "Sentiment score",
        },
      },
    },
  };

  return <Bar data={data} options={options}></Bar>;
}
