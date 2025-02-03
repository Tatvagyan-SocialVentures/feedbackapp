import React, { useState, useEffect } from "react";
import {
  getAllocatedDistricts,
  getAllocatedBlocks,
  getConsultantFeedbackReport,
} from "./FeedbackReport.Api";

const FeedbackReport = () => {
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;
  const yearOptions = [2024, 2023];
  const monthOptions = [
    { value: 1, label: "January" },
    { value: 2, label: "February" },
    { value: 3, label: "March" },
    { value: 4, label: "April" },
    { value: 5, label: "May" },
    { value: 6, label: "June" },
    { value: 7, label: "July" },
    { value: 8, label: "August" },
    { value: 9, label: "September" },
    { value: 10, label: "October" },
    { value: 11, label: "November" },
    { value: 12, label: "December" },
  ];

  const [activeTab, setActiveTab] = useState(1);
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);
  const [selectedBlock, setSelectedBlock] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  console.log("selectedDistrict====>", selectedDistrict);
  const [districtOptions, setDistrictOptions] = useState([]);
  const [blockOptions, setBlockOptions] = useState([]);
  console.log("blockOptions=======>", blockOptions);

  const [data, setData] = useState([]);

  // const blockOptions = {
  //   "District 1": ["Block A", "Block B"],
  //   "District 2": ["Block C", "Block D"],
  //   "District 3": ["Block E", "Block F"],
  // };

  useEffect(() => {
    if (selectedMonth && selectedYear) {
      getAllocatedDistricts()
        .then((res) => {
          if (res.status === 200) {
            const districts =
              res?.data.length > 0 && res?.data?.map((item) => item?.district);
            setDistrictOptions(districts);
          } else {
            console.log("status---------->", res.status);
          }
        })
        .catch((error) => {
          console.error("error----------->", error);
        });
    }
  }, [selectedMonth, selectedYear]);

  const handleYearChange = (e) => {
    setSelectedYear(e.target.value);
    setSelectedMonth("");
    setSelectedDistrict("");
    setSelectedBlock("");
  };

  const handleMonthChange = (e) => {
    if (selectedYear === currentYear && e.target.value > currentMonth) {
      alert("You can't select a month beyond the current month!");
    } else {
      setSelectedMonth(e.target.value);
      setSelectedDistrict("");
      setSelectedBlock("");
    }
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleDistrictChange = (e) => {
    setSelectedDistrict(e.target.value);
    setSelectedBlock("");
    if (e.target.value) {
      getAllocatedBlocks(e.target.value)
        .then((res) => {
          if (res.status === 200) {
            const blocks =
              res?.data.length > 0 && res?.data?.map((item) => item?.block);
            setBlockOptions(blocks);
            console.log("data==========>", res.data[0]);
          } else {
            console.log("status ---------->", res.status);
          }
        })
        .catch((error) => {
          console.error("error------->", error);
        });
    }
  };

  const handleBlockChange = (e) => {
    setData([]);
    setSelectedBlock(e.target.value);
  };

  useEffect(() => {
    if (
      selectedYear &&
      selectedMonth &&
      selectedDistrict &&
      selectedBlock &&
      activeTab
    ) {
      const body = {
        year: selectedYear,
        month: selectedMonth,
        district: selectedDistrict,
        block: selectedBlock,
        biweek: activeTab,
      };
      getConsultantFeedbackReport(body)
        .then((res) => {
          if (res.status === 200) {
            setData(res.data);
          }
        })
        .catch((error) => {
          console.error("Error while getting data------>", error);
        });
    }
  }, [activeTab, selectedBlock]);

  return (
    <div>
      <div style={styles.container}>
        <div style={styles.dropdownContainer}>
          <label style={styles.label}>Select Year:</label>
          <select
            style={styles.dropdown}
            value={selectedYear}
            onChange={handleYearChange}
          >
            <option value="" disabled>
              --Select Year--
            </option>
            {yearOptions.map((yearOption) => (
              <option key={yearOption} value={yearOption}>
                {yearOption}
              </option>
            ))}
          </select>
        </div>

        <div style={styles.dropdownContainer}>
          <label style={styles.label}>Select Month:</label>
          <select
            style={styles.dropdown}
            value={selectedMonth}
            onChange={handleMonthChange}
          >
            <option value="" disabled>
              --Select Month--
            </option>
            {selectedYear &&
              monthOptions.map((monthOption, index) => (
                <option key={index} value={monthOption.value}>
                  {monthOption.label}
                </option>
              ))}
          </select>
        </div>

        <div style={styles.dropdownContainer}>
          <label style={styles.label}>Select District:</label>
          <select
            style={styles.dropdown}
            value={selectedDistrict}
            onChange={handleDistrictChange}
          >
            <option value="" disabled>
              --Select District--
            </option>
            {districtOptions.map((district, index) => (
              <option key={index} value={district}>
                {district}
              </option>
            ))}
          </select>
        </div>

        <div style={styles.dropdownContainer}>
          <label style={styles.label}>Select Block:</label>
          <select
            style={styles.dropdown}
            value={selectedBlock}
            onChange={handleBlockChange}
          >
            <option value="" disabled>
              --Select Block--
            </option>
            {/* {selectedDistrict &&
              blockOptions[selectedDistrict]?.map((block, index) => (
                <option key={index} value={block}>
                  {block}
                </option>
              ))} */}
            {blockOptions.map((block, index) => (
              <option key={index} value={block}>
                {block}
              </option>
            ))}
          </select>
        </div>

        <div style={styles.tabContainer}>
          <button
            style={
              activeTab === 1
                ? { ...styles.tab, ...styles.activeTab }
                : styles.tab
            }
            onClick={() => handleTabChange(1)}
          >
            Day 1-15
          </button>
          <button
            style={
              activeTab === 2
                ? { ...styles.tab, ...styles.activeTab }
                : styles.tab
            }
            onClick={() => handleTabChange(2)}
          >
            Day 16-30
          </button>
        </div>
      </div>

      <div style={{ marginTop: "20px", margin: "2%" }}>
        {selectedYear && selectedMonth && selectedDistrict && selectedBlock && (
          <table style={{ width: "97%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th
                  style={{
                    padding: "10px",
                    textAlign: "left",
                    backgroundColor: "#f2f2f2",
                    borderBottom: "2px solid #ddd",
                  }}
                >
                  Sl. No.
                </th>
                <th
                  style={{
                    padding: "10px",
                    textAlign: "left",
                    backgroundColor: "#f2f2f2",
                    borderBottom: "2px solid #ddd",
                  }}
                >
                  Name of ECE
                </th>
                <th
                  style={{
                    padding: "10px",
                    textAlign: "left",
                    backgroundColor: "#f2f2f2",
                    borderBottom: "2px solid #ddd",
                  }}
                >
                  Allocated Cluster
                </th>
                <th
                  style={{
                    padding: "10px",
                    textAlign: "left",
                    backgroundColor: "#f2f2f2",
                    borderBottom: "2px solid #ddd",
                  }}
                >
                  Total Allocated student
                </th>
                <th
                  style={{
                    padding: "10px",
                    textAlign: "left",
                    backgroundColor: "#f2f2f2",
                    borderBottom: "2px solid #ddd",
                  }}
                >
                  Total student called
                </th>
              </tr>
            </thead>
            <tbody>
              {data.map((row, index) => (
                <tr key={index}>
                  <td
                    style={{
                      padding: "10px",
                      // textAlign: "left",
                      borderBottom: "1px solid #ddd",
                    }}
                  >
                    {index + 1}
                  </td>
                  <td
                    style={{
                      padding: "10px",
                      // textAlign: "left",
                      borderBottom: "1px solid #ddd",
                    }}
                  >
                    {row.consultantName}
                  </td>
                  <td
                    style={{
                      padding: "10px",
                      borderBottom: "1px solid #ddd",
                    }}
                  >
                    <ul style={{ margin: 0, paddingLeft: "20px" }}>
                      {" "}
                      {/* Add bullets */}
                      {Array.from(
                        new Set(
                          row.allocatedCluster?.map((item) => item.cluster)
                        )
                      ).map((uniqueCluster, index) => (
                        <li key={index} style={{ listStyleType: "disc" }}>
                          {uniqueCluster}
                        </li>
                      ))}
                    </ul>
                  </td>

                  <td
                    style={{
                      padding: "10px",
                      textAlign: "center",
                      borderBottom: "1px solid #ddd",
                    }}
                  >
                    {row.totalAllocated}
                  </td>
                  <td
                    style={{
                      padding: "10px",
                      textAlign: "center",
                      borderBottom: "1px solid #ddd",
                    }}
                  >
                    {row.totalCalled}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    width: "100%",
    maxWidth: "600px",
    margin: "0 auto",
    padding: "20px",
    fontFamily: "'Arial', sans-serif",
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
    backgroundColor: "#fff",
    borderRadius: "8px",
  },
  reportHeader: {
    textAlign: "center",
    marginBottom: "20px",
    borderBottom: "2px solid #3f51b5",
    paddingBottom: "10px",
  },
  dropdownContainer: {
    marginBottom: "15px",
    width: "100%",
  },
  reportTitle: {
    fontSize: "24px",
    fontWeight: "bold",
    color: "#333",
  },
  filtersContainer: {
    display: "block", // Changed from 'flex' to 'block' to remove row flex styling
    marginBottom: "20px",
  },
  dropdownGroup: {
    marginBottom: "15px", // Adds spacing between each dropdown
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
  },
  label: {
    marginBottom: "5px",
    fontSize: "16px",
    color: "#555",
  },
  dropdown: {
    padding: "10px",
    fontSize: "16px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    outline: "none",
    width: "100%",
  },
  tabContainer: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "20px",
  },
  tab: {
    flex: 1,
    padding: "12px",
    fontSize: "16px",
    cursor: "pointer",
    backgroundColor: "#e0f7fa",
    border: "1px solid #ccc",
    textAlign: "center",
    transition: "background-color 0.3s ease",
    margin: "0 5px",
    borderRadius: "4px",
  },
  activeTab: {
    backgroundColor: "#3f51b5",
    color: "white",
  },
  reportContent: {
    padding: "20px",
    borderTop: "2px solid #3f51b5",
  },

  // Responsive styles
  "@media (max-width: 600px)": {
    filtersContainer: {
      display: "block", // Ensures dropdowns stay in a column for mobile view
    },
    dropdownGroup: {
      flex: "1 1 100%",
    },
    tabContainer: {
      flexDirection: "column",
    },
    tab: {
      margin: "5px 0",
      padding: "10px",
      fontSize: "14px",
    },
    reportTitle: {
      fontSize: "20px",
    },
    label: {
      fontSize: "14px",
    },
    dropdown: {
      padding: "8px",
      fontSize: "14px",
    },
  },
};

export default FeedbackReport;
