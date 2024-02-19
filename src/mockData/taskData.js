import photo from "../assets/Img/png/userImageMan.png";
import photow from "../assets/Img/png/userImageWoman.png";

export const mockTasks = [
  {
    id: crypto.randomUUID(),
    task: "Home screen interaction",
    appDesign: "Peceland App Design",
    profilePhoto: photo,
    notification: 1,
    attachments: ["file1.pdf", "image1.jpg"],
    date: "Today",
    status: "Working",
    assignees: [
      {
        name: "John",
        profile: photo,
      },
    ],
    priority: "High",
    screen: null,
  },
  {
    id: crypto.randomUUID(),
    task: "My profile page",
    appDesign: "Peceland App Design",
    profilePhoto: photow,
    notification: 2,
    attachments: ["file2.docx", "image2.png"],
    date: "Oct 2, 2022",
    status: "Working",
    assignees: [
      {
        name: "Alice",
        profile: photow,
      },
      {
        name: "Adrian",
        profile: photo,
      },
    ],
    priority: "High",
    screen:
      "https://res.cloudinary.com/dgdcfmnnx/image/upload/v1707754534/wwdhjjme5wixbr7z0hav.webp",
  },
  {
    id: crypto.randomUUID(),
    task: "Notification",
    appDesign: "Peceland App Design",
    profilePhoto: photo,
    notification: 1,
    attachments: [],
    date: "Today",
    status: "Backlog",
    assignees: [
      {
        name: "Bob",
        profile: photo,
      },
      {
        name: "Julie",
        profile: photow,
      },
    ],
    priority: "Medium",
    screen: null,
  },
  {
    id: crypto.randomUUID(),
    task: "Product detail page",
    appDesign: "Peceland App Design",
    profilePhoto: photow,
    notification: 4,
    attachments: ["file3.xlsx"],
    date: "Oct 3 - 4, 2023",
    status: "Working",
    assignees: [
      {
        name: "Frank",
        profile: photo,
      },
      {
        name: "Charlie",
        profile: photow,
      },
    ],
    priority: "Low",
    screen: null,
  },
  {
    id: crypto.randomUUID(),
    task: "Help",
    appDesign: "Peceland App Design",
    profilePhoto: photow,
    notification: 0,
    attachments: ["image3.jpg"],
    date: "Today",
    status: "Working",
    assignees: [
      {
        name: "David",
        profile: photow,
      },
    ],
    priority: "Low",
    screen: null,
  },
  {
    id: crypto.randomUUID(),
    task: "Settings page",
    appDesign: "Peceland App Design",
    profilePhoto: photow,
    notification: 0,
    attachments: ["file1.docx"],
    date: "Oct 1 - 4, 2022",
    status: "Pending",
    assignees: [
      {
        name: "Eva",
        profile: photow,
      },
      {
        name: "Frank",
        profile: photo,
      },
    ],
    priority: "Low",
    screen: null,
  },
  {
    id: crypto.randomUUID(),
    task: "New feature development",
    appDesign: "Peceland App Design",
    profilePhoto: photo,
    notification: 0,
    attachments: [],
    date: "Future",
    status: "Backlog",
    assignees: [
      {
        name: "Frank",
        profile: photo,
      },
    ],
    priority: "Medium",
    screen: null,
  },
  {
    id: crypto.randomUUID(),
    task: "Performance optimization",
    appDesign: "Peceland App Design",
    profilePhoto: photow,
    notification: 0,
    attachments: [],
    date: "Future",
    status: "Backlog",
    assignees: [
      {
        name: "Grace",
        profile: photow,
      },
      {
        name: "Henry",
        profile: photo,
      },
    ],
    priority: "Medium",
    screen: null,
  },
  {
    id: crypto.randomUUID(),
    task: "Settings page",
    appDesign: "Peceland App Design",
    profilePhoto: photo,
    notification: 1,
    attachments: ["file1.pdf"],
    date: "Oct 1 - 4, 2022",
    status: "Pending",
    assignees: [
      {
        name: "Henry",
        profile: photo,
      },
    ],
    priority: "Low",
  },
  {
    id: crypto.randomUUID(),
    task: "Settings page",
    appDesign: "Peceland App Design",
    profilePhoto: photow,
    notification: 0,
    attachments: ["file1.docx"],
    date: "Oct 1 - 4, 2022",
    status: "Pending",
    assignees: [
      {
        name: "Isabel",
        profile: photow,
      },
    ],
    priority: "Low",
  },
];

export const taskDetailData = {
  id: crypto.randomUUID(),
  task: "Home screen interaction",
  appDesign: "Peceland App Design",
  profilePhoto: photo,
  notification: 1,
  attachments: ["file1.pdf", "image1.jpg"],
  date: "Oct - 1, 2024",
  status: "Working",
  assignees: [
    {
      id: 1,
      name: "Franco",
      profilePhoto: photo,
    },
    {
      id: 2,
      name: "Maria",
      profilePhoto: photow,
    },
  ],
  priority: "High",
  screen: null,
};

export const subsTasksData = [
  {
    id: 1,
    task: "Substasks 1",
    assignees: {
      name: "Juan",
      profilePhoto: photo,
    },
    status: "In Progress",
    date: "Nov. 12, 2023",
    priority: "Low",
  },
  {
    id: 2,
    task: "Substasks 2",
    assignees: {
      name: "María",
      profilePhoto: photow,
    },
    status: "Completed",
    date: "Nov. 12, 2024",
    priority: "Low",
  },
  {
    id: 3,
    task: "Substasks 3",
    assignees: {
      name: "Juan",
      profilePhoto: photo,
    },
    status: "Pending",
    date: "Nov. 12, 2023",
    priority: "Low",
  },
];
