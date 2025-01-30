import { Contract, getContracts } from "@/lib/models/contract";
import { Button } from "@headlessui/react";
import clsx from "clsx";
import Link from "next/link";

export default async function Contracts() {
  let contracts: Contract[] = await getContracts();

  return (
    <main className="flex flex-col items-center justify-center gap-10">
      <section>
        <Link
          key="create project"
          href="contracts/create"
          className={"rounded-sm p-3 hover:opacity-90"}
        >
          <Button
            type="submit"
            className={clsx(
              "w-full rounded-md bg-blue-500 px-4 py-2 text-white transition-colors hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
            )}
          >
            Create contract
          </Button>
        </Link>
      </section>

      <section className="space-y-5">
        {contracts.map((contract: Contract) => (
          <p className="flex items-center gap-2" key={contract.id}>
            {contract.name}
          </p>
        ))}
      </section>
    </main>
  );
}
