const ACCESS_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJrczY4MjhAc3JtaXN0LmVkdS5pbi5lZHUiLCJleHAiOjE3Nzc3MDI5NDAsImlhdCI6MTc3NzcwMjA0MCwiaXNzIjoiQWZmb3JkIE1lZGljYWwgVGVjaG5vbG9naWVzIFByaXZhdGUgTGltaXRlZCIsImp0aSI6IjNjZjFkMmViLTEyM2UtNGIwMC1hMGE5LWJlYWViOThhYzRlZiIsImxvY2FsZSI6ImVuLUlOIiwibmFtZSI6ImtvZGFkaGFsYSBzYW5qYXkiLCJzdWIiOiJjZGRlMWJiNS1lNmIyLTQ0NzQtYTU2NS00ZGE5YmU5NDdjNmIifSwiZW1haWwiOiJrczY4MjhAc3JtaXN0LmVkdS5pbi5lZHUiLCJuYW1lIjoia29kYWRoYWxhIHNhbmpheSIsInJvbGxObyI6InJhMjMxMTA1NjAxMDExNyIsImFjY2Vzc0NvZGUiOiJRa2JweEgiLCJjbGllbnRJRCI6ImNkZGUxYmI1LWU2YjItNDQ3NC1hNTY1LTRkYTliZTk0N2M2YiIsImNsaWVudFNlY3JldCI6InRUTWdnUXp1TWNCWmRIcGcifQ.GVmjubatS9CcfpiukYB7bKZfSabbrTpg-_Wna7WFblA";

const HEADERS = {
  "Content-Type": "application/json",
  "Authorization": `Bearer ${ACCESS_TOKEN}`
};

async function main() {
  const depotRes = await fetch("http://20.207.122.201/evaluation-service/depots", { headers: HEADERS });
  const depotData = await depotRes.json();
  console.log("DEPOT RESPONSE:");
  console.log(JSON.stringify(depotData, null, 2));

  const vehicleRes = await fetch("http://20.207.122.201/evaluation-service/vehicles", { headers: HEADERS });
  const vehicleData = await vehicleRes.json();
  console.log("\nVEHICLE RESPONSE:");
  console.log(JSON.stringify(vehicleData, null, 2));
}

main();