import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  createPostStart,
  createPostSuccess,
  createPostFailure,
} from "../../redux/slices/writeSlice";
import {
  postMyMediRequest,
  putRequest,
  deleteRequest,
} from "../../utils/requestMethods";

const CreatePostModal = ({
  isOpen,
  onClose,
  mode: initialMode = "create",
  post = null,
  onPostDeleted,
}) => {
  const dispatch = useDispatch();

  // JWT 토큰에서 userId 추출
  const getCurrentUserId = () => {
    const token = localStorage.getItem("token");
    if (!token) return 0;

    try {
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split("")
          .map(function (c) {
            return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
          })
          .join("")
      );

      return JSON.parse(jsonPayload).id;
    } catch (error) {
      console.error("토큰 디코딩 실패:", error);
      return 0;
    }
  };

  const currentUserId = getCurrentUserId();

  const [mode, setMode] = useState(initialMode);
  const [postData, setPostData] = useState(
    post || {
      title: "",
      content: "",
      category: "general",
    }
  );

  const handleDelete = async () => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      try {
        const response = await fetch(
          `http://localhost:8000/api/write/${post.post_id}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(
            `삭제 실패: ${errorData.message || "알 수 없는 오류"}`
          );
        }

        onClose();
        if (onPostDeleted) {
          onPostDeleted(post.post_id);
        }
      } catch (error) {
        console.error("게시글 삭제 실패:", error);
        alert(`게시글 삭제에 실패했습니다. ${error.message}`);
      }
    }
  };

  const handleEditMode = () => {
    setMode("edit");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (mode === "create") {
      dispatch(createPostStart());
      try {
        const response = await postMyMediRequest(
          "http://localhost:8000/api/write/create",
          {
            body: JSON.stringify(postData),
          }
        );

        if (response.status === 201) {
          dispatch(createPostSuccess(response.data));
          setPostData({ title: "", content: "", category: "general" });
          onClose();
        } else {
          throw new Error("게시글 작성에 실패했습니다.");
        }
      } catch (error) {
        console.error("게시글 작성 오류:", error);
        dispatch(
          createPostFailure(error.message || "게시글 작성에 실패했습니다.")
        );
      }
    } else if (mode === "edit") {
      try {
        await putRequest(`http://localhost:8000/api/write/${post.post_id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(postData),
        });
        onClose();
        window.location.reload();
      } catch (error) {
        console.error("게시글 수정 실패:", error);
        alert("게시글 수정에 실패했습니다.");
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 max-w-2xl w-full">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">
            {mode === "create"
              ? "새 게시글 작성"
              : mode === "edit"
              ? "게시글 수정"
              : "게시글 상세"}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-semibold mb-1">카테고리</label>
            <select
              value={postData.category}
              onChange={(e) =>
                setPostData({ ...postData, category: e.target.value })
              }
              className="w-full p-2 border border-gray-300 rounded-lg"
              disabled={mode === "view"}
            >
              <option value="general">일반 토론</option>
              <option value="food">식물 재배</option>
              <option value="indoor">실내 식물</option>
              <option value="pests">병충해 관리</option>
              <option value="hydroponic">수경 재배</option>
            </select>
          </div>

          <div>
            <label className="block font-semibold mb-1">제목</label>
            <input
              type="text"
              value={postData.title}
              onChange={(e) =>
                setPostData({ ...postData, title: e.target.value })
              }
              required
              className="w-full p-2 border border-gray-300 rounded-lg"
              placeholder="제목을 입력하세요"
              disabled={mode === "view"}
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">내용</label>
            <textarea
              value={postData.content}
              onChange={(e) =>
                setPostData({ ...postData, content: e.target.value })
              }
              required
              rows="6"
              className="w-full p-2 border border-gray-300 rounded-lg"
              placeholder="내용을 입력하세요"
              disabled={mode === "view"}
            />
          </div>

          <div className="flex justify-end space-x-3">
            {mode === "view" && currentUserId === post?.user_id && (
              <>
                <button
                  type="button"
                  onClick={handleEditMode}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                  수정
                </button>
                <button
                  type="button"
                  onClick={handleDelete}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                >
                  삭제
                </button>
              </>
            )}
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
            >
              {mode === "view" ? "닫기" : "취소"}
            </button>
            {mode !== "view" && (
              <button
                type="submit"
                className="px-4 py-2 bg-green-700 text-white rounded-lg hover:bg-green-800"
              >
                {mode === "create" ? "게시글 작성" : "수정 완료"}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePostModal;
