import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Weather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await axios.get('http://localhost:8000/weather?city=Seoul');
        if (response.data.list) {
          // 현재 날짜부터 6일치 데이터 생성
          const dailyData = [];
          const today = new Date();
          
          for(let i = 0; i < 6; i++) {
            const date = new Date(today);
            date.setDate(today.getDate() + i);
            
            // API에서 받은 데이터에서 해당 날짜의 데이터를 찾거나, 없으면 기본값 생성
            const dayData = response.data.list.find(item => {
              const itemDate = new Date(item.dt * 1000);
              return itemDate.getDate() === date.getDate();
            }) || {
              dt: date.getTime() / 1000,
              main: {
                temp_min: 0,
                temp_max: 0,
                humidity: 0
              },
              weather: [{
                icon: '01d',
                description: 'no data'
              }]
            };
            
            dailyData.push({
              ...dayData,
              dt: date.getTime() / 1000 // 날짜 덮어쓰기
            });
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
    const tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
    const timeUntilMidnight = tomorrow - now;

    const timer = setTimeout(() => {
      fetchWeather();
    }, timeUntilMidnight);

    return () => clearTimeout(timer);
  }, []);

  if (loading) return <div>로딩중...</div>;
  if (error) return <div>에러: {error}</div>;
  if (!weatherData) return <div>데이터가 없습니다.</div>;

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h2 className="text-xl font-medium mb-4">주간예보</h2>
      
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
                      {index === 0 ? '오늘' : '내일'}
                    </div>
                    <div className="text-sm text-gray-500">
                      {date.getMonth() + 1}.{date.getDate()}.
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-2">
                      <span className="text-blue-500">{Math.round(day.main.temp_min)}°</span>
                      <span className="text-red-500">{Math.round(day.main.temp_max)}°</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-blue-500">{day.main.humidity}%</span>
                      <span className="text-gray-400">강수확률</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* 주간 날씨 */}
        <div className="grid grid-cols-6 gap-2">
          {weatherData.map((day, index) => {
            const date = new Date(day.dt * 1000);
            const weekday = new Intl.DateTimeFormat('ko-KR', { weekday: 'short' }).format(date);
            return (
              <div key={index} className="text-center p-2">
                <div className="font-medium">{weekday}</div>
                <div className="text-sm text-gray-500">{date.getMonth() + 1}.{date.getDate()}.</div>
                <div className="my-2">
                  <img 
                    src={`http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
                    alt={day.weather[0].description}
                    className="w-8 h-8 mx-auto"
                  />
                </div>
                <div className="flex justify-center gap-2 text-sm">
                  <span className="text-blue-500">{Math.round(day.main.temp_min)}°</span>
                  <span className="text-red-500">{Math.round(day.main.temp_max)}°</span>
                </div>
                <div className="text-sm text-blue-500">{day.main.humidity}%</div>
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