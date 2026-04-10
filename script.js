let foods=[
{name:"Pizza",price:250,img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDJKJPlaalwOKPpT-IChF_JIU4S8ZMGOiyGQ&s"},
{name:"Burger",price:150,img:"https://images.unsplash.com/photo-1568901346375-23c9450c58cd"},
{name:"Sushi",price:300,img:"https://images.unsplash.com/photo-1579871494447-9811cf80d66c"},
{name:"Pasta",price:200,img:"https://images.unsplash.com/photo-1473093295043-cdd812d0e601"},
{name:"Tacos",price:180,img:"https://images.unsplash.com/photo-1551504734-5ee1c4a1479b"},
{name:"Salad",price:120,img:"https://images.unsplash.com/photo-1546069901-ba9599a7e63c"}
];

let selectedList=[];

function validateEmail(email){
let re=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
return re.test(email);
}

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

if(document.getElementById("menu-grid")){
loadMenu();
}

function addToOrder(item){
selectedList.push(item);
playSound();
updateList();
}

function updateList(){
let counts={};

selectedList.forEach(item=>{
if(!counts[item]){
counts[item]=1;
}else{
counts[item]++;
}
});

let html="";
Object.keys(counts).forEach(item=>{
let quantity=counts[item];
html+=`
<li><b>${quantity}x</b> ${item}
<button onclick="removeItem('${item}')">❌</button>
</li>`;
});

document.getElementById("selectedItems").innerHTML=html;
}

function removeItem(itemToRemove){
selectedList=selectedList.filter(item=>item!==itemToRemove);
updateList();
}

function validateOrder(){
if(selectedList.length===0){alert("Select at least one item");return false;}

let type=document.getElementsByName("type");
let ok=false;
for(let i=0;i<type.length;i++){if(type[i].checked) ok=true;}
if(!ok){alert("Select order type");return false;}

let phone=document.getElementById("phone").value;
if(phone.length!=10 || isNaN(phone)){alert("Enter valid phone number");return false;}

let address=document.getElementById("address").value;
if(address.trim()===""){alert("Enter address");return false;}

let payment=document.getElementById("payment").value;
if(payment===""){alert("Select payment");return false;}

return true;
}

function processOrder(){
if(!validateOrder()) return;

document.getElementById("output").style.display="block";
document.getElementById("output").innerText=
"Your order is placed successfully! You will get your order in few minutes.";

showToast();
}

function submitContact(){
let n=document.getElementById("name").value;
let e=document.getElementById("email").value;
let m=document.getElementById("contactMsg").value;
let out=document.getElementById("contactOutput");

if(n==""||e==""||m==""){
out.style.color="red";out.innerText="Fill all fields";
}else if(!validateEmail(e)){
out.style.color="red";out.innerText="Please enter a valid email address.";
}else{
out.style.color="green";out.innerText="Message sent!";
}
}

function submitFeedback(){
let n=document.getElementById("feedbackName").value;
let e=document.getElementById("feedbackEmail").value;
let out=document.getElementById("feedbackOutput");

if(n==""||e==""){
out.style.color="red";out.innerText="Please fill in all blanks!";
}else if(!validateEmail(e)){
out.style.color="red";out.innerText="Please enter a valid email address.";
}else{
out.style.color="green";out.innerText="Thanks for your feedback!";
}
}

function showToast(){
let t=document.getElementById("toast");
t.style.display="block";
setTimeout(()=>t.style.display="none",2000);
}

function playSound(){
let sound=document.getElementById("clickSound");
if(sound) sound.play();
}

setInterval(()=>{
let clock=document.getElementById("clock");
if(clock) clock.innerText=new Date().toLocaleTimeString();
},1000);

window.onscroll=function(){
let topBtn=document.getElementById("topBtn");
if(topBtn){
topBtn.style.display=window.scrollY>200?"block":"none";
}
}

function scrollToTop(){
window.scrollTo({top:0,behavior:'smooth'});
}

let profileDiv=document.getElementById("profileSection");
let storedName=localStorage.getItem("userName");
let storedEmail=localStorage.getItem("userEmail");

function toggleProfilePopup(){
let popup=document.getElementById("profilePopup");
if(popup.style.display==="none"){
popup.style.display="block";
}else{
popup.style.display="none";
}
}

if(profileDiv && storedName){
profileDiv.style.display="flex";
profileDiv.style.position="relative";

profileDiv.innerHTML=`
<img src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" 
style="width:30px; cursor:pointer;" 
onclick="toggleProfilePopup()" 
title="Click to view profile">

<div id="profilePopup" style="display:none; position:absolute; top:45px; right:0; background:white; padding:15px; border-radius:10px; box-shadow:0 5px 15px rgba(0,0,0,0.2); width:200px; text-align:center; color:#333; z-index:1000; border: 1px solid #eee;">
<p style="margin:0; font-weight:bold; font-size:16px; color:#e67e22;">${storedName}</p>
<p style="margin:5px 0 0 0; font-size:13px; color:#555; word-wrap:break-word;">${storedEmail || 'No email saved'}</p>
</div>
`;
}
