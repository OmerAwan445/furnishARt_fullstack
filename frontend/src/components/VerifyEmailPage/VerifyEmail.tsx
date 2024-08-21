"use client";

import AuthSvs from "@/services/Auth";
import { Container, Typography } from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function VerifyEmail() {
  const router = useRouter();
  const token = useSearchParams().get("token");
  const [message, setMessage] = useState<{
    type: "" | "success" | "error";
    text: string;
  }>({
    type: "",
    text: "",
  });

  // remove token from url
  // useEffect(() => {
  //   if (token) {
  //     const newUrl = window.location.href.split("?")[0];
  //     router.replace(newUrl);
  //   }
  // }, [router, token]);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout | null = null;

    if (token) {
      (async () => {
        const resp = await AuthSvs.verifyEmail(token);
        if (resp?.ok) {
          setMessage({ type: "success", text: "Email verified successfully." });
          timeoutId = setTimeout(() => {
            router.push('/');
          }, 2000); // 2000 milliseconds = 2 seconds
        } else {
          setMessage({
            type: "error",
            text: resp?.error ?? "Verification Failed",
          });
        }
      })();
    } else {
      setMessage({ type: "error", text: "Invalid Token" });
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, []);

  
  return (
    <Container maxWidth="md" style={{ marginTop: "50px" }}>
      <div style={{ textAlign: "center" }}>
        <Typography sx={{ fontWeight: 500 }} variant="h2" gutterBottom>
          Verify Email
        </Typography>
        {!!message.text && !!message.type && <Typography
          variant="subtitle1"
          gutterBottom
          style={{
            marginTop: "1rem",
            fontSize: "1.5rem",
            color: message.type === "error" ? "red" : "inherit",
          }}
        >
          {message.text}
        </Typography>}
      </div>
    </Container>
  );
}
