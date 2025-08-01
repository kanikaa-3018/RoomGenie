import { useEffect } from 'react';

const CustomCursor = () => {
  useEffect(() => {
    const cursor = document.getElementById('custom-cursor');

    const moveCursor = (e) => {
      if (cursor) {
        cursor.style.left = `${e.clientX}px`;
        cursor.style.top = `${e.clientY}px`;
      }
    };

    const enlarge = () => {
      if (cursor) {
        cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
        cursor.style.backgroundColor = '#4bffa5'; // hover color
      }
    };

    const shrink = () => {
      if (cursor) {
        cursor.style.transform = 'translate(-50%, -50%) scale(1)';
        cursor.style.backgroundColor = '#ff4b91'; // default color
      }
    };

    document.addEventListener('mousemove', moveCursor);
    document.querySelectorAll('button, a').forEach((el) => {
      el.addEventListener('mouseenter', enlarge);
      el.addEventListener('mouseleave', shrink);
    });

    document.body.style.cursor = 'none';

    return () => {
      document.removeEventListener('mousemove', moveCursor);
      document.querySelectorAll('button, a').forEach((el) => {
        el.removeEventListener('mouseenter', enlarge);
        el.removeEventListener('mouseleave', shrink);
      });
      document.body.style.cursor = 'default';
    };
  }, []);

  return (
    <div
      id="custom-cursor"
      style={{
        position: 'fixed',
        width: '20px',
        height: '20px',
        backgroundColor: '#ff4b91',
        borderRadius: '50%',
        pointerEvents: 'none',
        zIndex: 9999,
        transform: 'translate(-50%, -50%)',
        transition: 'transform 0.15s ease-out, background-color 0.2s',
      }}
    />
  );
};

export default CustomCursor;
