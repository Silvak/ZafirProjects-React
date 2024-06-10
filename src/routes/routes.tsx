import * as React from 'react';
import { useEffect } from 'react';
import { Grid, CardMedia, CircularProgress, Toolbar } from '@mui/material';
import { Route, Routes } from 'react-router-dom';
import Navbar from '@/components/navBar/navBar';
import NavbarDrawer from '@/components/navBar/navBarDrawer';
import AlertGlobal from '@/components/alert/alert';
import AlertGlobalError from '@/components/alert/alertError';
import ModalGlobal from '@/components/modal/modal';
import { storeUser } from '@/stores/user/storeUser';
import { useBoundStore } from '@/stores/index';
import { shallow } from 'zustand/shallow';

import { useNavigate } from 'react-router-dom';

const Home = React.lazy(() => import('@/screens/home'));
const NotFoundPage = React.lazy(() => import('@/screens/notFoundPage'));

const MyTask = React.lazy(() => import('@/screens/project/myTask'));
const Members = React.lazy(() => import('@/screens/members'));
const SignIn = React.lazy(() => import('@/screens/signIn'));
const SignUp = React.lazy(() => import('@/screens/signUp')); //"@/screens/project/Layout"
const Projects = React.lazy(() => import('@/screens/project/projects'));
const Layout = React.lazy(() => import('@/screens/project/layout'));
const Report = React.lazy(() => import('@/screens/project/report'));
const Gantt = React.lazy(() => import('@/screens/project/gantt'));
const Tasks = React.lazy(() => import('@/screens/project/tasks'));

const ListView = React.lazy(() => import('@/components/TasksViews/ListView'));
const TrelloView = React.lazy(
  () => import('@/components/TasksViews/TrelloView')
);
const GanttView = React.lazy(() => import('@/components/TasksViews/GanttView'));

export default function Navigator() {
  const { Authenticated } = useBoundStore((state: any) => state, shallow);
  // const { Authenticated } = storeUser();
  const navigate = useNavigate();

  let Logo = '';

  // useEffect(() => {
  //   if (!Authenticated) {
  //     navigate('/sign-in');
  //   } else {
  //     navigate('/');
  //   }
  // }, [Authenticated]);

  return (
    <React.Suspense
      fallback={
        <Grid
          container
          spacing={0}
          direction='column'
          alignItems='center'
          justifyContent='center'
          sx={{
            backgroundColor: 'common.tree',
            width: '100%',
            height: '100vh',
          }}
        >
          <CardMedia
            component='img'
            image={Logo}
            alt='Logo'
            sx={{
              width: { xs: 150, sm: 150, md: 200, lg: '497px', xl: 300 },
              objectFit: 'cover',
            }}
          />
          <CircularProgress
            style={{ color: '#C02327' }}
            sx={{ m: 2 }}
            size='68px'
          />
        </Grid>
      }
    >
      {/*Navbar primary */}
      {/* <Navbar /> */}
      {Authenticated ? (
        <NavbarDrawer>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/projects' element={<Projects />} />
            <Route path='/project/:id' element={<Layout />}>
              <Route path='tasks' element={<Tasks />}>
                <Route index element={<ListView />} />
                <Route index path='list' element={<ListView />} />
                <Route path='trello' element={<TrelloView />} />
                <Route path='gantt' element={<GanttView />} />
              </Route>
              <Route path='report' element={<Report />} />
              <Route path='gantt' element={<Gantt />} />
            </Route>

            <Route path='/members' element={<Members />} />
            <Route path='*' element={<NotFoundPage />} />
          </Routes>
        </NavbarDrawer>
      ) : (
        <Routes>
          <Route path='/sign-in' element={<SignIn />} />
          <Route path='/sign-up' element={<SignUp />} />
          <Route path='*' element={<NotFoundPage />} />
        </Routes>
      )}

      {/*other tools */}
      <AlertGlobal />
      <AlertGlobalError />
      <ModalGlobal />
    </React.Suspense>
  );
}
