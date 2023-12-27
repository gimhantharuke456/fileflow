import { proxy } from "valtio";

const state = proxy({
  currentUser: {},
  dashboardActiveIndex: 0,
});

export default state;
