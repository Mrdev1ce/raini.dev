import React from "react";
import { hydrate } from "react-dom";
import { App } from "./App";

// Browser-only things

hydrate(<App />, document.getElementById("root"));
