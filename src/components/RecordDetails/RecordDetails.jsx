import {
  Alert,
  AlertTitle,
  Button,
  Container,
  List,
  ListItemButton,
  ListItemText,
  Modal,
  Paper,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import "./recordDetails.css";

const RecordDetails = ({ recordId, date, handleDelete, title }) => {
  const navigate = useNavigate();

  const [deleteModal, setDeleteModal] = useState(false);

  return (
    <>
      <List sx={{ display: "flex", padding: "1rem" }}>
        <ListItemButton
          onClick={() => navigate(`/export/${recordId}`, { replace: true })}
        >
          <ListItemText
            primary={<Typography variant="h5">{title}</Typography>}
            secondary={`Created: ${moment(date).format("MMMM D, YYYY")}`}
          />
        </ListItemButton>
        <Button
          className="btn__delete"
          color="error"
          onClick={() => setDeleteModal(true)}
        >
          Delete Record
        </Button>
      </List>
      <Modal open={deleteModal} onClose={() => setDeleteModal(false)}>
        <>
          <Container>
            <Paper sx={{ padding: "1rem", mt: "5rem" }}>
              <Alert severity="warning" sx={{ mb: "1rem" }}>
                <AlertTitle>
                  <Typography variant="h5">Warning!</Typography>
                </AlertTitle>
                <Typography variant="body2">
                  Are you sure you want to delete this record?
                </Typography>
              </Alert>
              <Button
                color="error"
                className="btn__delete"
                variant="contained"
                onClick={handleDelete}
                sx={{ m: "1rem" }}
              >
                Delete
              </Button>
              <Button variant="contained" onClick={() => setDeleteModal(false)}>
                Cancel
              </Button>
            </Paper>
          </Container>
        </>
      </Modal>
    </>
  );
};

export default RecordDetails;
