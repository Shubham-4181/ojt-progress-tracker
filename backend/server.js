const path = require("path");

const Task = require("./models/Task");

const User = require("./models/User");

const express = require("express");

const mongoose = require("mongoose");

const cors = require("cors");

const app = express();

app.use(cors());

app.use(express.json());

app.use(
  express.static(
    path.join(__dirname, "../")
  )
);

mongoose.connect(
  "mongodb://127.0.0.1:27017/ojtTracker"
)

.then(() => {

  console.log("MongoDB Connected");

})

.catch((err) => {

  console.log(err);

});

app.get("/", (req, res) => {

  res.sendFile(
    path.join(
      __dirname,
      "../index.html"
    )
  );

});

app.post(
  "/add-task",

  async (req, res) => {

    try {

      const newTask =
        new Task(req.body);

      await newTask.save();

      res.status(201).json({

        message:
          "Task Added Successfully"

      });

    }

    catch (err) {

      res.status(500).json({

        error: err.message

      });

    }

  }
);

app.get(
  "/tasks/:userId",

  async (req, res) => {

    const tasks =
      await Task.find({

        userId:
          req.params.userId

      });

    res.json(tasks);

  }
);

app.delete(
  "/delete-task/:id",

  async (req, res) => {

    try {

      await Task.findByIdAndDelete(
        req.params.id
      );

      res.json({

        message:
          "Task Deleted"

      });

    }

    catch (err) {

      res.status(500).json({

        error: err.message

      });

    }

  }
);

app.put(
  "/complete-task/:id",

  async (req, res) => {

    try {

      await Task.findByIdAndUpdate(

        req.params.id,

        {
          status:
            "Completed",

          completedAt:
            new Date()
        }

      );

      res.json({

        message:
          "Task Completed"

      });

    }

    catch (err) {

      res.status(500).json({

        error: err.message

      });

    }

  }
);

app.put(
  "/edit-task/:id",

  async (req, res) => {

    try {

      await Task.findByIdAndUpdate(

        req.params.id,

        req.body

      );

      res.json({

        message:
          "Task Updated"

      });

    }

    catch (err) {

      res.status(500).json({

        error: err.message

      });

    }

  }
);


app.post(
  "/register",

  async (req, res) => {

    const {
      name,
      email,
      password
    } = req.body;

    const existingUser =
      await User.findOne({

        email

      });

    if(existingUser){

      return res.json({

        message:
          "User Already Exists"

      });

    }

    const newUser =
      new User({

        name,
        email,
        password

      });

    await newUser.save();

    res.json({

      message:
        "Registration Successful"

    });

  }
);


app.post(
  "/login",

  async (req, res) => {

    const {
      email,
      password
    } = req.body;

    const user =
      await User.findOne({

        email,
        password

      });

    if(user){

      res.json({

        message:
          "Login Success",

        role:
          user.role,

        userId:
          user._id

      });

    }

    else{

      res.json({

        message:
          "Invalid Credentials"

      });

    }

  }
);

app.listen(8080, () => {

  console.log(
    "Server Running on Port 8080"
  );

});