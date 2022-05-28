import { leaderboard } from "../../app/Types/User.types";
import {
  Chart as Chartjs,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
} from "chart.js";

import { Bar } from "react-chartjs-2";
import { useColorMode } from "@chakra-ui/react";

Chartjs.register(CategoryScale, LinearScale, BarElement, Title, Tooltip);
Chartjs.defaults.color = "#000";

export const Options = {
  responsive: true,
  plugins: {
    title: {
      display: true,
      text: "LeaderBoard Scores",
      color: "#000",
    },
  },
  options: {
    y: [
      {
        min: 0,
        max: 40,
        ticks: {
          stepSize: 5,
        },
      },
    ],
  },
};

export const LeaderBoardStats = ({
  leaderBoard,
}: {
  leaderBoard: leaderboard;
}) => {
  const labels = leaderBoard?.map(({ firstName }) => firstName);
  const scores = leaderBoard?.map(({ score }) => score);
  const { colorMode } = useColorMode();
  if (colorMode === "light") {
    Options.plugins.title.color = "#000";
  } else {
    Options.plugins.title.color = "#fff";
  }
  const data = {
    labels,
    datasets: [
      {
        label: "score",
        data: scores,
        backgroundColor: [
          "#d7ecfb",
          "#ffe0e6",
          "#ebe0ff",
          "#dbf2f2",
          "#ffecd9",
        ],
        borderColor: ["#72bef1", "#ffabbd", "#ba96ff", "#76cfcf", "#ffbe7f"],
        borderWidth: 2,
        barThickness: 40,
      },
    ],
  };
  return <Bar options={Options} data={data} />;
};
