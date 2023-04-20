import { BackendSelector } from "@/components/BackendSelector";
import { RegisterCard } from "@/components/registration";
import { apiClient } from "api/apiClient";
import { useState } from "react";

export default function TestPage() {
  //return <RegisterCard />

  console.debug("BaseURL is " + apiClient.baseUrl)

  return (
    <>
      <BackendSelector />
      <button onClick={() => {
        if (!apiClient.baseUrl.startsWith("https"))
          apiClient.categories.getCategories({ referrerPolicy: "unsafe-url" });
        else
          apiClient.categories.getCategories();
      }}>
        Try to download categories
      </button>
    </>
  )
}