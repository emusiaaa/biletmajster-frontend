import { Button, Stack, TextField } from "@mui/material"
import { useRecoilState } from "recoil"
import { freshIdState } from "../../recoil/registration/freshIdState"

export const RegisterForm = () => {
  const [freshId, setFreshId] = useRecoilState(freshIdState)

  return (
    <Stack
      spacing={2}
    >
      <TextField
        label="Organizer name"
        required
      />
      <TextField
        label="E-mail"
        required
        type="email"
      />
      <TextField
        label="Password"
        required
        type="password"
      />
      <Button
        variant="contained"
      >
        Register
      </Button>
    </Stack>
  )
}