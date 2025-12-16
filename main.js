let parent = document.getElementById("parent")
let search = document.getElementById("search")
let filterboss = document.getElementById("filterboss")
let alldata = []
let imginput = document.getElementById("imginput")
let titleinput = document.getElementById("titleinput")
let priceinput = document.getElementById("priceinput")
let reatinginput = document.getElementById("reatinginput")
let save = document.getElementById("save")
let save2 = document.getElementById("save2")
let modal = document.getElementById("modal")
let modal2 = document.getElementById("modal2")
let globalO = null
let add = document.getElementById("add")

function getData (){
    fetch('https://fakestoreapi.com/products')
  .then(response => response.json())
  .then(data => {
    renderData(data)
    alldata = data
    
search.addEventListener("input", (e)=>{
    parent.innerHTML = ""
    let ar = data.filter((kiym)=>{
        return kiym.title.toLowerCase().includes(e.target.value.toLowerCase())

    })
    console.log(ar)
    renderData(ar)
})
});
}

getData()

function renderData (data){
    parent.innerHTML=``
    data.forEach(item=>{
        let div = document.createElement("div")
        let btne = document.createElement("button")
        let btnd = document.createElement("button")
        btnd.textContent = "delete"
        btne.textContent = "edit"
        btnd.className = "btnd"
        btne.className = "btne"
        div.innerHTML = `
        <img class="img" height="200px" src="${item.image}">
        <h3 class="h1">${item.title}</h3>
        <p class="p" style ="color:green; font-weight: 900;">${item.price}$</p>
        <p class="r">⭐${item.rating.rate}</p>
        `
        div.className = "card"       
        parent.appendChild(div)
        div.appendChild(btnd)    
        div.appendChild(btne) 

        btnd.addEventListener("click",()=>{
            deleteel(item.id)
        })
        btne.addEventListener("click",()=>{
           modal.style.display = "block"
           globalO = item.id
        })
        
    })

    
}

save.addEventListener("click",()=>{
            if(globalO){
                editel(globalO)
            }
        })


function editel (id){
    fetch(`https://fakestoreapi.com/products/${id}`,{
        method:"PUT",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            image: imginput.value,
            title:titleinput.value,
            rating: { rate: parseFloat(reatinginput.value) },
            price: parseFloat(priceinput.value)
        })
    }).then((respons)=>{

    })
}

function deleteel (id){
    fetch(`https://fakestoreapi.com/products/${id}`,{
        method:"DELETE",
        headers:{
            "Content-Type":"application/json"
        }
    })
    .then((respons)=>{
        console.log(respons)
    })
}


filterboss.addEventListener("change",()=>{
    parent.innerHTML = ``
    if(filterboss.value === "reating"){
        let fil = [...alldata].sort((one,two)=>{
            return two.rating.rate - one.rating.rate
            
        })
        renderData(fil)
    }
    else if (filterboss.value === "price"){
        let ifl = [...alldata].sort((one,two)=>{
            return two.price - one.price
        })
        renderData(ifl)
    }
    else if(filterboss.value === "all"){
        renderData(alldata)
    }
})

add.addEventListener("click",()=>{
    modal2.style.display = "block"
})
save2.addEventListener("click",()=>{
    addel()
})


function addel (){
    fetch(`https://fakestoreapi.com/products`,{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            image: imginput.value,
            title:titleinput.value,
            rating: { rate: parseFloat(reatinginput.value) },
            price: parseFloat(priceinput.value)
        })
    }).then((respons)=>{

    })
}