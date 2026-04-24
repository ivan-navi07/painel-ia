"use client";

import { useState } from "react";
import { supabase } from "../../lib/supabase";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);

  const entrar = async () => {
    setLoading(true);

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password: senha,
    });

    console.log("LOGIN:", data, error);

    if (error) {
      alert(error.message);
      setLoading(false);
      return;
    }

    window.location.href = "/";
  };

  return (
    <div style={{ padding: 40 }}>
      <h1>Login</h1>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Senha"
        value={senha}
        onChange={(e) => setSenha(e.target.value)}
      />

      <button onClick={entrar} disabled={loading}>
        {loading ? "Entrando..." : "Entrar"}
      </button>
    </div>
  );
}