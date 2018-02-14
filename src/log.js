/* eslint-disable no-console */
export const llog = (...msg) =>
  // () => msg;
  console.log(msg.join('::'));
