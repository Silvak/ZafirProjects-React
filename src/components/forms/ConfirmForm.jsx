import { Paper, Button, Typography } from '@mui/material';

function ConfirmForm({
  handleCancelDelete,
  handleConfirmDelete,
  itemToDelete,
}) {
  const item =
    itemToDelete._id.name || itemToDelete.taskName || itemToDelete.name;

  console.log(item);

  return (
    <div style={{ maxWidth: '32vw', minWidth: 'max-content' }}>
      <Paper
        elevation={5}
        style={{ padding: 20, backgroundColor: '#fff', borderRadius: 12 }}
      >
        <Typography
          variant="h6"
          sx={{ my: 2 }}
          style={{
            fontSize: 18,
            letterSpacing: -1,
            width: 'max-content',
            maxWidth: '36rem',
            textAlign: 'center',
          }}
        >
          Are you sure you want to delete to{' '}
          <strong style={{ color: 'black' }}>{item}</strong> ?
        </Typography>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginTop: 12,
          }}
        >
          <Button
            disableRipple
            variant="outlined"
            sx={{
              color: 'black',
              bgcolor: 'white',
              borderRadius: '0.5rem',
              border: '1px gray solid',
              minWidth: '6rem',
            }}
            onClick={handleCancelDelete}
          >
            No
          </Button>
          <Button
            disableRipple
            style={{ marginLeft: 8 }}
            variant="contained"
            sx={{
              color: 'white',
              bgcolor: '#7662EA',
              borderRadius: '0.5rem',
              minWidth: '6rem',
            }}
            onClick={() => handleConfirmDelete(itemToDelete)}
          >
            Yes
          </Button>
        </div>
      </Paper>
    </div>
  );
}
export default ConfirmForm;
