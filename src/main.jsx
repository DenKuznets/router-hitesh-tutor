import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Link,
  Outlet,
  useParams
} from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      {/* replace убирает путь myapps из истории, чтобы кнопка back (стрелка назад) браузера работала нормально и не возвращала нас с /learn на /myapps */}
      <Route path="/myapps" element={<Navigate replace to="/learn" />} />
      <Route path="/learn" element={<Learn />}>
        <Route path="courses" element={<Courses />}>
          <Route path=':courseid' element={<CourseId/>} />
        </Route>
        <Route path="bundles" element={<Bundles />} />
      </Route>
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
      <Outlet/>
    </div>
  );
}

function Courses() {
  return (
    <div>
      <h1>Courses list</h1>
      <h4>Courses card</h4>
      <Outlet/>
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
  const gg = useParams();
  console.log(gg);
  return (
    <div>
      <h1>URL Params is : { gg.courseid }</h1>
    </div>
  );
}
