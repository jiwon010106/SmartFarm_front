/* ====== Common Post Request Function ====== */
export async function postRequest(url, options) {
  const defaultOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
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
  const defaultOptions = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    ...options,
  };

  return await fetch(url, defaultOptions).then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  });
}

/* ====== Common Patch Request Function ====== */
export async function patchRequest(url, options) {
  return await fetch(url, options).then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  });
}

/* ====== Common Delete Request Function ====== */
export async function deleteRequest(url, options) {
  return await fetch(url, options).then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  });
}

/* ====== Common GET Request Function ====== */
export async function getRequest(url) {
  try {
    const response = await fetch(url);

    // 응답 상태 확인용 로그
    // console.log("응답 상태:", response.status);

    if (!response.ok) {
      const errorData = await response.json();
      console.error("응답 에러:", errorData);
      throw new Error(errorData.message || "서버 요청 실패");
    }

    const data = await response.json();
    // console.log("응답 데이터:", data); // 데이터 확인용 로그
    return data;
  } catch (error) {
    console.error("요청 처리 중 오류 발생:", error);
    throw error;
  }
}
