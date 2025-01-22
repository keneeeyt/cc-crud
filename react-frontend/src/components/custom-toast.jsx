/**
 * CustomToast Component
 * 
 * This component renders a customizable toast notification.
 * 
 * Props:
 * - message: String representing the message to be displayed in the toast.
 * - color: String representing the background color of the toast. It should match one of the Bootstrap color classes.
 * 
 * Example usage:
 * <CustomToast message="This is a toast message" color="success" />
 */

import PropTypes from "prop-types";

const CustomToast = ({ message, color }) => {
    return (
        <div
            className={`toast align-items-center text-bg-${color} border-0`}
            role="alert"
            aria-live="assertive"
            aria-atomic="true"
        >
            <div className="d-flex">
                <div className="toast-body">{message}</div>
                <button
                    type="button"
                    className="btn-close btn-close-white me-2 m-auto"
                    data-bs-dismiss="toast"
                    aria-label="Close"
                ></button>
            </div>
        </div>
    );
};

// Define prop types for the component
CustomToast.propTypes = {
    message: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
};

export default CustomToast;