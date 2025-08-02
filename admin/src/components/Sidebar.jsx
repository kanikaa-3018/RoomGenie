import React, { useState } from "react";
import {
  FiChevronsRight,
  FiHome,
  FiMonitor,
  FiTag,
  FiUsers,
} from "react-icons/fi";
import { motion } from "framer-motion";

const Sidebar = ({ currentView, setCurrentView }) => {
  const [open, setOpen] = useState(true);
  const selected = currentView || "Dashboard";
  const setSelected = setCurrentView || (() => {});

  return (
    <motion.nav
      layout
      className="sticky top-0 h-screen shrink-0 border-r border-slate-300 bg-white p-2"
      style={{
        width: open ? "225px" : "fit-content",
      }}
    >
      <TitleSection open={open} />

      <div className="space-y-1">
        <Option
          Icon={FiHome}
          title="Dashboard"
          onClick={() => setSelected('dashboard')}
          selected={selected === 'dashboard' || selected === 'Dashboard'}
          {...{ open }}
        />
        <Option
          Icon={FiUsers}
          title="Room Match Requests"
          onClick={() => setSelected('matches')}
          selected={selected === 'matches' || selected === 'Room Match Requests'}
          {...{ open }}
        />
        <Option
          Icon={FiMonitor}
          title="Rooms"
          onClick={() => setSelected('rooms')}
          selected={selected === 'rooms' || selected === 'Rooms'}
          {...{ open }}
        />
        <Option
          Icon={FiTag}
          title="Complaints"
          onClick={() => setSelected('complaints')}
          selected={selected === 'complaints' || selected === 'Complaints'}
          {...{ open }}
        />
      </div>

      <ToggleClose open={open} setOpen={setOpen} />
    </motion.nav>
  );
};

const Option = ({ Icon, title, selected, open, onClick, notifs }) => {
  const isSelected = selected === true || selected === title;
  
  return (
    <motion.button
      layout
      onClick={onClick}
      className={`relative flex h-10 w-full items-center rounded-md transition-colors ${
        isSelected
          ? "bg-indigo-100 text-indigo-800"
          : "text-slate-500 hover:bg-slate-100"
      }`}
    >
      <motion.div
        layout
        className="grid h-full w-10 place-content-center text-lg"
      >
        {React.createElement(Icon)}
      </motion.div>
      {open && (
        <motion.span
          layout
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.125 }}
          className="text-xs font-medium"
        >
          {title}
        </motion.span>
      )}

      {notifs && open && (
        <motion.span
          initial={{ scale: 0, opacity: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          style={{ y: "-50%" }}
          transition={{ delay: 0.5 }}
          className="absolute right-2 top-1/2 size-4 rounded bg-indigo-500 text-xs text-white"
        >
          {notifs}
        </motion.span>
      )}
    </motion.button>
  );
};

const TitleSection = ({ open }) => {
  return (
    <div className="mb-3 border-b border-slate-300 pb-3">
      <div className="flex cursor-pointer items-center justify-between rounded-md transition-colors hover:bg-slate-100">
        <div className="flex items-center gap-2">
          <Logo />
          {open && (
            <motion.div
              layout
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.125 }}
            >
              <span className="block text-xs font-semibold">Hello, Admin</span>
              <span className="block text-xs text-slate-500">
                How are you today?
              </span>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

const Logo = () => {
  return (
    <motion.div
      layout
      className="grid size-10 shrink-0 place-content-center rounded-md bg-indigo-600"
    >
      <svg
        width="24"
        height="auto"
        viewBox="0 0 50 39"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="fill-slate-50"
      >
        <path d="M16.4992 2H37.5808L22.0816 24.9729H1L16.4992 2Z"></path>
        <path d="M17.4224 27.102L11.4192 36H33.5008L49 13.0271H32.7024L23.2064 27.102H17.4224Z"></path>
      </svg>
    </motion.div>
  );
};

const ToggleClose = ({ open, setOpen }) => {
  return (
    <motion.button
      layout
      onClick={() => setOpen((prev) => !prev)}
      className="absolute bottom-0 left-0 right-0 border-t border-slate-300 transition-colors hover:bg-slate-100"
    >
      <div className="flex items-center p-2">
        <motion.div
          layout
          className="grid size-10 place-content-center text-lg"
        >
          <FiChevronsRight
            className={`transition-transform ${open && "rotate-180"}`}
          />
        </motion.div>
        {open && (
          <motion.span
            layout
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.125 }}
            className="text-xs font-medium"
          >
            Hide
          </motion.span>
        )}
      </div>
    </motion.button>
  );
};

export default Sidebar;
