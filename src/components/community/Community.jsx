import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getPostsStart,
  getPostsSuccess,
  getPostsFailure,
  selectPosts,
  selectLoading,
} from "../../redux/slices/writeSlice";
import Write from "./Write";
import CreatePostModal from "./WriteModal";
import { getRequest } from "../../utils/requestMethods";

const Community = () => {
  const dispatch = useDispatch();
  const posts = useSelector(selectPosts);
  const loading = useSelector(selectLoading);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchPosts = async () => {
    dispatch(getPostsStart());
    try {
      const response = await getRequest("write");
      dispatch(getPostsSuccess(response.data));
    } catch (err) {
      console.error("Error fetching posts:", err);
      dispatch(getPostsFailure(err.message || "게시글 로딩 실패"));
    }
  };

  // 컴포넌트 마운트 시 게시글 목록 불러오기
  useEffect(() => {
    fetchPosts();
  }, [dispatch]);

  // 모달 닫을 때 게시글 목록 새로고침
  const handleModalClose = () => {
    setIsModalOpen(false);
    fetchPosts(); // 모달이 닫힐 때 게시글 목록 새로고침
  };

  // 검색된 게시물을 필터링하는 함수
  const filteredPosts = posts.filter((post) => {
    if (!post.title) return false;

    const postTitle = post.title.toString().toLowerCase();
    const postId = post.post_id ? post.post_id.toString() : ""; // post_id 사용
    const searchQuery = searchTerm.toLowerCase();

    // console.log("검색어:", searchTerm);
    // console.log("게시물 post_id:", postId);
    // console.log("게시물 제목:", post.title);
    // console.log(
    //   "포함 여부:",
    //   postTitle.includes(searchQuery) || postId.includes(searchQuery)
    // );

    return postTitle.includes(searchQuery) || postId.includes(searchQuery);
  });

  return (
    <div className="max-w-6xl mx-auto p-5">
      {/* 헤더 */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">
          Gardening Community
        </h1>
        <h2 className="text-2xl text-gray-600">The Forum</h2>
      </div>

      {/* 검색 및 필터 섹션 */}
      <div className="flex justify-between items-center mb-6">
        <div className="space-x-4">
          <span className="text-gray-600 cursor-pointer hover:text-gray-800">
            Categories
          </span>
          <span className="text-gray-600 cursor-pointer hover:text-gray-800">
            All Posts
          </span>
          <span className="text-gray-600 cursor-pointer hover:text-gray-800">
            My Posts
          </span>
        </div>
        <div className="flex items-center space-x-4">
          <input
            type="search"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 bg-green-700 text-white rounded-lg hover:bg-green-800 transition-colors"
          >
            Create New Post
          </button>
        </div>
      </div>

      {/* Write 컴포넌트에 필터링된 게시물 전달 */}
      <Write posts={filteredPosts} />

      {/* 새 게시글 작성 모달 */}
      <CreatePostModal isOpen={isModalOpen} onClose={handleModalClose} />
    </div>
  );
};

export default Community;
