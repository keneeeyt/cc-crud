/**
 * App Component
 * 
 * This is the main component of the application. It sets up the router and renders the header and routes.
 * 
 * Example usage:
 * <App />
 */

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/header";
import { routes } from "./routes/route";
import NetworkErrorPage from "./components/network-error-page";


function App() {
    return (
        <Router>
            {/* Render the header */}
            <Header />
            {/* Define the routes */}
            <Routes>
                {routes.map((route) => (
                    <Route
                        key={route.path}
                        path={route.path}
                        element={<route.component />}
                    />
                ))}
                <Route path="/network-error" element={<NetworkErrorPage />} />
            </Routes>
        </Router>
    );
}

export default App;