import { RegisterEmployeeForm } from "@/components/Admin/RegisterEmployee/RegisterEmployeeForm";

export default function Page() {
  // TODO get roles from backend
  const roles = [
    { name: "Admin", id: 1 },
    { name: "Employee", id: 2 },
  ];

  return (
    <main className="flex flex-col items-center justify-center gap-20">
      <h1 className={"text-center text-3xl font-semibold"}>
        Registreer nieuwe medewerker
      </h1>

      <RegisterEmployeeForm roles={roles} defaultRole={roles[1]} />
    </main>
  );
}
