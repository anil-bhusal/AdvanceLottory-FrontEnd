import { useState, useEffect } from "react";
import RegisterUser from "./containers/admin/registerUser";
import { Route, Link, Routes } from "react-router-dom";
import TicketWinner from "./containers/users/ticketWinner";
import AssignWinner from "./containers/admin/assignWinner";
import YupPractice from "./containers/yupPractice";
import WinnerChecker from "./containers/users/winnerChecker";
import UserList from "./containers/users/userList";

const App = () => {

  return (
    <>
      <Routes>
        <Route exact path="/registeruser" element={ <RegisterUser/> } />
        <Route exact path="/" element={ <TicketWinner/> } />
        <Route exact path="/assignwinner" element={ <AssignWinner/> } />
        <Route exact path="/yup" element={ <YupPractice/> } />
        <Route exact path="/winner" element={ <WinnerChecker/> } />
        <Route exact path="/user" element={ <UserList/> } />
      </Routes>
    </>
  );
} 

export default App;
