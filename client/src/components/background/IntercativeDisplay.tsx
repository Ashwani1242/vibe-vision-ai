import { useEffect, useRef } from 'react';
import p5 from 'p5';
import sketch from './sketch';

const InteractiveDisplay = () => {
  const sketchRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const canvas = new p5(sketch, sketchRef.current!);

    return () => {
      canvas.remove();
    };
  }, []);

  return <div ref={sketchRef} className='absolute hidden md:block' />;
};

export default InteractiveDisplay;
