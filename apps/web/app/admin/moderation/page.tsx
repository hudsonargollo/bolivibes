import { createDb, userReports, users } from "@bolivibes/db";
import { eq, desc } from "@bolivibes/db";
import { cf } from "@/lib/cloudflare";
import { dismissReport, banReportedUser } from "../actions/moderation";
import { AdminHubNav, COMMUNITY_TABS } from "../components/hub-nav";

export default async function AdminModerationPage() {
  const { env } = cf();
  const db = createDb(env.DB);
  const [rows, allUsers] = await Promise.all([
    db.select().from(userReports).where(eq(userReports.status, "open")).orderBy(desc(userReports.createdAt)),
    db.select().from(users),
  ]);
  const userById = new Map(allUsers.map((u) => [u.id, u]));

  return (
    <div>
      <AdminHubNav tabs={COMMUNITY_TABS} />
      <h1 className="a-h1">Moderation</h1>
      <p className="a-muted" style={{ marginTop: -12, marginBottom: 20 }}>
        Open reports from VIP Connect. Dismiss if there's nothing to act on, or ban — a banned user's session stops
        working immediately, everywhere.
      </p>

      <div className="a-table-wrap">
        <table className="a-table">
          <thead>
            <tr>
              <th>Reporter</th>
              <th>Reported User</th>
              <th>Reason</th>
              <th>Context</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((report) => {
              const reporter = userById.get(report.reporterId);
              const reported = userById.get(report.reportedId);
              return (
                <tr key={report.id}>
                  <td>{reporter?.email ?? report.reporterId}</td>
                  <td style={{ fontWeight: 700 }}>{reported?.email ?? report.reportedId}</td>
                  <td><span className="a-badge a-badge-orange">{report.reason}</span></td>
                  <td>{report.context ?? "—"}</td>
                  <td>{report.createdAt?.slice(0, 10)}</td>
                  <td>
                    <div style={{ display: "flex", gap: 6 }}>
                      <form action={dismissReport}>
                        <input type="hidden" name="reportId" value={report.id} />
                        <button type="submit" className="clay-btn clay-btn-sm">Dismiss</button>
                      </form>
                      <form action={banReportedUser}>
                        <input type="hidden" name="reportId" value={report.id} />
                        <input type="hidden" name="reportedId" value={report.reportedId} />
                        <button type="submit" className="clay-btn clay-btn-sm" style={{ background: "#c83727", color: "#fff" }}>Ban User</button>
                      </form>
                    </div>
                  </td>
                </tr>
              );
            })}
            {rows.length === 0 && (
              <tr>
                <td colSpan={6} className="a-muted" style={{ textAlign: "center", padding: 32 }}>
                  No open moderation reports.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
