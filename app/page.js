"use client";

import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export default function Home() {

const [user,setUser] = useState(null);
const [leads,setLeads] = useState([]);
const [empreendimentos,setEmpreendimentos] = useState([]);

const [nome,setNome] = useState("");
const [cidade,setCidade] = useState("");
const [preco,setPreco] = useState("");
const [descricao,setDescricao] = useState("");

useEffect(()=>{
 iniciar();
},[]);


async function iniciar(){

 const {data} = await supabase.auth.getUser();

 if(!data.user){
   window.location.href="/login";
   return;
 }

 setUser(data.user);

 buscarLeads(data.user.id);
 buscarEmpreendimentos(data.user.id);
}


async function buscarLeads(userId){

const {data} = await supabase
.from("leads")
.select("*")
.eq("user_id",userId);

setLeads(data || []);
}


async function buscarEmpreendimentos(userId){

const {data} = await supabase
.from("empreendimentos")
.select("*")
.eq("user_id",userId)
.order("created_at",{ascending:false});

setEmpreendimentos(data || []);
}



async function criarLead(){

const {data:userData} = await supabase.auth.getUser();

await supabase
.from("leads")
.insert([
{
nome:"Novo Lead",
telefone:"11999999999",
user_id:userData.user.id
}
]);

buscarLeads(userData.user.id);
}



async function salvarEmpreendimento(){

const {data:userData} = await supabase.auth.getUser();

await supabase
.from("empreendimentos")
.insert([
{
nome,
cidade,
preco,
descricao,
user_id:userData.user.id
}
]);

setNome("");
setCidade("");
setPreco("");
setDescricao("");

buscarEmpreendimentos(userData.user.id);

alert("Empreendimento cadastrado");
}



async function sair(){
await supabase.auth.signOut();
window.location.href="/login";
}


if(!user){
return <p>Carregando...</p>
}


return(

<div style={{
display:"flex",
minHeight:"100vh",
fontFamily:"Arial"
}}>

{/* SIDEBAR */}
<div style={{
width:250,
background:"#020617",
color:"#fff",
padding:30
}}>

<img src="/logo.png" width="120"/>

<h2 style={{marginTop:30}}>
Menu
</h2>

<p style={{marginTop:20}}>Dashboard</p>
<p>Leads</p>
<p style={{color:"#22c55e"}}>
Empreendimentos
</p>

</div>


{/* CONTEUDO */}
<div style={{
flex:1,
background:"#0f172a",
color:"#fff",
padding:30
}}>

<div style={{
display:"flex",
justifyContent:"space-between"
}}>

<h1>Painel CRM IA</h1>

<button
onClick={sair}
style={{
background:"#ef4444",
border:"none",
color:"#fff",
padding:"10px 18px",
borderRadius:8
}}
>
Sair
</button>

</div>


{/* LEADS */}
<div style={{
marginTop:30,
background:"#1e293b",
padding:20,
borderRadius:12
}}>

<h2>Leads</h2>

<button
onClick={criarLead}
style={{
background:"#22c55e",
border:"none",
padding:"10px 16px",
color:"#fff",
marginTop:10,
borderRadius:8
}}
>
+ Criar Lead
</button>

{leads.map((lead)=>(
<div
key={lead.id}
style={{
marginTop:15,
background:"#334155",
padding:15,
borderRadius:10
}}
>
<strong>{lead.nome}</strong>
<p>{lead.telefone}</p>
</div>
))}

</div>



{/* EMPREENDIMENTOS */}
<div style={{
marginTop:40,
background:"#1e293b",
padding:20,
borderRadius:12
}}>

<h2>Cadastrar Empreendimento</h2>

<input
placeholder="Nome empreendimento"
value={nome}
onChange={(e)=>setNome(e.target.value)}
style={{
display:"block",
width:"100%",
marginTop:15,
padding:12
}}
/>

<input
placeholder="Cidade"
value={cidade}
onChange={(e)=>setCidade(e.target.value)}
style={{
display:"block",
width:"100%",
marginTop:15,
padding:12
}}
/>

<input
placeholder="Preço"
value={preco}
onChange={(e)=>setPreco(e.target.value)}
style={{
display:"block",
width:"100%",
marginTop:15,
padding:12
}}
/>

<input
placeholder="Descrição"
value={descricao}
onChange={(e)=>setDescricao(e.target.value)}
style={{
display:"block",
width:"100%",
marginTop:15,
padding:12
}}
/>

<button
onClick={salvarEmpreendimento}
style={{
marginTop:20,
background:"#38bdf8",
border:"none",
padding:"12px 20px",
color:"#fff",
borderRadius:8
}}
>
Salvar empreendimento
</button>



<h2 style={{marginTop:40}}>
Empreendimentos cadastrados
</h2>


{empreendimentos.map((item)=>(

<div
key={item.id}
style={{
marginTop:15,
background:"#334155",
padding:18,
borderRadius:10
}}
>
<h3>{item.nome}</h3>
<p>{item.cidade}</p>
<p>R$ {item.preco}</p>
<p>{item.descricao}</p>

</div>

))}


</div>

</div>

</div>

)

}