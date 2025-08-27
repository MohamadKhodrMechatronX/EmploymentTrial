import { storage } from "./storage";
import { getAccountInfo } from "./accountApi";
import { bootstrapFromAccountJson } from "./account";

export async function bootstrapApp() {
  const json = await getAccountInfo();
  await bootstrapFromAccountJson(json);
}

export async function setTokenAndBootstrap(authToken: string) {
  await storage.setAuthToken(authToken);
  await bootstrapApp();
}