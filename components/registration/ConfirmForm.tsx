import { Alert, Button, CircularProgress, Link, Stack, TextField, Typography } from "@mui/material"
import { useApiClient } from "../../api/apiClient";
import { useRouter } from "next/router";
import { SyntheticEvent, useState } from "react";

export interface ConfirmFormProps {
  id: number,
  goToPrevious: () => void
}

export const ConfirmForm = (props: ConfirmFormProps) => {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const router = useRouter();
  const apiClient = useApiClient();

  const submitFunction = async (e: SyntheticEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const response = await apiClient.organizer.confirm(props.id.toString(), { headers: { code: code } });
    setLoading(false);
    if (response.ok) {
      setSuccess(true);
    } else {
      if (response.status === 400)
        setError("Invalid verification code.")
      else
        alert(response.statusText);
    }
  };

  return (
    <form
      onSubmit={submitFunction}>
      <Stack
        spacing={2}
      >
        {
          success ?
            <Alert
              severity="success"
              data-testid="success-alert"
            >
              <strong>Registration successful!</strong>
              &nbsp;
              Click <Link href="/login">here</Link> to log in.
            </Alert>
            : undefined
        }
        <Typography>
          We sent a verification code to your inbox.
        </Typography>
        <TextField
          label="Verification code"
          required
          data-testid="verify-code"
          disabled={loading || success}
          error={error !== ""}
          helperText={error}
          value={code}
          onChange={e => setCode(e.target.value)}
        />
        <Stack
          direction="row"
          spacing={2}

        >
          <Button
            variant="outlined"
            data-testid="go-back"
            disabled={loading || success}
            onClick={props.goToPrevious}
            style={{width:"50%"}}
          >
            Go back
          </Button>
          <Button
            variant="contained"
            data-testid="confirm"
            disabled={loading || success}
            type="submit"
            style={{width:"200%"}}
          >
            {loading ? <CircularProgress data-testid="loading" /> : "Register"}
          </Button>
        </Stack>
      </Stack>
    </form>
  )
}