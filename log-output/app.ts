import { randomBytes } from "node:crypto";

const randomString: string = randomBytes(12).toString("hex");

export type Status = {
  timestamp: string;
  randomString: string;
};

export const getStatus = (): Status => ({
  timestamp: new Date().toISOString(),
  randomString,
});
