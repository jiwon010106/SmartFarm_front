import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  BsSun,
  BsCloudSun,
  BsCloud,
  BsClouds,
  BsCloudRain,
  BsCloudRainHeavy,
  BsCloudLightningRain,
  BsSnow,
  BsCloudFog,
} from "react-icons/bs";

const Weather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // 날씨 데이터 가져오기
        const weatherResponse = await axios.get(
          "http://localhost:8000/weather?city=Seoul"
        );

        console.log("날씨 데이터:", weatherResponse.data);

        if (weatherResponse.data.list) {
          const dailyData = processWeatherData(weatherResponse.data.list);
          setWeatherData(dailyData);
        }
      } catch (err) {
        console.error("데이터 가져오기 오류:", err.response?.data || err.message);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const processWeatherData = (list) => {
    const dailyData = [];
    const today = new Date();

    for (let i = 0; i < 6; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);

      const dayData = list.filter((item) => {
        const itemDate = new Date(item.dt * 1000);
        return itemDate.getDate() === date.getDate();
      });

      if (dayData.length > 0) {
        let maxTemp = -Infinity;
        let minTemp = Infinity;
        let sumTemp = 0;
        let totalRain = 0;
        let maxPop = 0;

        dayData.forEach((data) => {
          maxTemp = Math.max(maxTemp, data.main.temp);
          minTemp = Math.min(minTemp, data.main.temp);
          sumTemp += data.main.temp;
          if (data.rain && data.rain["3h"]) {
            totalRain += data.rain["3h"];
          }
          if (data.pop) {
            maxPop = Math.max(maxPop, data.pop);
          }
        });

        dailyData.push({
          dt: date.getTime() / 1000,
          main: {
            temp_max: maxTemp,
            temp_min: minTemp,
            temp: sumTemp / dayData.length,
            humidity: dayData[0].main.humidity,
          },
          weather: dayData[0].weather,
          rain: totalRain,
          pop: Math.round(maxPop * 100),
        });
      }
    }
    return dailyData;
  };

  const createNewDataFrame = (dailyData) => {
    const newData = dailyData.map((day) => ({
      "avg temp": Math.round(day.main.temp),
      "max temp": Math.round(day.main.temp_max),
      "min temp": Math.round(day.main.temp_min),
      rainFall: day.rain ? day.rain.toFixed(1) : "0.0",
    }));

    console.log(newData); // 콘솔에 새로운 데이터프레임 출력
  };

  const getWeatherIcon = (iconCode) => {
    const dayIcon = iconCode.replace("n", "d");

    const iconMap = {
      "01d": <BsSun className="w-10 h-10 text-yellow-400" />,
      "02d": <BsCloudSun className="w-10 h-10 text-blue-400" />,
      "03d": <BsCloud className="w-10 h-10 text-gray-500" />,
      "04d": <BsClouds className="w-10 h-10 text-gray-600" />,
      "09d": <BsCloudRain className="w-10 h-10 text-blue-500" />,
      "10d": <BsCloudRainHeavy className="w-10 h-10 text-blue-600" />,
      "11d": <BsCloudLightningRain className="w-10 h-10 text-yellow-500" />,
      "13d": <BsSnow className="w-10 h-10 text-blue-200" />,
      "50d": <BsCloudFog className="w-10 h-10 text-gray-400" />,
    };

    return iconMap[dayIcon] || <BsSun className="w-10 h-10 text-yellow-400" />;
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('ko-KR').format(Math.round(price));
  };

  if (loading) return <div>로딩중...</div>;
  if (error) return <div>에러: {error}</div>;
  if (!weatherData) return <div>날씨 데이터가 없습니다.</div>;

  return (
    <div className="p-4 max-w-4xl mx-auto">
      {/* 날씨 섹션 */}
      <div className="mb-8">
        <h2 className="text-xl font-medium mb-4 text-black">주간예보</h2>
        {/* 전체 컨테이너에 동일한 width 적용 */}
        <div className="max-w-3xl mx-auto">
          {/* 오늘과 내일 날씨 */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            {weatherData.slice(0, 2).map((day, index) => {
              const date = new Date(day.dt * 1000);
              return (
                <div key={index} className="bg-white rounded-xl p-4 shadow-sm">
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="text-lg">
                        {index === 0 ? "오늘" : "내일"}
                      </div>
                      <div className="text-sm text-gray-500">
                        {date.getMonth() + 1}.{date.getDate()}.
                      </div>
                      <div className="mt-2">
                        {getWeatherIcon(day.weather[0].icon)}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-2">
                        <span className="text-blue-500">
                          {Math.round(day.main.temp_min)}°
                        </span>
                        <span className="text-gray-500">
                          {Math.round(day.main.temp)}°
                        </span>
                        <span className="text-red-500">
                          {Math.round(day.main.temp_max)}°
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-blue-500">습도 {day.main.humidity}%</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-blue-500">
                          강수확률 {day.pop || 0}%
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-blue-500">
                          강수량 {day.rain ? day.rain.toFixed(1) : "0.0"}mm
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* 주간 날씨 */}
          <div className="grid grid-cols-6 gap-2">
            {weatherData.slice(0, 6).map((day, index) => {
              const date = new Date(day.dt * 1000);
              const weekday = new Intl.DateTimeFormat("ko-KR", {
                weekday: "short",
              }).format(date);
              return (
                <div key={index} className="text-center p-2">
                  <div className="font-medium">{weekday}</div>
                  <div className="text-sm text-gray-500">
                    {date.getMonth() + 1}.{date.getDate()}.
                  </div>
                  <div className="flex justify-center items-center my-2">
                    {getWeatherIcon(day.weather[0].icon)}
                  </div>
                  <div className="flex justify-center gap-2 text-sm">
                    <span className="text-blue-500">
                      {Math.round(day.main.temp_min)}°
                    </span>
                    <span className="text-gray-500">
                      {Math.round(day.main.temp)}°
                    </span>
                    <span className="text-red-500">
                      {Math.round(day.main.temp_max)}°
                    </span>
                  </div>
                  <div className="text-sm text-blue-500">{day.pop || 0}%</div>
                  <div className="text-sm text-blue-500">
                    {day.rain ? day.rain.toFixed(1) : "0.0"}mm
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Weather;