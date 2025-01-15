"use client";

import { LeaveRequest as LeaveRequestType } from "@/lib/models/leaveRequest";
import clsx from "clsx";
import { useState } from "react";

interface Props {
  request: LeaveRequestType;
}

export function LeaveRequestDetails({ request }: Readonly<Props>) {
  const [open, setOpen] = useState(false);

  return (
    <div className={"space-y-2"}>
      <span className={clsx(open ? "block" : "hidden", "text-md")}>
        {request.reason}
      </span>

      <button
        className={"flex items-center text-sm opacity-50"}
        onClick={() => setOpen(!open)}
      >
        {open ? "Verberg" : "Toon"} reden
        {open ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 -960 960 960"
            height="20px"
            width="20px"
            fill="currentColor"
          >
            <path d="m480-538.85-189 189L253.85-387 480-613.15 706.15-387 669-349.85l-189-189Z" />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 -960 960 960"
            height="20px"
            width="20px"
            fill="currentColor"
          >
            <path d="M480-357.85 253.85-584 296-626.15l184 184 184-184L706.15-584 480-357.85Z" />
          </svg>
        )}
      </button>
    </div>
  );
}
