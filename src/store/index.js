import { configureStore } from "@reduxjs/toolkit";

const reducerFn = (state = { counter: 0 }, action) => {};

const store = configureStore(reducerFn);

export default store;
