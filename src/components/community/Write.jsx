import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectPosts,
  selectLoading,
  getPostsSuccess,
} from "../../redux/slices/writeSlice";
import { deleteRequest } from "../../utils/requestMethods";
import WriteModal from "./WriteModal";

const Write = () => {
  const dispatch = useDispatch();
  const posts = useSelector(selectPosts);
  const loading = useSelector(selectLoading);
  const currentUserId = parseInt(localStorage.getItem("userId"));
  const [selectedPost, setSelectedPost] = useState(null);
  const [modalMode, setModalMode] = useState(null);

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

  const handlePostClick = (post) => {
    setSelectedPost(post);
    setModalMode("view");
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
    <div className="space-y-4">
      {posts.map((post) => (
        <div
          key={post.post_id}
          className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow cursor-pointer"
          onClick={() => handlePostClick(post)}
        >
          <div className="flex justify-between items-center mb-2">
            <h4 className="text-lg font-semibold">{post.title}</h4>
            <span className="text-sm text-gray-500">
              {new Date(post.date).toLocaleDateString()}
            </span>
          </div>
          <p className="text-gray-600 mb-2">{post.content}</p>
          <div className="flex justify-between items-center text-sm text-gray-500">
            <div>
              <span>작성자: {post.email}</span>
              <span className="ml-4">카테고리: {post.category}</span>
            </div>
            {currentUserId === post.user_id && (
              <div className="flex space-x-2">
                <button
                  onClick={(e) => handleEdit(post, e)}
                  className="text-blue-500 hover:text-blue-700"
                >
                  수정
                </button>
                <button
                  onClick={(e) => handleDelete(post.post_id, e)}
                  className="text-red-500 hover:text-red-700"
                >
                  삭제
                </button>
              </div>
            )}
          </div>
        </div>
      ))}

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
