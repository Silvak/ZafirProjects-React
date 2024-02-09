import TaskOutlinedIcon from '@mui/icons-material/TaskOutlined';
import FolderCopyOutlinedIcon from '@mui/icons-material/FolderCopyOutlined';
import TimerOutlinedIcon from '@mui/icons-material/TimerOutlined';
import MultilineChartOutlinedIcon from '@mui/icons-material/MultilineChartOutlined';
import QuestionAnswerOutlinedIcon from '@mui/icons-material/QuestionAnswerOutlined';
import { SvgIcon } from "@mui/material";
import BrokenImageOutlinedIcon from '@mui/icons-material/BrokenImageOutlined';

export const items = [
    {
      title: 'Overview',
      path: '/',
      icon: (
        <SvgIcon fontSize="small">
          <BrokenImageOutlinedIcon />
        </SvgIcon>
      )
    },
    {
      title: 'My Tasks',
      path: '/tasks',
      icon: (
        <SvgIcon fontSize="small">
          <TaskOutlinedIcon />
        </SvgIcon>
      )
    },
    {
      title: 'Projects',
      path: '/projects',
      icon: (
        <SvgIcon fontSize="small">
           <FolderCopyOutlinedIcon sx={{ marginRight: 1.6, }} />
        </SvgIcon>
      )
    },
    {
      title: 'Time Tracker',
      path: '/tracker',
      icon: (
        <SvgIcon fontSize="small">
          <TimerOutlinedIcon />
        </SvgIcon>
      )
    },
    {
      title: 'Performance',
      path: '/performance',
      icon: (
        <SvgIcon fontSize="small">
          <MultilineChartOutlinedIcon />
        </SvgIcon>
      )
    },
    {
      title: 'Messages',
      path: '/messages',
      icon: (
        <SvgIcon fontSize="small">
          <QuestionAnswerOutlinedIcon />
        </SvgIcon>
      )
    }
  ];