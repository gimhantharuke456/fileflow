import { proxy } from "valtio";

const state = proxy({
  currentUser: {},
  dashboardActiveIndex: 0,
  projects: [],
  files: [],
});

export default state;
