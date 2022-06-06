import { Button, Grid, InputLabel, Modal, Typography } from "@mui/material";
import React, { useState } from "react";
import InputSettings from "../InputSettings/InputSettings";

const Label = ({
  handleChange,
  handleSave,
  handleShowPassword,
  handleShowVerifyPassword,
  label,
  name,
  type,
  typeVerifyPassword,
  value,
}) => {
  const [openModal, setOpenModal] = useState(false);

  const handleModal = (e) => {
    setOpenModal(true);
  };

  return (
    <Grid container spacing={2} sx={{ mb: "1rem" }}>
      <Grid item xs={3} sx={{ m: "auto" }}>
        <InputLabel>{label}: </InputLabel>
      </Grid>
      <Grid item xs={5} sx={{ m: "auto" }}>
        <Typography variant="h6">{value}</Typography>
      </Grid>
      <Grid item alignContent="center" xs={4}>
        <Button name={name} fullWidth onClick={handleModal}>
          Change
        </Button>
      </Grid>

      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <>
          <InputSettings
            label={label}
            handleCancel={() => setOpenModal(false)}
            type={type}
            typeVerifyPassword={typeVerifyPassword}
            handleChange={handleChange}
            handleSave={handleSave}
            handleShowPassword={handleShowPassword}
            handleShowVerifyPassword={handleShowVerifyPassword}
            name={name}
          />
        </>
      </Modal>
    </Grid>
  );
};

export default Label;
