import { createDb, venues, vouchers } from "@bolivibes/db";
import { cf } from "@/lib/cloudflare";
import { setVoucherActive } from "../actions/vouchers";
import { AdminHubNav, COMMERCE_TABS } from "../components/hub-nav";

export default async function AdminVouchersPage() {
  const { env } = cf();
  const db = createDb(env.DB);
  const [rows, allVenues] = await Promise.all([db.select().from(vouchers), db.select().from(venues)]);
  const venueNameById = new Map(allVenues.map((v) => [v.id, v.name]));

  return (
    <div>
      <AdminHubNav tabs={COMMERCE_TABS} />
      <div className="a-actions-row">
        <h1 className="a-h1" style={{ margin: 0 }}>
          Vouchers
        </h1>
        <a href="/admin/vouchers/new" className="clay-btn">
          New voucher
        </a>
      </div>

      <div className="a-table-wrap">
        <table className="a-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Venue</th>
              <th>Discount</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {rows.map((voucher) => (
              <tr key={voucher.id}>
                <td>{voucher.title}</td>
                <td>{voucher.venueId ? venueNameById.get(voucher.venueId) ?? voucher.venueId : "—"}</td>
                <td>{voucher.discountType}</td>
                <td>
                  <form action={setVoucherActive} className="a-checkbox-row">
                    <input type="hidden" name="voucherId" value={voucher.id} />
                    <label className="a-checkbox-row">
                      <input type="checkbox" name="active" defaultChecked={Boolean(voucher.isActive)} />
                      Active
                    </label>
                    <button type="submit" className="clay-btn clay-btn-sm">Save</button>
                  </form>
                </td>
                <td>
                  <a href={`/admin/vouchers/${voucher.id}`} className="a-link">Edit</a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
