const express = require("express");
const app = express();
const jsonParser = express.json();

const usersController = require("./controllers/usersController.js");

const userRouter = express.Router();

app.use(express.static(__dirname + "/public"));

userRouter.post("/postUser", jsonParser, usersController.postUser);

userRouter.get("/getUsers", usersController.getAllUsers);

userRouter.delete("/deleteUser:id", usersController.deleteUser);

userRouter.put("/updateUser", jsonParser, usersController.updateUser);

app.use("/", userRouter);


app.listen(3000);


