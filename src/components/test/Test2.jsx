import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Test2 = () => {
  const [predictions, setPredictions] = useState(null);
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
        const response = await axios.get('http://localhost:8000/predictions');
        setPredictions(response.data);
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
      <h2 className="text-2xl font-bold mb-6 text-center">농산물 가격 예측</h2>
      
      {/* 날씨 조건 표시 */}
      <div className="bg-blue-50 p-4 rounded-lg mb-6">
        <h3 className="text-lg font-semibold mb-2">예측 기준 날씨</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <p className="text-sm text-gray-600">평균기온</p>
            <p className="font-medium">20°C</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-600">최고기온</p>
            <p className="font-medium">25°C</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-600">최저기온</p>
            <p className="font-medium">15°C</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-600">강수량</p>
            <p className="font-medium">5mm</p>
          </div>
        </div>
      </div>

      {/* 예측 가격 그리드 */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {Object.entries(vegetableNames).map(([key, name]) => (
          <div key={key} className="bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow">
            <div className="text-center">
              <span className="text-2xl mb-2 block">{vegetableIcons[key]}</span>
              <h3 className="font-medium text-lg mb-1">{name}</h3>
              <p className="text-lg font-bold text-green-600">
                {predictions[key]?.toLocaleString()}원
              </p>
              <p className="text-xs text-gray-500 mt-1">예측 가격 / kg</p>
            </div>
          </div>
        ))}
      </div>

      {/* 신뢰도 지표 */}
      <div className="mt-8 bg-gray-50 p-4 rounded-lg">
        <h3 className="text-lg font-semibold mb-2">예측 신뢰도</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {Object.entries(vegetableNames).map(([key, name]) => (
            <div key={key} className="text-center">
              <p className="font-medium">{name}</p>
              <p className="text-sm text-gray-600">R² 점수: {(predictions[`${key}_r2`] || 0).toFixed(4)}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Test2;