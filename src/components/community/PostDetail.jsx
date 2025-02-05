import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  getRequest,
  postRequest,
  deleteRequest,
} from "../../utils/requestMethods";
import Swal from "sweetalert2";

const PostDetail = () => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState({
    title: "",
    content: "",
    category: "", // 초기값을 빈 문자열로 설정
    email: "",
    date: new Date(),
  });
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const currentUserId = parseInt(localStorage.getItem("userId"));

  useEffect(() => {
    fetchPostAndComments();
  }, [postId]);

  const fetchPostAndComments = async () => {
    try {
      const postResponse = await getRequest(
        `http://localhost:8000/api/write/${postId}`
      );
      const commentsResponse = await getRequest(
        `http://localhost:8000/api/comments/${postId}`
      );
      setPost(postResponse.data);
      setComments(commentsResponse.data);
    } catch (error) {
      console.error("데이터 로딩 실패:", error);
      Swal.fire("오류", "게시글을 불러오는데 실패했습니다.", "error");
    }
  };

  const handleDelete = async () => {
    const result = await Swal.fire({
      title: "정말 삭제하시겠습니까?",
      text: "이 작업은 되돌릴 수 없습니다!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "삭제",
      cancelButtonText: "취소",
    });

    if (result.isConfirmed) {
      try {
        await deleteRequest(`http://localhost:8000/api/write/${postId}`);
        Swal.fire(
          "삭제 완료!",
          "게시글이 성공적으로 삭제되었습니다.",
          "success"
        );
        navigate("/community");
      } catch (error) {
        console.error("삭제 실패:", error);
        Swal.fire("오류", "게시글 삭제에 실패했습니다.", "error");
      }
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
      await postRequest(`http://localhost:8000/api/comments`, {
        body: JSON.stringify({
          post_id: postId,
          content: newComment,
        }),
      });
      setNewComment("");
      fetchPostAndComments(); // 댓글 목록 새로고침
    } catch (error) {
      console.error("댓글 작성 실패:", error);
      Swal.fire("오류", "댓글 작성에 실패했습니다.", "error");
    }
  };

  // 카테고리 매핑 함수 추가
  const getCategoryName = (category) => {
    const categories = {
      general: "일반 토론",
      food: "식물 재배",
      indoor: "실내 식물",
      pests: "병충해 관리",
      hydroponic: "수경 재배",
    };
    return categories[category] || category;
  };

  if (!post) return <div className="text-center py-8">로딩 중...</div>;

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      {/* 게시글 내용 */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">{post.title}</h1>
          <span className="text-gray-500">
            {new Date(post.date).toLocaleDateString()}
          </span>
        </div>
        <div className="mb-4">
          <span className="text-gray-600 mr-4">작성자: {post.email}</span>
          <span className="text-gray-600">
            카테고리: {getCategoryName(post.category)}
          </span>
        </div>
        <div className="border-t border-b py-4 mb-4">
          <p className="whitespace-pre-wrap">{post.content}</p>
        </div>
        {currentUserId === post.user_id && (
          <div className="flex justify-end space-x-2">
            <button
              onClick={() => navigate(`/post/edit/${postId}`)}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              수정
            </button>
            <button
              onClick={handleDelete}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              삭제
            </button>
          </div>
        )}
      </div>

      {/* 댓글 섹션 */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold mb-4">댓글</h2>

        {/* 댓글 작성 폼 */}
        <form onSubmit={handleCommentSubmit} className="mb-6">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="w-full p-2 border rounded-lg mb-2"
            placeholder="댓글을 작성하세요"
            rows="3"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            댓글 작성
          </button>
        </form>

        {/* 댓글 목록 */}
        <div className="space-y-4">
          {comments.map((comment) => (
            <div key={comment.id} className="border-b pb-4">
              <div className="flex justify-between items-center mb-2">
                <span className="font-semibold">{comment.email}</span>
                <span className="text-sm text-gray-500">
                  {new Date(comment.created_at).toLocaleDateString()}
                </span>
              </div>
              <p className="text-gray-700">{comment.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PostDetail;
