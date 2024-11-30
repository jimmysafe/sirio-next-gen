import { createServerActionProcedure } from "zsa";

function shapeErrors({ err }: any) {
  const isAllowedError = err instanceof Error;
  // let's all errors pass through to the UI so debugging locally is easier
  const isDev = process.env.NODE_ENV === "development";
  if (isAllowedError || isDev) {
    console.error(err);
    return {
      code: err.code ?? "ERROR",
      message: `${!isAllowedError && isDev ? "DEV ONLY ENABLED - " : ""}${err.message
        }`,
    };
  } else {
    return {
      code: "ERROR",
      message: "Something went wrong",
    };
  }
}

export const publicAction = createServerActionProcedure()
  .experimental_shapeError(shapeErrors)
  .handler(() => { })
