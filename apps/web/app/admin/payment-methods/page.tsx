import { createDb, paymentMethods } from "@bolivibes/db";
import { cf } from "@/lib/cloudflare";

const METHOD_LABELS: Record<string, string> = {
  qr_bolivia: "QR Bolivia",
  qr_pix: "QR PIX (Brazil)",
  crypto: "Crypto",
};

export default async function AdminPaymentMethodsPage() {
  const { env } = cf();
  const db = createDb(env.DB);
  const rows = await db.select().from(paymentMethods);

  return (
    <div>
      <div className="a-actions-row">
        <h1 className="a-h1" style={{ margin: 0 }}>
          Payment methods
        </h1>
        <a href="/admin/payment-methods/new" className="clay-btn">
          New method
        </a>
      </div>
      <p className="a-muted" style={{ marginTop: -12, marginBottom: 20 }}>
        Manual receiving details shown at BoliPass checkout when users pick QR Bolivia, PIX, or Crypto.
      </p>

      <div className="a-table-wrap">
        <table className="a-table">
          <thead>
            <tr>
              <th>Method</th>
              <th>Label</th>
              <th>Address / Key</th>
              <th>Active</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {rows.map((m) => (
              <tr key={m.id}>
                <td><code>{METHOD_LABELS[m.method] ?? m.method}</code></td>
                <td>{m.label}</td>
                <td><small>{m.addressOrKey ?? "—"}</small></td>
                <td>
                  {m.active ? <span className="a-text-sage">Active</span> : <span className="a-muted">Disabled</span>}
                </td>
                <td>
                  <a href={`/admin/payment-methods/${m.id}`} className="a-link">Edit</a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
