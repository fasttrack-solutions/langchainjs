import { awaitAllCallbacks } from "../src/callbacks/promises.js";

afterAll(async () => {
  // Fake timers leave the tracing client's flush waiting, which hangs this hook.
  jest.useRealTimers();
  await awaitAllCallbacks();
});
