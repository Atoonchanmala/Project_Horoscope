"use client";

import React from "react";
import { motion } from "framer-motion";
import { Check, AlertTriangle, Info, XCircle } from "lucide-react";

interface ToastProps {
  message: string;
  type?: "success" | "error" | "warning" | "info";
}

export const Toast: React.FC<ToastProps> = ({ message, type = "success" }) => {
  const iconConfig = {
    success: {
      bg: "bg-success-soft text-fg-success",
      Icon: Check,
    },
    error: {
      bg: "bg-red-100 text-red-600",
      Icon: XCircle,
    },
    warning: {
      bg: "bg-yellow-100 text-yellow-600",
      Icon: AlertTriangle,
    },
    info: {
      bg: "bg-blue-100 text-blue-600",
      Icon: Info,
    },
  };

  const { bg, Icon } = iconConfig[type];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.25 }}
      className="flex items-center w-full max-w-sm p-4 text-body bg-neutral-primary-soft rounded-base shadow-xs border border-default"
      role="alert"
    >
      <div
        className={`inline-flex items-center justify-center shrink-0 w-7 h-7 rounded ${bg}`}
      >
        <Icon className="w-5 h-5" />
      </div>

      <div className="ml-3 text-sm font-normal">{message}</div>
    </motion.div>
  );
};

export default Toast;
