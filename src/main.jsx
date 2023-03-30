import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import {
  BrowserRouter as Router,
  // Routes - враппер в который нужно обернуть все маршруты
  Routes,
  //один путь ссылки
  Route,
  //
  Navigate,
  Link,
  Outlet,
  useParams,
  NavLink,
  useNavigate,
  useLocation,
} from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      {/* replace убирает путь myapps из истории, чтобы кнопка back (стрелка назад) браузера работала нормально и не возвращала нас с /learn на /myapps */}
      <Route path="/myapps" element={<Navigate replace to="/learn" />} />
      <Route path="/learn" element={<Learn />}>
        <Route path="courses" element={<Courses />}>
          <Route path=":courseid" element={<CourseId />} />
        </Route>
        <Route path="bundles" element={<Bundles />} />
      </Route>
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  </Router>
);

// в этом туториале функциональные компоненты не выносятся по разным файлам, для простоты понимания роутера. В нормальном проекте это были бы отдельные компоненты
function Home() {
  return (
    <div>
      <h1> Home route</h1>
    </div>
  );
}

function Learn() {
  return (
    <div>
      <h1>Learn</h1>
      <h4>All courses are listed here</h4>
      <Link className="btn btn-success" to="/learn/courses">
        courses
      </Link>{" "}
      |
      <Link className="btn btn-primary" to="/learn/bundles">
        bundle
      </Link>
      <Outlet />
    </div>
  );
}

function Courses() {
  const courseList = ["react", "angular", "vue", "nodejs"];
  const randomCourseName =
    courseList[Math.floor(Math.random() * courseList.length)];
  return (
    <div>
      <h1>Courses list</h1>
      <h4>Courses card</h4>
      <p>More test</p>
      <NavLink
        style={({ isActive }) => {
          return {
            backgroundColor: isActive ? "pink" : "yellow",
          };
        }}
        to={`/learn/courses/${randomCourseName}`}
      >
        {randomCourseName}
      </NavLink>
      <NavLink className="btn btn-light" to={`/learn/courses/tests`}>
        tests
      </NavLink>

      <Outlet />
    </div>
  );
}

function Bundles() {
  return (
    <div>
      <h1>Bundle list</h1>
      <h4>Budnle card</h4>
    </div>
  );
}

function CourseId() {
  // useParams передает динамическую часть ссылки которую мы указываем в Route с помощью двоеточия :
  const params = useParams();
  const navigate = useNavigate();
  return (
    <div>
      <h1>URL Params is : {params.courseid}</h1>
      {/* первый вариант передачи инфомарции по ссылке. С помоью хука navigate */}
      <button
        onClick={() => {
          navigate("/dashboard", { state: "399" });
        }}
        className="btn btn-warning"
      >
        Price
      </button>
      {/* Второй способ передачи информации по ссылке. С помощью <Link /> state параметр */}
      <Link to="/dashboard" state={"DJANGO"}>
        Test link
      </Link>
    </div>
  );
}

function Dashboard() {
  const location = useLocation();
  // console.log(location);
  return (
    <div>
      <h1>Info that i got here is : {location.state}</h1>
    </div>
  );
}
