
let totalPrice = 0

document.getElementById("fileInput").addEventListener("change", function(){
const file = this.files[0]
if(file){
const url = URL.createObjectURL(file)
document.getElementById("preview").src = url
}
})

function calculate(){

const pages = document.getElementById("pages").value
const copies = document.getElementById("copies").value
const color = document.getElementById("color").value

totalPrice = pages * copies * color

document.getElementById("total").innerText =
"Total: Rp" + totalPrice.toLocaleString()

}

function sendWhatsapp(){

const phone = "6281234567890"

const text = encodeURIComponent(
"Halo MedanPrint, saya ingin print. Total harga Rp" + totalPrice
)

window.open("https://wa.me/"+phone+"?text="+text)

}
