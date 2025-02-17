import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  createPostStart,
  createPostSuccess,
  createPostFailure,
} from "../../redux/slices/writeSlice";
import { postRequest } from "../../utils/requestMethods";
import Swal from "sweetalert2";

const CreatePostModal = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const [postData, setPostData] = useState({
    title: "",
    content: "",
    category: "general",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = {
        title: postData.title,
        content: postData.content,
        category: postData.category,
      };

      console.log("게시글 작성 요청:", formData);

      dispatch(createPostStart());

      const response = await postRequest("write/create", {
        body: JSON.stringify(formData),
      });

      console.log("게시글 작성 응답:", response);

      if (response.success || response.status === 201) {
        dispatch(createPostSuccess(response.data));

        await Swal.fire({
          icon: "success",
          title: "성공",
          text: "게시글이 작성되었습니다.",
        });
        onClose();
        window.location.href = "/Community";
      } else {
        throw new Error(response.message || "게시글 작성에 실패했습니다.");
      }
    } catch (error) {
      console.error("게시글 작성 오류:", error);
      dispatch(createPostFailure(error.message));

      Swal.fire({
        icon: "error",
        title: "오류",
        text: error.message || "게시글 작성에 실패했습니다.",
      });
    }
  };

  const isFormValid = () => {
    return (
      postData.title.trim() !== "" &&
      postData.content.trim() !== "" &&
      postData.category !== ""
    );
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 max-w-2xl w-full">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">새 게시글 작성</h3>
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
            />
          </div>

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
            >
              취소
            </button>
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 disabled:bg-gray-400"
              disabled={!isFormValid()}
            >
              작성하기
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePostModal;
