let totalHalaman = 0;

document.getElementById("fileElem").addEventListener("change", handleFile);

function handleFile(e){

const file = e.target.files[0];

const fileURL = URL.createObjectURL(file);

pdfjsLib.getDocument(fileURL).promise.then(pdf => {

totalHalaman = pdf.numPages;

document.getElementById("preview").innerHTML="";

for(let i=1;i<=pdf.numPages;i++){

pdf.getPage(i).then(page=>{

const viewport = page.getViewport({scale:0.5});

const canvas = document.createElement("canvas");

const ctx = canvas.getContext("2d");

canvas.height = viewport.height;

canvas.width = viewport.width;

document.getElementById("preview").appendChild(canvas);

page.render({
canvasContext:ctx,
viewport:viewport
});

});

}

hitungHarga();

});

}

document.querySelectorAll("select").forEach(el=>{
el.addEventListener("change", hitungHarga);
});

function hitungHarga(){

const warna = document.getElementById("warna").value;

const sisi = document.getElementById("sisi").value;

const total = totalHalaman * warna * sisi;

document.getElementById("totalHarga").innerText =
"Total: Rp "+Number(total).toLocaleString();

}

function kirimWA(){

const total = document.getElementById("totalHarga").innerText;

const text =

"Order Print MedanPrint%0A"+
total;

window.open(
"https://wa.me/628123456789?text="+text
);

}
