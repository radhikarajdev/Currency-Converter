let dropdown = document.querySelectorAll(".dropdown select");
let btn = document.querySelector("button");
let msg = document.querySelector(".msg");
let fromC = document.querySelector(".from select");
let toC = document.querySelector(".to select");


for(let select of dropdown){
    for(code in countryList){
        let newOpt = document.createElement("option");
        newOpt.innerText = code;
        newOpt.value = code;
        if(select.name === "from" && code==="USD"){
            newOpt.selected="selected";
        }else if(select.name === "to" && code==="INR"){
            newOpt.selected="selected";
        }
        select.append(newOpt);
    }
    select.addEventListener("change",(evt)=>{
        updateFlag(evt.target);
    })
}


const updateFlag = (element)=>{ 
    let code = element.value;
    let country = countryList[code];
    let newSrc = `https://flagsapi.com/${country}/flat/64.png`;
    let img = element.parentElement.querySelector('img');
    img.src = newSrc;
}


const updateExchangeRate = async()=>{
    let amount = document.querySelector(".amount input");
    let amountValue = amount.value;
    if(amountValue===''||amountValue<1){
        amountValue=1;
        amount.innerText = "1";
    }
    let url = `https://v6.exchangerate-api.com/v6/e3c9f8aa651cdc11d052ff31/latest/${fromC.value}`;
    let response = await fetch(url);
    let data = await response.json();
    let rate = data.conversion_rates[toC.value];
    let finalAmount = amountValue*rate;
    msg.innerText = `${amountValue}${fromC.value} = ${finalAmount}${toC.value}`;
}


btn.addEventListener(("click"),(evt)=>{
    evt.preventDefault();
    updateExchangeRate();
})


window.addEventListener(("load"),()=>{
    updateExchangeRate();
})