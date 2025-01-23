import Highcharts from "highcharts";

const createTop10Chart = (containerId) => {
  return Highcharts.chart(containerId, {
    chart: {
      type: "bar",
    },
    title: {
      text: "[2024년 1월 1주차 ~ 2024년 12월 4주차] 매출 TOP 10입니다.",
      align: "center",
    },

    xAxis: {
      categories: [
        "쌀",
        "사과",
        "딸기",
        "수박",
        "감귤",
        "김",
        "포도",
        "바나나",
        "방울토마토",
        "참외",
      ],
      crosshair: true,
    },
    yAxis: {
      min: 0,
      title: {
        text: "매출액(백만원)",
      },
    },
    tooltip: {
      headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
      pointFormat:
        '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
        '<td style="padding:0"><b>{point.y}백만원</b></td></tr>',
      footerFormat: "</table>",
      shared: true,
      useHTML: true,
    },
    plotOptions: {
      column: {
        pointPadding: 0.2,
        borderWidth: 0,
      },
    },
    series: [
      {
        name: "전년동기",
        data: [
          400941, 251834, 248674, 166624, 196384, 163389, 195159, 159379,
          108741, 103429,
        ],
      },
      {
        name: "기준일",
        data: [
          369462, 305510, 273517, 226059, 199632, 181544, 178672, 169834,
          113815, 104944,
        ],
      },
    ],
  });
};

export const createTop5Chart = (containerId) => {
  return Highcharts.chart(containerId, {
    chart: {
      type: "bar",
      backgroundColor: "#00C092",
      textColor: "white",
    },
    title: {
      text: "한눈에 보는 소비트렌드 TOP 5",
      align: "left",
    },
    xAxis: {
      textColor: "white",
      categories: ["1위 딸기", "2위 김치", "3위 쌀", "4위 사과", "5위 김"],
      crosshair: true,
    },
    yAxis: {
      min: 0,
      title: {
        text: "매출액",
      },
    },

    plotOptions: {
      bar: {
        pointPadding: 0.2,
        borderWidth: 0,
      },
    },
    series: [
      {
        name: "전년동기",
        data: [308.3, 168.3, 137.4, 86.2, 63.3],
      },
      {
        name: "기준일",
        data: [395.3, 187.6, 111.2, 106.7, 79.0],
      },
    ],
  });
};

export default createTop10Chart;
