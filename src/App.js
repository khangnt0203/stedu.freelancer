import "./App.css";
import Aos from "aos";
import "aos/dist/aos.css";
import NavBar from "./components/layout/NavBar";
import FootNav from "./components/layout/FootNav";

import HomePage from "./components/home";
import Course from "./components/course";
import Login from "./components/authorize/Login";
import DetailCourse from "./components/course/DetailCourse";
import ShoppingCart from "./components/cart";
import AboutUs from "./components/aboutUs";
import SUStudent from "./components/authorize/SUStudent";
import SUTeacher from "./components/authorize/SUTeacher";
import ChatBox from "./components/chat/Chat";

import { ThemeProvider, createTheme } from "@mui/material";
import MyProfile from "./components/profile";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PrivateRoute from "./utils/private";
import AdminPage from "./components/admin";
import TutorCourse from "./components/course/TutorCourse";
import NewCourse from "./components/course/TutorCourse/NewCourse.js";
import EditCourse from "./components/course/TutorCourse/EditCourse";
import StudentCourse from "./components/course/StudentCourse";

function App() {
  Aos.init({
    duration: 1500,
    offset: 0,
  });

  const theme = createTheme({ typography: { fontFamily: "Overpass" } });
  return (
    <ThemeProvider theme={theme}>
      <NavBar />
      <BrowserRouter>
        <Routes>
          <Route path={"/"} exact={true} element={<HomePage />} />

          <Route path={"/course"} exact={true} element={<Course />} />

          <Route
            path={"/course/:idCourse"}
            element={
              <div className="max-w-[1240px] flex  justify-center mx-auto py-4">
                <DetailCourse />
              </div>
            }
          />
          <Route
            path={"/course/:idCourse/my-course"}
            element={
              <div className="max-w-[1240px] flex  justify-center mx-auto py-4">
                <DetailCourse />
              </div>
            }
          />

          <Route path={"/login"} exact={true} element={<Login />} />

          <Route path={"/sign-up-tutor"} exact={true} element={<SUTeacher />} />

          <Route
            path={"/sign-up-student"}
            exact={true}
            element={<SUStudent />}
          />

          <Route path={"/about-us"} exact={true} element={<AboutUs />} />

          {/* authen -> cho truy cập ---redux hardcode--- */}
          <Route element={<PrivateRoute />}>
            <Route path={"/chat"} exact={true} element={<ChatBox />} />

            <Route path={"/my-profile"} exact={true} element={<MyProfile />} />
            <Route path={"/admin"} exact={true} element={<AdminPage />} />
            <Route
              path={"/tutor/my-course"}
              exact={true}
              element={<TutorCourse />}
            />
            <Route
              path={"/tutor/new-course"}
              exact={true}
              element={<NewCourse />}
            />
            <Route
              path={"/tutor/course/:id/edit"}
              exact={true}
              element={<EditCourse />}
            />
            <Route
              path={"/student/my-course"}
              exact={true}
              element={<StudentCourse />}
            />
            <Route path={"/cart"} exact={true} element={<ShoppingCart />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <FootNav />
    </ThemeProvider>
  );
}

export default App;
