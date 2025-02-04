import React, { useState, useEffect } from 'react';
import { gsap } from 'gsap';

const Test3 = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const images = [
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cG9ydHJhaXR8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60',
    'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8cG9ydHJhaXR8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60',
    'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8cG9ydHJhaXR8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60',
    'https://images.unsplash.com/photo-1554151228-14d9def656e4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjB8fHBvcnRyYWl0fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60',
    'https://images.unsplash.com/photo-1543357530-d91dab30fa97?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OTN8fHBvcnRyYWl0fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60'
  ];

  const handleClick = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  useEffect(() => {
    const items = document.querySelectorAll('.accordion-item');
    
    items.forEach((item, i) => {
      gsap.to(item, {
        width: activeIndex === i ? '42vw' : (activeIndex === null ? '15vw' : '8vw'),
        duration: activeIndex === i ? 2.5 : 2,
        ease: activeIndex === i ? 'elastic(1, .3)' : 'elastic(1, .6)'
      });
    });
  }, [activeIndex]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-purple-400 flex items-center justify-center select-none">
      <div className="text-center whitespace-nowrap overflow-hidden">
        {images.map((image, index) => (
          <div
            key={index}
            className={`accordion-item inline-block cursor-pointer rounded-[3vw] h-[75vh] mx-[1vw] bg-center bg-cover transition-all duration-500`}
            style={{
              backgroundImage: `url(${image})`,
              width: '15vw',
              backgroundSize: '75vh'
            }}
            onClick={() => handleClick(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default Test3;
