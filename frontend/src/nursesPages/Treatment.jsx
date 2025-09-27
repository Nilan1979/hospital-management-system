import * as React from "react";
import { useState, useEffect, useMemo } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Box,
  Typography,
  AppBar, // Kept for reference but removed from render
  Toolbar, // Kept for reference but removed from render
  Grid,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  CircularProgress,
} from "@mui/material";
import { Search as SearchIcon, FilterList as FilterListIcon } from "@mui/icons-material";
import { TableVirtuoso } from "react-virtuoso";

// Column definitions
const columns = [
  { width: 100, label: "Patient ID", dataKey: "patientID" },
  { width: 200, label: "Patient Name", dataKey: "patientName" },
  { width: 250, label: "Treatment", dataKey: "treatment" },
  { width: 150, label: "Doctor", dataKey: "doctor" },
  { width: 120, label: "Date", dataKey: "date" },
  { width: 120, label: "Status", dataKey: "status" },
  { width: 180, label: "Actions", dataKey: "actions" },
];

// Virtuoso table components
const VirtuosoTableComponents = {
  Scroller: React.forwardRef((props, ref) => (
    <TableContainer
      component={Paper}
      {...props}
      ref={ref}
      // UI enhancement: Smoother edges and elevation
      sx={{
        borderRadius: 2,
        boxShadow: 3,
        overflow: 'hidden',
        border: '1px solid #e0e0e0', // Subtle border
      }}
    />
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
          style={{ width: column.width, fontWeight: "600" }} // Increased font weight
          sx={{
            backgroundColor: "#2196f3", // Primary color background
            color: "white", // White text for contrast
            py: 1.5, // Padding for height
            position: 'sticky',
            top: 0,
            zIndex: 1,
            '&:first-of-type': { borderTopLeftRadius: 8 },
            '&:last-of-type': { borderTopRightRadius: 8 },
          }}
        >
          {column.label}
        </TableCell>
      ))}
    </TableRow>
  );
}

// UI enhancement: Get all unique statuses for the filter
const getUniqueStatuses = (rows) => {
  const statuses = rows.map(row => row.status).filter(Boolean);
  return Array.from(new Set(statuses)).sort();
};

