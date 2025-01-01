import { RegisterEmployeeForm } from "@/components/Admin/RegisterEmployee/RegisterEmployeeForm";

export default function Page() {
  // TODO get roles from backend
  const roles = [
    { name: "Admin", id: 1 },
    { name: "Employee", id: 2 },
  ];

  return (
    <main className="flex items-center justify-center">
      <h1>Register employee</h1>

      <RegisterEmployeeForm roles={roles} defaultRole={roles[1]} />
    </main>
  );
}
