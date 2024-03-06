const path = require("path");
const express = require("express");
const morgan = require("morgan");
const methodOverride = require("method-override");
const handlebars = require("express-handlebars");

const routes = require("./routes");
const db = require("./config/db/index");
const sortMiddleware = require("./app/middlewares/sortMiddleware");
const cookieParser = require("cookie-parser");

//connect to db
db.connect();
const app = express();
const port = 3000;

app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(methodOverride("_method"));
app.use(express.json());

app.use(sortMiddleware);

//HTTP logger
app.use(morgan("combined"));

//template engine
app.engine(
  "hbs",
  handlebars.engine({
    extname: ".hbs",
    helpers: {
      sum(a, b) {
        return a + b;
      },
      sortable(filed, sort) {
        const sortType = filed === sort.column ? sort.type : "default";
        const icons = {
          default: "bi-chevron-expand",
          asc: "bi-chevron-up",
          desc: "bi-chevron-down",
        };
        const types = {
          default: "desc",
          asc: "desc",
          desc: "asc",
        };
        const icon = icons[sortType];
        const type = types[sortType];
        return `<a href="?_sort&column=${filed}&type=${type}">
                  <i class="bi ${icon}"></i>
                </a>`;
      },
      countLessons(sections) {
        var count = 0;
        sections.forEach((section) => {
          count += section.lessons.length;
        });
        return count;
      },
    },
  })
);
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "resources", "views"));

//routers init
routes(app);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
