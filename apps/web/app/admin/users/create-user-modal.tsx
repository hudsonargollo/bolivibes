"use client";

import { useState } from "react";
import { createAdminUser } from "../actions/users";

export default function CreateUserModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  async function handleAction(formData: FormData) {
    setSubmitting(true);
    try {
      await createAdminUser(formData);
      setIsOpen(false);
    } catch (err: any) {
      alert(err?.message || "Failed to create user");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <div></div>
        <button
          onClick={() => setIsOpen(true)}
          className="clay-btn"
        >
          + New user
        </button>
      </div>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-lg bg-stone-950 border border-stone-800 rounded-3xl p-6 sm:p-8 shadow-2xl relative space-y-6">
            <div className="flex items-center justify-between border-b border-stone-800 pb-4">
              <h2 className="text-lg font-bold text-stone-100">Create New User</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-full bg-stone-900 text-stone-400 hover:text-stone-100 flex items-center justify-center font-bold"
              >
                ✕
              </button>
            </div>

            <form action={handleAction} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-stone-300">Email</label>
                  <input name="email" type="email" required className="a-input w-full text-xs" placeholder="user@example.com" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-stone-300">Full Name (optional)</label>
                  <input name="fullName" className="a-input w-full text-xs" placeholder="John Doe" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-stone-300">Password (8+ chars)</label>
                  <input name="password" type="password" minLength={8} required className="a-input w-full text-xs" placeholder="••••••••" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-stone-300">Role</label>
                  <select name="role" defaultValue="visitor" className="a-select w-full text-xs">
                    <option value="visitor">Visitor</option>
                    <option value="host">Host</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center pt-2">
                <label className="flex items-center gap-2.5 text-xs font-bold text-stone-200 cursor-pointer">
                  <input type="checkbox" name="isBolipassActive" className="rounded" />
                  BoliPass VIP Active
                </label>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-stone-300">Expires At (optional)</label>
                  <input type="date" name="bolipassExpiresAt" className="a-input w-full text-xs" />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-stone-800">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="clay-btn clay-charcoal text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="clay-btn text-xs"
                >
                  {submitting ? "Creating..." : "Create User"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
