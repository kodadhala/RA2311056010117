const ACCESS_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJrczY4MjhAc3JtaXN0LmVkdS5pbi5lZHUiLCJleHAiOjE3Nzc3MDI5NDAsImlhdCI6MTc3NzcwMjA0MCwiaXNzIjoiQWZmb3JkIE1lZGljYWwgVGVjaG5vbG9naWVzIFByaXZhdGUgTGltaXRlZCIsImp0aSI6IjNjZjFkMmViLTEyM2UtNGIwMC1hMGE5LWJlYWViOThhYzRlZiIsImxvY2FsZSI6ImVuLUlOIiwibmFtZSI6ImtvZGFkaGFsYSBzYW5qYXkiLCJzdWIiOiJjZGRlMWJiNS1lNmIyLTQ0NzQtYTU2NS00ZGE5YmU5NDdjNmIifSwiZW1haWwiOiJrczY4MjhAc3JtaXN0LmVkdS5pbi5lZHUiLCJuYW1lIjoia29kYWRoYWxhIHNhbmpheSIsInJvbGxObyI6InJhMjMxMTA1NjAxMDExNyIsImFjY2Vzc0NvZGUiOiJRa2JweEgiLCJjbGllbnRJRCI6ImNkZGUxYmI1LWU2YjItNDQ3NC1hNTY1LTRkYTliZTk0N2M2YiIsImNsaWVudFNlY3JldCI6InRUTWdnUXp1TWNCWmRIcGcifQ.GVmjubatS9CcfpiukYB7bKZfSabbrTpg-_Wna7WFblA";

interface Notification {
  ID: string;
  Type: "Placement" | "Result" | "Event";
  Message: string;
  Timestamp: string;
}

function getTypeWeight(type: string): number {
  if (type === "Placement") return 3;
  if (type === "Result") return 2;
  return 1;
}

function getPriorityScore(notification: Notification): number {
  const typeWeight = getTypeWeight(notification.Type);
  const timestamp = new Date(notification.Timestamp).getTime();
  const now = Date.now();
  const ageInHours = (now - timestamp) / (1000 * 60 * 60);
  const recencyScore = Math.max(0, 1000 - ageInHours);
  return typeWeight * 1000 + recencyScore;
}

async function getTopNotifications(n: number = 10): Promise<void> {
  const response = await fetch(
    "http://20.207.122.201/evaluation-service/notifications",
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
    }
  );

  const data = await response.json();
  const notifications: Notification[] = data.notifications;

  const scored = notifications.map((n) => ({
    ...n,
    priorityScore: getPriorityScore(n),
  }));

  const top = scored
    .sort((a, b) => b.priorityScore - a.priorityScore)
    .slice(0, n);

  console.log(`\n🔔 Top ${n} Priority Notifications:`);
  console.log("=".repeat(60));
  top.forEach((n, i) => {
    console.log(`\n#${i + 1} [${n.Type}] ${n.Message}`);
    console.log(`    ID: ${n.ID}`);
    console.log(`    Timestamp: ${n.Timestamp}`);
    console.log(`    Priority Score: ${n.priorityScore.toFixed(2)}`);
  });
}

getTopNotifications(10);