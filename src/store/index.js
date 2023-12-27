import { proxy } from "valtio";

const state = proxy({
  currentUser: {},
});

export default state;
