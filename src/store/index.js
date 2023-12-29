import { proxy } from "valtio";

const state = proxy({
  currentUser: {},
  dashboardActiveIndex: 0,
  projects: [],
  files: [],
  selectedProject: {},
});

export default state;
