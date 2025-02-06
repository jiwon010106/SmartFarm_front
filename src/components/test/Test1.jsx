import React, { useState, useEffect } from "react";
import axios from "axios";
// import {
//   WiDaySunny, // 맑은 날
//   WiNightClear, // 맑은 밤
//   WiDayCloudy, // 구름 조금 (낮)
//   WiNightAltCloudy, // 구름 조금 (밤)
//   WiCloud, // 구름 많음
//   WiCloudy, // 흐림
//   WiRain, // 비
//   WiDayRain, // 낮 비
//   WiNightRain, // 밤 비
//   WiThunderstorm, // 천둥번개
//   WiSnow, // 눈
//   WiFog, // 안개
// } from "react-icons/wi";
import {
  BsSun, // 맑은 날
  BsCloudSun, // 구름 조금
  BsCloud, // 구름 많음
  BsClouds, // 흐림
  BsCloudRain, // 소나기
  BsCloudRainHeavy, // 비
  BsCloudLightningRain, // 천둥번개
  BsSnow, // 눈
  BsCloudFog, // 안개
} from "react-icons/bs";

const Weather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/weather?city=Seoul"
        );
        if (response.data.list) {
          const dailyData = [];
          const today = new Date();

          for (let i = 0; i < 6; i++) {
            const date = new Date(today);
            date.setDate(today.getDate() + i);

            // API에서 받은 데이터에서 해당 날짜의 데이터를 찾거나, 없으면 기본값 생성
            const dayData = response.data.list.find((item) => {
              const itemDate = new Date(item.dt * 1000);
              return itemDate.getDate() === date.getDate();
            }) || {
              dt: date.getTime() / 1000,
              main: {
                temp_min: 0,
                temp_max: 0,
                humidity: 0,
              },
              weather: [
                {
                  icon: "01d",
                  description: "no data",
                },
              ],
            };

            dailyData.push({
              ...dayData,
              dt: date.getTime() / 1000, // 날짜 덮어쓰기
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
                // 강수량 누적
                if (data.rain && data.rain["3h"]) {
                  totalRain += data.rain["3h"];
                }
                // 최대 강수확률 계산
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
                rain: totalRain, // 일일 총 강수량
                pop: Math.round(maxPop * 100), // 강수확률을 백분율로 변환
              });
            } else {
              // 데이터가 없는 경우 기본값 설정
              dailyData.push({
                dt: date.getTime() / 1000,
                main: {
                  temp_max: 0,
                  temp_min: 0,
                  temp: 0,
                  humidity: 0,
                },
                weather: [
                  {
                    icon: "01d",
                    description: "no data",
                  },
                ],
              });
            }
          }
          setWeatherData(dailyData);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();

    // 매일 자정에 데이터 업데이트
    const now = new Date();
    const tomorrow = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() + 1
    );
    const timeUntilMidnight = tomorrow - now;

    const timer = setTimeout(() => {
      fetchWeather();
    }, timeUntilMidnight);

    return () => clearTimeout(timer);
  }, []);

  const getWeatherIcon = (iconCode) => {
    // 밤 아이콘 코드를 낮 아이콘 코드로 변환
    const dayIcon = iconCode.replace("n", "d");

    const iconMap = {
      // 맑은 날
      "01d": <BsSun className="w-10 h-10 text-yellow-400" />,

      // 구름 조금
      "02d": <BsCloudSun className="w-10 h-10 text-blue-400" />,

      // 구름 많음
      "03d": <BsCloud className="w-10 h-10 text-gray-500" />,

      // 흐림
      "04d": <BsClouds className="w-10 h-10 text-gray-600" />,

      // 소나기
      "09d": <BsCloudRain className="w-10 h-10 text-blue-500" />,

      // 비
      "10d": <BsCloudRainHeavy className="w-10 h-10 text-blue-600" />,

      // 천둥번개
      "11d": <BsCloudLightningRain className="w-10 h-10 text-yellow-500" />,

      // 눈
      "13d": <BsSnow className="w-10 h-10 text-blue-200" />,

      // 안개
      "50d": <BsCloudFog className="w-10 h-10 text-gray-400" />,
    };

    return iconMap[dayIcon] || <BsSun className="w-10 h-10 text-yellow-400" />;
  };

  if (loading) return <div>로딩중...</div>;
  if (error) return <div>에러: {error}</div>;
  if (!weatherData) return <div>데이터가 없습니다.</div>;

  return (
    <div className="p-4 max-w-4xl mx-auto bg-gray-400 rounded-lg">
      <h2 className="text-xl font-medium mb-4 text-black">주간예보</h2>

      {/* 전체 컨테이너에 동일한 width 적용 */}
      <div className="max-w-3xl mx-auto">
        {/* 오늘과 내일 날씨 */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          {weatherData.slice(0, 2).map((day, index) => {
            const date = new Date(day.dt * 1000);
            return (
              <div key={index} className="bg-blue-500 rounded-xl p-4 shadow-sm">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="text-lg">
                      {index === 0 ? "오늘" : "내일"}
                    </div>
                    <div className="text-sm text-white">
                      {date.getMonth() + 1}.{date.getDate()}.
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-2">
                      <span className="text-blue-500">
                        {Math.round(day.main.temp_min)}°
                      </span>
                      <span className="text-red-500">
                        {Math.round(day.main.temp_max)}°
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-blue-500">
                        {day.main.humidity}%
                      </span>
                      <span className="text-white">강수확률</span>
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
                <div className="text-sm text-white">
                  {date.getMonth() + 1}.{date.getDate()}.
                </div>
                <div className="flex justify-center items-center my-2">
                  {getWeatherIcon(day.weather[0].icon)}
                </div>
                <div className="flex justify-center gap-2 text-sm">
                  <span className="text-blue-500">
                    {Math.round(day.main.temp_min)}°
                  </span>
                  <span className="text-red-500">
                    {Math.round(day.main.temp_max)}°
                  </span>
                </div>
                <div className="text-sm text-blue-500">
                  {day.main.humidity}%
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
// const iconUrl = `http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`;
// npm install weather-icons-react
export default Weather;
