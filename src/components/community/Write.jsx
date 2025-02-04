import React from "react";
import { useSelector } from "react-redux";
import { selectPosts, selectLoading } from "../../redux/slices/writeSlice";

const Write = () => {
  const posts = useSelector(selectPosts);
  const loading = useSelector(selectLoading);

  console.log("Write Component - posts:", posts); // 데이터 확인용
  console.log("Write Component - loading:", loading); // 로딩 상태 확인용

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
          className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
        >
          <div className="flex justify-between items-center mb-2">
            <h4 className="text-lg font-semibold">{post.title}</h4>
            <span className="text-sm text-gray-500">
              {new Date(post.date).toLocaleDateString()}
            </span>
          </div>
          <p className="text-gray-600 mb-2">{post.content}</p>
          <div className="flex justify-between items-center text-sm text-gray-500">
            <span>작성자: {post.email}</span>
            <div className="flex space-x-4">
              {post.user_id === localStorage.getItem("userId") && (
                <>
                  <button className="text-blue-500 hover:text-blue-700">
                    수정
                  </button>
                  <button className="text-red-500 hover:text-red-700">
                    삭제
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Write;
