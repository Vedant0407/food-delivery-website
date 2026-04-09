let foods=[
{name:"Pizza",price:250,img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDJKJPlaalwOKPpT-IChF_JIU4S8ZMGOiyGQ&s"},
{name:"Burger",price:150,img:"https://images.unsplash.com/photo-1568901346375-23c9450c58cd"},
{name:"Sushi",price:300,img:"https://images.unsplash.com/photo-1579871494447-9811cf80d66c"},
{name:"Pasta",price:200,img:"https://images.unsplash.com/photo-1473093295043-cdd812d0e601"},
{name:"Tacos",price:180,img:"https://images.unsplash.com/photo-1551504734-5ee1c4a1479b"},
{name:"Salad",price:120,img:"https://images.unsplash.com/photo-1546069901-ba9599a7e63c"}
];

let selectedList=[];

function loadMenu(){
let html="";
foods.forEach(f=>{
html+=`
<div class="menu-item" onclick="addToOrder('${f.name}')">
<img src="${f.img}">
<div class="menu-details">
<h3>${f.name}</h3>
<p class="price">₹${f.price}</p>
</div>
</div>`;
});
document.getElementById("menu-grid").innerHTML=html;
}
loadMenu();

function addToOrder(item){
selectedList.push(item);
playSound();

let html="";
selectedList.forEach(i=>{
html+="<li>"+i+"</li>";
});
document.getElementById("selectedItems").innerHTML=html;
}

function validateOrder(){
if(selectedList.length===0){alert("Select at least one item");return false;}
let type=document.getElementsByName("type");
let ok=false;
for(let i=0;i<type.length;i++){if(type[i].checked) ok=true;}
if(!ok){alert("Select order type");return false;}
let address=document.getElementById("address").value;
if(address.trim()===""){alert("Enter address");return false;}
let payment=document.getElementById("payment").value;
if(payment===""){alert("Select payment");return false;}
return true;
}

function processOrder(){
if(!validateOrder()) return;
document.getElementById("output").style.display="block";
document.getElementById("output").innerText="🎉 Order placed successfully!";
showToast();
}

function submitContact(){
let n=name.value,e=email.value,m=contactMsg.value;
let out=document.getElementById("contactOutput");

if(n==""||e==""||m==""){
out.style.color="red";out.innerText="Fill all fields";
}else{
out.style.color="green";out.innerText="Message sent!";
}
}

function showToast(){
let t=document.getElementById("toast");
t.style.display="block";
setTimeout(()=>t.style.display="none",2000);
}

function playSound(){
document.getElementById("clickSound").play();
}

setInterval(()=>{
document.getElementById("clock").innerText=new Date().toLocaleTimeString();
},1000);

window.onscroll=function(){
document.getElementById("topBtn").style.display=
window.scrollY>200?"block":"none";
}

function scrollToTop(){
window.scrollTo({top:0,behavior:'smooth'});
}