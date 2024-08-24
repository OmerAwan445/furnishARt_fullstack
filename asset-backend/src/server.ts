import { Express } from "express";

export const serverConfig = (app: Express, port= "3002") => {
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
