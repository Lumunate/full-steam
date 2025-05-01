'use client';
import { Box } from '@mui/material';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import React, { useEffect, useRef } from 'react';

// Only register the plugin once, ideally in a top-level component or _app.js
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const ScrollingFadeOut = ({
  children,
  triggerStart = 'top  center',
  triggerEnd = '+=70%',
}: {
  children: React.ReactNode;
  triggerStart?: string;
  triggerEnd?: string;
}) => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: triggerStart,
        end: triggerEnd,
        scrub: true,
        pin: true,
        pinSpacing: false,
        onUpdate: (self) => {
          let opacity = 1;

          if (self.progress > 0.5) {
            opacity = gsap.utils.interpolate(1, 0, (self.progress - 0.5) * 2);
          }

          gsap.set(sectionRef.current, { opacity: opacity });
        },
      },
    });

    tl.to(
      sectionRef.current,
      {
        opacity: 0,
        duration: 0.5,
      },
      '<'
    );

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return <Box ref={sectionRef}>{children}</Box>;
};

export default ScrollingFadeOut;
