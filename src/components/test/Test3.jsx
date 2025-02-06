import React, { useState, useEffect, useMemo } from "react";
import { gsap } from "gsap";
import { useNavigate } from "react-router-dom";

const Test3 = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const navigate = useNavigate();
  const images = useMemo(
    () => [
      {
        src: "http://www.cimon.co.kr/wp-content/uploads/2017/02/farm_02-e1486360904274.jpg",
        link: "/pricingInformation",
        title: "소비 트렌드",
      },
      {
        src: "https://cdn.hankyung.com/photo/202311/01.32189912.1.jpg",
        link: "/sellInformation",
        title: "가격예측",
      },
      {
        src: "https://img.etnews.com/photonews/2208/1564644_20220824165655_096_0003.jpg",
        link: "/pests",
        title: "육성법",
      },
      {
        src: "https://cdn.knupresscenter.com/news/photo/202203/20689_7427_3041.jpg",
        link: "/trainingMethod",
        title: "작물육성방법",
      },
      {
        src: "https://www.industrynews.co.kr/news/photo/201807/24889_15849_5548.jpg",
        link: "/Community",
        title: "게시글 작성",
      },
    ],
    []
  );

  useEffect(() => {
    // 이미지 미리 로드
    images.forEach((image) => {
      const img = new Image();
      img.src = image.src;
    });

    // 컴포넌트 마운트 시 첫 번째 이미지에 대한 애니메이션 실행
    const items = document.querySelectorAll(".accordion-item");
    const timeline = gsap.timeline();

    items.forEach((item, i) => {
      timeline.to(
        item,
        {
          width: i === 0 ? "42vw" : "8vw",
          duration: 1.5,
          ease: "power4.out",
        },
        0
      );
    });

    timeline.to(
      items[0],
      {
        backgroundPosition: "center",
        backgroundSize: "cover",
        duration: 0.5,
        ease: "power2.out",
      },
      0
    );
  }, [images]);

  const handleClick = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const handleMoreClick = (index) => {
    navigate(images[index].link);
  };

  useEffect(() => {
    const items = document.querySelectorAll(".accordion-item");
    const timeline = gsap.timeline();

    items.forEach((item, i) => {
      timeline.to(
        item,
        {
          width:
            activeIndex === i ? "42vw" : activeIndex === null ? "15vw" : "8vw",
          duration: 1.5,
          ease: "power4.out",
        },
        0
      );
    });

    if (activeIndex !== null) {
      timeline.to(
        items[activeIndex],
        {
          backgroundPosition: "center",
          backgroundSize: "cover",
          duration: 0.5,
          ease: "power2.out",
        },
        0
      );
    }
  }, [activeIndex, images]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-400 to-green-200 flex items-center justify-center ">
      <div className="text-center whitespace-nowrap overflow-hidden h-[80vh]">
        <div className="mb-4">
          <h2
            style={{ fontFamily: "LemonMilk" }}
            className="text-6xl hidden lg:block leading-tight"
          >
            AnIfarm
          </h2>
          <p className="text-base lg:text-lg tracking-tight hidden lg:block leading-relaxed">
            사이트
            <br />
            소개
            <br />글 입니다.
          </p>
        </div>
        {images.map((image, index) => (
          <div
            key={index}
            className={`accordion-item inline-block cursor-pointer rounded-[3vw] h-[60vh] mx-[1vw] bg-center bg-cover transition-transform duration-300 ease-out
              ${activeIndex === index ? "z-10" : "z-0"}
              hover:shadow-xl`}
            style={{
              backgroundImage: `url(${image.src})`,
              width: index === 0 ? "42vw" : "8vw", // 초기 상태 설정
              backgroundSize: "75vh",
              transform: `translateZ(0)`,
            }}
            onClick={() => handleClick(index)}
          >
            <h3 className="absolute top-4 left-1/2 transform -translate-x-1/2 text-black-400 text-xl font-bold shadow-lg">
              {image.title}
            </h3>
            {activeIndex === index && (
              <button
                onClick={(e) => {
                  e.stopPropagation(); // 부모 클릭 이벤트 전파 방지
                  handleMoreClick(index);
                }}
                className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white text-black px-4 py-2 rounded"
              >
                더보기
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Test3;
