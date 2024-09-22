import React, { useEffect, useRef, useState } from "react";
import { ScrollPanel } from "primereact/scrollpanel";
import { ConfirmPopup } from "primereact/confirmpopup";
import { Avatar } from "primereact/avatar";
import "./Members.css";
import { Toast } from "primereact/toast";
import { Dialog } from "primereact/dialog";
import getAllMembers from "./API/getAllMembers";
import { useNavigate } from "react-router-dom";
import ScrollPanelView from "../ScrollPanelView";
import CreateScheduleModal from "../Modals/CreateScheduleModal";

export default function Members() {
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [show, setShow] = useState(false);
  const [showTeacher, setShowTeacher] = useState(false);
  const [showCreateSchedule, setShowCreateSchedule] = useState(false);
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate()
  useEffect(() => {
    getAllUsers();
  }, []);

  const getAllUsers = async () => {
    try {
      const allUser = await getAllMembers();
      if (allUser.code === 1) {
        showError("Session Expired! Kindly Relogin");
        localStorage.clear();
        navigate('/login');
      } else {
        setUsers(allUser);
      }
    } catch (error) {
      showError("Failed to fetch users.");
    }
  };

  const showError = (errorMsg) => {
    if (toast.current) {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: errorMsg,
        life: 3000,
      });
    }
  };

  const handleCheckboxChange = (user, isChecked) => {
    if (isChecked) {
      setSelectedUsers([...selectedUsers, user]);
    } else {
      setSelectedUsers(selectedUsers.filter((u) => u.user_id !== user.user_id));
    }
  };
  const handleCreateSchedule = () => {

  }
  const showSuccess = (msg) => {
    toast.current.show({
      severity: "success",
      summary: "Success",
      detail: msg,
      life: 3000,
    });
  };

  const toast = useRef(null);
  const styles = {
    table: {
      padding: "0px",
    },
    tableHeader: {
      paddingRight: "0px",
    },
  };

  return (
    <>
      <Toast
        ref={toast}
        position="top-right"
      />
      <h2 className=' fw-bold text-center w-100'>Create Schedule</h2>
      <CreateScheduleModal showError={showError} showSuccess={showSuccess} selectedUsers={selectedUsers} show={showCreateSchedule} onClose={() => {
        setShowCreateSchedule(false)
      }} />
      <div className="card col-md-7 mt-4">
        <div className="">
          <div className="card-header d-flex justify-content-between text-primary text-center py-3">
            <div className="fw-bold">
              <h5 className="fw-bold my-auto text-larger">Employees stats</h5>
              <h6 className="fw-bold text-start my-auto text-muted text-larger">
                Total - {users.length}
              </h6>
            </div>
            <button
              onClick={() => setVisible(true)}
              className="btn btn-primary d-flex align-items-center fw-bold text-white"
            >
              {" "}
              <i className="fa-solid fa-user-plus"></i>{" "}
            </button>
            <Dialog
              header="Choose the type of User"
              className="text-center"
              visible={visible}
              style={{ width: "20vw" }}
              onHide={() => setVisible(false)}
            >
              <p className="m-0 d-flex justify-content-between">
                <button
                  onClick={() => {
                    setVisible(false);
                    setShow(true);
                  }}
                  className="btn btn-primary text-white"
                >
                  Student
                </button>

                <button
                  onClick={() => {
                    setVisible(false);
                    setShowTeacher(true);
                  }}
                  className="btn btn-primary text-white"
                >
                  Teacher
                </button>
              </p>
            </Dialog>
          </div>
          <ScrollPanelView user={users} setSelectedUsers={setSelectedUsers} selectedUsers={selectedUsers} />
        </div>
      </div>
      <div className="card col-md-5 mt-4">
        <div className="card-header d-flex justify-content-between text-primary text-center py-3">
          <div className="fw-bold">
            <h5 className="fw-bold my-auto text-larger">
              Selected Employees
            </h5>
            <h6 className="fw-bold text-start my-auto text-muted text-larger">
              Total - {selectedUsers.length}
            </h6>
          </div>
        </div>
        <ScrollPanel style={{ width: "100%", height: "500px" }}>
          <table
            className="align-middle table my-0"
            style={styles.table}
            id="dataTable"
          >
            <thead>
              <tr>
                <th>Profile</th>
                <th>Name</th>
                <th className="role">Role</th>
              </tr>
            </thead>
            <tbody>
              {selectedUsers.map((user) => (
                <tr key={user.user_id}>
                  <td>
                    {user.profile === undefined ? (
                      <Avatar
                        label={user.username.slice(0)[0]}
                        size="xlarge"
                        className="bg-primary profile text-white"
                        shape="circle"
                      />
                    ) : (
                      <Avatar
                        image={user.profile}
                        className="profile"
                        size="xlarge"
                        shape="circle"
                      />
                    )}
                  </td>
                  <td>
                    {localStorage.getItem("user-id") === user.id
                      ? `${user.username} (You)`
                      : user.username}
                  </td>
                  <td className="role">{user.role}</td>                  
                </tr>
              ))}
            </tbody>
          </table>
        </ScrollPanel>
      </div>
      <div className="container mt-4">
        <div className="btn btn-primary" onClick={() => {
          setShowCreateSchedule(true)
        }} >Create Schedule</div>
      </div>
    </>
  );
}