export default function Treatment() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [open, setOpen] = useState(false); // Update Dialog
  const [openFilter, setOpenFilter] = useState(false); // New: Filter Dialog
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [statusFilter, setStatusFilter] = useState(""); // New: Status Filter State

  // Fetch patients on mount
  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      // simulate network delay for better UI experience
      await new Promise(resolve => setTimeout(resolve, 500)); 
      const response = await axios.get("http://localhost:3001/patientadmit/allpatient");
      setRows(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching patients:", error);
      setLoading(false);
    }
  };

  // UI enhancement: Memoize unique statuses
  const uniqueStatuses = useMemo(() => getUniqueStatuses(rows), [rows]);

  // Filter rows by patient name AND status
  const filteredRows = rows.filter(row => {
    const nameMatch = row.patientName?.toLowerCase().includes(searchTerm.toLowerCase());
    const statusMatch = statusFilter === "" || row.status === statusFilter;
    return nameMatch && statusMatch;
  });

  const handleUpdate = (row) => {
    setSelectedPatient({ ...row });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedPatient(null);
  };

  const handleFilterOpen = () => {
    setOpenFilter(true);
  };

  const handleFilterClose = () => {
    setOpenFilter(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelectedPatient((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitUpdate = async () => {
    try {
      // Construct payload with formatted date if it exists
      const dateValue = selectedPatient.date 
        ? new Date(selectedPatient.date).toISOString().split("T")[0] 
        : null;

      const payload = {
        patientName: selectedPatient.patientName,
        treatment: selectedPatient.treatment,
        doctor: selectedPatient.doctor,
        // Send the formatted date back
        date: dateValue, 
        status: selectedPatient.status,
      };

      await axios.put(`http://localhost:3001/patientadmit/update/${selectedPatient._id}`, payload);

      // Update state
      setRows((prev) =>
        prev.map((row) =>
          row._id === selectedPatient._id ? { ...selectedPatient, date: selectedPatient.date } : row
        )
      );
      
      alert("Patient updated successfully. ✅");
      handleClose();
    } catch (error) {
      console.error("Update failed:", error);
      alert("Failed to update patient. ❌");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this patient record permanently?")) {
      try {
        await axios.delete(`http://localhost:3001/patientadmit/delete/${id}`);
        setRows((prev) => prev.filter((row) => row._id !== id));
        alert("Patient deleted successfully. ✅");
      } catch (error) {
        console.error("Failed to delete patient:", error);
        alert(
          "Failed to delete patient. ❌\n" +
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
                variant="contained" // Enhanced: Contained for primary action
                color="primary"
                size="small"
                sx={{ 
                    mr: 1, // Added small margin right here
                    minWidth: '80px' 
                }} 
                onClick={() => handleUpdate(row)}
              >
                Update
              </Button>
              <Button
                variant="outlined" // Enhanced: Outlined for secondary/destructive action
                color="error"
                size="small"
                sx={{ minWidth: '80px' }}
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
          return <TableCell key={column.dataKey} sx={{ fontWeight: 'bold' }}>{patientNumber}</TableCell>;
        }
        
        // Format date
        let value = row[column.dataKey];
        if (column.dataKey === "date" && value) {
          // Date formatting for display
          value = new Date(value).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
          });
        }
        
        // Custom styling for Status column
        const statusSx = column.dataKey === "status" 
          ? { 
              backgroundColor: value === 'Completed' ? '#e8f5e9' : value === 'Pending' ? '#fff3e0' : '#e3f2fd',
              color: value === 'Completed' ? '#388e3c' : value === 'Pending' ? '#f57c00' : '#1976d2',
              borderRadius: '16px',
              padding: '4px 8px',
              display: 'inline-block',
              fontWeight: '600',
              textAlign: 'center',
          } : {};

        return (
          <TableCell key={column.dataKey}>
            <span style={statusSx}>
              {value}
            </span>
          </TableCell>
        );
      })}
    </>
  );

  return (
    // Removed AppBar and adjusted padding for main content container
    <Box
      sx={{
        backgroundColor: "#f4f7f6", // Light, soothing background
        minHeight: "100vh",
        p: 0,
      }}
    >
      <Box sx={{ p: 4, maxWidth: 1200, mx: 'auto' }}>
        <Paper elevation={4} sx={{ p: 3, borderRadius: 2 }}>
          <Typography
            variant="h4"
            component="h2"
            gutterBottom
            align="center"
            sx={{ color: "#1976d2", mb: 3, fontWeight: "600" }}
          >
            Patient Treatment Details
          </Typography>

          {/* Search & Filter Section */}
          <Grid container spacing={2} alignItems="center" sx={{ mb: 3 }}>
            <Grid item xs={12} sm={9}>
              <TextField
                label="Search by Patient Name"
                variant="outlined"
                fullWidth
                size="small"
                InputProps={{
                    startAdornment: (
                        <SearchIcon color="action" sx={{ mr: 1 }} />
                    ),
                }}
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <Button
                variant="contained"
                fullWidth
                startIcon={<FilterListIcon />}
                onClick={handleFilterOpen}
                sx={{ color:'#ffffffff', height: '40px' , marginBottom: '20px'}} // Match height of TextField
              >
                Filter {statusFilter && `(${statusFilter})`}
              </Button>
            </Grid>
          </Grid>
          {/* --- */}

          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 5 }}>
              <CircularProgress />
              <Typography variant="h6" sx={{ ml: 2, color: '#666' }}>
                Loading treatment records...
              </Typography>
            </Box>
          ) : filteredRows.length === 0 && (searchTerm || statusFilter) ? (
            <Box sx={{ textAlign: "center", py: 5, color: '#f44336' }}>
              <Typography variant="h6">
                No patients found matching your criteria. 😔
              </Typography>
            </Box>
          ) : (
            <Box sx={{ height: 600, mt: 3 }}>
              <TableVirtuoso
                data={filteredRows}
                components={VirtuosoTableComponents}
                fixedHeaderContent={fixedHeaderContent}
                itemContent={rowContent}
              />
            </Box>
          )}
        </Paper>

        {/* Update Modal */}
        <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
          <DialogTitle sx={{ backgroundColor: "#2196f3", color: "white" }}>
            📝 Update Patient Details
          </DialogTitle>
          <DialogContent sx={{ pt: 2 }}>
            <TextField
              autoFocus
              margin="dense"
              label="Patient Name"
              name="patientName"
              fullWidth
              variant="outlined"
              value={selectedPatient?.patientName || ""}
              onChange={handleChange}
            />
            <TextField
              margin="dense"
              label="Treatment"
              name="treatment"
              fullWidth
              variant="outlined"
              value={selectedPatient?.treatment || ""}
              onChange={handleChange}
            />
            <TextField
              margin="dense"
              label="Doctor"
              name="doctor"
              fullWidth
              variant="outlined"
              value={selectedPatient?.doctor || ""}
              onChange={handleChange}
            />
            <TextField
              margin="dense"
              label="Date"
              name="date"
              type="date"
              fullWidth
              variant="outlined"
              InputLabelProps={{ shrink: true }}
              // Ensure the date is in 'YYYY-MM-DD' format for the input
              value={selectedPatient?.date ? new Date(selectedPatient.date).toISOString().split("T")[0] : ""}
              onChange={handleChange}
            />
            {/* Status can be a select for better UX */}
            <FormControl fullWidth margin="dense" variant="outlined">
                <InputLabel id="status-select-label">Status</InputLabel>
                <Select
                    labelId="status-select-label"
                    id="status-select"
                    name="status"
                    value={selectedPatient?.status || ""}
                    label="Status"
                    onChange={handleChange}
                >
                    <MenuItem value="Pending">Pending</MenuItem>
                    <MenuItem value="In Progress">In Progress</MenuItem>
                    <MenuItem value="Completed">Completed</MenuItem>
                    <MenuItem value="Cancelled">Cancelled</MenuItem>
                </Select>
            </FormControl>
          </DialogContent>
          <DialogActions sx={{ p: 2, borderTop: '1px solid #eee' }}>
            <Button onClick={handleClose} color="error" variant="outlined">
              Cancel
            </Button>
            <Button onClick={handleSubmitUpdate} variant="contained" color="primary">
              Save Changes
            </Button>
          </DialogActions>
        </Dialog>

        {/* New: Filter Modal */}
        <Dialog open={openFilter} onClose={handleFilterClose} maxWidth="xs" fullWidth>
            <DialogTitle sx={{ backgroundColor: "#2196f3", color: "white" }}>
                Filter Treatments
            </DialogTitle>
            <DialogContent sx={{ pt: 2 }}>
                <FormControl fullWidth margin="dense" variant="outlined">
                    <InputLabel id="status-filter-label">Filter by Status</InputLabel>
                    <Select
                        labelId="status-filter-label"
                        id="status-filter"
                        value={statusFilter}
                        label="Filter by Status"
                        onChange={(e) => setStatusFilter(e.target.value)}
                    >
                        <MenuItem value="">
                            <em>All Statuses</em>
                        </MenuItem>
                        {uniqueStatuses.map((status) => (
                          <MenuItem key={status} value={status}>
                              {status}
                          </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </DialogContent>
            <DialogActions sx={{ p: 2, borderTop: '1px solid #eee' }}>
                <Button onClick={() => { setStatusFilter(""); handleFilterClose(); }} color="error" variant="text">
                    Clear Filter
                </Button>
                <Button onClick={handleFilterClose} variant="contained" color="primary">
                    Apply Filter
                </Button>
            </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
}