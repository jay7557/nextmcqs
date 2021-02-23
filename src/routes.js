import React from "react";
const Users = React.lazy(() => import("./views/Users/Users"));
const User = React.lazy(() => import("./views/Users/User"));

const Dashboard = React.lazy(() => import("./views/Dashboard"));
const Course_list = React.lazy(() => import("./views/Course/index"));
const Add_course = React.lazy(() => import("./views/Course/Course_add"));
const UserRow = React.lazy(() => import("./views/Users/Users"));
const Subjects = React.lazy(() => import("./views/Subject/index"));
const AddSubjects = React.lazy(() => import("./views/Subject/addSubject"));
const Questions = React.lazy(() => import("./views/Questions/index"));
const AddTest = React.lazy(() => import("./views/Questions/addTest"));
const AddQuestions = React.lazy(()=>import('./views/Questions/addQuestions'))
const routes = [
  { path: "/", exact: true, name: "Home" },
  { path: "/dashboard", name: "Dashboard", component: Dashboard },
  { path: "/course", name: "course", component: Course_list },
  { path: "/add_course", name: "add_course", component: Add_course },
  { path: "/user_list", name: "user_list", component: UserRow },
  { path: "/subject", name: "subject", component: Subjects },
  { path: "/addsubject", name: "addsubject", component: AddSubjects },
  { path: "/addTest", name: "AddTest", component: AddTest },
  { path: '/addquestions', name: 'addquestions', component:AddQuestions},
  { path: "/questions", name: "questions", component: Questions },
];

export default routes;
