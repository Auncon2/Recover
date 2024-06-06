import notification from "../../common/Notification/Notification";

/* eslint-disable @typescript-eslint/no-explicit-any */
const asyncWrapper = async (cb: () => Promise<void>) => {
  try {
    await cb();
  } catch (err: any) {
    console.log({ err });
    if (err.error) {
      notification("error", err.error.data.message as string);
    } else {
      notification("error", "Something went wrong!" as string);
    }
  }
};

export default asyncWrapper;
