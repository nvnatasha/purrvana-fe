import { useEffect, useRef } from "react";
import gsap from "gsap";

const AnimatedCat = () => {
  const catRef = useRef();

  useEffect(() => {
    gsap.fromTo(catRef.current, { opacity: 0 }, { opacity: 1, duration: 1 });
  }, []);

  return <img ref={catRef} src="your-cat.gif" alt="cat" />;
}; 