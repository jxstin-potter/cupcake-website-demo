export default function AccountPage() {
  return (
    <div className="premium-surface space-y-4 rounded-3xl p-5 md:p-6">
      <h1 className="text-3xl text-pink-900">Account (Mock)</h1>
      <p className="text-zinc-700">Sign-in, loyalty points, and order history are represented as deterministic mock data.</p>
      <section className="rounded-xl border border-pink-100 bg-white p-4">
        <h2 className="text-xl text-pink-900">Profile</h2>
        <p className="text-sm text-zinc-700">mock.customer@example.com</p>
      </section>
      <section className="rounded-xl border border-pink-100 bg-white p-4">
        <h2 className="text-xl text-pink-900">Loyalty</h2>
        <p className="text-sm text-zinc-700">Points balance: 420</p>
      </section>
      <section className="rounded-xl border border-pink-100 bg-white p-4">
        <h2 className="text-xl text-pink-900">Recent Orders</h2>
        <ul className="list-inside list-disc text-sm text-zinc-700">
          <li>Order #1001 - Best Seller Dozen - Delivered</li>
          <li>Order #0998 - Custom Dozen - Delivered</li>
        </ul>
      </section>
    </div>
  );
}
