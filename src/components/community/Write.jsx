import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectPosts,
  selectLoading,
  getPostsSuccess,
} from "../../redux/slices/writeSlice";
import { deleteRequest } from "../../utils/requestMethods";
import WriteModal from "./WriteModal";
import { useNavigate } from "react-router-dom";

const Write = () => {
  const dispatch = useDispatch();
  const posts = useSelector(selectPosts);
  const loading = useSelector(selectLoading);
  const currentUserId = parseInt(localStorage.getItem("userId"));
  const [selectedPost, setSelectedPost] = useState(null);
  const [modalMode, setModalMode] = useState(null);
  const navigate = useNavigate();

  const handleDelete = async (postId, e) => {
    e.stopPropagation(); // 이벤트 버블링 방지
    if (window.confirm("정말 삭제하시겠습니까?")) {
      try {
        await deleteRequest(`http://localhost:8000/api/write/${postId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        window.location.reload();
      } catch (error) {
        console.error("게시글 삭제 실패:", error);
        alert("게시글 삭제에 실패했습니다.");
      }
    }
  };

  const handleEdit = (post, e) => {
    e.stopPropagation(); // 이벤트 버블링 방지
    setSelectedPost(post);
    setModalMode("edit");
  };

  const handlePostClick = (postId) => {
    navigate(`/post/${postId}`);
  };

  const handlePostDeleted = (deletedPostId) => {
    // 로컬 상태에서 삭제된 게시글 제거
    const updatedPosts = posts.filter((post) => post.post_id !== deletedPostId);
    dispatch(getPostsSuccess(updatedPosts));
  };

  if (loading) {
    return <div className="text-center text-gray-600">로딩 중...</div>;
  }

  if (!posts || posts.length === 0) {
    return <div className="text-center text-gray-600">게시글이 없습니다.</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <table className="min-w-full">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
              제목
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
              카테고리
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
              작성자
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
              작성일
            </th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => (
            <tr
              key={post.post_id}
              onClick={() => handlePostClick(post.post_id)}
              className="border-b hover:bg-gray-50 cursor-pointer"
            >
              <td className="px-6 py-4">{post.title}</td>
              <td className="px-6 py-4">{post.category}</td>
              <td className="px-6 py-4">{post.email}</td>
              <td className="px-6 py-4">
                {new Date(post.date).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedPost && (
        <WriteModal
          isOpen={!!selectedPost}
          onClose={() => {
            setSelectedPost(null);
            setModalMode(null);
          }}
          mode={modalMode}
          post={selectedPost}
          onPostDeleted={handlePostDeleted}
        />
      )}
    </div>
  );
};

export default Write;
