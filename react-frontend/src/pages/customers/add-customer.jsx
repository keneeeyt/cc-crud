import React, { useState } from "react";
import apiClient from "../../utils/http-common";
import { useApiMutation } from "../../utils/use-api-mutation";
import CustomToast from "../../components/custom-toast";
import { useNavigate } from "react-router-dom";

const fetchData = async (data) => {
    const response = await apiClient.post("/customers", data); // Replace with your endpoint
    return response.data;
};

const AddCustomer = () => {
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState("");
    const [toastColor, setToastColor] = useState("");

    const navigate = useNavigate();
    // State to store form data
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        contactNumber: "",
    });

    // State to store errors
    const [errors, setErrors] = useState({});

    // Handle first name change
    const handleFirstNameChange = (e) => {
        setFormData((prevData) => ({
            ...prevData,
            firstName: e.target.value, // Trim whitespace
        }));
    };

    // Handle last name change
    const handleLastNameChange = (e) => {
        setFormData((prevData) => ({
            ...prevData,
            lastName: e.target.value.trim(), // Trim whitespace
        }));
    };

    // Handle email change
    const handleEmailChange = (e) => {
        setFormData((prevData) => ({
            ...prevData,
            email: e.target.value.trim(), // Trim whitespace
        }));
    };

    // Handle contact number change
    const handleContactNumberChange = (e) => {
        const value = e.target.value;
        const sanitizedValue = value.replace(/[^+\d\s]/g, ""); // Allow only numbers, +, and spaces
        setFormData((prevData) => ({
            ...prevData,
            contactNumber: sanitizedValue,
        }));
    };

    // Validation function
    const validate = () => {
        const newErrors = {};

        // First Name validation
        if (!formData.firstName || formData.firstName.length < 2) {
            newErrors.firstName =
                "First name must be at least 2 characters long.";
        }

        // Last Name validation
        if (!formData.lastName || formData.lastName.length < 2) {
            newErrors.lastName =
                "Last name must be at least 2 characters long.";
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!formData.email || !emailRegex.test(formData.email)) {
            newErrors.email = "Please enter a valid email address.";
        }

        // Contact Number validation
        if (!formData.contactNumber) {
            newErrors.contactNumber = "Contact number is required.";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0; // Return true if no errors
    };

    const { mutate, isLoading } = useApiMutation(fetchData, {
        onSuccess: (data) => {
            setToastMessage(data.message);
            setToastColor(data.type);
            setShowToast(true);

            if (data.type === "success") {
                setTimeout(() => {
                    navigate("/customers");
                }, 3000);
                setFormData({
                    firstName: "",
                    lastName: "",
                    email: "",
                    contactNumber: "",
                });
            }
        },
    });

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            const data = {
                first_name: formData.firstName,
                last_name: formData.lastName,
                email: formData.email,
                contact_number: formData.contactNumber,
            };
            mutate(data);
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="mb-4">Add Customer</h2>
            {isLoading ? (
                <div className="text-center my-4">
                    <output className="spinner-border">
                        <span className="visually-hidden">Loading...</span>
                    </output>
                </div>
            ) : (
                <form onSubmit={handleSubmit}>
                    {/* First Name */}
                    <div className="mb-3">
                        <label htmlFor="firstName" className="form-label">
                            First Name
                        </label>
                        <input
                            type="text"
                            className={`form-control ${
                                errors.firstName ? "is-invalid" : ""
                            }`}
                            id="firstName"
                            placeholder="Enter first name"
                            value={formData.firstName}
                            onChange={handleFirstNameChange}
                        />
                        {errors.firstName && (
                            <div className="invalid-feedback">
                                {errors.firstName}
                            </div>
                        )}
                    </div>

                    {/* Last Name */}
                    <div className="mb-3">
                        <label htmlFor="lastName" className="form-label">
                            Last Name
                        </label>
                        <input
                            type="text"
                            className={`form-control ${
                                errors.lastName ? "is-invalid" : ""
                            }`}
                            id="lastName"
                            placeholder="Enter last name"
                            value={formData.lastName}
                            onChange={handleLastNameChange}
                        />
                        {errors.lastName && (
                            <div className="invalid-feedback">
                                {errors.lastName}
                            </div>
                        )}
                    </div>

                    {/* Email Address */}
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">
                            Email Address
                        </label>
                        <input
                            type="email"
                            className={`form-control ${
                                errors.email ? "is-invalid" : ""
                            }`}
                            id="email"
                            placeholder="Enter email address"
                            value={formData.email}
                            onChange={handleEmailChange}
                        />
                        {errors.email && (
                            <div className="invalid-feedback">
                                {errors.email}
                            </div>
                        )}
                    </div>

                    {/* Contact Number */}
                    <div className="mb-3">
                        <label htmlFor="contactNumber" className="form-label">
                            Contact Number
                        </label>
                        <input
                            type="text"
                            className={`form-control ${
                                errors.contactNumber ? "is-invalid" : ""
                            }`}
                            id="contactNumber"
                            placeholder="Enter contact number"
                            value={formData.contactNumber}
                            onChange={handleContactNumberChange}
                        />
                        {errors.contactNumber && (
                            <div className="invalid-feedback">
                                {errors.contactNumber}
                            </div>
                        )}
                    </div>

                    {/* Submit Button */}
                    <button type="submit" className="btn btn-primary">
                        Add Customer
                    </button>
                </form>
            )}
            {showToast && (
                <CustomToast
                    message={toastMessage}
                    color={toastColor}
                    setShowToast={setShowToast}
                />
            )}
        </div>
    );
};

export default AddCustomer;
