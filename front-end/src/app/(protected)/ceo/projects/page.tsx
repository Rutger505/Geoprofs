import GroupChart from "@/components/Ceo/GroupChart";
import { auth } from "@/lib/auth";
import {
  getProjectsLeaves,
  ProjectWithUsersWithLeaves,
} from "@/lib/models/project";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  const session = await auth();
  if (!session) {
    redirect("/");
  }

  function mapGroupDataToChartItems(groupData: ProjectWithUsersWithLeaves[]) {
    return groupData.map((group, index) => ({
      leaveRequests: group.user.flatMap((user) => user.leave),
      group: group,
    }));
  }

  const projectsData = await getProjectsLeaves();

  return (
    <main className="flex flex-col items-center gap-14 py-20">
      <h1 className={"text-3xl font-semibold"}>Projecten</h1>

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
