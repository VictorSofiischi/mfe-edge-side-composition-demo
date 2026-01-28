import { useLoaderData, type LoaderFunction } from "react-router";
import { fetchOtherBussiness } from "@repo/core";
import { SharedButton, SharedTypography } from "@repo/ui";
import { useState } from "react";

export const loader: LoaderFunction = async () => {
  const resp = await fetchOtherBussiness();

  return resp;
};

export default function Jurisdiction2Screen() {
  const data = useLoaderData<Awaited<ReturnType<typeof fetchOtherBussiness>>>();
  const [count, setCount] = useState(0);

  return (
    <div className="flex flex-col w-full items-center justify-center bg-red-[300]">
      <SharedTypography
        text={"This text come from remote-2 route"}
        variant="body"
      />
      <SharedTypography text={JSON.stringify(data, null, 2)} variant="body" />
      <SharedButton
        variant="danger"
        onClick={() => setCount((prev) => prev + 1)}
      >
        {count}
      </SharedButton>
    </div>
  );
}
