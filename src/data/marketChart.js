import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";

// 이미지 import
import strawberry from "../assets/images/strawberry.jpg";
import rice from "../assets/images/rice.jpg";
import orange1 from "../assets/images/oranges.jpg";
import apple from "../assets/images/apple.jpg";
import banana from "../assets/images/bananas.jpg";
import grape from "../assets/images/grapes.jpg";
import orange2 from "../assets/images/oranges2.jpg";
import garlic from "../assets/images/garlic.jpg";
import onion from "../assets/images/onion.jpg";
import watermelon from "../assets/images/watermelon.jpg";
import peach from "../assets/images/peach.jpg";
import pear from "../assets/images/pears.jpg";
import sweetPotato from "../assets/images/sweetpotato.jpg";
import greenOnion from "../assets/images/leek.jpg";
import spinach from "../assets/images/spinach.jpg";
import melon from "../assets/images/melon.jpg";
import cucumber from "../assets/images/cucumber.jpg";
import seaweed from "../assets/images/seaweed.jpg";
import kiwi from "../assets/images/kiwifruit.jpg";
import squid from "../assets/images/squid.jpg";
import abalone from "../assets/images/abalone.jpg";
import shrimp from "../assets/images/shrimp.jpg";
import cabbage from "../assets/images/cabbage.jpg";
import oyster from "../assets/images/oyster.jpg";
import tomato2 from "../assets/images/tomatoes2.jpg";
import tomato1 from "../assets/images/tomatoes.jpg";

