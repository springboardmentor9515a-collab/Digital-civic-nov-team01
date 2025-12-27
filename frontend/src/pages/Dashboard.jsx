import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { 
  LayoutDashboard, FileText, BarChart2, Users, FileBarChart, Settings, 
  HelpCircle, MapPin, Mail 
} from "lucide-react";

export default function Dashboard() {
  const { user } = useContext(AuthContext);
  const categories = ["All Categories", "Environment", "Infrastructure", "Education", "Public safety", "Others"];

  return (
    <div style={styles.container}>
      {/* --- SIDEBAR --- */}
      <div style={styles.sidebar}>
        <div style={styles.profileCard}>
          <div style={styles.profileHeader}>
            <div style={styles.bigAvatar}>{user?.name?.charAt(0).toUpperCase() || "U"}</div>
            <div>
                <h3 style={{margin: 0, fontSize: "1.1rem"}}>{user?.name || "User Name"}</h3>
                <div style={styles.profileRow}><MapPin size={14} /> {user?.location || "Location"}</div>
                <div style={styles.profileRow}><Mail size={14} /> {user?.email || "Email"}</div>
            </div>
          </div>
        </div>
        <div style={styles.menu}>
          <NavItem icon={<LayoutDashboard size={18}/>} text="Dashboard" active />
          <NavItem icon={<FileText size={18}/>} text="Petitions" to="/petitions" />
          <NavItem icon={<BarChart2 size={18}/>} text="Polls" to="/polls" />
          <NavItem icon={<Users size={18}/>} text="Officials" />
          <NavItem icon={<FileBarChart size={18}/>} text="Reports" to="/reports" />
          <NavItem icon={<Settings size={18}/>} text="Settings" />
          <div style={{marginTop: "20px"}}>
             <NavItem icon={<HelpCircle size={18}/>} text="Help & Support" />
          </div>
        </div>
      </div>

      {/* --- MAIN CONTENT --- */}
      <div style={styles.main}>
        
        <div style={styles.banner}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2>Welcome to Digital Civic Engagement</h2>
            
            {/* DROPDOWN LIST (As per checklist) */}
            <select style={styles.dropdown}>
              <option value="last_30">Last 30 Days</option>
              <option value="last_6_months">Last 6 Months</option>
              <option value="this_year">This Year</option>
            </select>
          </div>
        </div>

        {/* CLICKABLE STAT BUTTONS */}
        <div style={styles.statsGrid}>
           <button style={styles.statCard}>
             <h3>My petitions</h3>
           </button>
           <button style={styles.statCard}>
             <h3>Successful Petitions</h3>
           </button>
           <button style={styles.statCard}>
             <h3>Polls created</h3>
           </button>
        </div>

        {/* CLICKABLE CATEGORY BUTTONS */}
        <div style={styles.categoryGrid}>
           {categories.map((cat, index) => (
             <button key={index} style={styles.oval}>
               {cat}
             </button>
           ))}
        </div>
      </div>
    </div>
  );
}

const NavItem = ({ icon, text, active, to }) => (
  <Link to={to || "#"} style={{ textDecoration: "none", color: "inherit" }}>
    <div style={{ display: "flex", alignItems: "center", gap: "10px", padding: "10px", color: active ? "#000080" : "#333", fontWeight: active ? "bold" : "normal" }}>
      {icon} <span>{text}</span>
    </div>
  </Link>
);

const styles = {
  container: { display: "flex", minHeight: "100vh", backgroundColor: "white", padding: "20px", gap: "30px", fontFamily: "sans-serif" },
  sidebar: { width: "250px", display: "flex", flexDirection: "column", gap: "20px" },
  profileCard: { backgroundColor: "#bfdbfe", border: "2px solid #3b82f6", borderRadius: "10px", padding: "15px" },
  profileHeader: { display: "flex", alignItems: "center", gap: "15px" },
  bigAvatar: { width: "45px", height: "45px", borderRadius: "50%", backgroundColor: "#60a5fa", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "bold", fontSize: "1.2rem" },
  profileRow: { display: "flex", alignItems: "center", gap: "5px", fontSize: "0.85rem", marginTop: "3px", color: "#333" },
  menu: { backgroundColor: "#bfdbfe", borderRadius: "10px", padding: "20px", flex: 1 },
  
  main: { flex: 1, display: "flex", flexDirection: "column", gap: "30px", paddingTop: "20px" },
  banner: { backgroundColor: "#bfdbfe", padding: "30px", borderRadius: "5px", fontWeight: "bold", textAlign: "left" },
  
  // Added Dropdown Style
  dropdown: { padding: "8px", borderRadius: "5px", border: "1px solid #3b82f6", backgroundColor: "white", cursor: "pointer", fontWeight: "bold" },

  statsGrid: { display: "flex", gap: "20px" },
  
  // Updated StatCard to be button-like
  statCard: { flex: 1, height: "150px", backgroundColor: "#bfdbfe", borderRadius: "10px", display: "flex", alignItems: "flex-start", justifyContent: "center", padding: "20px", fontWeight: "bold", fontSize: "1.1rem", border: "none", cursor: "pointer", transition: "0.2s" },

  categoryGrid: { display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px", marginTop: "10px" },
  
  // Updated Oval to be button-like
  oval: { backgroundColor: "#bfdbfe", borderRadius: "50px", padding: "15px", textAlign: "center", fontWeight: "bold", fontStyle: "italic", cursor: "pointer", border: "none", fontSize: "1rem", transition: "0.2s" }
};