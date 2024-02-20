import * as React from "react";
import { Grid, CardMedia, CircularProgress, Toolbar } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import Navbar from "@/components/navBar/navBar";
import NavbarDrawer from "@/components/navBar/navBarDrawer";
import AlertGlobal from "@/components/alert/alert";
import ModalGlobal from "@/components/modal/modal";
import { storeUser } from "@/stores/user/storeUser";

const Home = React.lazy(() => import("@/screens/home"));
const NotFoundPage = React.lazy(() => import("@/screens/notFoundPage"));

const MyTask = React.lazy(() => import("@/screens/project/myTask"));
const Members = React.lazy(() => import("@/screens/members"));
const SignIn = React.lazy(() => import("@/screens/signIn"));
const SignUp = React.lazy(() => import("@/screens/signUp")); //"@/screens/project/Layout"
const Projects = React.lazy(() => import("@/screens/project/projects"));
const Layout = React.lazy(() => import("@/screens/project/layout"));

export default function Navigator() {
  const { Authenticated } = storeUser();
  let Logo = "";

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
          }}
        >
          <CardMedia
            component="img"
            image={Logo}
            alt="Logo"
            sx={{
              width: { xs: 150, sm: 150, md: 200, lg: "497px", xl: 300 },
              objectFit: "cover",
            }}
          />
          <CircularProgress
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
            <Route index element={<Home />} />

            <Route path="/project" element={<Projects />} />

            <Route path="/project/:id" element={<Layout />}>
              <Route index element={<MyTask />} />
              <Route path="tasks" element={<MyTask />} />
              <Route path="report" element={<>Report</>} />
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
      <ModalGlobal />
    </React.Suspense>
  );
}
