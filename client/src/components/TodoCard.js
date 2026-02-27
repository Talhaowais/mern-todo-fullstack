import React from "react";

export default function TodoCard({ todo, onEdit, onDelete, loadingDelete }) {
  return (
    <div style={{
      background: "rgba(255,255,255,0.1)",
      padding: "15px",
      borderRadius: "12px",
      marginBottom: "12px",
      display: "flex",
      justifyContent: "space-between",
    }}>
      <span>{todo.task}</span>
      <div>
        <button onClick={() => onEdit(todo)} style={{ marginRight: "8px", padding: "6px 12px", borderRadius: "8px", border: "none", background: "#ffc107", cursor: "pointer" }}>Edit</button>
        <button
          onClick={() => onDelete(todo._id)}
          disabled={loadingDelete === todo._id}
          style={{ padding: "6px 12px", borderRadius: "8px", border: "none", background: "#ff4d4d", color: "#fff", cursor: "pointer" }}
        >
          {loadingDelete === todo._id ? "..." : "Delete"}
        </button>
      </div>
    </div>
  );
}