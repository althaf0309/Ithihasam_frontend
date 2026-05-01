import { useState } from "react";
import { LayoutDashboard, MessageSquare, Wrench, Users, Settings, Menu, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SeoMeta } from "@/components/SeoMeta";
import { Link } from "react-router-dom";

const sidebarItems = [
  { icon: LayoutDashboard, label: "Dashboard", active: true },
  { icon: MessageSquare, label: "Enquiries" },
  { icon: Wrench, label: "Services" },
  { icon: Users, label: "Customers" },
  { icon: Settings, label: "Settings" },
];

const stats = [
  { label: "Total Enquiries", value: "1,284", color: "bg-primary" },
  { label: "New Enquiries", value: "38", color: "bg-secondary" },
  { label: "Contacted", value: "156", color: "bg-whatsapp" },
  { label: "Closed", value: "1,090", color: "bg-muted-foreground" },
];

const serviceStats = [
  { name: "Electrical & Plumbing", count: 342 },
  { name: "Painting Services", count: 287 },
  { name: "Appliance Servicing", count: 198 },
  { name: "Carpentry & Woodwork", count: 167 },
  { name: "Deep Cleaning", count: 154 },
  { name: "Metal Fabrication", count: 136 },
];

const enquiries = [
  { id: "ENQ-1284", name: "Vikram Singh", service: "Electrical", city: "Mumbai", date: "2026-04-11", status: "New" },
  { id: "ENQ-1283", name: "Sneha Patil", service: "Painting", city: "Pune", date: "2026-04-11", status: "Contacted" },
  { id: "ENQ-1282", name: "Amit Joshi", service: "Deep Cleaning", city: "Bangalore", date: "2026-04-10", status: "In Progress" },
  { id: "ENQ-1281", name: "Priya P.", service: "Carpentry", city: "Chennai", date: "2026-04-10", status: "Closed" },
  { id: "ENQ-1280", name: "Rahul Mehta", service: "Appliance", city: "Mumbai", date: "2026-04-09", status: "New" },
  { id: "ENQ-1279", name: "Kavita Rao", service: "Roofing", city: "Hyderabad", date: "2026-04-09", status: "Contacted" },
];

const statusVariant: Record<string, string> = {
  New: "bg-secondary text-secondary-foreground",
  Contacted: "bg-primary text-primary-foreground",
  "In Progress": "bg-whatsapp text-whatsapp-foreground",
  Closed: "bg-muted text-muted-foreground",
};

export default function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-muted/30">
      <SeoMeta
        title="Admin Dashboard | Ithihasam"
        description="Internal dashboard for managing Ithihasam service enquiries, bookings, and operations."
        keywords={["Ithihasam admin", "booking dashboard", "service enquiries dashboard", "internal operations"]}
        robots="noindex, nofollow"
      />
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-40 w-60 transform bg-sidebar text-sidebar-foreground transition-transform md:static md:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="flex h-14 items-center justify-between border-b border-sidebar-border px-4">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded bg-primary">
              <span className="text-[10px] font-bold text-primary-foreground">HS</span>
            </div>
            <span className="text-sm font-bold">HomeServ Admin</span>
          </Link>
          <button className="md:hidden" onClick={() => setSidebarOpen(false)}>
            <X size={18} />
          </button>
        </div>
        <nav className="p-3 space-y-1">
          {sidebarItems.map((item) => (
            <button
              key={item.label}
              className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors ${item.active ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium" : "text-sidebar-foreground/60 hover:bg-sidebar-accent/50"}`}
            >
              <item.icon size={18} />
              {item.label}
            </button>
          ))}
        </nav>
      </aside>

      {sidebarOpen && <div className="fixed inset-0 z-30 bg-foreground/40 md:hidden" onClick={() => setSidebarOpen(false)} />}

      {/* Main content */}
      <div className="flex-1">
        <header className="flex h-14 items-center gap-3 border-b bg-background px-4">
          <button className="md:hidden" onClick={() => setSidebarOpen(true)}>
            <Menu size={20} />
          </button>
          <h1 className="text-lg font-bold text-foreground">Dashboard</h1>
          <div className="ml-auto">
            <Input placeholder="Search enquiries..." className="w-48 text-sm" />
          </div>
        </header>

        <main className="p-4 md:p-6 space-y-6">
          {/* Stats Cards */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="rounded-xl border bg-card p-5 shadow-[var(--card-shadow)]">
                <p className="text-xs font-medium text-muted-foreground">{stat.label}</p>
                <p className="mt-1 text-2xl font-bold text-foreground">{stat.value}</p>
                <div className={`mt-2 h-1 w-12 rounded-full ${stat.color}`} />
              </div>
            ))}
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {/* Enquiry Table */}
            <div className="lg:col-span-2 rounded-xl border bg-card shadow-[var(--card-shadow)]">
              <div className="flex items-center justify-between border-b p-4">
                <h2 className="font-bold text-foreground">Recent Enquiries</h2>
                <Button variant="outline" size="sm">View All</Button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b bg-muted/50">
                      <th className="px-4 py-3 text-left font-medium text-muted-foreground">ID</th>
                      <th className="px-4 py-3 text-left font-medium text-muted-foreground">Name</th>
                      <th className="px-4 py-3 text-left font-medium text-muted-foreground">Service</th>
                      <th className="px-4 py-3 text-left font-medium text-muted-foreground">City</th>
                      <th className="px-4 py-3 text-left font-medium text-muted-foreground">Date</th>
                      <th className="px-4 py-3 text-left font-medium text-muted-foreground">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {enquiries.map((enq) => (
                      <tr key={enq.id} className="border-b last:border-0 hover:bg-muted/30">
                        <td className="px-4 py-3 font-medium text-foreground">{enq.id}</td>
                        <td className="px-4 py-3 text-foreground">{enq.name}</td>
                        <td className="px-4 py-3 text-muted-foreground">{enq.service}</td>
                        <td className="px-4 py-3 text-muted-foreground">{enq.city}</td>
                        <td className="px-4 py-3 text-muted-foreground">{enq.date}</td>
                        <td className="px-4 py-3">
                          <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${statusVariant[enq.status]}`}>
                            {enq.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Service Stats */}
            <div className="rounded-xl border bg-card p-4 shadow-[var(--card-shadow)]">
              <h2 className="mb-4 font-bold text-foreground">Enquiries by Service</h2>
              <div className="space-y-3">
                {serviceStats.map((s) => (
                  <div key={s.name}>
                    <div className="mb-1 flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">{s.name}</span>
                      <span className="font-medium text-foreground">{s.count}</span>
                    </div>
                    <div className="h-2 rounded-full bg-muted">
                      <div
                        className="h-2 rounded-full bg-primary"
                        style={{ width: `${(s.count / 342) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
