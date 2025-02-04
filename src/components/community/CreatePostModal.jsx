import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createPostStart,
  createPostSuccess,
  createPostFailure,
  selectLoading,
} from "../../redux/slices/writeSlice";
import axios from "axios";

const CreatePostModal = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const loading = useSelector(selectLoading);
  const [newPost, setNewPost] = useState({
    title: "",
    content: "",
    category: "general",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(createPostStart());

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post("/api/write/create", newPost, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      dispatch(createPostSuccess(response.data.data));
      setNewPost({ title: "", content: "", category: "general" });
      onClose();
    } catch (error) {
      dispatch(
        createPostFailure(error.response?.data?.message || "게시글 작성 실패")
      );
    }
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
              value={newPost.category}
              onChange={(e) =>
                setNewPost({ ...newPost, category: e.target.value })
              }
              className="w-full p-2 border border-gray-300 rounded-lg"
            >
              <option value="general">General Discussions</option>
              <option value="food">Growing Your Own Food</option>
              <option value="indoor">Indoor Plants</option>
              <option value="pests">Pests & Pesticides</option>
              <option value="hydroponic">Hydroponic Gardens</option>
            </select>
          </div>

          <div>
            <label className="block font-semibold mb-1">제목</label>
            <input
              type="text"
              value={newPost.title}
              onChange={(e) =>
                setNewPost({ ...newPost, title: e.target.value })
              }
              required
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">내용</label>
            <textarea
              value={newPost.content}
              onChange={(e) =>
                setNewPost({ ...newPost, content: e.target.value })
              }
              required
              rows="6"
              className="w-full p-2 border border-gray-300 rounded-lg"
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
              disabled={loading}
              className={`px-4 py-2 bg-green-700 text-white rounded-lg
                ${
                  loading
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-green-800"
                }`}
            >
              {loading ? "작성 중..." : "게시글 작성"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePostModal;
