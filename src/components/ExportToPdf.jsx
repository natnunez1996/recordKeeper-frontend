import React, { useEffect, useRef, useState } from "react";
import ReactToPrint from "react-to-print";
import Forms from "./Form/Forms";
import TableFiles from "./TableFiles/TableFiles";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getRecord,
  createRecord,
  updateRecord,
} from "../actions/recordsActions";
import {
  Modal,
  Button,
  CircularProgress,
  Typography,
  Paper,
} from "@mui/material";
import { CLEAR_RECORD } from "../constants";
import { createCustomer } from "../actions/customer";
import TitleForm from "./TitleForm/TitleForm";

const ExportToPdf = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("profile"));

  let initialForm = {
    sr: 0,
    patientName: "",
    charge: 0,
    numOfRx: 0,
    idRequired: "Yes",
    time: "00:00",
    agentName: user?.result.name,
  };

  let componentRef = useRef(null);
  const bottomRef = useRef(null);

  const { recordFormLists } = useSelector((state) => state.records);
  const { customers } = useSelector((state) => state.customer);

  const [customersOptions, setCustomersOptions] = useState(customers);
  const [formData, setFormData] = useState(initialForm);
  const [formLists, setFormLists] = useState(id ? recordFormLists?.lists : []);
  const [title, setTitle] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [modalSubmitOpen, setModalSubmitOpen] = useState(false);

  useEffect(() => {
    if (id) {
      dispatch(getRecord(id));
    } else {
      setFormLists([]);
    }
    return () => {
      dispatch({ type: CLEAR_RECORD });
    };
  }, [id, dispatch]);

  useEffect(() => {
    if (recordFormLists && id) setFormLists(recordFormLists.lists);
  }, [recordFormLists, id]);

  useEffect(() => {
    setCustomersOptions(customers);
  }, [customers]);

  const handleChange = ({ name, value }) => {
    setFormData({ ...formData, [name ? name : "time"]: value });
  };

  const handleChangeOptions = (e, val) => {
    setFormData({ ...formData, patientName: val.patientName });
  };

  const handleSave = () => {
    let data = recordFormLists
      ? { title: recordFormLists.title, lists: formLists }
      : { title, lists: formLists };
    if (id) {
      dispatch(updateRecord(id, data, user?.result._id, navigate));
    } else {
      dispatch(createRecord(data, user?.result._id, navigate));
      setModalSubmitOpen(false);
    }
  };

  const handleUpdate = (sr) => {
    setFormData(formLists.find((form) => form.sr === sr));
    setModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let isCustomerOptions = !customersOptions.find(
      (customer) => customer.patientName === formData.patientName
    )
      ? false
      : true;

    if (!isCustomerOptions) {
      dispatch(createCustomer({ patientName: formData.patientName }));
    }

    //Save to list
    if (e.target.name === "Submit") {
      let lastSr = 0;
      if (formLists.length !== 0) {
        lastSr = formLists.length;
      }
      setFormLists((prevLists) => [
        ...prevLists,
        { ...formData, sr: lastSr + 1 },
      ]);
    } else if (e.target.name === "Update") {
      setFormLists((prevLists) =>
        prevLists.map((prevList) =>
          prevList.sr === formData.sr ? formData : prevList
        )
      );
    }
    bottomRef.current.scrollIntoView({ behavior: "smooth" });
    clear();
  };

  const clear = () => {
    setFormData(initialForm);
    setModalOpen(false);
  };

  return (
    <div>
      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        <>
          <Forms
            onChange={handleChange}
            onChangeOptions={handleChangeOptions}
            customersOptions={customersOptions}
            formData={formData}
            handleSubmit={handleSubmit}
            clear={clear}
          />
        </>
      </Modal>

      {!formLists ? (
        <CircularProgress
          sx={{ display: "block", mt: "1rem", ml: "auto", mr: "auto" }}
          color="success"
        />
      ) : (
        <>
          <Paper sx={{ padding: "1rem", m: "1rem" }}>
            <Typography variant="h6" sx={{ mt: "1rem" }}>
              To edit a{" "}
              <strong>
                <em>List</em>
              </strong>
              , Click the{" "}
              <strong>
                <em>List</em>
              </strong>{" "}
              you want to edit.
            </Typography>
          </Paper>
          <Paper sx={{ m: "1rem", padding: "1rem" }} elevation={16}>
            <TableFiles
              formLists={formLists}
              handleUpdate={handleUpdate}
              date={recordFormLists?.createdAt}
              ref={(res) => (componentRef = res)}
            />

            <Button
              variant="contained"
              onClick={() => setModalOpen(true)}
              sx={{ mr: "1rem" }}
            >
              Add List
            </Button>
            {formLists.length > 0 && (
              <>
                <ReactToPrint
                  trigger={() => (
                    <Button variant="contained" className="btn btn-primary">
                      Export Table
                    </Button>
                  )}
                  content={() => componentRef}
                />
                {id ? (
                  <Button
                    variant="contained"
                    color="success"
                    onClick={handleSave}
                    sx={{ ml: "1rem" }}
                  >
                    Update File
                  </Button>
                ) : (
                  <>
                    <Button
                      variant="contained"
                      color="success"
                      onClick={() => setModalSubmitOpen(true)}
                      sx={{ ml: "1rem" }}
                    >
                      {" "}
                      Save File
                    </Button>
                    <Modal
                      open={modalSubmitOpen}
                      onClose={() => setModalSubmitOpen(false)}
                    >
                      <>
                        <TitleForm
                          handleTitleChange={(e) => setTitle(e.target.value)}
                          handleSave={handleSave}
                          close={() => setModalSubmitOpen(false)}
                        />
                      </>
                    </Modal>
                  </>
                )}
              </>
            )}
          </Paper>
        </>
      )}
      <br ref={bottomRef} />
    </div>
  );
};

export default ExportToPdf;
