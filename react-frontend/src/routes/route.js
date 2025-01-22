/**
 * This file defines the routes for the application.
 * Each route includes a path, name, icon, and the component to be rendered.
 */

import { People } from 'react-bootstrap-icons';
import CustomerList from '../pages/customers/customer-list';

/**
 * Array of route configurations for the application.
 * @type {Array<{ path: string, name: string, icon: React.ComponentType, component: React.ComponentType }>}
 */
export const routes = [
    {
        path: "/customers",
        name: "Customers",
        icon: People,
        component: CustomerList
    },
];