import {
  Chart,
  PointElement,
  LinearScale,
  BarController,
  BarElement,
  CategoryScale,
  Tooltip,
  Title,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { useSelector } from "react-redux";
import {
  getDataPostPerHourFromDate,
  formatDateTo_DD_MM_YYYY,
  getHours,
} from "../../../../helper/functions";

interface props {
  date: Date;
}

export default function BarUploadPost({ date }: props) {
  const state: StateType = useSelector((state: StateType) => state);

  Chart.register(
    PointElement,
    LinearScale,
    BarController,
    BarElement,
    CategoryScale,
    Tooltip,
    Title
  );

  const data = {
    labels: getHours(),
    datasets: [
      {
        label: "Posts today",
        data: getDataPostPerHourFromDate(state.data, date),
        borderWidth: 2,
        backgroundColor: ["gray"],
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
      title: {
        display: true,
        text: "Posts per hour " + formatDateTo_DD_MM_YYYY(date),
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
          text: "Hours",
        },
      },
    },
  };

  return <Bar data={data} options={options}></Bar>;
}
