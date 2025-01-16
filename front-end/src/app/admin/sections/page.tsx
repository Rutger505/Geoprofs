import Link from "next/link";

export default async function Sections() {
  return (
    <main className="flex flex-col items-center justify-center gap-10">
      <section>
        <Link
          key="create section"
          href="sections/create"
          className={"rounded-sm p-3 hover:opacity-90"}
        >
          Create section
        </Link>
      </section>
    </main>
  );
}
