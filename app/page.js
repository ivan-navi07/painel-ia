"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../lib/supabase";

export default function Home() {

const router = useRouter();

const [user,setUser] = useState(null);

const [empreendimentos,setEmpreendimentos] = useState([]);

const [nome,setNome] = useState("");
const [tipo,setTipo] = useState("");
const [cidade,setCidade] = useState("");
const [bairro,setBairro] = useState("");
const [dormitorios,setDormitorios] = useState("");
const [metragem,setMetragem] = useState("");
const [preco,setPreco] = useState("");
const [lazer,setLazer] = useState("");
const [diferenciais,setDiferenciais] = useState("");
const [publicoAlvo,setPublicoAlvo] = useState("");
const [scriptIa,setScriptIa] = useState("");
const [descricao,setDescricao] = useState("");

useEffect(()=>{
 iniciar();
},[]);


async function iniciar(){

const {data} = await supabase.auth.getUser();

if(!data.user){
 router.push("/login");
 return;
}

setUser(data.user);

buscarEmpreendimentos(data.user.id);

}


async function buscarEmpreendimentos(userId){

const {data} = await supabase
.from("empreendimentos")
.select("*")
.eq("user_id",userId)
.order("created_at",{ascending:false});

setEmpreendimentos(data || []);

}



async function salvarEmpreendimento(){

const {data:userData} = await supabase.auth.getUser();

await supabase
.from("empreendimentos")
.insert([
{
nome,
tipo,
cidade,
bairro,
dormitorios,
metragem,
preco,
lazer,
diferenciais,
publico_alvo:publicoAlvo,
script_ia:scriptIa,
descricao,
user_id:userData.user.id
}
]);

alert("Empreendimento cadastrado");

setNome("");
setTipo("");
setCidade("");
setBairro("");
setDormitorios("");
setMetragem("");
setPreco("");
setLazer("");
setDiferenciais("");
setPublicoAlvo("");
setScriptIa("");
setDescricao("");

buscarEmpreendimentos(userData.user.id);

}



async function sair(){

await supabase.auth.signOut();

router.push("/login");

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

<p style={{opacity:0.7}}>
Dashboard
</p>

<p
style={{
opacity:0.7,
cursor:"pointer"
}}
onClick={() => router.push("/leads")}
>
Leads
</p>

<p style={{
color:"#38bdf8",
fontWeight:"bold",
cursor:"pointer"
}}
onClick={() => router.push("/")}
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

<div style={{
display:"flex",
justifyContent:"space-between",
alignItems:"center"
}}>

<h1>Painel Inteligente</h1>

<button
onClick={sair}
style={{
background:"#ef4444",
border:"none",
padding:"10px 18px",
borderRadius:8,
color:"#fff",
cursor:"pointer"
}}
>
Sair
</button>

</div>



{/* FORM */}
<div style={{
marginTop:30,
background:"#1e293b",
padding:25,
borderRadius:15
}}>

<h2>Cadastrar empreendimento</h2>

<div style={{
display:"grid",
gridTemplateColumns:"1fr 1fr",
gap:15,
marginTop:20
}}>

<input
placeholder="Nome empreendimento"
value={nome}
onChange={(e)=>setNome(e.target.value)}
/>

<input
placeholder="Tipo"
value={tipo}
onChange={(e)=>setTipo(e.target.value)}
/>

<input
placeholder="Cidade"
value={cidade}
onChange={(e)=>setCidade(e.target.value)}
/>

<input
placeholder="Bairro"
value={bairro}
onChange={(e)=>setBairro(e.target.value)}
/>

<input
placeholder="Dormitórios"
value={dormitorios}
onChange={(e)=>setDormitorios(e.target.value)}
/>

<input
placeholder="Metragem"
value={metragem}
onChange={(e)=>setMetragem(e.target.value)}
/>

<input
placeholder="Preço"
value={preco}
onChange={(e)=>setPreco(e.target.value)}
/>

<input
placeholder="Lazer"
value={lazer}
onChange={(e)=>setLazer(e.target.value)}
/>

</div>


<textarea
placeholder="Diferenciais"
value={diferenciais}
onChange={(e)=>setDiferenciais(e.target.value)}
style={{
width:"100%",
marginTop:20,
padding:15,
minHeight:100
}}
/>


<textarea
placeholder="Público alvo"
value={publicoAlvo}
onChange={(e)=>setPublicoAlvo(e.target.value)}
style={{
width:"100%",
marginTop:20,
padding:15,
minHeight:80
}}
/>


<textarea
placeholder="Script IA"
value={scriptIa}
onChange={(e)=>setScriptIa(e.target.value)}
style={{
width:"100%",
marginTop:20,
padding:15,
minHeight:120,
background:"#0f172a",
color:"#fff",
border:"1px solid #334155"
}}
/>


<textarea
placeholder="Descrição"
value={descricao}
onChange={(e)=>setDescricao(e.target.value)}
style={{
width:"100%",
marginTop:20,
padding:15,
minHeight:120
}}
/>


<button
onClick={salvarEmpreendimento}
style={{
marginTop:20,
background:"#38bdf8",
border:"none",
padding:"14px 20px",
borderRadius:8,
color:"#fff",
fontWeight:"bold",
cursor:"pointer"
}}
>
Salvar empreendimento
</button>

</div>




{/* LISTA */}
<div style={{marginTop:40}}>

<h2>Empreendimentos cadastrados</h2>

{empreendimentos.map((item)=>(

<div
key={item.id}
style={{
background:"#1e293b",
padding:20,
borderRadius:15,
marginTop:20
}}
>

<h2>{item.nome}</h2>

<p>
<strong>Tipo:</strong> {item.tipo}
</p>

<p>
<strong>Cidade:</strong> {item.cidade}
</p>

<p>
<strong>Bairro:</strong> {item.bairro}
</p>

<p>
<strong>Dormitórios:</strong> {item.dormitorios}
</p>

<p>
<strong>Metragem:</strong> {item.metragem}
</p>

<p>
<strong>Preço:</strong> R$ {item.preco}
</p>

<p>
<strong>Lazer:</strong> {item.lazer}
</p>

<p>
<strong>Diferenciais:</strong> {item.diferenciais}
</p>

<p>
<strong>Público alvo:</strong> {item.publico_alvo}
</p>

<div style={{
marginTop:15,
background:"#0f172a",
padding:15,
borderRadius:10
}}>

<strong>Script IA</strong>

<p style={{marginTop:10}}>
{item.script_ia}
</p>

</div>

</div>

))}

</div>

</div>

</div>

)

}