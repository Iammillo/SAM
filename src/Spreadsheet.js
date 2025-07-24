import React, { useState, useEffect, useRef } from "react";

function Spreadsheet({ initialData, title = "Spreadsheet" }) {
  const [data, setData] = useState(initialData);
    useEffect(() => {
        setData(initialData);
    }, [initialData]);
  const [editingCell, setEditingCell] = useState(null); // {r, c}
  const [selectedCell, setSelectedCell] = useState(null); // {r, c}
  const [inputValue, setInputValue] = useState("");

  const baseFirstRowHeight = 48;
  const increasedFirstRowHeight = baseFirstRowHeight * 1.2; // 57.6

  const [colWidths, setColWidths] = React.useState(() =>
    initialData[0].map((_, i) => (i === 0 ? 72 : 70))
  );

  const [rowHeights, setRowHeights] = React.useState(() =>
    initialData.map((_, i) => (i === 0 ? increasedFirstRowHeight : 40))
  );

  const colResizeRef = React.useRef({ startX: 0, colIndex: null, startWidth: 0 });
  const rowResizeRef = React.useRef({ startY: 0, rowIndex: null, startHeight: 0 });

  // Column resizing handlers
  const onColResizeMouseDown = (e, colIndex) => {
    e.preventDefault();
    colResizeRef.current = {
      startX: e.clientX,
      colIndex,
      startWidth: colWidths[colIndex],
    };
    window.addEventListener("mousemove", onColResizeMouseMove);
    window.addEventListener("mouseup", onColResizeMouseUp);
  };

  const onColResizeMouseMove = (e) => {
    e.preventDefault();
    const { startX, colIndex, startWidth } = colResizeRef.current;
    if (colIndex === null) return;
    const deltaX = e.clientX - startX;
    setColWidths((widths) => {
      const newWidths = [...widths];
      newWidths[colIndex] = Math.max(40, startWidth + deltaX);
      return newWidths;
    });
  };

  const onColResizeMouseUp = (e) => {
    e.preventDefault();
    colResizeRef.current.colIndex = null;
    window.removeEventListener("mousemove", onColResizeMouseMove);
    window.removeEventListener("mouseup", onColResizeMouseUp);
  };

  // Row resizing handlers
  const onRowResizeMouseDown = (e, rowIndex) => {
    e.preventDefault();
    rowResizeRef.current = {
      startY: e.clientY,
      rowIndex,
      startHeight: rowHeights[rowIndex],
    };
    window.addEventListener("mousemove", onRowResizeMouseMove);
    window.addEventListener("mouseup", onRowResizeMouseUp);
  };

  const onRowResizeMouseMove = (e) => {
    e.preventDefault();
    const { startY, rowIndex, startHeight } = rowResizeRef.current;
    if (rowIndex === null) return;
    const deltaY = e.clientY - startY;
    setRowHeights((heights) => {
      const newHeights = [...heights];
      newHeights[rowIndex] = Math.max(20, startHeight + deltaY);
      return newHeights;
    });
  };

  const onRowResizeMouseUp = (e) => {
    e.preventDefault();
    rowResizeRef.current.rowIndex = null;
    window.removeEventListener("mousemove", onRowResizeMouseMove);
    window.removeEventListener("mouseup", onRowResizeMouseUp);
  };

  // Calculate total for each row (excluding first and last column)
  const calculateRowTotal = (row) =>
    row.slice(1, row.length - 1).reduce((acc, val) => (typeof val === "number" ? acc + val : acc), 0);

  // Calculate total for each column (excluding first and last row)
  const calculateColTotal = (colIndex) => {
    let total = 0;
    for (let i = 1; i < data.length - 1; i++) {
      const val = data[i][colIndex];
      if (typeof val === "number") total += val;
    }
    return total;
  };

  // Build updated data with dynamic totals (totals cannot be edited)
  const dataWithTotals = data.map((row, r) => {
    if (r === data.length - 1) {
      // TOTAL row: sum columns (except first and last columns)
      return row.map((cell, c) => {
        if (c === 0) return cell;
        if (c === row.length - 1) return "";
        return calculateColTotal(c);
      });
    }
    if (r > 0) {
      // Normal rows: sum row for last column
      return row.map((cell, c) => {
        if (c === row.length - 1) {
          return calculateRowTotal(row);
        }
        return cell;
      });
    }
    // Header row unchanged
    return row;
  });

  const startEditing = (r, c) => {
    if (
      r === 0 || // header row
      c === 0 || // header col
      r === dataWithTotals.length - 1 || // last row totals
      c === dataWithTotals[0].length - 1 // last col totals
    ) {
      return; // not editable
    }

    setEditingCell({ r, c });
    setSelectedCell({ r, c });
    const val = dataWithTotals[r][c];
    setInputValue(val === "" ? "" : val.toString());
  };

  const finishEditing = () => {
    if (!editingCell) return;
    const { r, c } = editingCell;
    let newVal = inputValue.trim();

    if (newVal === "") {
      newVal = "";
    } else {
      const parsed = parseFloat(newVal);
      newVal = isNaN(parsed) ? data[r][c] : parsed;
    }

    setData((oldData) =>
      oldData.map((row, rowIndex) =>
        row.map((cell, colIndex) => (rowIndex === r && colIndex === c ? newVal : cell))
      )
    );

    setEditingCell(null);
    setInputValue("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      finishEditing();
    } else if (e.key === "Escape") {
      setEditingCell(null);
      setInputValue("");
    }
  };

  return (
    <div style={{ padding: 20, overflowX: "auto" }}>
      {title && (
        <h2 style={{ textAlign: "center", marginBottom: 20, fontFamily: "Arial, sans-serif" }}>
            {title}
        </h2>
        )}
      <table
        style={{
          borderCollapse: "collapse",
          tableLayout: "fixed",
          width: colWidths.reduce((a, b) => a + b, 0),
          userSelect: "none",
        }}
      >
        <thead>
          <tr style={{ height: rowHeights[0] }}>
            {dataWithTotals[0].map((header, idx) => {
              const isHeaderSelected =
                selectedCell && (selectedCell.r === 0 || selectedCell.c === idx);

              const bgColor = isHeaderSelected ? "#d7f0d7" : "#d6e0f0";

              return (
                <th
                  key={idx}
                  style={{
                    border: "1px solid black",
                    padding: 8,
                    writingMode: idx !== 0 ? "vertical-rl" : "horizontal-tb",
                    textAlign: "center",
                    fontWeight: "bold",
                    verticalAlign: "bottom",
                    backgroundColor: bgColor,
                    width: colWidths[idx],
                    height: rowHeights[0],
                    position: "relative",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                  }}
                >
                  {header}
                  {idx < data[0].length - 1 && (
                    <div
                      onMouseDown={(e) => onColResizeMouseDown(e, idx)}
                      style={{
                        position: "absolute",
                        top: 0,
                        right: 0,
                        width: 5,
                        height: "100%",
                        cursor: "col-resize",
                        userSelect: "none",
                        zIndex: 10,
                      }}
                    />
                  )}
                </th>
              );
            })}
          </tr>
          <tr>
            {dataWithTotals[0].map((_, idx) => (
              <th
                key={"r" + idx}
                style={{
                  border: "none", // No border for resize bars
                  padding: 0,
                  margin: 0,
                  width: colWidths[idx],
                  height: 5,
                  cursor: "row-resize",
                  userSelect: "none",
                }}
                onMouseDown={(e) => onRowResizeMouseDown(e, 0)}
              />
            ))}
          </tr>
        </thead>
        <tbody>
          {dataWithTotals.slice(1).map((row, r) => {
            const realRowIndex = r + 1;
            const isTotalRow = realRowIndex === dataWithTotals.length - 1;

            return (
              <tr key={r} style={{ height: rowHeights[realRowIndex] }}>
                {row.map((cell, c) => {
                  const isHeaderCell = c === 0;
                  const isTotalCol = c === row.length - 1;

                  const isEditing =
                    editingCell &&
                    editingCell.r === realRowIndex &&
                    editingCell.c === c;

                  const isHighlighted =
                    selectedCell &&
                    (selectedCell.r === realRowIndex || selectedCell.c === c);

                  const isHeaderHighlighted =
                    selectedCell &&
                    ((selectedCell.r === realRowIndex && isHeaderCell) ||
                      (selectedCell.c === c && realRowIndex === 0));

                  let bgColor = "white";
                  if (isHighlighted) bgColor = "#d9e8ff"; // faint blue
                  if (isHeaderHighlighted) bgColor = "#d7f0d7"; // faint green

                  if (isTotalRow || isTotalCol) {
                    bgColor = "#c9dfff"; // stronger base blue
                    if (isHighlighted) bgColor = "#b3c9ff";
                    if (isHeaderHighlighted) bgColor = "#c9efc9";
                  }

                  // Override for header cells if not highlighted
                  if (isHeaderCell && !isHeaderHighlighted) {
                    bgColor = bgColor === "white" ? "#f0f0f0" : bgColor;
                  }

                  const canEdit =
                    !isHeaderCell &&
                    !isTotalRow &&
                    !isTotalCol &&
                    (typeof cell === "number" || cell === "");

                  return (
                    <td
                      key={c}
                      style={{
                        border: "1px solid black",
                        padding: 8,
                        textAlign: isHeaderCell ? "left" : "right",
                        backgroundColor: bgColor,
                        fontWeight:
                          isHeaderCell || isTotalCol || isTotalRow ? "bold" : "normal",
                        userSelect: "none",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        fontVariantNumeric: "tabular-nums",
                        cursor: canEdit ? "text" : "default",
                        width: colWidths[c],
                        position: "relative",
                      }}
                      onClick={() => canEdit && startEditing(realRowIndex, c)}
                    >
                      {isEditing ? (
                        <input
                          type="text"
                          autoFocus
                          value={inputValue}
                          onChange={(e) => setInputValue(e.target.value)}
                          onBlur={finishEditing}
                          onKeyDown={handleKeyDown}
                          style={{
                            width: "100%",
                            boxSizing: "border-box",
                            fontWeight: "normal",
                            fontSize: "1em",
                            fontVariantNumeric: "tabular-nums",
                          }}
                        />
                      ) : typeof cell === "number" ? (
                        cell.toLocaleString(undefined, { minimumFractionDigits: 1 })
                      ) : (
                        cell
                      )}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Spreadsheet;
