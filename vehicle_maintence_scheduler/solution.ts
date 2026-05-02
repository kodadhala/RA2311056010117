const ACCESS_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJrczY4MjhAc3JtaXN0LmVkdS5pbi5lZHUiLCJleHAiOjE3Nzc3MDI5NDAsImlhdCI6MTc3NzcwMjA0MCwiaXNzIjoiQWZmb3JkIE1lZGljYWwgVGVjaG5vbG9naWVzIFByaXZhdGUgTGltaXRlZCIsImp0aSI6IjNjZjFkMmViLTEyM2UtNGIwMC1hMGE5LWJlYWViOThhYzRlZiIsImxvY2FsZSI6ImVuLUlOIiwibmFtZSI6ImtvZGFkaGFsYSBzYW5qYXkiLCJzdWIiOiJjZGRlMWJiNS1lNmIyLTQ0NzQtYTU2NS00ZGE5YmU5NDdjNmIifSwiZW1haWwiOiJrczY4MjhAc3JtaXN0LmVkdS5pbi5lZHUiLCJuYW1lIjoia29kYWRoYWxhIHNhbmpheSIsInJvbGxObyI6InJhMjMxMTA1NjAxMDExNyIsImFjY2Vzc0NvZGUiOiJRa2JweEgiLCJjbGllbnRJRCI6ImNkZGUxYmI1LWU2YjItNDQ3NC1hNTY1LTRkYTliZTk0N2M2YiIsImNsaWVudFNlY3JldCI6InRUTWdnUXp1TWNCWmRIcGcifQ.GVmjubatS9CcfpiukYB7bKZfSabbrTpg-_Wna7WFblA";

const HEADERS = {
  "Content-Type": "application/json",
  "Authorization": `Bearer ${ACCESS_TOKEN}`
};

interface Task {
  TaskID: string;
  Duration: number;
  Impact: number;
}

interface Depot {
  ID: number;
  MechanicHours: number;
}

function scheduleTask(tasks: Task[], budget: number): Task[] {
  const sorted = [...tasks].sort((a, b) => (b.Impact / b.Duration) - (a.Impact / a.Duration));
  const selected: Task[] = [];
  let used = 0;

  for (const task of sorted) {
    if (used + task.Duration <= budget) {
      selected.push(task);
      used += task.Duration;
    }
  }
  return selected;
}

async function main() {
  const depotRes = await fetch("http://20.207.122.201/evaluation-service/depots", { headers: HEADERS });
  const depotData = await depotRes.json();
  const depots: Depot[] = depotData.depots;

  const vehicleRes = await fetch("http://20.207.122.201/evaluation-service/vehicles", { headers: HEADERS });
  const vehicleData = await vehicleRes.json();
  const tasks: Task[] = vehicleData.vehicles;

  console.log(`Total Depots: ${depots.length}`);
  console.log(`Total Tasks: ${tasks.length}`);
  console.log("=".repeat(50));

  for (const depot of depots) {
    const selected = scheduleTask(tasks, depot.MechanicHours);
    const totalImpact = selected.reduce((sum, t) => sum + t.Impact, 0);
    const totalHours = selected.reduce((sum, t) => sum + t.Duration, 0);

    console.log(`\nDepot ${depot.ID} | Budget: ${depot.MechanicHours} hours`);
    console.log(`Selected ${selected.length} tasks | Hours Used: ${totalHours} | Total Impact: ${totalImpact}`);
    selected.forEach(t => {
      console.log(`  - Task ${t.TaskID} | Duration: ${t.Duration}h | Impact: ${t.Impact}`);
    });
  }
}

main();