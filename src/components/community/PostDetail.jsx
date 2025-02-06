import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import {
  getRequest,
  postRequest,
  deleteRequest,
  putRequest,
} from "../../utils/requestMethods";
import { jwtDecode } from "jwt-decode";

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
  const [comments, setComments] = useState([]); // 빈 배열로 초기화
  const [loading, setLoading] = useState(true); // 로딩 상태 추가
  const [newComment, setNewComment] = useState("");
  const currentUserId = parseInt(localStorage.getItem("userId"));
  const [isEditing, setIsEditing] = useState(false);
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editedContent, setEditedContent] = useState("");
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    fetchPostAndComments();
    // 토큰에서 사용자 정보 가져오기
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setCurrentUser(decoded);
      } catch (error) {
        console.error("토큰 디코딩 실패:", error);
        localStorage.removeItem("token"); // 잘못된 토큰 제거
      }
    }
  }, [postId]);

  const fetchPostAndComments = async () => {
    setLoading(true);
    try {
      const postResponse = await getRequest(
        `http://localhost:8000/api/write/${postId}`
      );
      const commentsResponse = await getRequest(
        `http://localhost:8000/api/comments/${postId}`
      );

      setPost(postResponse.data);
      // commentsResponse가 배열인지 확인하고 설정
      setComments(Array.isArray(commentsResponse) ? commentsResponse : []);

      // console.log("Fetched comments:", commentsResponse); // 디버깅용
    } catch (error) {
      console.error("데이터 로딩 실패:", error);
      Swal.fire("오류", "게시글을 불러오는데 실패했습니다.", "error");
      setComments([]); // 에러 시 빈 배열로 설정
    } finally {
      setLoading(false);
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
      const response = await postRequest(`http://localhost:8000/api/comments`, {
        body: JSON.stringify({
          post_id: postId,
          content: newComment,
        }),
      });

      if (response.status === 200 || response.status === 201) {
        setNewComment("");
        await fetchPostAndComments(); // await 추가하여 데이터 새로고침 보장
        Swal.fire("성공", "댓글이 작성되었습니다.", "success");
      }
    } catch (error) {
      console.error("댓글 작성 실패:", error);
      Swal.fire("오류", "댓글 작성에 실패했습니다.", "error");
    }
  };

  // 게시글 수정 함수
  const handleEditPost = async () => {
    try {
      await putRequest(`http://localhost:8000/api/write/${postId}`, {
        body: JSON.stringify(post),
      });
      await Swal.fire({
        title: "성공!",
        text: "게시글이 성공적으로 수정되었습니다.",
        icon: "success",
      });
      setIsEditing(false);
      fetchPostAndComments();
    } catch (error) {
      console.error("게시글 수정 실패:", error);
      Swal.fire("오류", "게시글 수정에 실패했습니다.", "error");
    }
  };

  // 댓글 수정 함수
  const handleEditComment = async (commentId) => {
    try {
      await putRequest(`http://localhost:8000/api/comments/${commentId}`, {
        body: JSON.stringify({ content: editedContent }),
      });
      setEditingCommentId(null);
      setEditedContent("");
      fetchPostAndComments();
      Swal.fire("성공", "댓글이 수정되었습니다.", "success");
    } catch (error) {
      console.error("댓글 수정 실패:", error);
      Swal.fire("오류", "댓글 수정에 실패했습니다.", "error");
    }
  };

  // 댓글 삭제 함수
  const handleDeleteComment = async (commentId) => {
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
        await deleteRequest(`http://localhost:8000/api/comments/${commentId}`);
        fetchPostAndComments();
        Swal.fire("삭제 완료!", "댓글이 삭제되었습니다.", "success");
      } catch (error) {
        console.error("댓글 삭제 실패:", error);
        Swal.fire("오류", "댓글 삭제에 실패했습니다.", "error");
      }
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

  // 게시글 작성자 확인 함수
  const isPostAuthor = () => {
    return currentUser && post.user_id === currentUser.id;
  };

  // 댓글 작성자 확인 함수
  const isCommentAuthor = (comment) => {
    return currentUser && comment.user_id === currentUser.id;
  };

  if (loading) return <div className="text-center py-8">로딩 중...</div>;

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      {/* 게시글 내용 */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex justify-between items-center mb-4">
          {isEditing ? (
            <input
              type="text"
              value={post.title}
              onChange={(e) => setPost({ ...post, title: e.target.value })}
              className="text-2xl font-bold w-full p-2 border rounded"
            />
          ) : (
            <h1 className="text-2xl font-bold">{post.title}</h1>
          )}
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
          {isEditing ? (
            <textarea
              value={post.content}
              onChange={(e) => setPost({ ...post, content: e.target.value })}
              className="w-full p-2 border rounded"
              rows="6"
            />
          ) : (
            <p className="whitespace-pre-wrap">{post.content}</p>
          )}
        </div>
        {isPostAuthor() && (
          <div className="flex justify-end space-x-2">
            {isEditing ? (
              <>
                <button
                  onClick={handleEditPost}
                  className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                >
                  저장
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                >
                  취소
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => setIsEditing(true)}
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
              </>
            )}
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
          {comments && comments.length > 0 ? (
            comments.map((comment) => (
              <div key={comment.comment_id} className="border-b pb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold">{comment.email}</span>
                  <span className="text-sm text-gray-500">
                    {new Date(comment.created_at).toLocaleDateString()}
                  </span>
                </div>
                {editingCommentId === comment.comment_id ? (
                  <div className="flex space-x-2">
                    <textarea
                      value={editedContent}
                      onChange={(e) => setEditedContent(e.target.value)}
                      className="flex-1 p-2 border rounded"
                      rows="2"
                    />
                    <div className="flex flex-col space-y-2">
                      <button
                        onClick={() => handleEditComment(comment.comment_id)}
                        className="px-3 py-1 bg-green-500 text-white rounded text-sm"
                      >
                        저장
                      </button>
                      <button
                        onClick={() => {
                          setEditingCommentId(null);
                          setEditedContent("");
                        }}
                        className="px-3 py-1 bg-gray-500 text-white rounded text-sm"
                      >
                        취소
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex justify-between items-start">
                    <p className="text-gray-700">{comment.content}</p>
                    {isCommentAuthor(comment) && (
                      <div className="flex space-x-2">
                        <button
                          onClick={() => {
                            setEditingCommentId(comment.comment_id);
                            setEditedContent(comment.content);
                          }}
                          className="text-blue-500 hover:text-blue-700"
                        >
                          수정
                        </button>
                        <button
                          onClick={() =>
                            handleDeleteComment(comment.comment_id)
                          }
                          className="text-red-500 hover:text-red-700"
                        >
                          삭제
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="text-center text-gray-500">댓글이 없습니다.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostDetail;
