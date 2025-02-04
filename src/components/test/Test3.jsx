import React, { useState, useEffect } from 'react';
import { gsap } from 'gsap';

const Test3 = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const images = [
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cG9ydHJhaXR8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60',
    'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8cG9ydHJhaXR8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60',
    'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8cG9ydHJhaXR8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60',
    'https://images.unsplash.com/photo-1554151228-14d9def656e4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjB8fHBvcnRyYWl0fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60',
    'https://images.unsplash.com/photo-1543357530-d91dab30fa97?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OTN8fHBvcnRyYWl0fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60'
  ];

  useEffect(() => {
    // 이미지 미리 로드
    images.forEach(src => {
      const img = new Image();
      img.src = src;
    });

    // 컴포넌트 마운트 시 첫 번째 이미지에 대한 애니메이션 실행
    const items = document.querySelectorAll('.accordion-item');
    const timeline = gsap.timeline();
    
    items.forEach((item, i) => {
      timeline.to(item, {
        width: i === 0 ? '42vw' : '8vw',
        duration: 1.5,
        ease: 'power4.out',
      }, 0);
    });

    timeline.to(items[0], {
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      duration: 0.5,
      ease: 'power2.out',
    }, 0);
  }, []);

  const handleClick = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  useEffect(() => {
    const items = document.querySelectorAll('.accordion-item');
    
    const timeline = gsap.timeline();
    
    items.forEach((item, i) => {
      timeline.to(item, {
        width: activeIndex === i ? '42vw' : (activeIndex === null ? '15vw' : '8vw'),
        duration: 1.5,
        ease: 'power4.out',
      }, 0);
    });

    if (activeIndex !== null) {
      timeline.to(items[activeIndex], {
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        duration: 0.5,
        ease: 'power2.out',
      }, 0);
    }
  }, [activeIndex]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-purple-400 flex items-center justify-center select-none">
      <div className="text-center whitespace-nowrap overflow-hidden">
        {images.map((image, index) => (
          <div
            key={index}
            className={`accordion-item inline-block cursor-pointer rounded-[3vw] h-[75vh] mx-[1vw] bg-center bg-cover transition-transform duration-300 ease-out
              ${activeIndex === index ? 'z-10' : 'z-0'}
              hover:shadow-xl`}
            style={{
              backgroundImage: `url(${image})`,
              width: index === 0 ? '42vw' : '8vw', // 초기 상태 설정
              backgroundSize: '75vh',
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
