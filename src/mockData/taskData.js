import photo from '../assets/Img/png/userImageMan.png';
import photow from '../assets/Img/png/userImageWoman.png';

export const mockTasks = [
  {
    id: crypto.randomUUID(),
    task: 'Home screen interaction',
    appDesign: 'Peceland App Design',
    profilePhoto: photo,
    notification: 1,
    attachments: ['file1.pdf', 'image1.jpg'],
    date: 'Today',
    progress: 50,
    status: 'Working',
    assignees: [
      {
        name: 'John',
        profile: photo,
      },
    ],
    priority: 'High',
    screen: null,
  },
  {
    id: crypto.randomUUID(),
    task: 'My profile page',
    appDesign: 'Peceland App Design',
    profilePhoto: photow,
    notification: 2,
    attachments: ['file2.docx', 'image2.png'],
    date: 'Oct 2, 2022',
    progress: 50,
    status: 'Working',
    assignees: [
      {
        name: 'Alice',
        profile: photow,
      },
      {
        name: 'Adrian',
        profile: photo,
      },
    ],
    priority: 'High',
    screen:
      'https://res.cloudinary.com/dgdcfmnnx/image/upload/v1707754534/wwdhjjme5wixbr7z0hav.webp',
  },
  {
    id: crypto.randomUUID(),
    task: 'Notification',
    appDesign: 'Peceland App Design',
    profilePhoto: photo,
    notification: 1,
    attachments: [],
    date: 'Today',
    progress: 50,
    status: 'Completed',
    assignees: [
      {
        name: 'Bob',
        profile: photo,
      },
      {
        name: 'Julie',
        profile: photow,
      },
    ],
    priority: 'Medium',
    screen: null,
  },
  {
    id: crypto.randomUUID(),
    task: 'Product detail page',
    appDesign: 'Peceland App Design',
    profilePhoto: photow,
    notification: 4,
    attachments: ['file3.xlsx'],
    date: 'Oct 3 - 4, 2023',
    progress: 50,
    status: 'Working',
    assignees: [
      {
        name: 'Frank',
        profile: photo,
      },
      {
        name: 'Charlie',
        profile: photow,
      },
    ],
    priority: 'Low',
    screen: null,
  },
  {
    id: crypto.randomUUID(),
    task: 'Help',
    appDesign: 'Peceland App Design',
    profilePhoto: photow,
    notification: 0,
    attachments: ['image3.jpg'],
    date: 'Today',
    progress: 50,
    status: 'Working',
    assignees: [
      {
        name: 'David',
        profile: photow,
      },
    ],
    priority: 'Low',
    screen: null,
  },
  {
    id: crypto.randomUUID(),
    task: 'Settings page',
    appDesign: 'Peceland App Design',
    profilePhoto: photow,
    notification: 0,
    attachments: ['file1.docx'],
    date: 'Oct 1 - 4, 2022',
    progress: 50,
    status: 'Pending',
    assignees: [
      {
        name: 'Eva',
        profile: photow,
      },
      {
        name: 'Frank',
        profile: photo,
      },
    ],
    priority: 'Low',
    screen: null,
  },
  {
    id: crypto.randomUUID(),
    task: 'New feature development',
    appDesign: 'Peceland App Design',
    profilePhoto: photo,
    notification: 0,
    attachments: [],
    date: 'Future',
    progress: 50,
    status: 'Completed',
    assignees: [
      {
        name: 'Frank',
        profile: photo,
      },
    ],
    priority: 'Medium',
    screen: null,
  },
  {
    id: crypto.randomUUID(),
    task: 'Performance optimization',
    appDesign: 'Peceland App Design',
    profilePhoto: photow,
    notification: 0,
    attachments: [],
    date: 'Future',
    progress: 50,
    status: 'Completed',
    assignees: [
      {
        name: 'Grace',
        profile: photow,
      },
      {
        name: 'Henry',
        profile: photo,
      },
    ],
    priority: 'Medium',
    screen: null,
  },
  {
    id: crypto.randomUUID(),
    task: 'Settings page',
    appDesign: 'Peceland App Design',
    profilePhoto: photo,
    notification: 1,
    attachments: ['file1.pdf'],
    date: 'Oct 1 - 4, 2022',
    progress: 50,
    status: 'Pending',
    assignees: [
      {
        name: 'Henry',
        profile: photo,
      },
    ],
    priority: 'Low',
  },
  {
    id: crypto.randomUUID(),
    task: 'Settings page',
    appDesign: 'Peceland App Design',
    profilePhoto: photow,
    notification: 0,
    attachments: ['file1.docx'],
    date: 'Oct 1 - 4, 2022',
    progress: 50,
    status: 'Pending',
    assignees: [
      {
        name: 'Isabel',
        profile: photow,
      },
    ],
    priority: 'Low',
  },
];

