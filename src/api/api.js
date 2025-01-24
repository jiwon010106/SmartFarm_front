const BASE_URL = "http://localhost:8000/api";

export const fetchSalesData = async () => {
  try {
    const response = await fetch(`${BASE_URL}/sales`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching sales data:", error);
    throw error;
  }
};

export const fetchTop10Data = async () => {
  try {
    const response = await fetch(`${BASE_URL}/sales/top10`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching top 10 data:", error);
    throw error;
  }
};

export const fetchMarketData = async (period) => {
  try {
    const response = await fetch(`${BASE_URL}/sales/market?period=${period}`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching market data:", error);
    throw error;
  }
};
