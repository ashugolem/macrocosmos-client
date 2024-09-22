import { Avatar } from 'primereact/avatar';
import { ScrollPanel } from 'primereact/scrollpanel';
import React from 'react'
import { Checkbox } from 'primereact/checkbox';


export default function ScrollPanelView(props) {
    const users = props.user;
    const styles = {
        table: {
            padding: "0px",
        },
        tableHeader: {
            paddingRight: "0px",
        },
    };
    const handleCheckboxChange = (user, isChecked) => {
        if (isChecked) {
            props.setSelectedUsers([...props.selectedUsers, user]);
        } else {
            props.setSelectedUsers(props.selectedUsers.filter((u) => u.user_id !== user.user_id));
        }
    };
    return (
        <>
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

                            <th>Email</th>
                            <th>Action</th>
                            <th>Select</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
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
                                <td className="role">{user.email}</td>
                                <td>
                                    {user.role !== "admin" && (
                                        <>
                                            <div className="btn btn-primary">
                                                <i className="fas text-white fa-pencil "></i>
                                            </div>
                                            <div className="btn">
                                                <i className="fa-solid text-danger fa-trash"></i>
                                            </div>
                                        </>
                                    )}
                                </td>
                                <td>
                                    {user.role !== "admin" && (
                                        <div className="flex justify-content-center">
                                            <input
                                                type="checkbox"
                                                onChange={(e) =>
                                                    handleCheckboxChange(user, e.target.checked)
                                                }
                                            />
                                        </div>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </ScrollPanel>
        </>
    )
}