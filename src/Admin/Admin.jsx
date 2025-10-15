import React, { useState, useMemo } from "react";
import {
  FaBell,
  FaSearch,
  FaEdit,
  FaTrash,
  FaSignOutAlt,
  FaThLarge,
  FaTimes,
} from "react-icons/fa";
import Sidebar from "./Sidebar";
import MenuItems from "./MenuItems";
import AddNew from "./AddNew"; // ✅ added reusable modal component
import { generateCategories, generateMenuItems } from "./DemiData";
import "./Admin.css";

export default function Admin() {
  const [categories, setCategories] = useState(() => generateCategories(34));
  const [menuItems, setMenuItems] = useState(() => generateMenuItems(128));

  const [activeTab, setActiveTab] = useState("categories");
  const [sidebarActive, setSidebarActive] = useState("menu");
  const [catSearch, setCatSearch] = useState("");
  const [catPage, setCatPage] = useState(1);
  const itemsPerPage = 10;

  // Category Modals
  const [showCatModal, setShowCatModal] = useState(false);
  const [editingCat, setEditingCat] = useState(null);
  const [form, setForm] = useState({ name: "", description: "" });

  // Menu Item Modals
  const [showMenuModal, setShowMenuModal] = useState(false);
  const [editingMenu, setEditingMenu] = useState(null);
  const [menuForm, setMenuForm] = useState({
    name: "",
    category: "",
    price: "",
    description: "",
    tiktok: "",
    insta: "",
    position: "",
    enabled: false,
  });

  // Delete Modal
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);

  // CATEGORY actions
  const toggleCategory = (uuid) =>
    setCategories((prev) =>
      prev.map((c) => (c.uuid === uuid ? { ...c, enabled: !c.enabled } : c))
    );

  const handleAddCategory = () => {
    setEditingCat(null);
    setForm({ name: "", description: "" });
    setShowCatModal(true);
  };

  const handleEditCategory = (cat) => {
    setEditingCat(cat);
    setForm({ name: cat.name, description: cat.description });
    setShowCatModal(true);
  };

  const handleDeleteCategory = (uuid) => {
    setDeleteTarget(uuid);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = () => {
    if (deleteTarget) {
      if (activeTab === "categories") {
        setCategories((prev) => prev.filter((c) => c.uuid !== deleteTarget));
      } else {
        setMenuItems((prev) => prev.filter((m) => m.uuid !== deleteTarget));
      }
    }
    setShowDeleteModal(false);
    setDeleteTarget(null);
  };

  const handleCatSubmit = (e) => {
    e.preventDefault();
    if (editingCat) {
      setCategories((prev) =>
        prev.map((c) => (c.uuid === editingCat.uuid ? { ...c, ...form } : c))
      );
    } else {
      const newCat = {
        uuid: (
          Date.now().toString(36) + Math.random().toString(36).slice(2, 8)
        ).slice(0, 16),
        name: form.name || "New Category",
        description: form.description || "",
        enabled: false,
      };
      setCategories((prev) => [newCat, ...prev]);
    }
    setShowCatModal(false);
  };

  // MENU ITEM actions
  const toggleMenuItem = (uuid) =>
    setMenuItems((prev) =>
      prev.map((m) => (m.uuid === uuid ? { ...m, enabled: !m.enabled } : m))
    );

  const handleAddMenuItem = () => {
    setEditingMenu(null);
    setMenuForm({
      name: "",
      category: categories[0]?.name || "",
      price: "",
      description: "",
      tiktok: "",
      insta: "",
      position: "",
      enabled: false,
    });
    setShowMenuModal(true);
  };

  const handleEditMenuItem = (item) => {
    setEditingMenu(item);
    setMenuForm({
      name: item.name,
      category: item.category,
      price: item.price,
      description: item.description,
      tiktok: item.tiktok,
      insta: item.insta,
      position: item.position,
      enabled: item.enabled,
    });
    setShowMenuModal(true);
  };

  const handleMenuSubmit = (e) => {
    e.preventDefault();
    if (editingMenu) {
      setMenuItems((prev) =>
        prev.map((m) => (m.uuid === editingMenu.uuid ? { ...m, ...menuForm } : m))
      );
    } else {
      const newItem = {
        uuid: (
          Date.now().toString(36) + Math.random().toString(36).slice(2, 8)
        ).slice(0, 16),
        ...menuForm,
      };
      setMenuItems((prev) => [newItem, ...prev]);
    }
    setShowMenuModal(false);
  };

  const deleteMenuItem = (uuid) => {
    setDeleteTarget(uuid);
    setShowDeleteModal(true);
  };

  // Category filtering & pagination
  const filteredCats = useMemo(() => {
    if (!catSearch) return categories;
    const t = catSearch.toLowerCase();
    return categories.filter(
      (c) =>
        c.name.toLowerCase().includes(t) ||
        c.description.toLowerCase().includes(t) ||
        c.uuid.includes(t)
    );
  }, [categories, catSearch]);

  const totalCatPages = Math.max(1, Math.ceil(filteredCats.length / itemsPerPage));
  if (catPage > totalCatPages) setCatPage(totalCatPages);
  const catStart = (catPage - 1) * itemsPerPage;
  const currentCats = filteredCats.slice(catStart, catStart + itemsPerPage);

  return (
    <div className="admin-container">
      <Sidebar active={sidebarActive} onSelect={(k) => setSidebarActive(k)} />

      <main className="main-content">
        {/* Header */}
        <header className="header header-exact">
          <div className="header-left">
            <h1 className="header-title">Menu Management</h1>
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

        <div className="content-box">
          <div className="tabs">
            <div className="left-tabs">
              <button
                className={`tab-btn ${activeTab === "categories" ? "active" : ""}`}
                onClick={() => setActiveTab("categories")}
              >
                Categories
              </button>
              <button
                className={`tab-btn ${activeTab === "menuitems" ? "active" : ""}`}
                onClick={() => setActiveTab("menuitems")}
              >
                Menu Items
              </button>
            </div>

            <div className="right-tools">
              <input type="date" defaultValue="2025-12-31" />
              <button
                className="add-btn"
                onClick={() =>
                  activeTab === "categories"
                    ? handleAddCategory()
                    : handleAddMenuItem()
                }
              >
                {activeTab === "categories"
                  ? "+ Add New Category"
                  : "+ Add New Menu Item"}
              </button>
            </div>
          </div>

          {/* Categories */}
          {activeTab === "categories" ? (
            <>
              <div className="search-bar">
                <FaSearch className="search-icon" />
                <input
                  placeholder="Search categories"
                  value={catSearch}
                  onChange={(e) => {
                    setCatSearch(e.target.value);
                    setCatPage(1);
                  }}
                />
              </div>

              <div className="table-container">
                <table>
                  <thead>
                    <tr>
                      <th>UUID</th>
                      <th>Category Name</th>
                      <th>Description</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentCats.map((c) => (
                      <tr key={c.uuid}>
                        <td className="mono">{c.uuid}</td>
                        <td>{c.name}</td>
                        <td>{c.description}</td>
                        <td>
                          <label className="switch">
                            <input
                              type="checkbox"
                              checked={c.enabled}
                              onChange={() => toggleCategory(c.uuid)}
                            />
                            <span className="slider" />
                          </label>
                          <span
                            className={`toggle-text ${c.enabled ? "on" : "off"}`}
                          >
                            {c.enabled ? "Enable" : "Disable"}
                          </span>
                        </td>
                        <td className="actions">
                          <button
                            className="edit-btn"
                            title="Edit"
                            onClick={() => handleEditCategory(c)}
                          >
                            <FaEdit />
                          </button>
                          <button
                            className="delete-btn"
                            title="Delete"
                            onClick={() => handleDeleteCategory(c.uuid)}
                          >
                            <FaTrash />
                          </button>
                        </td>
                      </tr>
                    ))}
                    {currentCats.length === 0 && (
                      <tr>
                        <td
                          colSpan={6}
                          style={{ textAlign: "center", padding: "30px 12px" }}
                        >
                          No categories found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </>
          ) : (
            <MenuItems
              items={menuItems}
              onToggle={toggleMenuItem}
              onEditItem={handleEditMenuItem}
              onDeleteItem={deleteMenuItem}
            />
          )}
        </div>
      </main>

      {/* ✅ Reusable Add/Edit Category Modal */}
      <AddNew
        type="category"
        show={showCatModal}
        onClose={() => setShowCatModal(false)}
        onSubmit={handleCatSubmit}
        formData={form}
        setFormData={setForm}
        isEditing={!!editingCat}
      />

      {/* ✅ Reusable Add/Edit Menu Item Modal */}
      <AddNew
        type="menu"
        show={showMenuModal}
        onClose={() => setShowMenuModal(false)}
        onSubmit={handleMenuSubmit}
        formData={menuForm}
        setFormData={setMenuForm}
        categories={categories}
        isEditing={!!editingMenu}
      />

      {/* Delete Confirmation */}
      {showDeleteModal && (
        <div className="modal-overlay">
          <div className="modal delete-modal">
            <button
              className="close-btn delete-close"
              onClick={() => setShowDeleteModal(false)}
            >
              ✘
            </button>
            <h2>Are you sure you want to delete this Categorie?</h2>
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
