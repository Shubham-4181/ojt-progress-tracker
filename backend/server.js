const path = require("path");

const Task = require("./models/Task");

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
  "/tasks",

  async (req, res) => {

    try {

      const tasks =
        await Task.find();

      res.json(tasks);

    }

    catch (err) {

      res.status(500).json({

        error: err.message

      });

    }

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

app.listen(8080, () => {

  console.log(
    "Server Running on Port 8080"
  );

});