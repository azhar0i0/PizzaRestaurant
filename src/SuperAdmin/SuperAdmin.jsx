import React, { useState } from "react";
import {
    FaBell,
    FaSearch,
    FaEdit,
    FaTrash,
    FaSignOutAlt,
    FaThLarge,
    FaTimes,
} from "react-icons/fa";
import DemiData from "./DemiData";
import "./SuperAdmin.css";
import logo from "./assets/restaurant-icon.png";
import { useNavigate } from "react-router-dom";

export default function SuperAdmin() {
    const navigate = useNavigate();
    const [data, setData] = useState(DemiData);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [showModal, setShowModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [itemToDelete, setItemToDelete] = useState(null);
    const [editingItem, setEditingItem] = useState(null);
    const itemsPerPage = 8;

    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        address: "",
    });

    const handleLogout = () => navigate("/");

    const handleDeleteConfirm = () => {
        if (itemToDelete) {
            setData((prev) => prev.filter((item) => item.uuid !== itemToDelete));
            setShowDeleteModal(false);
        }
    };

    const handleDelete = (uuid) => {
        setItemToDelete(uuid);
        setShowDeleteModal(true);
    };

    const handleToggle = (uuid) => {
        setData((prev) =>
            prev.map((item) =>
                item.uuid === uuid ? { ...item, enabled: !item.enabled } : item
            )
        );
    };

    const handleAddNew = () => {
        setEditingItem(null);
        setFormData({ name: "", phone: "", address: "" });
        setShowModal(true);
    };

    const handleEdit = (item) => {
        setEditingItem(item);
        setFormData({
            name: item.name,
            phone: item.phone,
            address: item.address,
        });
        setShowModal(true);
    };

    const handleModalSubmit = (e) => {
        e.preventDefault();

        if (editingItem) {
            setData((prev) =>
                prev.map((item) =>
                    item.uuid === editingItem.uuid ? { ...item, ...formData } : item
                )
            );
        } else {
            const newItem = {
                uuid: Math.floor(Math.random() * 100000).toString(),
                name: formData.name,
                phone: formData.phone,
                address: formData.address,
                status: "Pending",
                enabled: false,
            };
            setData((prev) => [newItem, ...prev]);
        }

        setShowModal(false);
    };

    const filteredData = data.filter(
        (item) =>
            item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.phone.includes(searchTerm) ||
            item.address.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentItems = filteredData.slice(startIndex, endIndex);

    return (
        <div className="superadmin-container">
            {/* Sidebar */}
            <aside className="sidebar">
                <div className="sidebar-top">
                    <div className="logo-circle">
                        <img src={logo} alt="logo" />
                    </div>
                    <hr className="bg-white mt-1" />
                    <div className="menu-icon">
                        <FaThLarge />
                    </div>
                </div>
                <button className="logout-btn" onClick={handleLogout}>
                    <FaSignOutAlt />
                </button>
            </aside>

            {/* Main Content */}
            <main className="main-content">
                <header className="header">
                    <div>
                        <h1 className="header-title">Manage Restaurant Management</h1>
                        <p className="breadcrumb">Home &gt; Menu Management</p>
                    </div>

                    <div className="header-right">
                        <div className="bell-container">
                            <FaBell className="bell-icon" />
                            <span className="notification-badge">2</span>
                        </div>
                        <div className="profile-card">
                            <img
                                src="https://randomuser.me/api/portraits/men/32.jpg"
                                alt="profile"
                            />
                            <div>
                                <h4>Shane Watson</h4>
                                <p>Admin</p>
                            </div>
                        </div>
                    </div>
                </header>

                <div className="bg-white p-6 rounded-2xl">
                    <div className="toolbar">
                        <div className="search-bar">
                            <FaSearch className="search-icon" />
                            <input
                                type="text"
                                placeholder="Search"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <div className="toolbar-right">
                            <input type="date" defaultValue="2025-12-31" />
                            <button className="add-btn" onClick={handleAddNew}>
                                + Add New Restaurant
                            </button>
                        </div>
                    </div>

                    {/* Table */}
                    <div className="table-container rounded-2xl">
                        <table>
                            <thead>
                                <tr>
                                    <th>UUID</th>
                                    <th>Restaurant Name</th>
                                    <th>Phone No</th>
                                    <th>Address</th>
                                    <th>Square Account Status</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentItems.map((item) => (
                                    <tr key={item.uuid}>
                                        <td>{item.uuid}</td>
                                        <td>{item.name}</td>
                                        <td>{item.phone}</td>
                                        <td>{item.address}</td>
                                        <td>{item.status}</td>
                                        <td>
                                            <label className="switch">
                                                <input
                                                    type="checkbox"
                                                    checked={item.enabled}
                                                    onChange={() => handleToggle(item.uuid)}
                                                />
                                                <span className="slider"></span>
                                            </label>
                                            <span
                                                className={`toggle-text ${item.enabled ? "on" : "off"
                                                    }`}
                                            >
                                                {item.enabled ? "Enable" : "Disable"}
                                            </span>
                                        </td>
                                        <td className="actions">
                                            <button
                                                className="edit-btn"
                                                onClick={() => handleEdit(item)}
                                            >
                                                <FaEdit />
                                            </button>
                                            <button
                                                className="delete-btn"
                                                onClick={() => handleDelete(item.uuid)}
                                            >
                                                <FaTrash />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        {/* Pagination */}
                        <div className="pagination">
                            <p>
                                Showing {startIndex + 1} to{" "}
                                {Math.min(endIndex, filteredData.length)} of{" "}
                                {filteredData.length} entries
                            </p>
                            <div className="pagination-buttons">
                                <button
                                    onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                                    disabled={currentPage === 1}
                                >
                                    Prev
                                </button>
                                {Array.from({ length: totalPages }, (_, i) => (
                                    <button
                                        key={i + 1}
                                        onClick={() => setCurrentPage(i + 1)}
                                        className={currentPage === i + 1 ? "active" : ""}
                                    >
                                        {i + 1}
                                    </button>
                                ))}
                                <button
                                    onClick={() =>
                                        setCurrentPage((p) => Math.min(p + 1, totalPages))
                                    }
                                    disabled={currentPage === totalPages}
                                >
                                    Next
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {/* Add/Edit Modal */}
            {showModal && (
                <div className="modal-overlay">
                    <div className="modal relative">
                        <button
                            className="close-btn absolute top-2 right-2"
                            onClick={() => setShowModal(false)}
                        >
                            ✘
                        </button>

                        <h2>{editingItem ? "Edit Restaurant" : "Add New Restaurant"}</h2>
                        <form onSubmit={handleModalSubmit}>
                            <label>Restaurant Name</label>
                            <input
                                type="text"
                                placeholder="Enter name"
                                value={formData.name}
                                onChange={(e) =>
                                    setFormData({ ...formData, name: e.target.value })
                                }
                                required
                            />
                            <label>Phone Number</label>
                            <input
                                type="number"
                                placeholder="Enter phone number"
                                value={formData.phone}
                                onChange={(e) =>
                                    setFormData({ ...formData, phone: e.target.value })
                                }
                                required
                            />
                            <label>Address</label>
                            <input
                                type="text"
                                placeholder="Enter address"
                                value={formData.address}
                                onChange={(e) =>
                                    setFormData({ ...formData, address: e.target.value })
                                }
                                required
                            />
                            <div className="modal-buttons">
                                <button type="submit" className="save-btn">
                                    {editingItem ? "Update Restaurant" : "Add Restaurant"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Delete Confirmation Modal */}
            {showDeleteModal && (
                <div className="modal-overlay">
                    <div className="modal delete-modal">
                        {/* Cross Button */}
                        <button
                            className="close-btn delete-close"
                            onClick={() => setShowDeleteModal(false)}
                        >
                            <FaTimes />
                        </button>
                        <h2>Are you sure you want to delete the Restaurant?</h2>
                        <div className="modal-buttons">
                            <button
                                className="cancel-btn"
                                onClick={() => setShowDeleteModal(false)}
                            >
                                Cancel
                            </button>
                            <button className="delete-confirm" onClick={handleDeleteConfirm}>
                                Yes, Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
