import { useState } from "react";
import InputBar from "../components/InputBar";
import Insights from "../components/Insights";
import UploadForm from "../components/UploadForm";

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [showUpload, setShowUpload] = useState(false);

  const fetchTrend = async (city, disease) => {
    const res = await fetch(
      `http://127.0.0.1:3000/api/trend?city=${city}&disease=${disease}`
    );
    const json = await res.json();
    setData(json.data);
  };

  // ✅ RETURN MUST BE INSIDE FUNCTION
  return (
    <div style={{ background: "#0f172a", color: "#fff", minHeight: "100vh", padding: "20px" }}>

      <h2>🦠 Disease Dashboard</h2>

      <InputBar onSearch={fetchTrend} />

      <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
        
        <div style={{ flex: 3, background: "#1e293b", padding: "10px", borderRadius: "10px" }}>
          Map
        </div>

        <div style={{ flex: 1, background: "#1e293b", padding: "10px", borderRadius: "10px" }}>
          
          <button onClick={() => setShowUpload(!showUpload)}>
            Add Data
          </button>

          {showUpload && <UploadForm />}

        </div>

      </div>

      <div style={{ marginTop: "20px" }}>
        <Insights data={data} />
      </div>

    </div>
  );
}