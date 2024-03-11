import photo from "../assets/Img/png/userImageMan.png";
import photow from "../assets/Img/png/userImageWoman.png";

export const mockTasks = [
  {
    id: "Task-1",
    task: "Home screen interaction",
    appDesign: "Peceland App Design",
    profilePhoto: photo,
    notification: 1,
    attachments: ["file1.pdf", "image1.jpg"],
    date: {
      start: "2-20-2024",
      end: "2-25-2024",
    },
    status: "Working",
    assignees: [
      {
        name: "John",
        profile: photo,
      },
    ],
    priority: "High",
    screen: null,
    styles: {
      color: "#459CED",
    },
  },
  {
    id: "Task-2",
    task: "My profile page",
    appDesign: "Peceland App Design",
    profilePhoto: photow,
    notification: 2,
    attachments: ["file2.docx", "image2.png"],
    date: {
      start: "2-26-2024",
      end: "2-27-2024",
    },
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

    styles: {
      color: "#E55D57",
    },
  },
  {
    id: "Task-3",
    task: "Notification",
    appDesign: "Peceland App Design",
    profilePhoto: photo,
    notification: 1,
    attachments: [],
    date: {
      start: "2-22-2024",
      end: "2-25-2024",
    },
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
    styles: {
      color: "#6B6E75",
    },
  },
  {
    id: "Task-4",
    task: "Product detail page",
    appDesign: "Peceland App Design",
    profilePhoto: photow,
    notification: 4,
    attachments: ["file3.xlsx"],
    date: {
      start: "2-24-2024",
      end: "2-25-2024",
    },
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
    styles: {
      color: "#A0C9C0",
    },
  },
  {
    id: "Task-5",
    task: "Help",
    appDesign: "Peceland App Design",
    profilePhoto: photow,
    notification: 0,
    attachments: ["image3.jpg"],
    date: {
      start: "2-24-2024",
      end: "2-25-2024",
    },
    status: "Working",
    assignees: [
      {
        name: "David",
        profile: photow,
      },
    ],
    priority: "Low",
    screen: null,
    styles: {
      color: "#E55D57",
    },
  },
  {
    id: "Task-6",
    task: "Settings page",
    appDesign: "Peceland App Design",
    profilePhoto: photow,
    notification: 0,
    attachments: ["file1.docx"],
    date: {
      start: "2-24-2024",
      end: "2-25-2024",
    },
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
    styles: {
      color: "#EBA741",
    },
  },
  {
    id: "Task-7",
    task: "New feature development",
    appDesign: "Peceland App Design",
    profilePhoto: photo,
    notification: 0,
    attachments: [],
    date: {
      start: "2-24-2024",
      end: "2-25-2024",
    },
    status: "Backlog",
    assignees: [
      {
        name: "Frank",
        profile: photo,
      },
    ],
    priority: "Medium",
    screen: null,
    styles: {
      color: "#E55D57",
    },
  },
  {
    id: "Task-8",
    task: "Performance optimization",
    appDesign: "Peceland App Design",
    profilePhoto: photow,
    notification: 0,
    attachments: [],
    date: {
      start: "2-24-2024",
      end: "2-25-2024",
    },
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
    styles: {
      color: "#EBA741",
    },
  },
  {
    id: "Task-9",
    task: "Settings page",
    appDesign: "Peceland App Design",
    profilePhoto: photo,
    notification: 1,
    attachments: ["file1.pdf"],
    date: {
      start: "2-24-2024",
      end: "2-25-2024",
    },
    status: "Pending",
    assignees: [
      {
        name: "Henry",
        profile: photo,
      },
    ],
    priority: "Low",
    styles: {
      color: "#459CED",
    },
  },
  {
    id: "Task-10",
    task: "Settings page",
    appDesign: "Peceland App Design",
    profilePhoto: photow,
    notification: 0,
    attachments: ["file1.docx"],
    date: {
      start: "2-24-2024",
      end: "2-25-2024",
    },
    status: "Pending",
    assignees: [
      {
        name: "Isabel",
        profile: photow,
      },
    ],
    priority: "Low",
    styles: {
      color: "#A0C9C0",
    },
  },
];

export const taskDetailData = {
  id: "Task-11",
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
    date: "Nov. 2, 2024",
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
    date: "Nov. 2, 2024",
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
    date: "Nov. 2, 2024",
    priority: "Low",
  },
];
