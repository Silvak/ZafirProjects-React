export const  tableStyles = {
  container:{
    backgroundColor: "#FFFF",
    borderRadius: "8px",
    padding: "20px",
    marginTop: "30px",
  },
  head: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    fontWegiht: "normal",
  },
  list: {
    minWidth: "250px",
    width: "min(80vw, 100%)",
    marginTop: "10px",
    padding: "30px 0 30px 0",
    overflowX: "auto",
  },
};

export const tableItemStyles = {
  item: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginTop: "20px",
    gap: "30px",
    padding: "10px",

    "&>*": {
      flex: "1 0 auto",
    },
  },
  itemInfoWrapper: {
    display: "flex",
    alignItems: "center",
  },

  itemIcon: {
    background: "#ECE9FF",
    width: "50px",
    height: "50px",
    display: "grid",
    placeContent: "center",
    borderRadius: "12px",
    marginRight: "15px",
    padding: "10px",
  },
  itemText: {
    display: "flex",
    justifyContent: "start",
    alignItems: "start",
    flexDirection: "column",
    gap: "0",
  },
  itemProyectName: { fontSize: "10px", fontWeight: "bold" },
  itemQuantity: {
    fontSize: "10px",
    fontWeight: "normal",
    color: "#6B6E75",
  },
  itemAvatarWrapper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  itemAvatar: { width: "40px", height: "40px" },
  itemAvatarName: { color: "#6B6E75" },
  itemDateWrapper: {
    display: "flex",
    gap: "8px",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
  },
  itemDate: { fontWeight: "normal" },
  itemFileWrapper: {
    display: "flex",
    gap: "8px",
    alignItems: "center",
    justifyContent: "center",
  },
};