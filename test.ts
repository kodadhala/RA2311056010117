import { Log } from "./logging_middleware/index";

async function main() {
  await Log("backend", "info", "handler", "Testing log function");
  await Log("backend", "error", "db", "Database connection failed");
}

main();