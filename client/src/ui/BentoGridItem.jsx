// src/components/ui/BentoGridItem.jsx
import React from "react";

export const BentoGridItem = ({
  className,
  title,
  description,
  header,
  icon,
}) => {
  return (
    <div
      className={`relative rounded-xl group/bento hover:shadow-xl transition duration-200 border p-4 bg-white dark:bg-black dark:border-white/[0.2] ${className}`}
    >
      <div className="absolute right-3 top-3 text-neutral-500 dark:text-neutral-400">
        {icon}
      </div>
      <div className="flex flex-col justify-between h-full w-full">
        <div className="font-sans text-neutral-600 dark:text-neutral-300 font-bold text-lg">
          {title}
        </div>
        <div className="font-sans text-neutral-600 dark:text-neutral-400 text-sm mt-2">
          {description}
        </div>
        <div className="mt-4">{header}</div>
      </div>
    </div>
  );
};
