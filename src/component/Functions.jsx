
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

export async function GetAnnouncement(params, setAnnouncements) {
  const res = await fetch(process.env.REACT_APP_API +"/announcements/find/type/" + params.id,
    {
      method: "GET",
      headers: {
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
      }
    });
  const data = await res.json();
  setAnnouncements(data);
}

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  minWidth: 400,
  maxWidth: 750,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  color: 'black',
  borderRadius: 5,
  textAlign: 'center',

};
export function MyModal(openAnnouncementId, announcement, handleClose) {
  return <div>
    <Modal
      open={openAnnouncementId === announcement._id}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          {announcement.subject}
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          {announcement.body}
        </Typography>
      </Box>
    </Modal>
  </div>;
}