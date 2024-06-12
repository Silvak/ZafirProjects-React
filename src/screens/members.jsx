import React, { useState, useEffect } from "react";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import useMediaQuery from "@mui/material/useMediaQuery";
import TableHeader from "@/components/tableMembers/tableHeader.jsx";
import TableRowComponent from "@/components/tableMembers/tableRow.jsx";
import TablePagination from "@/components/tableMembers/tablePagination.jsx";
import Button from "@mui/material/Button";
import usePagination from "@/hooks/usePagination";
import { axiosInstance } from "../config/apiConfig";
import { useBoundStore } from "../stores";
import { shallow } from "zustand/shallow";
import useFormatText from "@/hooks/useFormatText";
import CreateMember from "@/components/forms/CreateMemberForm";
import ConfirmForm from "../components/forms/ConfirmForm";
import LayoutPage from "@/layout/layoutPage";

// const columns = [
//   { id: 'photo', label: '' },
//   { id: 'name', label: 'Name' },
//   { id: 'project', label: 'Project' },
//   { id: 'rol', label: 'Rol' },
//   { id: 'leadOwner', label: 'Lead Owner' },
//   { id: 'action', label: '' },
// ];

const MembersTable = () => {
  const [selectedRows, setSelectedRows] = useState([]);
  const isMobile = useMediaQuery("(max-width:600px)");
  const { page, rowsPerPage, handleChangePage, handleChangeRowsPerPage } =
    usePagination({});
  const {
    selectedProject,
    ChangeStateModal,
    ChangeTitleModal,
    ChangeContentModal,
    ChangeStateAlert,
    ChangeTitleAlert,
    updateProjects,
    User,
  } = useBoundStore((state) => state, shallow);

  const [allMemberData, setAllMemberData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOption, setSelectedOption] = useState("All");
  const [memberToDelete, setMemberToDelete] = useState(null);

  useEffect(() => {
    if (selectedProject) {
      const projectMembers = selectedProject.members_id.map((member) => ({
        ...member,
        project: selectedProject?.name,
        leadOwner: selectedProject?.leaders?.name || "",
        projectId: selectedProject?.id,
      }));
      setAllMemberData(projectMembers);
    }
  }, [selectedProject]);

  const handleRowClick = (rowName) => {
    const selectedIndex = selectedRows.indexOf(rowName);
    let newSelected = [...selectedRows];

    if (selectedIndex === -1) {
      newSelected.push(rowName);
    } else {
      newSelected.splice(selectedIndex, 1);
    }

    setSelectedRows(newSelected);
  };

  const isSelected = (rowName) => selectedRows.includes(rowName);

  const handleButtonMore = (allMemberData) => {
    ChangeTitleModal("Create new member");
    ChangeContentModal(
      <CreateMember
        setAllMemberData={setAllMemberData}
        allMemberData={allMemberData}
      />
    );
    ChangeStateModal(true);
  };

  const handleDeleteClick = async (memberToDelete) => {
    setMemberToDelete(memberToDelete);
    ChangeTitleModal("");
    ChangeContentModal(
      <ConfirmForm
        handleCancelDelete={handleCancelDelete}
        handleConfirmDelete={handleConfirmDelete}
        itemToDelete={memberToDelete}
      />
    );
    ChangeStateModal(true);
  };

  const handleConfirmDelete = async (memberToDelete) => {
    try {
      await axiosInstance.post(
        `/projects/${selectedProject.id}/remove-member`,
        { memberId: memberToDelete._id }
      );
      await updateProjects(User?.uid);
      ChangeStateModal(false);
      ChangeTitleAlert("Member successfully removed");
      ChangeStateAlert(true);
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleCancelDelete = () => {
    setMemberToDelete(null);
    ChangeStateModal(false);
  };

  const filteredSearchData = allMemberData.filter(
    (member) =>
      member &&
      member._id &&
      member._id.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <LayoutPage
      head={
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            textAlign: "center",
            alignItems: "center",
          }}
        >
          <h6
            style={{
              fontWeight: 500,
              fontSize: "24px",
            }}
          >
            Team
            <span style={{ fontWeight: "bold" }}>
              {selectedProject
                ? ` of ${useFormatText(selectedProject.name)}`
                : ""}
            </span>
          </h6>
          <Button
            variant='contained'
            disableRipple
            onClick={() => handleButtonMore(filteredSearchData)}
            sx={{
              padding: "0.6rem",
              height: "min-content",
              borderRadius: "12px",
              color: "white",
            }}
          >
            + Add new contact
          </Button>
        </div>
      }
    >
      <TableContainer>
        <div
          style={{
            backgroundColor: "#fff",
            borderRadius: 20,
            padding: 20,
          }}
        >
          <Table stickyHeader aria-label='sticky table'>
            <TableHeader
              isMobile={isMobile}
              selectedRows={selectedRows}
              setSelectedRows={setSelectedRows}
              membersData={allMemberData}
              // columns={columns}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              filteredSearchData={filteredSearchData}
              selectedOption={selectedOption}
              setSelectedOption={setSelectedOption}
              filteredData={filteredSearchData}
            />
            <TableBody>
              {filteredSearchData.length > 0 ? (
                filteredSearchData
                  .slice(
                    (page - 1) * rowsPerPage,
                    (page - 1) * rowsPerPage + rowsPerPage
                  )
                  .map((row, index) => (
                    <TableRowComponent
                      key={index}
                      isMobile={isMobile}
                      handleRowClick={handleRowClick}
                      handleCheckboxClick={handleRowClick}
                      handleDeleteClick={handleDeleteClick}
                      row={row}
                      isSelected={isSelected}
                      // columns={columns}
                      setAllMemberData={setAllMemberData}
                      allMemberData={filteredSearchData}
                    />
                  ))
              ) : (
                <div
                  style={{
                    display: "flex",
                    width: "max-content",
                    justifyContent: "space-between",
                    textAlign: "center",
                    alignItems: "center",
                    marginInline: "1rem",
                  }}
                >
                  <h6
                    style={{
                      fontWeight: 600,
                      fontSize: "20px",
                      marginBottom: "1rem",
                      marginTop: "1rem",
                    }}
                  >
                    No members to show
                  </h6>
                </div>
              )}
            </TableBody>
          </Table>
        </div>
      </TableContainer>
      <TablePagination
        rowsPerPage={rowsPerPage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
        page={page}
        handleChangePage={handleChangePage}
        data={filteredSearchData}
      />
    </LayoutPage>
  );
};

export default MembersTable;
