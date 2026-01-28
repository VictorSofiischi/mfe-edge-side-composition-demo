import { useLoaderData, type LoaderFunction } from "react-router";
import { fetchSomeBussiness } from "@repo/core";
import { SharedButton, SharedTypography } from "@repo/ui";
import { useState } from "react";

export const loader: LoaderFunction = async () => {
  const resp = await fetchSomeBussiness();

  return resp;
};

export default function Jurisdiction1Screen() {
  const data = useLoaderData<Awaited<ReturnType<typeof fetchSomeBussiness>>>();

  const [count, setCount] = useState(0);

  return (
    <div className="flex flex-col w-full items-center justify-center bg-red-[300]">
      <SharedTypography
        text={"This text come from remote-1 route"}
        variant="title"
      />
      <SharedTypography text={JSON.stringify(data, null, 2)} variant="title" />
      <SharedButton
        variant="primary"
        onClick={() => setCount((prev) => prev + 1)}
      >
        {count}
      </SharedButton>
    </div>
  );
}
