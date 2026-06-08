import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
    getUsers,
    deleteUser
} from "../../api/userApi";

const UsersPage = () => {
    const [users, setUsers] =
        useState([]);

    useEffect(() => {
        loadUsers();
    }, []);

    const loadUsers = async () => {
        try {
            const res =
                await getUsers();

            setUsers(
                res.data
            );
        } catch (err) {
            console.error(err);
        }
    };

    const handleDelete = async (
        id
    ) => {
        try {
            await deleteUser(id);

            loadUsers();
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div>
            <h1>Users</h1>

            <Link to="/cms/users/new">
                Create User
            </Link>

            <hr />

            {users.map((user) => (
                <div
                    key={
                        user.userId
                    }
                >
                    <strong>
                        {
                            user.email
                        }
                    </strong>

                    {" - "}
                    {user.role}

                    <Link
                        to={`/cms/users/edit/${user.userId}`}
                    >
                        Edit
                    </Link>

                    <button
                        onClick={() =>
                            handleDelete(
                                user.userId
                            )
                        }
                    >
                        Delete
                    </button>
                </div>
            ))}
        </div>
    );
};

export default UsersPage;