/* TEMPORARY SOLUTION FOR TASK FORMAT OBJECT */
import photo from "@/assets/Img/png/userImageMan.png";
import photow from "@/assets/Img/png/userImageWoman.png";

export const useNewTaskArr = (task) => {
  let newTask = [];

  for (let i = 0; i < task.length; i++) {
    let startDate = task[i].start;
    let endDate = task[i].end;

    newTask.push({
      id: task[i].id,
      task: task[i].taskName,
      appDesign: task[i].description,
      profilePhoto: photow,
      notification: 2,
      attachments: ["file2.docx", "image2.png"],
      date: {
        start: `${new Date(startDate).getUTCMonth() + 1}-${new Date(
          startDate
        ).getUTCDate()}-${new Date(startDate).getUTCFullYear()}`, //"2-21-2024",
        end: `${new Date(endDate).getUTCMonth() + 1}-${new Date(
          endDate
        ).getUTCDate()}-${new Date(endDate).getUTCFullYear()}`, //"2-24-2024",
      },
      progress: 50,
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
    });
  }

  return newTask;
};
