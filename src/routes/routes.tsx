import AlertGlobal from "@/components/alert/alert";
import AlertGlobalError from "@/components/alert/alertError";
import ModalGlobal from "@/components/modal/modal";
import NavbarDrawer from "@/components/navBar/navBarDrawer";
import { useBoundStore } from "@/stores/index";
import { CardMedia, CircularProgress, Grid } from "@mui/material";
import * as React from "react";
import { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { shallow } from "zustand/shallow";
import AlertGlobal from "@/components/alert/alert";
import AlertGlobalError from "@/components/alert/alertError";
import ModalGlobal from "@/components/modal/modal";
import NavbarDrawer from "@/components/navBar/navBarDrawer";
import { useBoundStore } from "@/stores/index";
import { CardMedia, CircularProgress, Grid } from "@mui/material";
import * as React from "react";
import { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { shallow } from "zustand/shallow";

const Home = React.lazy(() => import("@/screens/home"));
const NotFoundPage = React.lazy(() => import("@/screens/notFoundPage"));
const Home = React.lazy(() => import("@/screens/home"));
const NotFoundPage = React.lazy(() => import("@/screens/notFoundPage"));

const MyTaskMain = React.lazy(() => import("@/screens/MyTasks/MyTaskMain"));
const MainTasksView = React.lazy(
  () => import("@/screens/MyTasks/MainTasksView")
);
const MyTaskView = React.lazy(() => import("@/screens/project/MyTaskView"));
const Members = React.lazy(() => import("@/screens/members"));
const SignIn = React.lazy(() => import("@/screens/signIn"));
const SignUp = React.lazy(() => import("@/screens/signUp")); //"@/screens/project/Layout"
const Projects = React.lazy(() => import("@/screens/project/projects"));
const Layout = React.lazy(() => import("@/screens/project/layout"));
const Report = React.lazy(() => import("@/screens/project/report"));
const Gantt = React.lazy(() => import("@/screens/project/gantt"));
const Tasks = React.lazy(() => import("@/screens/project/tasks"));

const ListView = React.lazy(() => import("@/components/TasksViews/ListView"));
const ListView = React.lazy(() => import("@/components/TasksViews/ListView"));
const TrelloView = React.lazy(
  () => import("@/components/TasksViews/TrelloView")
  () => import("@/components/TasksViews/TrelloView")
);
const GanttView = React.lazy(() => import("@/components/TasksViews/GanttView"));
const GanttView = React.lazy(() => import("@/components/TasksViews/GanttView"));

export default function Navigator() {
  const { Authenticated } = useBoundStore((state: any) => state, shallow);

  let Logo = "";
  let Logo = "";

  const navigate = useNavigate();

  useEffect(() => {
    // Verificar si esta es la primera vez que se carga la aplicación
    const firstVisit = sessionStorage.getItem("firstVisit");
    const firstVisit = sessionStorage.getItem("firstVisit");

    if (!firstVisit && Authenticated) {
      // Si es la primera vez, redirigir a la raíz y marcar que es la primera vez
      sessionStorage.setItem("firstVisit", "true");
      navigate("/");
      sessionStorage.setItem("firstVisit", "true");
      navigate("/");
    } else if (firstVisit && !Authenticated) {
      sessionStorage.removeItem("firstVisit");
      navigate("/sign-in");
      sessionStorage.removeItem("firstVisit");
      navigate("/sign-in");
    } else if (!firstVisit && !Authenticated) {
      sessionStorage.removeItem("firstVisit");
      navigate("/sign-in");
      sessionStorage.removeItem("firstVisit");
      navigate("/sign-in");
    }
  }, [Authenticated]);

  return (
    <React.Suspense
      fallback={
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justifyContent="center"
          sx={{
            backgroundColor: "common.tree",
            width: "100%",
            height: "100vh",
            backgroundColor: "common.tree",
            width: "100%",
            height: "100vh",
          }}
        >
          <CardMedia
            component="img"
            image={Logo}
            alt="Logo"
            sx={{
              width: { xs: 150, sm: 150, md: 200, lg: "497px", xl: 300 },
              objectFit: "cover",
              width: { xs: 150, sm: 150, md: 200, lg: "497px", xl: 300 },
              objectFit: "cover",
            }}
          />
          <CircularProgress
            style={{ color: "#C02327" }}
            style={{ color: "#C02327" }}
            sx={{ m: 2 }}
            size="68px"
          />
        </Grid>
      }
    >
      {/*Navbar primary */}
      {/* <Navbar /> */}
      {Authenticated ? (
        <NavbarDrawer>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/project/:id" element={<Layout />}>
              <Route path="tasks" element={<Tasks />}>
                <Route index element={<ListView />} />
                <Route index path="list" element={<ListView />} />
                <Route path="trello" element={<TrelloView />} />
                <Route path="gantt" element={<GanttView />} />
              </Route>
              <Route path="MyTasks" element={<MyTaskMain />}>
                <Route index element={<MainTasksView />} />
              </Route>
              <Route path="report" element={<Report />} />
              <Route path="gantt" element={<Gantt />} />
            </Route>

            <Route path="/members" element={<Members />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </NavbarDrawer>
      ) : (
        <Routes>
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      )}

      {/*other tools */}
      <AlertGlobal />
      <AlertGlobalError />
      <ModalGlobal />
    </React.Suspense>
  );
}
