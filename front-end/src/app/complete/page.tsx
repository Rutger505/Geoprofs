import { ActivateAccountForm } from "@/components/Auth/ActivateAccountForm";

export default function ActivatieAccount() {
  return (
    <main className={"flex flex-col justify-center gap-20"}>
      <h1 className="-mt-20 text-center text-4xl font-bold">
        Activeer je account
      </h1>

      <ActivateAccountForm />
    </main>
  );
}