//______________________________   task gantt _____________________________________
export const mockTasksGantt = [
  {
    id: 'Task-1',
    task: 'Home screen interaction',
    appDesign: 'Peceland App Design',
    profilePhoto: photo,
    notification: 1,
    attachments: ['file1.pdf', 'image1.jpg'],
    date: {
      start: '2-18-2024',
      end: '2-24-2024',
    },
    progress: 75,
    status: 'Working',
    assignees: [
      {
        name: 'John',
        profile: photo,
      },
    ],
    priority: 'High',
    screen: null,
    styles: {
      color: '#459CED',
    },
  },
  {
    id: 'Task-2',
    task: 'My profile page',
    appDesign: 'Peceland App Design',
    profilePhoto: photow,
    notification: 2,
    attachments: ['file2.docx', 'image2.png'],
    date: {
      start: '2-21-2024',
      end: '2-24-2024',
    },
    progress: 50,
    status: 'Working',
    assignees: [
      {
        name: 'Alice',
        profile: photow,
      },
      {
        name: 'Adrian',
        profile: photo,
      },
    ],
    priority: 'High',
    screen:
      'https://res.cloudinary.com/dgdcfmnnx/image/upload/v1707754534/wwdhjjme5wixbr7z0hav.webp',

    styles: {
      color: '#E55D57',
    },
  },
  {
    id: 'Task-3',
    task: 'Notification',
    appDesign: 'Peceland App Design',
    profilePhoto: photo,
    notification: 1,
    attachments: [],
    date: {
      start: '2-22-2024',
      end: '2-26-2024',
    },
    progress: 90,
    status: 'Completed',
    assignees: [
      {
        name: 'Bob',
        profile: photo,
      },
      {
        name: 'Julie',
        profile: photow,
      },
    ],
    priority: 'Medium',
    screen: null,
    styles: {
      color: '#6B6E75',
    },
  },
  {
    id: 'Task-4',
    task: 'Product detail page',
    appDesign: 'Peceland App Design',
    profilePhoto: photow,
    notification: 4,
    attachments: ['file3.xlsx'],
    date: {
      start: '2-25-2024',
      end: '3-02-2024',
    },
    progress: 60,
    status: 'Working',
    assignees: [
      {
        name: 'Frank',
        profile: photo,
      },
      {
        name: 'Charlie',
        profile: photow,
      },
    ],
    priority: 'Low',
    screen: null,
    styles: {
      color: '#A0C9C0',
    },
  },
  {
    id: 'Task-5',
    task: 'Help',
    appDesign: 'Peceland App Design',
    profilePhoto: photow,
    notification: 0,
    attachments: ['image3.jpg'],
    date: {
      start: '2-20-2024',
      end: '3-2-2024',
    },
    progress: 80,
    status: 'Working',
    assignees: [
      {
        name: 'David',
        profile: photow,
      },
    ],
    priority: 'Low',
    screen: null,
    styles: {
      color: '#E55D57',
    },
  },
  {
    id: 'Task-6',
    task: 'Settings page',
    appDesign: 'Peceland App Design',
    profilePhoto: photow,
    notification: 0,
    attachments: ['file1.docx'],
    date: {
      start: '2-24-2024',
      end: '3-20-2024',
    },
    progress: 20,
    status: 'Pending',
    assignees: [
      {
        name: 'Eva',
        profile: photow,
      },
      {
        name: 'Frank',
        profile: photo,
      },
    ],
    priority: 'Low',
    screen: null,
    styles: {
      color: '#EBA741',
    },
  },
  {
    id: 'Task-7',
    task: 'New feature development',
    appDesign: 'Peceland App Design',
    profilePhoto: photo,
    notification: 0,
    attachments: [],
    date: {
      start: '3-10-2024',
      end: '3-24-2024',
    },
    progress: 50,
    status: 'Completed',
    assignees: [
      {
        name: 'Frank',
        profile: photo,
      },
    ],
    priority: 'Medium',
    screen: null,
    styles: {
      color: '#E55D57',
    },
  },
  {
    id: 'Task-8',
    task: 'Performance optimization',
    appDesign: 'Peceland App Design',
    profilePhoto: photow,
    notification: 0,
    attachments: [],
    date: {
      start: '2-24-2024',
      end: '3-2-2024',
    },
    progress: 50,
    status: 'Completed',
    assignees: [
      {
        name: 'Grace',
        profile: photow,
      },
      {
        name: 'Henry',
        profile: photo,
      },
    ],
    priority: 'Medium',
    screen: null,
    styles: {
      color: '#EBA741',
    },
  },
  {
    id: 'Task-9',
    task: 'Settings page',
    appDesign: 'Peceland App Design',
    profilePhoto: photo,
    notification: 1,
    attachments: ['file1.pdf'],
    date: {
      start: '2-22-2024',
      end: '3-24-2024',
    },
    progress: 50,
    status: 'Pending',
    assignees: [
      {
        name: 'Henry',
        profile: photo,
      },
    ],
    priority: 'Low',
    styles: {
      color: '#459CED',
    },
  },
  {
    id: 'Task-10',
    task: 'Settings page',
    appDesign: 'Peceland App Design',
    profilePhoto: photow,
    notification: 0,
    attachments: ['file1.docx'],
    date: {
      start: '2-1-2024',
      end: '4-30-2024',
    },
    progress: 50,
    status: 'Pending',
    assignees: [
      {
        name: 'Isabel',
        profile: photow,
      },
    ],
    priority: 'Low',
    styles: {
      color: '#A0C9C0',
    },
  },
];