export const createMarketChart = (rootElement, marketData) => {
  let period = "202401";
  let root = am5.Root.new(rootElement);
  const stepDuration = 2000;
  let interval;
  let sortInterval;

  // 이미지 매핑 객체 생성
  const itemImages = {
    딸기: strawberry,
    쌀: rice,
    오렌지: orange2,
    사과: apple,
    바나나: banana,
    포도: grape,
    감귤: orange1,
    마늘: garlic,
    양파: onion,
    토마토: tomato2,
    수박: watermelon,
    복숭아: peach,
    배: pear,
    고구마: sweetPotato,
    대파: greenOnion,
    시금치: spinach,
    참외: melon,
    오이: cucumber,
    김: seaweed,
    참다래: kiwi,
    물오징어: squid,
    전복: abalone,
    새우: shrimp,
    배추: cabbage,
    굴: oyster,
    방울토마토: tomato1,
    감: apple,
  };

  root.setThemes([am5themes_Animated.new(root)]);

  let chart = root.container.children.push(
    am5xy.XYChart.new(root, {
      panX: true,
      panY: true,
      wheelX: "none",
      wheelY: "none",
      paddingLeft: 0,
    })
  );

  chart.zoomOutButton.set("forceHidden", true);

  let yRenderer = am5xy.AxisRendererY.new(root, {
    minGridDistance: 20,
    inversed: true,
    minorGridEnabled: true,
  });
  yRenderer.grid.template.set("visible", false);

  let yAxis = chart.yAxes.push(
    am5xy.CategoryAxis.new(root, {
      maxDeviation: 0,
      categoryField: "network",
      renderer: yRenderer,
    })
  );

  let xAxis = chart.xAxes.push(
    am5xy.ValueAxis.new(root, {
      maxDeviation: 0.3,
      min: 200,
      strictMinMax: false,
      numberFormat: "#,###",
      interpolationDuration: 1500,
      interpolationEasing: am5.ease.cubic,
      renderer: am5xy.AxisRendererX.new(root, {
        visible: true,
        minGridDistance: 100,
        cellStartLocation: 0.1,
        cellEndLocation: 0.9,
      }),
    })
  );

  xAxis.set("interpolationDuration", stepDuration / 10);
  xAxis.set("interpolationEasing", am5.ease.linear);

  let series = chart.series.push(
    am5xy.ColumnSeries.new(root, {
      xAxis: xAxis,
      yAxis: yAxis,
      valueXField: "value",
      categoryYField: "network",
    })
  );

  series.columns.template.setAll({
    cornerRadiusBR: 5,
    cornerRadiusTR: 5,
    strokeOpacity: 0,
    fillOpacity: 0.8,
    width: am5.percent(100),
  });

  series.columns.template.adapters.add("fill", function (fill, target) {
    return chart.get("colors").getIndex(series.columns.indexOf(target));
  });

  series.columns.template.adapters.add("stroke", function (stroke, target) {
    return chart.get("colors").getIndex(series.columns.indexOf(target));
  });

  // 이미지 불릿 추가
  series.bullets.push(function () {
    const circle = am5.Circle.new(root, {
      radius: 50,
      fill: am5.color(0xffffff),
      strokeWidth: 2,
      stroke: am5.color(0xffffff),
    });

    return am5.Bullet.new(root, {
      locationX: 0.98,
      sprite: am5.Picture.new(root, {
        width: 40,
        height: 40,
        centerY: am5.p50,
        centerX: am5.p0,
        templateField: "image",
        mask: circle,
        shadowColor: am5.color(0x000000),
        shadowBlur: 4,
        shadowOffsetX: 0,
        shadowOffsetY: 2,
        shadowOpacity: 0.2,
        stroke: am5.color(0xffffff),
        strokeWidth: 2,
        filters: [
          {
            type: "drop-shadow",
            blur: 8,
            opacity: 0.3,
            dx: 0,
            dy: 2,
          },
        ],
      }),
    });
  });

  let label = chart.plotContainer.children.push(
    am5.Label.new(root, {
      text: "2024년 1월 1주",
      fontSize: "2em",
      fontWeight: "bold",
      fill: am5.color("#2B2B2B"),
      opacity: 0.8,
      x: am5.p100,
      y: am5.p100,
      centerY: am5.p100,
      centerX: am5.p100,
      paddingRight: 50,
      paddingBottom: 20,
      fontFamily: "Pretendard",
    })
  );

  let playButton = chart.plotContainer.children.push(
    am5.Button.new(root, {
      x: am5.p100,
      y: am5.percent(94),
      centerY: am5.percent(94),
      centerX: am5.p100,
      paddingRight: 15,
      paddingBottom: 20,
      width: 30,
      height: 30,
      icon: am5.Picture.new(root, {
        width: 10,
        height: 15,
        src: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZD0iTTggNXYxNGwxMS03eiIvPjwvc3ZnPg==",
      }),
    })
  );

  let isPlaying = true;

  playButton.events.on("click", function () {
    if (isPlaying) {
      clearInterval(interval);
      playButton.set(
        "icon",
        am5.Picture.new(root, {
          width: 15,
          height: 15,
          src: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZD0iTTYgNGgydjE2SDZ6TTEzIDR2MTZoMlY0eiIvPjwvc3ZnPg==",
        })
      );
    } else {
      interval = setInterval(function () {
        let week = parseInt(period.substring(4));
        week++;
        if (week > 52) {
          week = 1;
        }
        period = `2024${week.toString().padStart(2, "0")}`;
        updateData();
      }, stepDuration);

      playButton.set(
        "icon",
        am5.Picture.new(root, {
          width: 15,
          height: 15,
          src: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZD0iTTggNXYxNGwxMS03eiIvPjwvc3ZnPg==",
        })
      );
    }
    isPlaying = !isPlaying;
  });

  function getSeriesItem(category) {
    for (var i = 0; i < series.dataItems.length; i++) {
      var dataItem = series.dataItems[i];
      if (dataItem.get("categoryY") === category) {
        return dataItem;
      }
    }
  }

  function sortCategoryAxis() {
    series.dataItems.sort(function (x, y) {
      return y.get("valueX") - x.get("valueX");
    });

    am5.array.each(yAxis.dataItems, function (dataItem) {
      let seriesDataItem = getSeriesItem(dataItem.get("category"));

      if (seriesDataItem) {
        let index = series.dataItems.indexOf(seriesDataItem);
        let deltaPosition =
          (index - dataItem.get("index", 0)) / series.dataItems.length;

        if (dataItem.get("index") !== index) {
          dataItem.set("index", index);
          dataItem.set("deltaPosition", -deltaPosition);
          dataItem.animate({
            key: "deltaPosition",
            to: 0,
            duration: stepDuration / 2,
            easing: am5.ease.out(am5.ease.cubic),
          });
        }
      }
    });

    yAxis.dataItems.sort(function (x, y) {
      return x.get("index") - y.get("index");
    });
  }

  sortInterval = setInterval(function () {
    sortCategoryAxis();
  }, 100);

  function setInitialData() {
    if (marketData && marketData[period]) {
      let d = marketData[period];
      for (let n in d) {
        series.data.push({
          network: n,
          value: d[n],
          image: {
            src: itemImages[n],
          },
        });
        yAxis.data.push({ network: n });
      }
    }
  }

  function updateData() {
    let itemsWithNonZero = 0;

    if (marketData && marketData[period]) {
      const year = period.substring(0, 4);
      const month = Math.ceil(parseInt(period.substring(4)) / 4.345);

      label.set("text", `${year}년 ${month}월`);

      am5.array.each(series.dataItems, function (dataItem) {
        let category = dataItem.get("categoryY");
        let value = marketData[period][category] || 0;

        dataItem.set("bullet", {
          sprite: {
            src: itemImages[category],
          },
        });

        if (value > 0) {
          itemsWithNonZero++;
        }

        dataItem.animate({
          key: "valueX",
          to: value,
          duration: stepDuration,
          easing: am5.ease.cubic,
        });

        dataItem.animate({
          key: "valueXWorking",
          to: value,
          duration: stepDuration,
          easing: am5.ease.cubic,
        });
      });

      yAxis.zoom(0, itemsWithNonZero / yAxis.dataItems.length);
    }
  }

  interval = setInterval(function () {
    let week = parseInt(period.substring(4));
    week++;

    if (week > 52) {
      week = 1;
    }

    period = `2024${week.toString().padStart(2, "0")}`;
    updateData();
  }, stepDuration);

  setInitialData();

  setTimeout(function () {
    period = "202402";
    updateData();
  }, 50);

  series.appear(1000);
  chart.appear(1000, 100);

  const dispose = () => {
    root.dispose();
    clearInterval(interval);
    clearInterval(sortInterval);
  };

  return { dispose };
};
