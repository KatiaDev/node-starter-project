// const http = require("http");

// const server = http.createServer((request, response) => {
//   if (request.url === "/") {
//     response.writeHead(200, { "Content-Type": "text/html" });

//     response.write("<html><body><h1>LPD1921 is the best!!!</h1></body></html>");

//     response.end();
//   } else {
//     response.end("Invalid response!!");
//   }
// });

// server.listen(4000);

// console.log("Server is running on port 4000...");
const express = require("express");
const shortid = require("shortid");

let courses = [
  {
    id: shortid.generate(),
    name: "React",
    teacher: "Ecaterina Popa",
  },
  {
    id: shortid.generate(),
    name: "Node",
    teacher: "Ecaterina Popa",
  },
  {
    id: shortid.generate(),
    name: "Java",
    teacher: "John Doe",
  },
  {
    id: shortid.generate(),
    name: "PHP",
    teacher: "Jane Doe",
  },
];

const server = express();
const PORT = 4000;

server.get("/", (req, res) => {
  res.send("<h1>Hello World!!</h1>");
});

server.get("/courses/:idCourse", (req, res) => {
  const { idCourse } = req.params;

  courses = courses.find((el) => {
    return el.id === idCourse;
  });
  res.status(200).json({ courses });
});

server.get("/courses", (req, res) => {
  res.json({ courses });
});

server.post("/courses", express.json(), (req, res) => {
  console.log("request", req.body);
  const shortid = require("shortid");
  courses.push({ ...req.body, id: shortid.generate() });

  res.status(201).json({ status: "Added successfully." });
});

server.put("/edit-course/:idCourse", express.json(), (req, res) => {
  const { idCourse } = req.params;

  courses = courses.map((el) => {
    if (el.id === idCourse) {
      return req.body;
    }

    return el;
  });
  res.status(200).json({ courses });
});

server.patch("/update-course/:idCourse", express.json(), (req, res) => {
  const { idCourse } = req.params;
  const updCourse = req.body;
  courses = courses.map((el) => {
    if (el.id === idCourse) {
      return {
        ...el,
        ...updCourse,
      };
    }

    return el;
  });
  res.status(200).json({ courses });
});

server.delete("/delete-course/:idCourse", (req, res) => {
  const { idCourse } = req.params;
  courses = courses.filter((el) => {
    return el.id !== idCourse;
  });
  res.status(200).json({ courses });
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}...`);
});
