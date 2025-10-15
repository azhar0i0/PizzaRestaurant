import React from "react";
import { FaTimes } from "react-icons/fa";

export default function AddNew({
  type, // "category" or "menu"
  show,
  onClose,
  onSubmit,
  formData,
  setFormData,
  categories = [],
  isEditing,
}) {
  if (!show) return null;

  const handleChange = (field, value) =>
    setFormData((s) => ({ ...s, [field]: value }));

  return (
    <div className="modal-overlay">
      <div className="modal">
        <button className="close-btn" onClick={onClose}>
          ✘
        </button>

        <h2 className="modal-title">
          {isEditing
            ? type === "category"
              ? "Edit Category"
              : "Edit Menu Item"
            : type === "category"
              ? "Add New Category"
              : "Add New Menu Item"}
        </h2>

        <form onSubmit={onSubmit} className="modal-scrollable">
          {type === "category" ? (
            <>
              <div className="form-group">
                <label>Category Name <span className="required">*</span></label>
                <input
                  placeholder="e.g. Starters, Main Course, Desserts"
                  value={formData.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label>Description</label>
                <input
                  placeholder="Short description (optional)"
                  value={formData.description}
                  onChange={(e) => handleChange("description", e.target.value)}
                />
              </div>
            </>
          ) : (
            <>
              <div className="form-group">
                <label>Dish Name <span className="required">*</span></label>
                <input
                  placeholder="e.g. Spicy Chicken Wings"
                  value={formData.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label>Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => handleChange("category", e.target.value)}
                >
                  {categories.length === 0 ? (
                    <option>No categories available</option>
                  ) : (
                    categories.map((c) => (
                      <option key={c.uuid} value={c.name}>
                        {c.name}
                      </option>
                    ))
                  )}
                </select>
              </div>

              <div className="form-group">
                <label>Price ($)</label>
                <input
                  type="number"
                  placeholder="e.g. 12.99"
                  value={formData.price}
                  onChange={(e) => handleChange("price", e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>Description</label>
                <textarea
                  rows="3"
                  placeholder="Briefly describe the dish (ingredients, taste, etc.)"
                  value={formData.description}
                  onChange={(e) => handleChange("description", e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>TikTok Video Link</label>
                <input
                  type="url"
                  placeholder="e.g. https://www.tiktok.com/@restaurant/video/12345"
                  value={formData.tiktok}
                  onChange={(e) => handleChange("tiktok", e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>Instagram Reel Link</label>
                <input
                  type="url"
                  placeholder="e.g. https://www.instagram.com/reel/abc123"
                  value={formData.insta}
                  onChange={(e) => handleChange("insta", e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>Display Position</label>
                <input
                  type="number"
                  placeholder="e.g. 1 (higher = earlier in list)"
                  value={formData.position}
                  onChange={(e) => handleChange("position", e.target.value)}
                />
              </div>

              <div className="toggle-field ">
                <label>Status</label>
                <div className="toggle-wrap">
                  <label className="switch">
                    <input
                      type="checkbox"
                      checked={formData.enabled}
                      onChange={(e) => handleChange("enabled", e.target.checked)}
                    />
                    <span className="slider" />
                  </label>
                  <span
                    className={`toggle-text ${
                      formData.enabled ? "on" : "off"
                    }`}
                  >
                    {formData.enabled ? "Enabled" : "Disabled"}
                  </span>
                </div>
              </div>
            </>
          )}

          <div className="modal-buttons">
            <button type="submit" className="save-btn">
              {isEditing
                ? type === "category"
                  ? "Update Category"
                  : "Update Item"
                : type === "category"
                  ? "Add Category"
                  : "Add Item"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
