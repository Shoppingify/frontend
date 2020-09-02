import React from "react";
import { format } from "date-fns";

interface List {
  id?: number;
  name?: string;
  status?: string;
  created_at?: string;
}

function List({ list: { id, name, status, created_at } }: any) {
  const formattedDate = (date: any) => {
    return format(new Date(date), "iii d.M.yyyy ");
  };

  const statusColor = (status: any) => {
    switch (status) {
      case "active":
        return "primary";
      case "completed":
        return "secondary";
      case "canceled":
        return "danger";
      default:
        return "active";
    }
  };
  return (
    <div className="flex w-full p-4 shadow rounded-xl justify-between mb-8 bg-white">
      <div className="font-bold">{name}</div>
      {/* Icon */}
      <div className="flex items-center">
        <div className="mr-2">{formattedDate(created_at)}</div>
        <div
          className={`border rounded-xl border-${statusColor(
            status
          )} px-2 text-${statusColor(status)}`}
        >
          {status}
        </div>
      </div>
    </div>
  );
}

export default List;
