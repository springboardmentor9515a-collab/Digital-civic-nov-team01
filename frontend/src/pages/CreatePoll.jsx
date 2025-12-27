import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function CreatePoll() {
  const navigate = useNavigate();
  const [options, setOptions] = useState(["", ""]);

  const addOption = () => setOptions([...options, ""]);
  const handleOptionChange = (i, val) => {
    const newOpts = [...options]; newOpts[i] = val; setOptions(newOpts);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Poll Created!");
    navigate("/polls");
  };

  return (
    <div style={styles.container}>
      <div style={styles.topRow}>
        <h1 style={styles.header}>Create a New Poll</h1>
      </div>

      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.group}>
          <label style={styles.label}>Poll question</label>
          <input type="text" placeholder="Ask community..." style={styles.inputRounded} />
        </div>

        <div style={styles.group}>
          <label style={styles.label}>Description</label>
          <textarea placeholder="Context..." style={styles.textarea} />
        </div>

        <div style={styles.group}>
          <label style={styles.label}>Poll Option</label>
          <div style={{display: "flex", flexDirection: "column", gap: "10px"}}>
             {options.map((opt, i) => (
               <input key={i} type="text" placeholder={`Option ${i + 1}`} value={opt} onChange={(e) => handleOptionChange(i, e.target.value)} style={{...styles.inputRounded, width: "50%"}} />
             ))}
             <button type="button" onClick={addOption} style={styles.addOptionBtn}>Add Option</button>
          </div>
        </div>

        <button type="submit" style={styles.createBtn}>Create Poll</button>
      </form>
    </div>
  );
}

const styles = {
  container: { maxWidth: "1000px", margin: "0 auto", padding: "40px", fontFamily: "sans-serif", backgroundColor: "white", minHeight: "100vh" },
  topRow: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "30px" },
  header: { fontSize: "2rem", margin: 0, fontWeight: "normal" },
  navLinks: { display: "flex", gap: "20px" },
  link: { textDecoration: "none", color: "#9333ea", fontWeight: "bold", textTransform: "uppercase" },
  form: { display: "flex", flexDirection: "column", gap: "25px" },
  group: { display: "flex", flexDirection: "column", gap: "8px" },
  label: { fontWeight: "bold", fontSize: "1.1rem" },
  inputRounded: { padding: "12px 20px", borderRadius: "30px", border: "1px solid #ccc", fontSize: "1rem", outline: "none" },
  textarea: { padding: "15px 20px", borderRadius: "20px", border: "1px solid #ccc", fontSize: "1rem", outline: "none", height: "120px", resize: "none" },
  addOptionBtn: { width: "150px", padding: "8px", borderRadius: "20px", border: "1px solid #ccc", backgroundColor: "white", cursor: "pointer", fontWeight: "bold" },
  createBtn: { padding: "12px 40px", backgroundColor: "#0055ff", color: "white", border: "none", borderRadius: "10px", fontWeight: "bold", fontSize: "1.1rem", cursor: "pointer", height: "50px", width: "200px", alignSelf: "flex-end" }
};