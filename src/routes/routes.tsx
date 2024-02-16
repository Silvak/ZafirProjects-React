import * as React from "react";
import { Grid, CardMedia, CircularProgress, Toolbar } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import Navbar from "@/components/navBar/navBar";
import NavbarDrawer from "@/components/navBar/navBarDrawer";
import AlertGlobal from "@/components/alert/alert";
import ModalGlobal from "@/components/modal/modal";


const Home = React.lazy(() => import("@/screens/home"));
const NotFoundPage = React.lazy(() => import("@/screens/notFoundPage"));


const MyTask = React.lazy(() => import ("@/screens/myTask"));
const Members = React.lazy(() => import ("@/screens/members"));
const SignIn = React.lazy(() => import ("@/screens/signIn"));
const SignUp = React.lazy(() => import ("@/screens/signUp"));
const Projects = React.lazy(() => import ("@/screens/projects"));


export default function Navigator() {
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
      {/* <Toolbar sx={{m:"10px"}} /> */}

      {/*Navbar secondary */}
      <NavbarDrawer>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/my-task" element={<MyTask />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/members" element={<Members />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </NavbarDrawer>

      {/*other tools */}
      <AlertGlobal />
      <ModalGlobal />
    </React.Suspense>
  );
}
