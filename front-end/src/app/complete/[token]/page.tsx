import { ActivateAccountForm } from "@/components/Auth/ActivateAccountForm";

export default async function CompletePage({
  params,
}: Readonly<{
  params: Promise<{ token: string }>;
}>) {
  const token = (await params).token;

  return (
    <main className={"flex flex-col justify-center gap-20"}>
      <h1 className="-mt-20 text-center text-4xl font-bold">
        Activeer je account
      </h1>

      <ActivateAccountForm token={token} />
    </main>
  );
}
