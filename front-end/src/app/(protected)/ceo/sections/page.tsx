import GroupChart from "@/components/Ceo/GroupChart";
import { auth } from "@/lib/auth";
import { mapGroupDataToChartItems } from "@/lib/models/group";
import { getSectionsLeaves } from "@/lib/models/section";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  const session = await auth();
  if (!session) {
    redirect("/");
  }

  const projectsData = await getSectionsLeaves();

  return (
    <main className="flex flex-col items-center gap-14 py-20">
      <h1 className={"text-3xl font-semibold"}>Afdelingen</h1>

      {mapGroupDataToChartItems(projectsData).map((groupData) => (
        <GroupChart
          key={groupData.group.id}
          leaveRequests={groupData.leaveRequests}
          label={groupData.group.name}
        />
      ))}
    </main>
  );
}
