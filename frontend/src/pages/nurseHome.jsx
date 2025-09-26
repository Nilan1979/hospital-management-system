import React from "react";
import Navbar from "./Navbar";

export default function NurseHome({ setIsLoggedIn }) {
  return (
    <div>
      {/* Navbar only on nurseHome */}
      <Navbar setIsLoggedIn={setIsLoggedIn} />

      <h1 style={{ textAlign: "center", marginTop: "2rem" }}>
        Welcome to Nurse Panel
      </h1>
    </div>
  );
}
