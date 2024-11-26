import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex items-center justify-center">
      <div className={"text-center"}>
        <div className={"mb-10 flex gap-4"}>
          <h1 className="text-5xl font-bold">404</h1>

          <div className="h-50 w-px border-l-2 border-gray-300" />

          <h2 className="my-auto text-2xl font-semibold">Page Not Found</h2>
        </div>

        <Link href="/">Go back home</Link>
      </div>
    </div>
  );
}
