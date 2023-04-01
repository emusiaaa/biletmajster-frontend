import { Card, Stack } from "@mui/material"
import { useEffect, useState } from "react"
import { ConfirmForm } from "./ConfirmForm"
import { RegisterForm } from "./RegisterForm"

export const RegisterCard = () => {
  const [freshId, setFreshId] = useState<number | undefined>(undefined);

  // TODO: if logged in, redirect to organizer's main page

  return (
    <Card sx={{ p: 2 }}>
      {
        freshId === undefined
          ?
          <RegisterForm
            goToNext={setFreshId}
          />
          :
          <ConfirmForm
            id={freshId}
            goToPrevious={() => setFreshId(undefined)}
          />
      }
    </Card>
  )
}