export const taskDetailData = {
  id: 'Task-11',
  task: 'Home screen interaction',
  appDesign: 'Peceland App Design',
  profilePhoto: photo,
  notification: 1,
  attachments: ['file1.pdf', 'image1.jpg'],
  date: 'Oct - 1, 2024',
  progress: 2,
  status: 'Working',
  assignees: [
    {
      id: 1,
      name: 'Franco',
      profilePhoto: photo,
    },
    {
      id: 2,
      name: 'Maria',
      profilePhoto: photow,
    },
  ],
  priority: 'High',
  screen: null,
};

export const subsTasksData = [
  {
    id: 1,
    task: 'Substasks 1',
    assignees: {
      name: 'Juan',
      profilePhoto: photo,
    },
    progress: 50,
    status: 'In Progress',
    date: 'Nov. 2, 2024',
    priority: 'Low',
  },
  {
    id: 2,
    task: 'Substasks 2',
    assignees: {
      name: 'María',
      profilePhoto: photow,
    },
    progress: 50,
    status: 'Completed',
    date: 'Nov. 2, 2024',
    priority: 'Low',
  },
  {
    id: 3,
    task: 'Substasks 3',
    assignees: {
      name: 'Juan',
      profilePhoto: photo,
    },
    progress: 50,
    status: 'Pending',
    date: 'Nov. 2, 2024',
    priority: 'Low',
  },
];
