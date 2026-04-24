"use client";

import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export default function Home() {
  const [user, setUser] = useState(null);
  const [leads, setLeads] = useState([]);

  useEffect(() => {
    const init = async () => {
      const { data } = await supabase.auth.getUser();

      if (!data.user) {
        window.location.href = "/login";
        return;
      }

      setUser(data.user);
      buscarLeads(data.user.id);
    };

    init();
  }, []);

  const buscarLeads = async (userId) => {
    const { data } = await supabase
      .from("leads")
      .select("*")
      .eq("user_id", userId);

    setLeads(data || []);
  };

  const criarLead = async () => {
    const { data: userData } = await supabase.auth.getUser();

    await supabase.from("leads").insert([
      {
        nome: "Novo Lead",
        telefone: "11999999999",
        user_id: userData.user.id,
      },
    ]);

    buscarLeads(userData.user.id);
  };

  const sair = async () => {
    await supabase.auth.signOut();
    window.location.href = "/login";
  };

  if (!user) return <p>Carregando...</p>;

  return (
    <div style={{ display: "flex", minHeight: "100vh", fontFamily: "Arial" }}>
      
      {/* SIDEBAR */}
      <div
        style={{
          width: 220,
          background: "#020617",
          color: "#fff",
          padding: 20,
        }}
      >
        <img src="/logo.png" width="120" />
        <h2 style={{ marginTop: 20 }}>Menu</h2>

        <p style={{ marginTop: 20, opacity: 0.7 }}>Dashboard</p>
        <p style={{ marginTop: 10, opacity: 0.7 }}>Leads</p>
      </div>

      {/* CONTEÚDO */}
      <div style={{ flex: 1, background: "#0f172a", color: "#fff", padding: 20 }}>
        
        {/* HEADER */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: 20,
          }}
        >
          <h1>Painel</h1>

          <button
            onClick={sair}
            style={{
              background: "#ef4444",
              border: "none",
              color: "#fff",
              padding: "8px 16px",
              borderRadius: 5,
              cursor: "pointer",
            }}
          >
            Sair
          </button>
        </div>

        {/* BOTÃO */}
        <button
          onClick={criarLead}
          style={{
            background: "#22c55e",
            border: "none",
            padding: "10px 20px",
            color: "#fff",
            borderRadius: 6,
            cursor: "pointer",
            marginBottom: 20,
          }}
        >
          + Criar Lead
        </button>

        {/* LISTA */}
        {leads.map((lead) => (
          <div
            key={lead.id}
            style={{
              background: "#1e293b",
              padding: 15,
              borderRadius: 10,
              marginBottom: 10,
            }}
          >
            <strong>{lead.nome}</strong>
            <p>{lead.telefone}</p>
          </div>
        ))}
      </div>
    </div>
  );
}