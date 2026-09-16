import { createDb, users } from "@bolivibes/db";
import { cf } from "@/lib/cloudflare";
import { updateUserRole, setUserVip } from "../actions/users";
import DeleteUserButton from "./delete-user-button";
import CreateUserModal from "./create-user-modal";

export default async function AdminUsersPage() {
  const { env } = cf();
  const db = createDb(env.DB);
  const rows = await db.select().from(users).orderBy(users.createdAt);

  return (
    <div>
      <CreateUserModal />

      <div className="a-table-wrap">
        <table className="a-table">
          <thead>
            <tr>
              <th>Email</th>
              <th>Name</th>
              <th>Role</th>
              <th>BoliPass VIP</th>
              <th>NIT</th>
              <th>Joined</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((user) => (
              <tr key={user.id}>
                <td>{user.email}</td>
                <td>{user.fullName ?? "—"}</td>
                <td>
                  {user.role === "admin" ? (
                    <span className="a-badge a-badge-charcoal" style={{ marginLeft: 0 }}>
                      admin
                    </span>
                  ) : (
                    <form action={updateUserRole} className="a-checkbox-row">
                      <input type="hidden" name="userId" value={user.id} />
                      <select name="role" defaultValue={user.role ?? "visitor"} className="a-select" style={{ width: "auto" }}>
                        <option value="visitor">visitor</option>
                        <option value="host">host</option>
                      </select>
                      <button type="submit" className="clay-btn clay-btn-sm">
                        Save
                      </button>
                    </form>
                  )}
                </td>
                <td>
                  <form action={setUserVip} className="a-checkbox-row" style={{ flexWrap: "wrap" }}>
                    <input type="hidden" name="userId" value={user.id} />
                    <label className="a-checkbox-row">
                      <input type="checkbox" name="isBolipassActive" defaultChecked={Boolean(user.isBolipassActive)} />
                      Active
                    </label>
                    <input
                      type="date"
                      name="bolipassExpiresAt"
                      defaultValue={user.bolipassExpiresAt?.slice(0, 10) ?? ""}
                      className="a-input"
                      style={{ width: "auto" }}
                    />
                    <button type="submit" className="clay-btn clay-sage clay-btn-sm">
                      Save
                    </button>
                  </form>
                </td>
                <td>{user.nit ?? "—"}</td>
                <td>{user.createdAt?.slice(0, 10) ?? "—"}</td>
                <td>
                  {user.role !== "admin" ? (
                    <DeleteUserButton userId={user.id} userEmail={user.email} />
                  ) : (
                    <span className="a-muted">—</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
