import PropTypes from "prop-types";
import { useEffect } from "react";

const CustomToast = ({ message, color, onClose, setShowToast }) => {

    // Automatically hide the toast after 3 seconds
    useEffect(() => {
        const timer = setTimeout(() => {
            setShowToast(false);
            onClose && onClose(); // Call onClose callback if provided
        }, 3000);

        return () => clearTimeout(timer); // Clean up the timer on unmount
    }, []);

    return (
        <div
            className={`toast align-items-center text-bg-${color} border-0 fade show`} // Apply fade and show for visibility
            role="alert"
            aria-live="assertive"
            aria-atomic="true"
            style={{ position: "fixed", top: "20px", right: "20px", zIndex: 1050 }} // Position toast on the screen
        >
            <div className="d-flex">
                <div className="toast-body">{message}</div>
                <button
                    type="button"
                    className="btn-close btn-close-white me-2 m-auto"
                    data-bs-dismiss="toast"
                    aria-label="Close"
                    onClick={() => setShowToast(false)} // Manually close the toast
                ></button>
            </div>
        </div>
    );
};

// Define prop types for the component
CustomToast.propTypes = {
    message: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
    onClose: PropTypes.func, // Optional callback when toast is closed
    setShowToast: PropTypes.func.isRequired, // Required callback to set toast visibility
};

export default CustomToast;
