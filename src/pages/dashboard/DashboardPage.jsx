import { useEffect, useState } from "react";

export default function DashboardPage() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [tagFilter, setTagFilter] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        setError("");

        const username = localStorage.getItem("username");
        const password = localStorage.getItem("password");
        const authHeader = "Basic " + btoa(`${username}:${password}`);

        const res = await fetch(
          "https://tamkeen-dev.com/api/users-list?_format=json&items_per_page=50",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: authHeader,
            },
          }
        );

        if (!res.ok) {
          throw new Error(`Error ${res.status}: ${res.statusText}`);
        }

        const data = await res.json();
        setUsers(data.rows || []);
        setFilteredUsers(data.rows || []);
      } catch (err) {
        setError(err.message || "Failed to load users");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // --- Filtering logic ---
  useEffect(() => {
    let filtered = [...users];

    // Live search
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (u) =>
          u.name.toLowerCase().includes(term) ||
          u.mail.toLowerCase().includes(term) ||
          u.field_name?.toLowerCase().includes(term) ||
          u.field_surname?.toLowerCase().includes(term)
      );
    }

    // Category filter (example: gender)
    if (categoryFilter) {
      filtered = filtered.filter(
        (u) => u.field_gender?.toLowerCase() === categoryFilter.toLowerCase()
      );
    }

    // Tag filter (example: status)
    if (tagFilter) {
      filtered = filtered.filter((u) => u.status === tagFilter);
    }

    setFilteredUsers(filtered);
  }, [searchTerm, categoryFilter, tagFilter, users]);

  // --- Actions ---
  const handleEdit = (uid) => {
    alert(
      `Edit user ${uid} — here you can open a modal or navigate to edit page`
    );
  };

  const handleDelete = (uid) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      // Call DELETE API here
      setUsers((prev) => prev.filter((u) => u.uid !== uid));
    }
  };

  // --- Statistics ---
  const totalUsers = users.length;
  const withFirstName = users.filter((u) => u.field_name?.trim()).length;
  const withSurname = users.filter((u) => u.field_surname?.trim()).length;
  const withEmail = users.filter((u) => u.mail?.trim()).length;

  return (
    <div className="container py-4">
      <h1 className="mb-4">📊 Dashboard</h1>

      {/* Stats Cards */}
      <div className="row mb-4">
        <div className="col-md-3 col-sm-6 mb-3">
          <div className="card shadow-sm border-0 text-center p-3">
            <h5>Total Users</h5>
            <h2>{totalUsers}</h2>
          </div>
        </div>
        <div className="col-md-3 col-sm-6 mb-3">
          <div className="card shadow-sm border-0 text-center p-3">
            <h5>With First Name</h5>
            <h2>{withFirstName}</h2>
          </div>
        </div>
        <div className="col-md-3 col-sm-6 mb-3">
          <div className="card shadow-sm border-0 text-center p-3">
            <h5>With Surname</h5>
            <h2>{withSurname}</h2>
          </div>
        </div>
        <div className="col-md-3 col-sm-6 mb-3">
          <div className="card shadow-sm border-0 text-center p-3">
            <h5>With Email</h5>
            <h2>{withEmail}</h2>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="card shadow-sm border-0 mb-4">
        <div className="card-body">
          <div className="row g-3">
            <div className="col-md-4">
              <input
                type="text"
                className="form-control"
                placeholder="Search by name, email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="col-md-4">
              <select
                className="form-select"
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
              >
                <option value="">Filter by Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
            <div className="col-md-4">
              <select
                className="form-select"
                value={tagFilter}
                onChange={(e) => setTagFilter(e.target.value)}
              >
                <option value="">Filter by Status</option>
                <option value="1">Active</option>
                <option value="0">Inactive</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="card shadow-sm border-0">
        <div className="card-body">
          <h5 className="mb-3">👥 Users List</h5>

          {loading && <p>Loading users...</p>}
          {error && <p className="text-danger">{error}</p>}

          {!loading && !error && (
            <div className="table-responsive">
              <table className="table table-striped table-hover align-middle">
                <thead className="table-dark">
                  <tr>
                    <th>UID</th>
                    <th>Username</th>
                    <th>First Name</th>
                    <th>Surname</th>
                    <th>Email</th>
                    <th>Mobile</th>
                    <th>Created</th>
                    <th>Last Login</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((u) => (
                    <tr key={u.uid}>
                      <td>{u.uid}</td>
                      <td>{u.name}</td>
                      <td>{u.field_name || "-"}</td>
                      <td>{u.field_surname || "-"}</td>
                      <td>{u.mail || "-"}</td>
                      <td>{u.field_mobile || "-"}</td>
                      <td dangerouslySetInnerHTML={{ __html: u.created }}></td>
                      <td dangerouslySetInnerHTML={{ __html: u.login }}></td>
                      <td>
                        <button
                          className="btn btn-sm me-2"
                          onClick={() => handleEdit(u.uid)}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-sm btn-danger"
                          onClick={() => handleDelete(u.uid)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                  {filteredUsers.length === 0 && (
                    <tr>
                      <td colSpan="9" className="text-center">
                        No users found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
