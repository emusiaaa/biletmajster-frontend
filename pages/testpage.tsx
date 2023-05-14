import { BackendSelector } from "@/components/BackendSelector";
import { RegisterCard } from "@/components/registration";
import { useApiClient } from "functions/useApiClient";
import { Map } from "@/components/Map";
import { Button, Card, Typography } from "@mui/material";
import { LocationOn } from "@mui/icons-material";
import { useState } from "react";

export default function TestPage() {
  //return <RegisterCard />
  const [pos, setPos] = useState<[number, number] | undefined>(undefined);
  const [newPos, setNewPos] = useState<[number, number] | undefined>(undefined);

  return (
    <>
      <h1>Map component test?</h1>
      <Map
        style={{
          width: 600,
          height: 500,
          borderColor: "black",
          borderWidth: 1,
        }}
        elevation={0}
        bluePin={pos}
        orangePin={newPos}
        onClick={(p) => setNewPos(p)}
      />
      <Button
        disabled={newPos === pos}
        onClick={() => {
          setPos(newPos);
          setNewPos(undefined);
        }}
      >
        Set new location
      </Button>
    </>
  );
}
