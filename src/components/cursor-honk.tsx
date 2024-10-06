"use client";

import { useEffect, useState } from 'react';

export default function CursorHonk() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [visible, setVisible] = useState(false);
  const [flipped, setFlipped] = useState(false);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      // Find the closest element with id 'yours-div'
      const isClosestYoursDiv = (e.target as HTMLElement).closest('#yours-div');

      // Update the position of the cursor
      setPosition({ x: e.pageX, y: e.pageY });

      // Check if the clicked element is 'yours-div' and set the flipped state
      if (isClosestYoursDiv) {
        setFlipped(true);  // Flip the image
      } else {
        setFlipped(false); // Reset to normal
      }

      // Show the image and hide it after 500ms
      setVisible(true);
      setTimeout(() => setVisible(false), 500);
    };

    // Add event listener for clicks
    document.addEventListener('click', handleClick);

    // Cleanup the event listener on component unmount
    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, []);

  return (
    <div>
      {visible && (
        <img
          src="../../images/honk.png" // Replace with your animation image path
          alt="HONK"
          style={{
            position: 'absolute',
            left: position.x - 15 + 'px', // Center the image on the cursor
            top: position.y - 15 + 'px',  // Adjust as needed for your image size
            width: '40px',               // Adjust the size of the image
            height: '40px',
            pointerEvents: 'none',        // Make sure it doesn't block clicks
            animation: 'fadeOut 0.5s ease-out',
            transform: flipped ? 'scaleY(-1)' : 'none', // Flip the image if closest is 'yours-div'
          }}
        />
      )}

      <style jsx>{`
        @keyframes fadeOut {
          0% {
            opacity: 1;
          }
          100% {
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
