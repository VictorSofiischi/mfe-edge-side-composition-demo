import { useLoaderData, type LoaderFunction } from "react-router";
import { fetchSharedBussiness } from "@repo/core";
import { SharedButton, SharedTypography } from "@repo/ui";
import { useState } from "react";

export const loader: LoaderFunction = async () => {
  const resp = await fetchSharedBussiness();

  return resp;
};

export default function Jurisdiction1Screen() {
  const data =
    useLoaderData<Awaited<ReturnType<typeof fetchSharedBussiness>>>();

  return (
    <div className="flex flex-col w-full items-center justify-center bg-red-[300]">
      <SharedTypography
        text={"This text come from shared route"}
        variant="subtitle"
      />
      <SharedTypography
        text={JSON.stringify(data, null, 2)}
        variant="subtitle"
      />
    </div>
  );
}
