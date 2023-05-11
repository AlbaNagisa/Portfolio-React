import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import GitHubColors from "github-colors";
import { Octokit } from "octokit";
import { OctokitResponse } from "@octokit/types";
import hexRgb from "hex-rgb";

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});
import { Chart, ArcElement, Tooltip, Title, Legend } from "chart.js";
import Loading from "./Loading";
Chart.register(ArcElement, Tooltip, Title, Legend);

interface Props {
  owner: string;
  repoName: string;
}

export default function PieLanguages(props: Props) {
  const [githubData, setGithubData] = useState<void | OctokitResponse<
    { [key: string]: number | undefined },
    200
  >>(void 0);
  const [isLoadingGithub, setIsLoadingGithub] = useState<boolean>(false);

  useEffect(() => {
    async function onLoad() {
      await octokit
        .request("GET /repos/{owner}/{repo}/languages", {
          owner: props.owner ?? "AlbaNagisa",
          repo: props.repoName,
          headers: {
            "X-GitHub-Api-Version": "2022-11-28",
          },
        })
        .then((res) => {
          setIsLoadingGithub(false);
          setGithubData(res);
        })
        .catch((err) => console.log(err));
    }
    setIsLoadingGithub(true);
    onLoad();
  }, []);

  const colors = [];
  const borderColor = [];

  if (githubData != void 0 && !isLoadingGithub) {
    for (const key of Object.keys(githubData.data)) {
      const hexToRgb = hexRgb(GitHubColors.get(key)?.color);

      borderColor.push(
        `rgba(${hexToRgb.red}, ${hexToRgb.green}, ${hexToRgb.blue}, 1)`
      );
      colors.push(
        `rgba(${hexToRgb.red}, ${hexToRgb.green}, ${hexToRgb.blue}, 0.2)`
      );
    }

    const data = {
      labels: Object.keys(githubData.data),
      datasets: [
        {
          data: Object.values(githubData.data).map(
            (value) => Math.floor((value ?? 0) / 10) / 100
          ),
          label: "%",
          backgroundColor: colors,
          borderColor: borderColor,
          borderWidth: 1,
        },
      ],
    };
    const options = {
      responsive: true,
      plugins: {
        legend: {
          display: true,
          position: "bottom" as const,
          labels: {
            color: "white",
          },
          font: {
            size: 14,
            family: "Poppins",
          },
        },
        title: {
          align: "start" as const,
          display: true,
          text: "Langages utilisés",
          font: {
            size: 20,
            family: "Poppins",
          },
          color: "white",
        },
      },
    };

    return <Pie options={options} data={data} />;
  }
  return <Loading />;
}
