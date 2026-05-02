const LOG_API_URL = "http://20.207.122.201/evaluation-service/logs";
const ACCESS_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJrczY4MjhAc3JtaXN0LmVkdS5pbi5lZHUiLCJleHAiOjE3Nzc3MDA0MjIsImlhdCI6MTc3NzY5OTUyMiwiaXNzIjoiQWZmb3JkIE1lZGljYWwgVGVjaG5vbG9naWVzIFByaXZhdGUgTGltaXRlZCIsImp0aSI6IjNkNzNmNjUwLTEyMTQtNDI1Ni1hMWY3LTEwODdmYzg0NmRhYiIsImxvY2FsZSI6ImVuLUlOIiwibmFtZSI6ImtvZGFkaGFsYSBzYW5qYXkiLCJzdWIiOiJjZGRlMWJiNS1lNmIyLTQ0NzQtYTU2NS00ZGE5YmU5NDdjNmIifSwiZW1haWwiOiJrczY4MjhAc3JtaXN0LmVkdS5pbi5lZHUiLCJuYW1lIjoia29kYWRoYWxhIHNhbmpheSIsInJvbGxObyI6InJhMjMxMTA1NjAxMDExNyIsImFjY2Vzc0NvZGUiOiJRa2JweEgiLCJjbGllbnRJRCI6ImNkZGUxYmI1LWU2YjItNDQ3NC1hNTY1LTRkYTliZTk0N2M2YiIsImNsaWVudFNlY3JldCI6InRUTWdnUXp1TWNCWmRIcGcifQ.TdlFmvKWkEAozsB30PjB76Upk3Ou6Y39pFguQ_hsUIM";

type Stack = "backend" | "frontend";
type Level = "debug" | "info" | "warn" | "error" | "fatal";
type Package =
  | "cache" | "controller" | "cron_job" | "db" | "domain"
  | "handler" | "repository" | "route" | "service"
  | "api" | "component" | "hook" | "page" | "state" | "style"
  | "auth" | "config" | "middleware" | "utils";

export async function Log(
  stack: Stack,
  level: Level,
  pkg: Package,
  message: string
): Promise<void> {
  try {
    const response = await fetch(LOG_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${ACCESS_TOKEN}`
      },
      body: JSON.stringify({
        stack: stack,
        level: level,
        package: pkg,
        message: message
      })
    });

    const data = await response.json();
    console.log("✅ Log created! ID:", data.logID);
  } catch (error) {
    console.error("❌ Logging failed:", error);
  }
}