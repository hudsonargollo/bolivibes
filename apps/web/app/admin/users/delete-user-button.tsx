"use client";

import { deleteUser } from "../actions/users";

export default function DeleteUserButton({ userId, userEmail }: { userId: string; userEmail: string }) {
  return (
    <form
      action={deleteUser}
      onSubmit={(e) => {
        if (!window.confirm(`Are you sure you want to delete user ${userEmail}?`)) {
          e.preventDefault();
        }
      }}
    >
      <input type="hidden" name="userId" value={userId} />
      <button type="submit" className="clay-btn clay-btn-sm" style={{ background: "#c83727", color: "#fff" }}>
        Delete
      </button>
    </form>
  );
}
