// 시작 주차와 종료 주차 설정
export const START_PERIOD = "202401";
export const END_PERIOD = "202452";

// 데이터 유효성 검사 함수
export const isValidPeriod = (period) => {
  const year = period.substring(0, 4);
  const week = parseInt(period.substring(4));
  return year === "2024" && week >= 1 && week <= 52;
};

// 다음 주차 계산 함수
export const getNextPeriod = (currentPeriod) => {
  const week = parseInt(currentPeriod.substring(4));
  if (week === 52) return null;
  return `2024${(week + 1).toString().padStart(2, "0")}`;
};

// 이전 주차 계산 함수
export const getPrevPeriod = (currentPeriod) => {
  const week = parseInt(currentPeriod.substring(4));
  if (week === 1) return null;
  return `2024${(week - 1).toString().padStart(2, "0")}`;
};
