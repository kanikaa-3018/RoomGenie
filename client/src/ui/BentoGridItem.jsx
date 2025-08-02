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
      className={`relative rounded-2xl group/bento border p-5 shadow-sm bg-white dark:bg-neutral-900 dark:border-neutral-700 transition duration-200 hover:shadow-md ${className}`}
    >
      <div className="flex flex-col h-full justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300">
            {icon}
          </div>
          <h3 className="text-lg font-semibold text-neutral-800 dark:text-neutral-100">
            {title}
          </h3>
        </div>

        <p className="mt-3 text-sm text-neutral-600 dark:text-neutral-400">
          {description}
        </p>

        <div className="mt-4">{header}</div>
      </div>
    </div>
  );
};
