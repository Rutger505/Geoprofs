import Link from "next/link";

export default async function Employees() {
  return (
    <main className="flex flex-col items-center justify-center gap-10">
      <h1 className={"text-center text-3xl font-semibold"}>Medewerkers</h1>
      <Link
        href={"/admin/employees/register"}
        className={"rounded bg-blue-500 px-3 py-2 text-white hover:opacity-90"}
      >
        Registreer nieuwe medewerker
      </Link>
    </main>
  );
}
