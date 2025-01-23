"use client";

import {
  acceptLeaveRequest,
  denyLeaveRequest,
  LeaveRequest as LeaveRequestType,
} from "@/lib/models/leaveRequest";
import { useMutation } from "@tanstack/react-query";

interface Props {
  request: LeaveRequestType;
  expanded: boolean;
}

export function LeaveRequestActions({ request }: Readonly<Props>) {
  const {
    mutate: accept,
    isPending: isAccepting,
    error: acceptError,
    isSuccess: isAccepted,
  } = useMutation({
    mutationFn: async () => {
      await acceptLeaveRequest(request.id);
    },
  });

  const {
    mutate: deny,
    isPending: isDenying,
    error: denyError,
    isSuccess: isDenied,
  } = useMutation({
    mutationFn: async () => {
      await denyLeaveRequest(request.id);
    },
  });

  if (acceptError || denyError) {
    return <div>Er ging iets mis</div>;
  }
  if (isAccepted) {
    return <div>Verzoek geaccepteerd</div>;
  }
  if (isDenied) {
    return <div>Verzoek geweigerd</div>;
  }

  return (
    <div className="flex gap-2">
      <button
        onClick={() => accept()}
        disabled={isAccepting}
        className="rounded-md bg-green-500 px-4 py-2 text-white transition-colors hover:bg-green-600 disabled:opacity-50"
      >
        {isAccepting ? "Bezig..." : "Accepteer"}
      </button>
      <button
        onClick={() => deny()}
        disabled={isDenying}
        className="rounded-md bg-red-500 px-4 py-2 text-white transition-colors hover:bg-red-600 disabled:opacity-50"
      >
        {isDenying ? "Bezig..." : "Weiger"}
      </button>
    </div>
  );
}
