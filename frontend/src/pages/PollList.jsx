import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { 
  LayoutDashboard, FileText, BarChart2, Users, FileBarChart, Settings, 
  HelpCircle, MapPin, Mail 
} from "lucide-react";

export default function PollList() {
  const { user } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState("Active Polls");

  return (
    <div style={styles.container}>
      <div style={styles.sidebar}>
        <div style={styles.profileCard}>
          <div style={styles.profileHeader}>
            <div style={styles.bigAvatar}>{user?.name?.charAt(0).toUpperCase() || "S"}</div>
            <div>
                <h3 style={{margin: 0, fontSize: "1.1rem"}}>{user?.name || "Name"}</h3>
                <div style={styles.profileRow}><MapPin size={14} /> {user?.location || "Location"}</div>
                <div style={styles.profileRow}><Mail size={14} /> {user?.email || "Mail ID"}</div>
            </div>
          </div>
        </div>
        <div style={styles.menu}>
          <NavItem icon={<LayoutDashboard size={18}/>} text="Dashboard" to="/dashboard" />
          <NavItem icon={<FileText size={18}/>} text="Petitions" to="/petitions" />
          <NavItem icon={<BarChart2 size={18}/>} text="Polls" active />
          <NavItem icon={<Users size={18}/>} text="Officials" />
          <NavItem icon={<FileBarChart size={18}/>} text="Reports" to="/reports" />
          <NavItem icon={<Settings size={18}/>} text="Settings" />
          <div style={{marginTop: "20px"}}>
             <NavItem icon={<HelpCircle size={18}/>} text="Help & Support" />
          </div>
        </div>
      </div>

      <div style={styles.main}>
        <div style={styles.topHeader}>
           <div style={{flex: 1}}></div>
           <div style={styles.topLinks}>
            <Link to="/dashboard" style={styles.topLink}>HOME</Link>
            <Link to="/petitions" style={styles.topLink}>PETITIONS</Link>
            <Link to="/polls" style={styles.topLink}>POLLS</Link>
            <Link to="/reports" style={styles.topLink}>REPORTS</Link>
          </div>
        </div>

        <div style={{display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "20px"}}>
            <div>
                <h1 style={{ fontSize: "2rem", fontWeight: "bold", margin: 0 }}>Polls</h1>
                <p style={{margin: "5px 0 0 0", color: "#555"}}>Participate in community polls</p>
            </div>
            <Link to="/create-poll" style={styles.createBtn}>Create Poll</Link>
        </div>

        <div style={styles.pollsContainer}>
          <div style={styles.tabsRow}>
             {["Active Polls", "Polls i voted", "My Polls", "Closed Polls"].map(tab => (
                 <button key={tab} onClick={() => setActiveTab(tab)} style={{
                    backgroundColor: activeTab === tab ? "white" : "transparent",
                    border: "none", padding: "8px 20px", borderRadius: "20px", fontWeight: "bold", cursor: "pointer"
                 }}>{tab}</button>
             ))}
          </div>
          <div style={styles.contentArea}>
             <div style={styles.emptyState}>
                <p style={{fontSize: "1.2rem", fontWeight: "500", margin: "20px 0"}}>No Polls found</p>
             </div>
          </div>
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
  main: { flex: 1, display: "flex", flexDirection: "column", gap: "20px" },
  topHeader: { display: "flex", marginBottom: "10px" },
  topLinks: { display: "flex", gap: "30px" },
  topLink: { textDecoration: "none", color: "#9333ea", fontWeight: "800", fontSize: "1rem", textTransform: "uppercase" },
  createBtn: { textDecoration: "none", backgroundColor: "#1d4ed8", color: "white", padding: "10px 25px", borderRadius: "5px", fontWeight: "bold", fontSize: "1rem" },
  pollsContainer: { border: "1px solid #ddd", borderRadius: "10px", padding: "5px" },
  tabsRow: { backgroundColor: "#e5e7eb", borderRadius: "8px", padding: "5px", display: "flex", gap: "10px" },
  contentArea: { minHeight: "250px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }
};