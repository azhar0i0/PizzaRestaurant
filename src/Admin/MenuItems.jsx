import React, { useState, useMemo } from "react";
import { FaEdit, FaTrash, FaTimes, FaSearch } from "react-icons/fa";
import "./Admin.css";

export default function MenuItems({ items, onToggle, onEditItem, onDeleteItem }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const itemsPerPage = 10;

  // Filter
  const filtered = useMemo(() => {
    if (!searchTerm) return items;
    const t = searchTerm.toLowerCase();
    return items.filter(
      (it) =>
        it.name.toLowerCase().includes(t) ||
        it.category.toLowerCase().includes(t) ||
        (it.uuid && it.uuid.toLowerCase().includes(t)) ||
        (it.description && it.description.toLowerCase().includes(t)) ||
        (it.tiktok && it.tiktok.toLowerCase().includes(t)) ||
        (it.insta && it.insta.toLowerCase().includes(t)) ||
        (it.position && it.position.toLowerCase().includes(t))
    );
  }, [items, searchTerm]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / itemsPerPage));
  if (currentPage > totalPages) setCurrentPage(totalPages);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filtered.slice(startIndex, startIndex + itemsPerPage);

  const goTo = (p) => setCurrentPage(Math.max(1, Math.min(totalPages, p)));

  // Delete confirmation
  const handleDeleteConfirm = () => {
    if (deleteTarget) onDeleteItem && onDeleteItem(deleteTarget);
    setShowDeleteModal(false);
    setDeleteTarget(null);
  };

  return (
    <div className="table-area">
      <div className="table-controls">
        <div className="search-bar compact">
          <FaSearch className="search-icon" />
          <input
            placeholder="Search name, category, TikTok, Insta, or position..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>
      </div>

      <div className="table-container">
        <table className="fixed-table">
          <thead>
            <tr>
              <th style={{ width: "120px" }}>UUID</th>
              <th style={{ width: "150px" }}>Dish Name</th>
              <th style={{ width: "120px" }}>Category</th>
              <th style={{ width: "80px" }}>Price ($)</th>
              <th style={{ width: "200px" }}>Description</th>
              <th style={{ width: "120px" }}>TikTok</th>
              <th style={{ width: "120px" }}>Instagram</th>
              <th style={{ width: "100px" }}>Position</th>
              <th style={{ width: "120px" }}>Status</th>
              <th style={{ width: "100px" }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((it) => (
              <tr key={it.uuid}>
                <td className="mono">{it.uuid}</td>
                <td>{it.name}</td>
                <td>{it.category}</td>
                <td>{it.price}</td>
                <td>{it.description || "-"}</td>
                <td>{it.tiktok || "-"}</td>
                <td>{it.insta || "-"}</td>
                <td>{it.position || "-"}</td>
                <td>
                  <label className="switch">
                    <input
                      type="checkbox"
                      checked={it.enabled}
                      onChange={() => onToggle(it.uuid)}
                    />
                    <span className="slider" />
                  </label>
                  <span className={`toggle-text ${it.enabled ? "on" : "off"}`}>
                    {it.enabled ? "Enable" : "Disable"}
                  </span>
                </td>
                <td className="actions">
                  <button
                    className="edit-btn"
                    title="Edit"
                    onClick={() => onEditItem && onEditItem(it)}
                  >
                    <FaEdit />
                  </button>
                  <button
                    className="delete-btn"
                    title="Delete"
                    onClick={() => {
                      setDeleteTarget(it.uuid);
                      setShowDeleteModal(true);
                    }}
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}

            {currentItems.length === 0 && (
              <tr>
                <td colSpan={10} style={{ textAlign: "center", padding: "30px 12px" }}>
                  No items found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="pagination">
        <p>
          Showing {filtered.length === 0 ? 0 : startIndex + 1} to{" "}
          {Math.min(startIndex + itemsPerPage, filtered.length)} of{" "}
          {filtered.length} entries
        </p>

        <div className="pagination-buttons">
          <button onClick={() => goTo(currentPage - 1)} disabled={currentPage === 1}>
            Prev
          </button>

          {Array.from({ length: totalPages }, (_, i) => {
            const num = i + 1;
            if (
              totalPages > 7 &&
              Math.abs(num - currentPage) > 2 &&
              num !== 1 &&
              num !== totalPages
            ) {
              if (num === 2 || num === totalPages - 1) {
                return (
                  <button key={num} className="dots" disabled>
                    ...
                  </button>
                );
              }
              return null;
            }
            return (
              <button
                key={num}
                onClick={() => goTo(num)}
                className={currentPage === num ? "active" : ""}
              >
                {num}
              </button>
            );
          })}

          <button
            onClick={() => goTo(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="modal-overlay">
          <div className="modal delete-modal">
            <button
              className="close-btn delete-close"
              onClick={() => setShowDeleteModal(false)}
            >
              ✘
            </button>
            <h2>Are you sure you want to delete this Menu Item?</h2>
            <div className="modal-buttons">
              <button className="cancel-btn" onClick={() => setShowDeleteModal(false)}>
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
