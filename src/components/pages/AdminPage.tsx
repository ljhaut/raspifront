import { FC, useEffect, useRef, useState } from "react";
import Base from "./BasePage";
import "../css/AdminPage.css";
const AdminPage: FC = () => {
  const currentTime = new Date();
  const [logs, setLogs] = useState<any>("");
  const logContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    getLogs();
  }, []);

  useEffect(() => {
    if (logContainerRef.current) {
      const element = logContainerRef.current;
      element.scrollTop = element.scrollHeight;
    }
  }, [logs]);

  const getLogs = async () => {
    const response = await fetch(process.env.REACT_APP_LOGS_URL!);

    const data = await response.json();
    setLogs(data);
  };

  return (
    <Base>
      <div>{`Updated ${currentTime.toLocaleTimeString()}`}</div>
      <div className="log-container" ref={logContainerRef}>
        <pre>{Array.isArray(logs) ? logs.join("\n") : logs}</pre>
      </div>
    </Base>
  );
};

export default AdminPage;
