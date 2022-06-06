import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCustomers } from "../../actions/customer";
import { deleteRecord, getRecords } from "../../actions/recordsActions";
import RecordDetails from "../RecordDetails/RecordDetails";
import { Paper, Typography } from "@mui/material";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Container } from "@mui/system";

const Home = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("profile"));
  const dispatch = useDispatch();
  const { records } = useSelector((state) => state.records);
  const { id } = useParams();

  useEffect(() => {
    if (user) {
      dispatch(getRecords(id));
      dispatch(getCustomers(user?.result._id));
    }
  }, [dispatch, id, user]);

  const handleDelete = (recordId) => {
    dispatch(deleteRecord(recordId, navigate));
    window.location.reload();
  };

  return (
    <>
      <Container sx={{ minWidth: "600px" }}>
        <Paper elevation={12}>
          {user ? (
            <>
              {records.length > 0 ? (
                records.map((record) => (
                  <RecordDetails
                    title={record.title}
                    key={record._id}
                    recordId={record._id}
                    date={record.createdAt}
                    handleDelete={() => handleDelete(record._id)}
                  />
                ))
              ) : (
                <Typography
                  variant="h5"
                  align="center"
                  sx={{ padding: "1rem" }}
                >
                  <img
                    src="/images/noRecord.svg"
                    alt="No Record"
                    width="200"
                    height="200"
                  />
                  <br />
                  No Record Found. Start creating your own{" "}
                  <Link to="/export">record</Link>.
                </Typography>
              )}
            </>
          ) : (
            <>
              <Typography variant="h4" align="center">
                <img
                  src="/images/signIn.svg"
                  alt="Sign In"
                  width="200"
                  height="200"
                />
                <br />
                <Link to="/auth">Sign In</Link> to see or create a{" "}
                <em>Record</em>.
              </Typography>
            </>
          )}
        </Paper>
      </Container>
    </>
  );
};

export default Home;
