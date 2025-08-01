import React from "react";
import { motion } from "framer-motion";

const ScoreSlider = ({ value, onChange, label }) => {
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium text-darkGray">
          Adjust your {label} score
        </span>
        <span className="text-sm font-bold text-primary">{value}%</span>
      </div>

      <div className="relative">
        <input
          type="range"
          min="0"
          max="100"
          value={value}
          onChange={(e) => onChange(parseInt(e.target.value))}
          className="w-full h-3 appearance-none rounded-full cursor-pointer slider"
          style={{
            background: `linear-gradient(to right, #a0522d 0%, #8b4513 ${value}%, #e5e7eb ${value}%, #e5e7eb 100%)`,
          }}
        />

        <motion.div
          className="absolute top-1/2 transform -translate-y-1/2 w-5 h-5 bg-[#8b4513] border-2 border-white rounded-full shadow-md pointer-events-none"
          style={{ left: `calc(${value}% - 10px)` }}
          whileHover={{ scale: 1.2 }}
        />
      </div>

      <div className="flex justify-between text-xs text-darkGray">
        <span>Low</span>
        <span>High</span>
      </div>
    </div>
  );
};

export default ScoreSlider;
