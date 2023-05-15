import { Card, Stack } from "@mui/material";
import { useRedirect } from "../../functions/useRedirect";
import { useEffect, useState } from "react";
import { ConfirmForm } from "./ConfirmForm";
import { RegisterForm } from "./RegisterForm";
import { Banner } from "../Banner";

export const RegisterCard = () => {
  const [freshId, setFreshId] = useState<number | undefined>(undefined);

  useRedirect({ ifLoggedIn: "/dashboard" });

  return (
    <Card sx={{ p: 2 }}>
      <Stack spacing={2}>
        <Banner />
        {freshId === undefined ? (
          <RegisterForm goToNext={setFreshId} />
        ) : (
          <ConfirmForm
            id={freshId}
            goToPrevious={() => setFreshId(undefined)}
          />
        )}
      </Stack>
    </Card>
  );
};
