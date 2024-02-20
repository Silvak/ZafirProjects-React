import * as React from "react";
import { Box, Button, Modal, Typography } from "@mui/material";
import { useBoundStore } from "@/stores/index";
import { shallow } from "zustand/shallow";

const modalStyle = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  padding: "10px",
  height: "auto",
};

const ModalGlobal = () => {
  const { stateModal, titleModal, ChangeStateModal, contentModal } =
    useBoundStore((state) => state, shallow);

  const handleClose = () => {
    ChangeStateModal(false);
  };

  return (
    <Modal
      open={stateModal}
      onClose={handleClose}
      disableEnforceFocus
      sx={{
        "& .MuiBackdrop-root": {
          backgroundColor: "transparent",
          backdropFilter: "blur(3px)",
        },
        overflowY: "auto",
      }}
    >
      <Box
        sx={{
          ...modalStyle,
          minHeight: "100vh",
          padding: "20px",
        }}
      >
        <Box> {/* width off */}
          <Typography
            variant="h4"
            sx={{
              bgcolor: "white",
              color: "black",
              fontWeight: "bold",
              borderTopLeftRadius: "16px",
              borderTopRightRadius: "16px",
              borderBottomLeftRadius: 0,
              borderBottomRightRadius: 0,
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                borderBottom: "1px solid lightgray",
                marginBlock: "2px",
                padding: "8px",
              }}
            >
              {titleModal}
              <Button
                sx={{
                  margin: "0",
                  bgcolor: "white",
                  display: "flex",
                  justifyContent: "flex-end",
                }}
                title="Close"
                variant="text"
                onClick={handleClose}
              >
                X
              </Button>
            </div>
          </Typography>
          <div>{contentModal}</div>
        </Box>
      </Box>
    </Modal>
  );
};

export default ModalGlobal;
