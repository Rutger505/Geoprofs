import { ActivateAccountForm } from "@/components/Auth/ActivateAccountForm";
import { auth } from "@/lib/auth";
import { getPendingAccount } from "@/lib/authActions";
import { redirect } from "next/navigation";

export default async function CompletePage({
  params,
}: Readonly<{
  params: Promise<{ token: string }>;
}>) {
  const session = await auth();
  if (session) {
    redirect("/dashboard");
  }

  const token = (await params).token;

  let email: string | undefined;

  try {
    const user = await getPendingAccount(token);
    email = user.email;
  } catch (e) {
    console.error(e);
  }

  if (!email) {
    return (
      <main className={"flex flex-col justify-center gap-20"}>
        <p className={"text-center"}>Ongeldige token</p>
      </main>
    );
  }

  return (
    <main className={"flex flex-col justify-center gap-20"}>
      <h1 className="-mt-20 text-center text-4xl font-bold">
        Activeer je account
      </h1>

      <ActivateAccountForm token={token} email={email} />
    </main>
  );
}
