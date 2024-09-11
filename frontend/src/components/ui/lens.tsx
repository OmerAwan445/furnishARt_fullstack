"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import React from "react";

interface LensProps {
  image: string;
  mousePosition: { x: number; y: number };
  lensSize: number;
  zoomFactor: number;
  isHovering: boolean;
}

const Lens: React.FC<LensProps> = ({
  image,
  mousePosition,
  lensSize,
  zoomFactor,
  isHovering,
}) => {
  return (
    <AnimatePresence>
      {isHovering && (
        <motion.div
          initial={{ opacity: 0, scale: 0.58 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="absolute inset-0 overflow-hidden"
          style={{
            maskImage: `radial-gradient(circle ${lensSize / 2}px at ${
              mousePosition.x
            }px ${mousePosition.y}px, black 100%, transparent 100%)`,
            WebkitMaskImage: `radial-gradient(circle ${lensSize / 2}px at ${
              mousePosition.x
            }px ${mousePosition.y}px, black 100%, transparent 100%)`,
            transformOrigin: `${mousePosition.x}px ${mousePosition.y}px`,
            zIndex: 50,
          }}
        >
          <div
            style={{
              transform: `scale(${zoomFactor})`,
              transformOrigin: `${mousePosition.x}px ${mousePosition.y}px`,
            }}
          >
            <Image
            width={1000}
            height={1000}
              src={image}
              alt="Lens Image"
              style={{ width: "100%", height: "135px" }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Lens;
