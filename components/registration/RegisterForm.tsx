import { Button, CircularProgress, Stack, TextField } from "@mui/material"
import { useApiClient } from "../../api/apiClient";
import { ValidationErrors } from "fluentvalidation-ts/dist/ValidationErrors";
import { useRouter } from "next/router";
import { SyntheticEvent, useState } from "react"
import { RegisterData, RegisterValidator } from "../../validators/RegisterValidator";
import { BackendSelector } from "../BackendSelector";

export interface RegisterFormProps {
  goToNext: (id: number) => void
}

export const RegisterForm = (props: RegisterFormProps) => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [mail, setMail] = useState("");
  const [errors, setErrors] = useState<ValidationErrors<RegisterData>>({});

  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const apiClient = useApiClient();

  const submitFunction = async (e: SyntheticEvent) => {
    e.preventDefault();
    setErrors({});
    const input = {
      name: name,
      email: mail,
      password: password
    };
    const validation = new RegisterValidator().validate(input);
    if (!Object.values(validation).every(val => val === undefined)) {
      setErrors(validation);
    } else {
      // already exists - redirect
      setLoading(true);
      const response = await apiClient.organizer.signUp(input);
      setLoading(false);
      if (response.ok) {
        props.goToNext(response.data.id!);
      } else {
        if (response.status === 400)
          router.push('/login');
        else
          alert(response.statusText);
      }
    }
  };

  return (
    <form
      onSubmit={submitFunction}>
      <Stack
        spacing={2}
      >
        <TextField
          label="Organizer name"
          required
          data-testid="organizer-name"
          disabled={loading}
          error={errors.name !== undefined}
          helperText={errors.name}
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <TextField
          label="E-mail"
          required
          type="email"
          data-testid="email"
          disabled={loading}
          error={errors.email !== undefined}
          helperText={errors.email}
          value={mail}
          onChange={e => setMail(e.target.value)}
        />
        <TextField
          label="Password"
          required
          type="password"
          data-testid="password"
          disabled={loading}
          error={errors.password !== undefined}
          helperText={errors.password}
          value={password}
          onChange={e => setPassword(e.target.value)}
        />

        <BackendSelector />
        <Button
          variant="contained"
          data-testid="register"
          disabled={loading}
          type="submit"
        >
          {loading ? <CircularProgress data-testid="loading"/> : "Register"}
        </Button>
      </Stack>
    </form>
  )
}