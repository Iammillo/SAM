import React, { useState } from "react";
import "./App.css";
import Spreadsheet from "./Spreadsheet";
import Dashboard from "./Dashboard";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { SAMdata, IOdataReal, GovAccountData, ExternalSectorData, FactorIncomeData, HouseholdAccountsData, InstitutionalTransfersData } from "./data";

function App() {
  const [selectedMenu, setSelectedMenu] = useState("spreadsheet");
  const [collapsed, setCollapsed] = useState(false);
  const [panelWidth, setPanelWidth] = useState(250);
  const [isResizing, setIsResizing] = useState(false);

  const handleMouseDown = () => setIsResizing(true);
  const handleMouseUp = () => setIsResizing(false);
  const handleMouseMove = (e) => {
    if (isResizing) {
      const newWidth = Math.max(60, Math.min(e.clientX, 400));
      setPanelWidth(newWidth);
    }
  };

  React.useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  });

const renderContent = () => {
  switch (selectedMenu) {
    case "inputoutput":
      return <Spreadsheet initialData={IOdataReal} title="Input-Output Table" />;
    case "sam":
      return <Spreadsheet initialData={SAMdata} title="Macro Social Accounting Matrix for Nepal" />;
    case "gov":
      return <Spreadsheet initialData={GovAccountData} title="Government Accounts Table" />;
    case "external":
      return <Spreadsheet initialData={ExternalSectorData} title="External Sector Table" />;
    case "factor":
      return <Spreadsheet initialData={FactorIncomeData} title="Factor Income Table" />;
    case "household":
      return <Spreadsheet initialData={HouseholdAccountsData} title="Household Accounts Table" />;
    case "transfers":
      return <Spreadsheet initialData={InstitutionalTransfersData} title="Institutional Transfers Table" />;
    case "dashboard":
    default:
      return <Dashboard />;
  }
};


const menuItems = [
  { key: "dashboard", label: "Dashboard", short: "D" },
  { key: "inputoutput", label: "Input-Output Matrix", short: "IO" },
  { key: "gov", label: "Government Accounts", short: "GOV" },
  { key: "external", label: "External Sector", short: "EXT" },
  { key: "factor", label: "Factor Income", short: "FAC" },
  { key: "household", label: "Household Accounts", short: "HH" },
  { key: "transfers", label: "Institutional Transfers", short: "TRF" },
  { key: "sam", label: "Social Accounting Matrix", short: "SAM" },
];




  return (
    <div className="app">
      <div
        className={`sidebar ${collapsed ? "collapsed" : ""}`}
        style={{ width: collapsed ? 60 : panelWidth }}
      >
        <button className="collapse-btn" onClick={() => setCollapsed(!collapsed)}>
          {collapsed ? <FaChevronRight /> : <FaChevronLeft />}
        </button>
              {!collapsed && (
  <ul className="menu">
    {menuItems.map((item) => (
      <li
        key={item.key}
        onClick={() => setSelectedMenu(item.key)}
        className={selectedMenu === item.key ? "active" : ""}
      >
        {item.label}
      </li>
    ))}
  </ul>
)}

{collapsed && (
  <ul className="menu">
    {menuItems.map((item) => (
      <li
        key={item.key}
        onClick={() => setSelectedMenu(item.key)}
        title={item.label}
        className={selectedMenu === item.key ? "active" : ""}
      >
        {item.short}
      </li>
    ))}
  </ul>
)}
        <div className="resizer" onMouseDown={handleMouseDown} />
      </div>
      <div className="main">{renderContent()}</div>
    </div>
  );
}

export default App;

