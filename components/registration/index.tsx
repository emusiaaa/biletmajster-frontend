import { Card, Stack } from "@mui/material"
import { createContext, useEffect, useState } from "react"
import { useRecoilState } from "recoil"
import { freshIdState } from "../../recoil/registration/freshIdState"
import { ConfirmForm } from "./ConfirmForm"
import { RegisterForm } from "./RegisterForm"

export const RegisterCard = () => {
  const [freshId, setFreshId] = useRecoilState(freshIdState)

  // on page load, reset the form.
  useEffect(() => {
    setFreshId(undefined);
  }, []);

  // TODO: if logged in, redirect to organizer's main page

  return (
    <Card sx={{ p: 2 }}>
      {
        freshId === undefined
          ? <RegisterForm />
          : <ConfirmForm />
      }
    </Card>
  )
}