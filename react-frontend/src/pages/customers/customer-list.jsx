/**
 * CustomerList Component
 *
 * This component renders a list of customers in a data table.
 * It includes sample data and columns definition for the table.
 * The table supports actions like edit and delete for each row.
 *
 * Example usage:
 * <CustomerList />
 */

import { useEffect, useState } from "react";
import DataTable from "../../components/data-table";
import { PencilSquare, Trash } from "react-bootstrap-icons";
import { useApiMutation } from "../../utils/use-api-mutation";
import apiClient from "../../utils/http-common";
import { useNavigate } from "react-router-dom";
import CustomToast from "../../components/custom-toast";

const fetchData = async (data) => {
    const response = await apiClient.get("/customers", data); // Replace with your endpoint
    return response.data;
};

const deleteCustomer = async (id) => {
    const response = await apiClient.delete(`/customers/${id}`); // Replace with your endpoint
    return response.data;
};

const CustomerList = () => {
    const [customers, setCustomers] = useState([]);
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState("");
    const [toastColor, setToastColor] = useState("");

    const navigate = useNavigate();

    const { mutate, isLoading } = useApiMutation(fetchData, {
        onSuccess: (data) => {
            setCustomers(data.data);
        },
    });

    const { mutate: deleteMutate } = useApiMutation(deleteCustomer, {
        onSuccess: (data) => {
            setToastMessage(data.message);
            setToastColor(data.type);
            setShowToast(true);
            mutate();
        },
    });

    useEffect(() => {
        mutate();
    }, [mutate]);

    // Columns definition for the table
    const columns = [
        { label: "ID", key: "id" },
        { label: "Name", key: "name" },
        { label: "Email", key: "email" },
        {
            label: "Actions",
            key: "actions",
            render: (row) => (
                <>
                    <PencilSquare
                        className="me-2"
                        onClick={() => handleEdit(row)}
                    />
                    <Trash color="red" onClick={() => handleDelete(row)} />
                </>
            ),
        },
    ];

    // Handle edit action
    const handleEdit = (row) => {
        navigate(`/customers/edit/${row.id}`);
    };

    // Handle delete action
    const handleDelete = (row) => {
        const isDelete = confirm(`Are you sure you want to delete customer with ID: ${row.id}?`);
    
        if (isDelete) {
            deleteMutate(row.id);
        }
    };

    return (
        <>
            <div className="container mt-4">
                <div className="d-flex justify-content-between align-items-center">
                    <h1>Customer List</h1>
                    <button
                        onClick={() => navigate("/customers/add")}
                        className="btn btn-primary"
                    >
                        Add Customer
                    </button>
                </div>
                {isLoading ? (
                    <div className="text-center my-4">
                        <output className="spinner-border">
                            <span className="visually-hidden">Loading...</span>
                        </output>
                    </div>
                ) : (
                    <DataTable data={customers} columns={columns} />
                )}
            </div>
            {showToast && (
                <CustomToast
                    message={toastMessage}
                    color={toastColor}
                    setShowToast={setShowToast}
                />
            )}
        </>
    );
};

export default CustomerList;
