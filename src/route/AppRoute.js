import React, { useState, useEffect, useRef } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import LoginPage from "../pages/login/Login.Page";
import StudentFeedback from "../pages/studentFeedback/StudentFeedback.Page";
import FeedbackReport from "../pages/feedbackReport/FeedbackReport.Page";
import StudentReport from "../pages/studentReport/StudentReport.Page";

import { Version } from "../api/api";

function AppRoute({ loggedin }) {
  const dispatch = useDispatch();
  const userType = localStorage.getItem("usertype");
  const userName = localStorage.getItem("username");
  const userId = localStorage.getItem("userid");
  const uniqueId = localStorage.getItem("uniqueId");
  console.log("user Data", userType, userId, Version?.version);

  return (
    <Routes>
      {!loggedin && (
        <>
          <Route path="/login" element={<LoginPage />} />
        </>
      )}
      {loggedin && (
        <>
          <Route exact path="/" element={<StudentFeedback />} />
          <Route path="/home" element={<StudentFeedback />} />
          <Route path="/feedbackReport" element={<FeedbackReport />} />
          <Route path="/studentReport" element={<StudentReport />} />
        </>
      )}

      <Route
        path="*"
        element={<Navigate to={loggedin ? "/home" : "/login"} />}
      />
    </Routes>
  );
}

export default AppRoute;
