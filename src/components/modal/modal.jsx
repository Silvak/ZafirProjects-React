import * as React from 'react';
import { Box, Button, Modal, Typography, IconButton } from '@mui/material';
import { useBoundStore } from '@/stores/index';
import { shallow } from 'zustand/shallow';
import CloseIcon from '@mui/icons-material/Close';

const modalStyle = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '10px',
  height: 'auto',
};

const ModalGlobal = () => {
  const {
    stateModal,
    titleModal,
    ChangeStateModal,
    contentModal,
    isVisibleButton,
  } = useBoundStore((state) => state, shallow);

  const handleClose = () => {
    ChangeStateModal(false);
  };

  return (
    <Modal
      open={stateModal}
      onClose={handleClose}
      disableEnforceFocus
      sx={{
        '& .MuiBackdrop-root': {
          backgroundColor: 'rgba(0, 0, 0, 0.1)',
          backdropFilter: 'blur(3px)',
        },
        overflowY: '-moz-hidden-unscrollable',
      }}
    >
      <Box
        sx={{
          ...modalStyle,
          minHeight: '100vh',
          padding: '20px',
        }}
      >
        <Box sx={{ maxWidth: '99%' }}>
          {' '}
          {/* width off */}
          {titleModal && (
            <Typography
              variant='h4'
              sx={{
                bgcolor: '#FFFFFF',
                color: 'black',
                fontWeight: 'bold',
                borderTopLeftRadius: '16px',
                borderTopRightRadius: '16px',
                borderBottomLeftRadius: 0,
                borderBottomRightRadius: 0,
                paddingTop: '20px',
                paddingLeft: '35px',
                paddingBottom: '7px',
                borderBottom: '1px solid white',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  border: 'none',
                }}
              >
                {titleModal}
                {/* Close Modal */}
                {isVisibleButton && (
                  <IconButton
                    sx={{
                      margin: '0',
                      bgcolor: 'white',
                      display: 'flex',
                      justifyContent: 'flex-end',
                      mr: 2,
                    }}
                    disableRipple
                    title='Close'
                    variant='text'
                    onClick={handleClose}
                  >
                    <CloseIcon />
                  </IconButton>
                )}
              </div>
            </Typography>
          )}
          <div>{contentModal}</div>
        </Box>
      </Box>
    </Modal>
  );
};

export default ModalGlobal;
