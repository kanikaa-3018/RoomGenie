import React from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-neutral-200 dark:border-neutral-800 px-4 py-6 text-sm text-neutral-600 dark:text-neutral-400">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
        <p className="text-center sm:text-left">
          Made with <span className="text-red-500">♥</span> by Team{" "}
          <strong>Runtime Terrors</strong>
        </p>
        <p className="text-center sm:text-right">
          © {currentYear} All rights reserved
        </p>
      </div>
    </footer>
  );
};

export default Footer;
