/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";

export const HomeView = () => {
  const trpc = useTRPC();
  const {data} = useQuery(trpc.hello.queryOptions({text: "from tRPC client"}));
  return (
    <div className="flex flex-col p-4 gap-y-4">
      {data ? <p>{data.greeting}</p> : <p>Loading...</p>}
    </div>
  );
}

