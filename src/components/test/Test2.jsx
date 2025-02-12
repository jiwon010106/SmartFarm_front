import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Test2 = () => {
  const [predictions, setPredictions] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 한글 이름 매핑
  const vegetableNames = {
    'cabbage': '배추',
    'potato': '감자',
    'apple': '사과',
    'onion': '양파',
    'cucumber': '오이',
    'pepper': '고추',
    'paprika': '파프리카',
    'spinach': '시금치',
    'tomato': '토마토',
    'lettuce': '상추'
  };

  // 아이콘 매핑 (이모지 사용)
  const vegetableIcons = {
    'cabbage': '🥬',
    'potato': '🥔',
    'apple': '🍎',
    'onion': '🧅',
    'cucumber': '🥒',
    'pepper': '🌶️',
    'paprika': '🫑',
    'spinach': '🥬',
    'tomato': '🍅',
    'lettuce': '🥬'
  };

  useEffect(() => {
    const fetchPredictions = async () => {
      try {
        const response = await axios.get('http://localhost:8000/predictions/Seoul');
        setPredictions(response.data);
        setWeatherData(response.data.weather_data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPredictions();
  }, []);

  if (loading) return <div className="text-center p-4">로딩중...</div>;
  if (error) return <div className="text-center p-4 text-red-500">에러: {error}</div>;
  if (!predictions) return <div className="text-center p-4">데이터가 없습니다.</div>;

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">배추 가격 예측</h2>
      
      {/* 현재 날씨 조건 */}
      <div className="bg-blue-50 p-4 rounded-lg mb-6">
        <h3 className="text-lg font-semibold mb-2">현재 날씨</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <p className="text-sm text-gray-600">평균기온</p>
            <p className="font-medium">{predictions.current?.['avg temp']}°C</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-600">최고기온</p>
            <p className="font-medium">{predictions.current?.['max temp']}°C</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-600">최저기온</p>
            <p className="font-medium">{predictions.current?.['min temp']}°C</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-600">강수량</p>
            <p className="font-medium">{predictions.current?.rainFall}mm</p>
          </div>
        </div>
      </div>

      {/* 예측 가격 */}
      <div className="grid gap-4">
        {/* 현재 예측 가격 */}
        <div className="bg-white rounded-lg shadow-sm p-4">
          <h3 className="font-semibold mb-2">현재 예측 가격</h3>
          <div className="text-center">
            <p className="text-2xl font-bold text-green-600">
              {predictions.current?.price?.toLocaleString()}원/kg
            </p>
            <p className="text-sm text-gray-600">
              정확도: {(predictions.current?.r2_score * 100).toFixed(2)}%
            </p>
          </div>
        </div>

        {/* 내일 예측 가격 */}
        <div className="bg-white rounded-lg shadow-sm p-4">
          <h3 className="font-semibold mb-2">내일 예측 가격</h3>
          <div className="text-center">
            <p className="text-2xl font-bold text-green-600">
              {predictions.tomorrow?.price?.toLocaleString()}원/kg
            </p>
            <p className="text-sm text-gray-600">
              정확도: {(predictions.tomorrow?.r2_score * 100).toFixed(2)}%
            </p>
          </div>
        </div>

        {/* 주간 예측 가격 */}
        <div className="bg-white rounded-lg shadow-sm p-4">
          <h3 className="font-semibold mb-2">주간 예측 가격</h3>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {predictions.weekly?.map((day, index) => (
              <div key={index} className="text-center">
                <p className="font-medium">{index + 1}일 후</p>
                <p className="text-lg font-bold text-green-600">
                  {day.price?.toLocaleString()}원/kg
                </p>
                <p className="text-xs text-gray-600">
                  정확도: {(day.r2_score * 100).toFixed(2)}%
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 모델 정보 */}
      <div className="mt-8 bg-gray-50 p-4 rounded-lg">
        <h3 className="text-lg font-semibold mb-2">예측 모델 정보</h3>
        <p className="text-sm text-gray-600">
          RandomForest 모델을 사용하여 기상 조건과 과거 가격 데이터를 기반으로 예측합니다.
        </p>
      </div>
    </div>
  );
};

export default Test2;