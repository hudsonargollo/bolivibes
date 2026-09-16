import { createDb, orders, products, users } from "@bolivibes/db";
import { desc } from "@bolivibes/db";
import { cf } from "@/lib/cloudflare";
import { confirmOrder, cancelOrder } from "../actions/orders";

const METHOD_LABELS: Record<string, string> = {
  stripe: "Stripe (card)",
  qr_bolivia: "QR Bolivia",
  qr_pix: "QR PIX",
  crypto: "Crypto",
};

export default async function AdminOrdersPage() {
  const { env } = cf();
  const db = createDb(env.DB);
  const [rows, allProducts, allUsers] = await Promise.all([
    db.select().from(orders).orderBy(desc(orders.createdAt)),
    db.select().from(products),
    db.select().from(users),
  ]);
  const productById = new Map(allProducts.map((p) => [p.id, p]));
  const userById = new Map(allUsers.map((u) => [u.id, u]));

  return (
    <div>
      <div className="a-actions-row">
        <h1 className="a-h1" style={{ margin: 0 }}>
          Orders
        </h1>
      </div>

      <div className="a-table-wrap">
        <table className="a-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Product</th>
              <th>User</th>
              <th>Qty</th>
              <th>Total</th>
              <th>Method</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((order) => {
              const product = productById.get(order.productId);
              const user = userById.get(order.userId);
              return (
                <tr key={order.id}>
                  <td><code>{order.id.slice(0, 8)}</code></td>
                  <td>{product?.title ?? order.productId}</td>
                  <td>{user?.email ?? order.userId}</td>
                  <td>{order.quantity}</td>
                  <td>{order.totalPriceBob} BOB</td>
                  <td>{METHOD_LABELS[order.paymentMethod] ?? order.paymentMethod}</td>
                  <td>
                    <span className={`a-badge ${order.status === "paid" ? "a-badge-sage" : order.status === "cancelled" ? "a-badge-orange" : ""}`}>
                      {order.status}
                    </span>
                  </td>
                  <td>
                    {order.status === "pending" && (
                      <div style={{ display: "flex", gap: 6 }}>
                        <form action={confirmOrder}>
                          <input type="hidden" name="orderId" value={order.id} />
                          <button type="submit" className="clay-btn clay-sage clay-btn-sm">Confirm</button>
                        </form>
                        <form action={cancelOrder}>
                          <input type="hidden" name="orderId" value={order.id} />
                          <button type="submit" className="clay-btn clay-btn-sm" style={{ background: "#c83727", color: "#fff" }}>Cancel</button>
                        </form>
                      </div>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
