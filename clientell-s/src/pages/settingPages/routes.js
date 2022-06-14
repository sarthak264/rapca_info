import React from "react";
import { useParams } from "react-router-dom";
import { ManageFilters } from "../manageFilters";
import { ManageMetrics } from "../manageMetrics";

import { Linked } from "./linked";
import { Onboarding } from "./onboarding";

export const SettingsRoute = () => {
  const { pages } = useParams();
  if (pages === "linked") return <Linked />;
  else if (pages === "onboarding") return <Onboarding />;
  else if (pages === "manage-metrics") return <ManageMetrics />;
  else if (pages === "manage-filters") return <ManageFilters />;
};
