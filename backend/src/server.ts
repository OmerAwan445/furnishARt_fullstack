import { Express } from "express";

export const serverConfig = (app: Express, port: string) => {
  function start() {
    try {
      app.listen(port, () =>
        console.log(`Server is listening on port ${port}`),
      );
    } catch (error) {
      console.log(error);
    }
  }
  start();
};
