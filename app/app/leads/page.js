"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

export default function Leads() {

const [user,setUser] = useState(null);
const [leads,setLeads] = useState([]);

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

}



async function buscarLeads(userId){

const {data} = await supabase
.from("leads")
.select("*")
.eq("user_id",userId)
.order("created_at",{ascending:false});

setLeads(data || []);

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
width:260,
background:"#020617",
padding:30,
color:"#fff"
}}>

<img src="/logo.png" width="120"/>

<h2 style={{marginTop:30}}>
CRM IA
</h2>

<div style={{marginTop:30}}>

<p
style={{
color:"#38bdf8",
fontWeight:"bold",
cursor:"pointer"
}}
onClick={()=>window.location.href="/leads"}
>
Leads
</p>

<p
style={{
marginTop:15,
cursor:"pointer"
}}
onClick={()=>window.location.href="/"}
>
Empreendimentos
</p>

</div>

</div>



{/* CONTEUDO */}
<div style={{
flex:1,
background:"#0f172a",
padding:30,
color:"#fff"
}}>

<h1>Leads</h1>

<button
onClick={criarLead}
style={{
marginTop:20,
background:"#22c55e",
border:"none",
padding:"12px 20px",
borderRadius:8,
color:"#fff",
cursor:"pointer"
}}
>
+ Criar Lead
</button>



{leads.map((lead)=>(

<div
key={lead.id}
style={{
background:"#1e293b",
padding:20,
borderRadius:12,
marginTop:20
}}
>

<h3>{lead.nome}</h3>

<p>{lead.telefone}</p>

</div>

))}


</div>

</div>

)

}