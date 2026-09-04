# GCET-STORES: Geethanjali College of Engineering and Technology Inventory Management

## Overview

GCET-STORES is a comprehensive inventory management system developed for Geethanjali College of Engineering and Technology. Built on the MERN stack (MongoDB, Express.js, React.js, Node.js) with a TypeScript frontend, this in-house project digitizes and automates the process of managing the college's stores, including inventory tracking, purchase indents, and material issuance. The system provides role-based access to ensure efficient and secure operations across different departments and user levels.

## Key Features

*   **Role-Based Access Control:** Tailored dashboards and permissions for Admin, Faculty, HOD, Principal, Secretary, PA (Department Assistant), and Security personnel, ensuring users only access relevant functionalities.
*   **Purchase Indent Workflow:** A multi-level approval process for purchase requests, flowing from faculty to HOD, Principal, and Secretary for seamless validation.
*   **Inventory Management:** Real-time tracking of consumable and non-consumable items. Admins can easily add new stock, update quantities, and monitor low-stock items.
*   **Material Requisition & Issuance:** A complete flow for departments to request materials, for admins to issue them, and for PAs to manage intra-departmental distribution to faculty.
*   **Gate Entry Logging:** A dedicated interface for security personnel to log all incoming materials, ensuring a verifiable record of all goods entering the campus.
*   **Comprehensive History Tracking:** Detailed logs of all inventory transactions, purchases, indents, and gate entries for robust auditing and reporting.
*   **Automated Notifications:** The system uses Nodemailer to send automated email alerts for critical events, such as the submission of a new purchase indent, keeping stakeholders informed.

## User Roles and Functionality

The application is designed with distinct roles to streamline operations:

*   **Admin:** Has complete control over the system. Manages inventory, oversees all indents and material issues, views department requisitions, and accesses complete transaction and gate histories.
*   **Faculty:** Can raise new Purchase Indents for their department's requirements.
*   **HOD, Principal, Secretary:** Act as approvers in the purchase indent workflow. They review and action requests sequentially based on their position in the hierarchy.
*   **PA (Department Assistant):** Manages material requisitions from the central store for their department, tracks the status of departmental orders, and handles the distribution of received materials to faculty.
*   **Security:** Records all incoming materials through a dedicated Gate Entry form, maintaining a log of all goods received.

## Tech Stack

### Frontend
*   **Framework:** React
*   **Language:** TypeScript
*   **Build Tool:** Vite
*   **Styling:** Tailwind CSS
*   **Icons:** Lucide React

### Backend
*   **Runtime:** Node.js
*   **Framework:** Express.js
*   **Database:** MongoDB with Mongoose ODM
*   **Authentication:** JSON Web Tokens (JWT)
*   **Dependencies:** Cors, bcrypt, Nodemailer
