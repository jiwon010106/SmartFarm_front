import React, { useState, useEffect } from "react";
import { gsap } from "gsap";

const Test3 = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const images = [
    "http://www.cimon.co.kr/wp-content/uploads/2017/02/farm_02-e1486360904274.jpg",
    "https://cdn.hankyung.com/photo/202311/01.32189912.1.jpg",
    "https://img.etnews.com/photonews/2208/1564644_20220824165655_096_0003.jpg",
    "https://cdn.knupresscenter.com/news/photo/202203/20689_7427_3041.jpg",
    "https://www.industrynews.co.kr/news/photo/201807/24889_15849_5548.jpg",
  ];

  useEffect(() => {
    // 이미지 미리 로드
    images.forEach((src) => {
      const img = new Image();
      img.src = src;
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
  }, []);

  const handleClick = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
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
  }, [activeIndex]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-400 to-green-200 flex items-center justify-center select-none">
      <div className="text-center whitespace-nowrap overflow-hidden">
        {images.map((image, index) => (
          <div
            key={index}
            className={`accordion-item inline-block cursor-pointer rounded-[3vw] h-[75vh] mx-[1vw] bg-center bg-cover transition-transform duration-300 ease-out
              ${activeIndex === index ? "z-10" : "z-0"}
              hover:shadow-xl`}
            style={{
              backgroundImage: `url(${image})`,
              width: index === 0 ? "42vw" : "8vw", // 초기 상태 설정
              backgroundSize: "75vh",
              transform: `translateZ(0)`,
            }}
            onClick={() => handleClick(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default Test3;
