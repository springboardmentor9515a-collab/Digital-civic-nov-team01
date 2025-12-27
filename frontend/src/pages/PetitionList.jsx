import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";

export default function PetitionList() {
  const { user } = useContext(AuthContext);
  const [petitions, setPetitions] = useState([]);
  const [filters, setFilters] = useState({
    category: "",
    status: "active",
    location: "",
  });

  // Fetch Petitions when filters change
  useEffect(() => {
    const fetchPetitions = async () => {
      try {
        // Construct Query Params
        const params = new URLSearchParams(filters);
        // Remove empty filters
        if (!filters.category) params.delete("category");
        if (!filters.location) params.delete("location");
        
        const { data } = await axios.get(`http://localhost:5000/api/petitions?${params.toString()}`);
        setPetitions(data.data); // data.data because backend sends { success: true, data: [] }
      } catch (err) {
        console.error("Error fetching petitions", err);
      }
    };
    fetchPetitions();
  }, [filters]);

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  return (
    <div style={styles.container}>
      <div style={styles.headerRow}>
        <h2 style={styles.title}>Community Petitions</h2>
        {/* Check Role: Only Citizens see "Start Petition" */}
        {user?.role === "citizen" && (
          <Link to="/create-petition" style={styles.createBtn}>+ Start Petition</Link>
        )}
      </div>

      {/* --- FILTERS (Checklist 3) --- */}
      <div style={styles.filterBar}>
        <select name="category" onChange={handleFilterChange} style={styles.select}>
          <option value="">All Categories</option>
          <option value="Environment">Environment</option>
          <option value="Infrastructure">Infrastructure</option>
          <option value="Education">Education</option>
        </select>

        <select name="status" onChange={handleFilterChange} style={styles.select}>
          <option value="active">Active</option>
          <option value="under_review">Under Review</option>
          <option value="closed">Closed</option>
        </select>

        <input 
          name="location" 
          placeholder="Filter by City..." 
          onChange={handleFilterChange} 
          style={styles.input}
        />
      </div>

      {/* --- LIST VIEW (Checklist 2) --- */}
      <div style={styles.grid}>
        {petitions.map((p) => (
          <div key={p._id} style={styles.card}>
            <span style={styles.badge}>{p.category}</span>
            <h3 style={styles.cardTitle}>{p.title}</h3>
            <p style={styles.meta}>📍 {p.location} • ✍️ {p.signatures} Signatures</p>
            <Link to={`/petitions/${p._id}`} style={styles.linkBtn}>View Details →</Link>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: { padding: "40px", maxWidth: "1000px", margin: "0 auto" },
  headerRow: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "30px" },
  title: { fontSize: "2rem", color: "#1e293b" },
  createBtn: { backgroundColor: "#2563eb", color: "white", padding: "10px 20px", borderRadius: "8px", textDecoration: "none", fontWeight: "bold" },
  filterBar: { display: "flex", gap: "10px", marginBottom: "30px", padding: "15px", backgroundColor: "#f1f5f9", borderRadius: "10px" },
  select: { padding: "8px", borderRadius: "5px", border: "1px solid #cbd5e1" },
  input: { padding: "8px", borderRadius: "5px", border: "1px solid #cbd5e1", flex: 1 },
  grid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "20px" },
  card: { padding: "20px", border: "1px solid #e2e8f0", borderRadius: "10px", backgroundColor: "white", boxShadow: "0 2px 4px rgba(0,0,0,0.05)" },
  badge: { display: "inline-block", padding: "4px 8px", borderRadius: "4px", backgroundColor: "#dbeafe", color: "#1e40af", fontSize: "0.8rem", fontWeight: "bold", marginBottom: "10px" },
  cardTitle: { margin: "0 0 10px 0", fontSize: "1.2rem", color: "#334155" },
  meta: { color: "#64748b", fontSize: "0.9rem", marginBottom: "15px" },
  linkBtn: { display: "block", textAlign: "center", padding: "8px", backgroundColor: "#f8fafc", color: "#2563eb", borderRadius: "6px", textDecoration: "none", fontWeight: "bold", border: "1px solid #e2e8f0" }
};