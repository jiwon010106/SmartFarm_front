import axios from "axios";

/* ====== Common Post Request Function ====== */
export async function postRequest(url, options) {
  const token = getTokenWithExpiry();
  const defaultOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : "",
    },
    ...options,
  };

  try {
    const response = await fetch(url, defaultOptions);
    const data = await response.json();

    if (!response.ok) {
      // 상태 코드와 메시지를 포함하여 명확한 에러 전달
      throw new Error(
        JSON.stringify({
          status: response.status,
          msg: data.msg || "Request failed",
        })
      );
    }
    return { status: response.status, data }; // 성공 시 상태 코드와 데이터를 반환
  } catch (error) {
    // 네트워크 오류나 다른 오류를 처리
    throw error.status
      ? error // 서버 응답 오류
      : { status: 500, msg: error.message || "Unknown error occurred" }; // 네트워크 오류 등
  }
}

// myMedi 요청 함수
export async function postMyMediRequest(url, options) {
  const defaultOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    ...options,
  };

  try {
    const response = await fetch(url, defaultOptions);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        JSON.stringify({
          status: response.status,
          msg: data.msg || "Request failed",
        })
      );
    }
    return { status: response.status, data }; // 성공 시 상태 코드와 데이터를 반환
  } catch (error) {
    // 네트워크 오류나 다른 오류를 처리
    throw error instanceof Error
      ? error
      : new Error(
          JSON.stringify({
            status: 500,
            msg: error.message || "Unknown error occurred",
          })
        );
  }
}

// useDispatch-업데이트 useSelector-가져오는거

export async function postFormRequest(url, options) {
  const response = await fetch(url, {
    ...options,
    headers:
      options.body instanceof FormData
        ? undefined
        : {
            "Content-Type": "application/json",
          },
  });

  const responseData = await response.json();

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Something went wrong");
  }

  // return await response.json(); // { status, data } 형태로 반환
  return { status: response.status, data: responseData }; // 상태 코드와 데이터를 함께 반환
}

/* ====== Common Put Request Function ====== */
export async function putRequest(url, options) {
  const token = getTokenWithExpiry();
  const defaultOptions = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : "",
    },
    ...options,
  };

  const response = await fetch(url, defaultOptions);
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Network response was not ok");
  }
  return response.json();
}

/* ====== Common Patch Request Function ====== */
export async function patchRequest(url, options) {
  const token = getTokenWithExpiry();
  return await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : "",
    },
  }).then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  });
}

/* ====== Common Delete Request Function ====== */
export async function deleteRequest(url) {
  const token = getTokenWithExpiry();
  const response = await fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Network response was not ok");
  }
  return response.json();
}

/* ====== Common GET Request Function ====== */
export async function getRequest(url) {
  try {
    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("응답 에러:", errorData);
      throw new Error(errorData.message || "서버 요청 실패");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("요청 처리 중 오류 발생:", error);
    throw error;
  }
}

// axios 인스턴스 생성
const instance = axios.create({
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

export const getMarketRequest = async (apiURL) => {
  try {
    const response = await instance.get(apiURL);

    if (!response.data) {
      throw new Error("데이터가 없습니다.");
    }

    return response.data;
  } catch (error) {
    console.error("마켓 데이터 요청 오류:", error);
    throw error;
  }
};

export const getTop10Request = async (apiURL) => {
  try {
    const response = await instance.get(apiURL);

    if (!response.data) {
      throw new Error("데이터가 없습니다.");
    }

    return response.data;
  } catch (error) {
    console.error("TOP 10 데이터 요청 오류:", error);
    throw error;
  }
};

// 토큰 관리 함수 추가
const getTokenWithExpiry = () => {
  const token = localStorage.getItem("token");
  if (!token) return null;

  const tokenData = localStorage.getItem("tokenExpiry");
  if (!tokenData) {
    // 토큰은 있지만 만료시간이 없는 경우, 현재 시간 기준으로 만료시간 설정
    const expiry = new Date().getTime() + 24 * 60 * 60 * 1000;
    localStorage.setItem("tokenExpiry", expiry.toString());
    return token;
  }

  const expiry = parseInt(tokenData);
  const now = new Date().getTime();

  if (now > expiry) {
    localStorage.removeItem("token");
    localStorage.removeItem("tokenExpiry");
    return null;
  }
  return token;
};
