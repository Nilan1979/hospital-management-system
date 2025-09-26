import * as React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import {
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Button,
  Dialog, DialogTitle, DialogContent, DialogActions,
  TextField
} from "@mui/material";
import { TableVirtuoso } from "react-virtuoso";

// Column definitions
const columns = [
  { width: 150, label: "Patient ID", dataKey: "patientID" },
  { width: 150, label: "Patient Name", dataKey: "patientName" },
  { width: 150, label: "Treatment", dataKey: "treatment" },
  { width: 150, label: "Doctor", dataKey: "doctor" },
  { width: 150, label: "Date", dataKey: "date" },
  { width: 100, label: "Status", dataKey: "status" },
  { width: 150, label: "Actions", dataKey: "actions" },
];

// Virtuoso table components
const VirtuosoTableComponents = {
  Scroller: React.forwardRef((props, ref) => (
    <TableContainer component={Paper} {...props} ref={ref} />
  )),
  Table: (props) => (
    <Table {...props} sx={{ borderCollapse: "separate", tableLayout: "fixed" }} />
  ),
  TableHead: React.forwardRef((props, ref) => <TableHead {...props} ref={ref} />),
  TableRow,
  TableBody: React.forwardRef((props, ref) => <TableBody {...props} ref={ref} />),
};

// Fixed header for table
function fixedHeaderContent() {
  return (
    <TableRow>
      {columns.map((column) => (
        <TableCell
          key={column.dataKey}
          variant="head"
          style={{ width: column.width, fontWeight: "bold" }}
          sx={{ backgroundColor: "#f5f5f5" }}
        >
          {column.label}
        </TableCell>
      ))}
    </TableRow>
  );
}

export default function Treatment() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const [open, setOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);

  // Fetch patients on mount
  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      const response = await axios.get("http://localhost:3001/patientadmit/allpatient");
      setRows(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching patients:", error);
      setLoading(false);
    }
  };

  // Filter rows by patient name
  const filteredRows = rows.filter(row =>
    row.patientName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleUpdate = (row) => {
    setSelectedPatient({ ...row });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedPatient(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelectedPatient((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitUpdate = async () => {
    try {
      await axios.put(`http://localhost:3001/patientadmit/update/${selectedPatient._id}`, {
        patientName: selectedPatient.patientName,
        treatment: selectedPatient.treatment,
        doctor: selectedPatient.doctor,
        date: selectedPatient.date,
        status: selectedPatient.status,
      });

      // Update state without reload
      setRows((prev) =>
        prev.map((row) =>
          row._id === selectedPatient._id ? selectedPatient : row
        )
      );

      alert("Patient updated successfully.");
      handleClose();
    } catch (error) {
      console.error("Update failed:", error);
      alert("Failed to update patient.");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this patient?")) {
      try {
        await axios.delete(`http://localhost:3001/patientadmit/delete/${id}`);
        setRows((prev) => prev.filter((row) => row._id !== id));
        alert("Patient deleted successfully.");
      } catch (error) {
        console.error("Failed to delete patient:", error);
        alert(
          "Failed to delete patient.\n" +
          (error.response?.data?.message || error.message)
        );
      }
    }
  };

  // Table row content
  const rowContent = (index, row) => (
    <>
      {columns.map((column) => {
        if (column.dataKey === "actions") {
          return (
            <TableCell key="actions">
              <Button
                variant="outlined"
                size="small"
                sx={{ mr: 1 }}
                onClick={() => handleUpdate(row)}
              >
                Update
              </Button>
              <Button
                variant="outlined"
                color="error"
                size="small"
                onClick={() => handleDelete(row._id)}
              >
                Delete
              </Button>
            </TableCell>
          );
        }

        // Display sequential patient ID (P-01, P-02, ...)
        if (column.dataKey === "patientID") {
          const patientNumber = `P-${String(index + 1).padStart(2, "0")}`;
          return <TableCell key={column.dataKey}>{patientNumber}</TableCell>;
        }

        // Format date
        let value = row[column.dataKey];
        if (column.dataKey === "date" && value) {
          value = new Date(value).toISOString().split("T")[0];
        }

        return <TableCell key={column.dataKey}>{value}</TableCell>;
      })}
    </>
  );

  return (
    <Paper style={{ height: 800, width: "100%", padding: "80px" }}>
      <h2 style={{ textAlign: "center", color: "#1976d2" }}>
        Patient Treatment Details
      </h2>

      {/* Search Bar */}
      <TextField
        label="Search by Patient Name"
        variant="outlined"
        fullWidth
        margin="normal"
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
      />

      {loading ? (
        <div style={{ textAlign: "center", marginTop: "100px", fontSize: "18px" }}>
          Loading treatments...
        </div>
      ) : (
        <TableVirtuoso
          data={filteredRows}
          components={VirtuosoTableComponents}
          fixedHeaderContent={fixedHeaderContent}
          itemContent={rowContent}
        />
      )}

      {/* Update Modal */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Update Patient</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Patient Name"
            name="patientName"
            fullWidth
            value={selectedPatient?.patientName || ""}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="Treatment"
            name="treatment"
            fullWidth
            value={selectedPatient?.treatment || ""}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="Doctor"
            name="doctor"
            fullWidth
            value={selectedPatient?.doctor || ""}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="Date"
            name="date"
            type="date"
            fullWidth
            InputLabelProps={{ shrink: true }}
            value={selectedPatient?.date?.split("T")[0] || ""}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="Status"
            name="status"
            fullWidth
            value={selectedPatient?.status || ""}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmitUpdate} variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
}
