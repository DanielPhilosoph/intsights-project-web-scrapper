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
import { Bar } from "react-chartjs-2";
import { useSelector } from "react-redux";
import {
  getHours,
  getSentimentalPostsByHourADay,
  formatDateTo_DD_MM_YYYY,
} from "../../../../helper/functions";

interface props {
  date: Date;
}

export default function BarSentiment({ date }: props) {
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

  const { negativeArray, positiveArray, neutralArray } =
    getSentimentalPostsByHourADay(state.data, date);

  const data = {
    labels: getHours(),
    datasets: [
      {
        label: "Negative",
        data: negativeArray,
        borderWidth: 2,
        backgroundColor: ["rgb(220,20,60)"],
        borderColor: ["rgba(220,20,60, 0.5)"],
      },
      {
        label: "Positive",
        data: positiveArray,
        borderWidth: 2,
        backgroundColor: ["rgb(0,128,0)"],
        borderColor: ["rgba(0,128,0, 0.5)"],
      },
      {
        label: "Neutral",
        data: neutralArray,
        borderWidth: 2,
        backgroundColor: ["gray"],
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        labels: {
          boxWidth: 11,
          boxHeight: 11,
        },
      },
      title: {
        display: true,
        text: "Sentiment per hour " + formatDateTo_DD_MM_YYYY(date),
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
