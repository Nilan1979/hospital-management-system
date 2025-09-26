import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
  useNavigate,
} from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Box,
  Card,
  CardContent,
  Grid,
} from "@mui/material";
import {
  LocalHospital as HospitalIcon,
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  CalendarToday as CalendarIcon,
} from "@mui/icons-material";

import Treatment from "./pages/Treatment";
import AddPatients from "./pages/AddPatients";
import Medications from "./pages/Medications";
import Login from "./pages/Login";
import NurseHome from "./pages/nurseHome"; // updated
// No Navbar import here

// Placeholder components
const Dashboard = () => (
  <Card>
    <CardContent>
      <Typography variant="h5" gutterBottom>
        Dashboard
      </Typography>
      <Typography variant="body2">
        Welcome to the Hospital Management System dashboard. This will show key
        metrics and quick actions.
      </Typography>
    </CardContent>
  </Card>
);

const Patients = () => (
  <Card>
    <CardContent>
      <Typography variant="h5" gutterBottom>
        Patient Management
      </Typography>
      <Typography variant="body2">
        Manage patient records, registration, and medical history.
      </Typography>
    </CardContent>
  </Card>
);

const Appointments = () => (
  <Card>
    <CardContent>
      <Typography variant="h5" gutterBottom>
        Appointment Management
      </Typography>
      <Typography variant="body2">
        Schedule and manage patient appointments with doctors.
      </Typography>
    </CardContent>
  </Card>
);

const Home = () => (
  <Container maxWidth="md">
    <Box sx={{ mt: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom align="center">
        Hospital Management System
      </Typography>
      <Typography
        variant="h6"
        component="p"
        gutterBottom
        align="center"
        color="text.secondary"
      >
        Comprehensive Healthcare Administration Platform
      </Typography>
      <Grid container spacing={3} sx={{ mt: 4 }}>
        <Grid item xs={12} md={4}>
          <Card sx={{ textAlign: "center", p: 2 }}>
            <DashboardIcon sx={{ fontSize: 48, color: "primary.main", mb: 2 }} />
            <Typography variant="h6" gutterBottom>
              Dashboard
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Monitor hospital operations and key metrics
            </Typography>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card sx={{ textAlign: "center", p: 2 }}>
            <PeopleIcon sx={{ fontSize: 48, color: "primary.main", mb: 2 }} />
            <Typography variant="h6" gutterBottom>
              Patient Management
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Manage patient records and medical history
            </Typography>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card sx={{ textAlign: "center", p: 2 }}>
            <CalendarIcon sx={{ fontSize: 48, color: "primary.main", mb: 2 }} />
            <Typography variant="h6" gutterBottom>
              Appointments
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Schedule and manage appointments
            </Typography>
          </Card>
        </Grid>
      </Grid>
    </Box>
  </Container>
);

// ✅ AppContent with PrivateRoute and AppBar button to NurseHome
function AppContent({ isLoggedIn, setIsLoggedIn }) {
  const location = useLocation();
  const navigate = useNavigate();
  const isLoginPage = location.pathname === "/login";

  const PrivateRoute = ({ children }) => {
    return isLoggedIn ? children : <Navigate to="/login" />;
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      {/* AppBar always rendered */}
    <AppBar position="static">
  <Toolbar>
    <HospitalIcon sx={{ mr: 2 }} />
    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
      Hospital Management System
    </Typography>

    <Button
      color="inherit"
      onClick={() => {
        if (isLoggedIn) {
          navigate("/nursehome"); // already logged in → go to nurse panel
        } else {
          navigate("/login", { state: { redirectTo: "/nursehome" } });
          // pass redirect info to login
        }
      }}
    >
      Nurse Panel
    </Button>
  </Toolbar>
    </AppBar>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/patients" element={<Patients />} />
        <Route path="/appointments" element={<Appointments />} />
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />

        <Route
          path="/Treatment"
          element={
            <PrivateRoute>
              <Treatment />
            </PrivateRoute>
          }
        />
        <Route
          path="/AddPatients"
          element={
            <PrivateRoute>
              <AddPatients />
            </PrivateRoute>
          }
        />
        <Route
          path="/Medications"
          element={
            <PrivateRoute>
              <Medications />
            </PrivateRoute>
          }
        />
        <Route
          path="/nursehome"
          element={
            <PrivateRoute>
              <NurseHome setIsLoggedIn={setIsLoggedIn} />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Box>
  );
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Router>
      <AppContent isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
    </Router>
  );
}

export default App;
