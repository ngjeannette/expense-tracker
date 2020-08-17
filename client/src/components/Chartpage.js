import React, { useState, useEffect } from "react";
import "../App.scss";
import { Button, Heading, Spinner } from "evergreen-ui";
import axios from "axios";
import NoDataPage from "./Nodatapage";
import { HorizontalBar } from "react-chartjs-2";
import { Link } from "react-router-dom";

function ChartPage(props) {
  const [data, setData] = useState([]);
  const [graphdata, setGraphData] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [formatTableData, setFormatTableData] = useState(false);
  const [displayPage, setDisplayPage] = useState(false);
  const [pagetype, setPageType] = useState("loading");
  const labels = [
    "housing",
    "transportation",
    "taxes",
    "debt",
    "entertainment",
    "personel",
    "insurance",
  ];
  const headers = ["Description", "Amount", "Category", "Date", "", ""];

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios
      .get("/expense/", { params: { username: props.userInfo.username } })
      .then((response) => {
        // convert response.data into graphdata
        const convertedGraphData = convertGraphData(response.data);
        setGraphData(convertedGraphData);
        const convertedTableData = convertTableData(response.data);
        setTableData(convertedTableData);
        setData(response.data);
        // convertedtable data into convertedCSV
        const newtabledata = convertedTableData
          .reduce((acc, curr, i) => [...acc, ...curr], [])
          .map(
            ({ expensename, expenseamount, expensecategory, expensedate }) => ({
              expensename,
              expenseamount,
              expensecategory,
              expensedate,
            })
          );
        setFormatTableData(newtabledata);

        if (response.data.length > 0) {
          setPageType("data");
        } else if (response.data.length === 0) {
          setPageType("nodata");
        } else {
          setPageType("loading");
        }
      })
      .catch((err) => {
        console.log(err + "expenseerror");
      })
      .finally(setDisplayPage("show"));
  };

  let convertGraphData = (responsedata) => {
    // create dictionary
    let sortedData = Object.keys(
      responsedata.reduce((acc, curr) => {
        const year = new Date(curr.expensedate).getFullYear();
        if (!acc[year]) {
          acc[year] = true;
        }
        return acc;
      }, {})
    ).sort();

    let updatedData = sortedData.map((year) => ({
      labels: labels,
      datasets: [
        {
          label: `${year}`,
          backgroundColor: "rgba(255,99,132,0.2)",
          borderColor: "rgba(255,99,132,1)",
          borderWidth: 1,
          hoverBackgroundColor: "rgba(255,99,132,0.4)",
          hoverBorderColor: "rgba(255,99,132,1)",
          data: labels.map((label) => {
            const filteredExpenses = responsedata.filter(
              (expense) =>
                new Date(expense.expensedate).getFullYear() == year &&
                expense.expensecategory === label
            );
            const totalAmount = filteredExpenses.reduce(
              (total, expense) => total + expense.expenseamount,
              0
            );
            return totalAmount;
          }),
        },
      ],
    }));

    return updatedData;
  };

  let convertTableData = (responsedata) => {
    // convert response.data into table data
    let sortedData = Object.keys(
      responsedata.reduce((acc, curr) => {
        const year = new Date(curr.expensedate).getFullYear();
        if (!acc[year]) {
          acc[year] = true;
        }
        return acc;
      }, {})
    ).sort();
    let updatedData = sortedData.map((year) => {
      let filteredExpenses = responsedata.filter((expense) => {
        return new Date(expense.expensedate).getFullYear() == year;
      });
      return filteredExpenses.sort(function (a, b) {
        return new Date(a.expensedate) - new Date(b.expensedate);
      });
    });
    return updatedData;
  };

  let deleteRow = async (rowId) => {
    // delete from database
    await axios.delete("/expense/" + rowId);
    let updatedData = data.filter((item) => {
      return rowId !== item._id;
    });
    setData(updatedData);
    setGraphData(await convertGraphData(updatedData));
    setTableData(await convertTableData(updatedData));
  };

  let editRow = (rowId) => {
    props.updateCurrentPath("edit");
    props.updateid(rowId);
  };

  function convertToCSV(objArray) {
    let array = typeof objArray !== "object" ? JSON.parse(objArray) : objArray;
    let str = "";

    for (let i = 0; i < array.length; i++) {
      let line = "";
      for (let index in array[i]) {
        if (line !== "") line += ",";

        line += array[i][index];
      }

      str += line + "\r\n";
    }

    return str;
  }

  function exportCSVFile(headers, items, fileTitle) {
    if (headers) {
      items.unshift(headers);
    }

    // Convert Object to JSON
    let jsonObject = JSON.stringify(items);

    let csv = convertToCSV(jsonObject);

    let exportedFilenmae = fileTitle + ".csv" || "export.csv";

    let blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    if (navigator.msSaveBlob) {
      // IE 10+
      navigator.msSaveBlob(blob, exportedFilenmae);
    } else {
      let link = document.createElement("a");
      if (link.download !== undefined) {
        // feature detection
        // Browsers that support HTML5 download attribute
        let url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute("download", exportedFilenmae);
        link.style.visibility = "hidden";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    }
  }

  function download(formatArray, formatHeader) {
    const headers = formatHeader;
    let itemsNotFormatted = formatArray;
    let itemsFormatted = [];

    // format the data
    itemsNotFormatted.forEach((item) => {
      const { expensedate, expensecategory, expensename, expenseamount } = item;
      itemsFormatted.push({
        expensedate,
        expensecategory,
        expensename,
        expenseamount,
      });
    });
    const date = new Date().toDateString();
    const fileTitle = "Expense Tracker - " + date;

    exportCSVFile(headers, itemsFormatted, fileTitle);
  }

  return (
    <div className="chart-table-page">
      {pagetype === "loading" && (
        <div className="track-page">
          <Spinner />{" "}
        </div>
      )}
      {pagetype == "nodata" && (
        <div className="track-page">
          <NoDataPage updateCurrentPath={props.updateCurrentPath} />
        </div>
      )}
      {pagetype === "data" && (
        <div className={`display-page ${displayPage}`}>
          <Heading size={700} marginTop="default">
            Track Expense
          </Heading>
          <div className="charts">
            {graphdata.map((yeardata, i) => {
              return (
                <div
                  key={i}
                  className="chart-container"
                  style={
                    ({ position: "relative" }, { height: 500 }, { width: 500 })
                  }
                >
                  <HorizontalBar data={yeardata} key={i} />
                </div>
              );
            })}
          </div>
          <div className="table">
            {tableData.length > 0 && (
              <Button
                onClick={() => {
                  download(formatTableData, [
                    "Date",
                    "Category",
                    "Description",
                    "Amount",
                  ]);
                }}
              >
                Download CSV
              </Button>
            )}
            {tableData.length > 0
              ? tableData.map((tablerow, i) => (
                  <>
                    <Heading size={500} marginTop="default">
                      {new Date(tablerow[0].expensedate).getFullYear()}
                    </Heading>
                    <table key={i}>
                      <thead>
                        <tr>
                          {headers.map((label) => (
                            <th>{label}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {tablerow.length > 0 ? (
                          tablerow.map((row, index) => (
                            <tr key={index}>
                              <td>{row.expensename}</td>
                              <td>{row.expenseamount}</td>
                              <td>{row.expensecategory}</td>
                              <td>{row.expensedate}</td>
                              <td>
                                <Button
                                  onClick={() => {
                                    editRow(row._id);
                                  }}
                                >
                                  <Link to={"/edit/" + row._id}>Edit</Link>
                                </Button>
                              </td>
                              <td>
                                <Button
                                  onClick={() => {
                                    deleteRow(row._id);
                                  }}
                                >
                                  Delete
                                </Button>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <NoDataPage />
                        )}
                      </tbody>
                    </table>
                  </>
                ))
              : setPageType("nodata")}
          </div>
        </div>
      )}
    </div>
  );
}
export default ChartPage;
