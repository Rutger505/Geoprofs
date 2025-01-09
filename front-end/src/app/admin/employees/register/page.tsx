import { RegisterEmployeeForm } from "@/components/Admin/RegisterEmployee/RegisterEmployeeForm";
import axios from "@/lib/axios";
import { Contract, getContracts } from "@/lib/models/contract";

interface ApiRolesResponse {
  roles: {
    id: number;
    name: string;
  }[];
}

interface Role {
  id: number;
  name: string;
}

export default async function Page() {
  let roles: Role[] | undefined;
  let defaultRole: Role | undefined;

  try {
    const { data } = await axios.get<ApiRolesResponse>("/roles/show");

    roles = data.roles;
    defaultRole = roles.find((role) => role.name === "Employee") ?? roles[0];
  } catch (error) {
    return (
      <main className="flex flex-col items-center justify-center gap-20">
        <p>Er is een fout opgetreden bij het ophalen van de rollen</p>
      </main>
    );
  }
  let contracts: Contract[] | undefined;
  try {
    contracts = await getContracts();
    console.log(contracts);
  } catch (error) {
    console.error(error);
    return (
      <main className="flex flex-col items-center justify-center gap-20">
        <p>Er is een fout opgetreden bij het ophalen van de contracten</p>
      </main>
    );
  }

  return (
    <main className="flex flex-col items-center justify-center gap-20">
      <h1 className={"text-center text-3xl font-semibold"}>
        Registreer nieuwe medewerker
      </h1>

      <RegisterEmployeeForm
        roles={roles}
        defaultRole={defaultRole}
        contracts={contracts}
      />
    </main>
  );
}
