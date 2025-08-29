// function to get elements
function getElements(id) {
    const element = document.getElementById(id)
    return element
}

// function to get class 
function getClass(className) {
    const classes = document.getElementsByClassName(className)
    return classes
}

// count heart
let cnt = getClass("heart")
for(const count of cnt) {
    count.addEventListener('click', function(e){
        e.preventDefault()
        let countHeart = parseInt(getElements("heart-count").innerText)+1
        getElements("heart-count").innerText = countHeart
    })
}  

// copy feature
let copy = getClass("copy-button")
for(const copies of copy) {
    copies.addEventListener('click', function(e){
        e.preventDefault()
        const card = copies.closest('.card')
        if(!card) {
            return
        }
        const copyNum = card.querySelector(".card-number").innerText
        navigator.clipboard.writeText(copyNum)
        .then(() => {
            alert(`Number ${copyNum} copied`)
            let cntElement = getElements("count-copy")
            let crntCount = parseInt(cntElement.innerText)+1
            cntElement.innerText = crntCount
        }) 
        .catch(err => console.error("copy failed:",err))
    })
}

getElements("cards").addEventListener('click', function(e){
    if(e.target.className.includes("call-button")) {
        const callBtn = e.target
        const cardTitle = callBtn.parentNode.parentNode.parentNode.children[1].innerText
        const cardSub = callBtn.parentNode.parentNode.parentNode.children[2].innerText
        const phoneNum = callBtn.parentNode.parentNode.parentNode.children[3].innerText

        let coinEl = getElements("count-coin")
        let crntCoin = parseInt(coinEl.innerText)
        if(crntCoin < 20) {
            alert("❌ You don't have enough coins; you need at least 20 coins to make a call.")
            return
        }
        crntCoin -= 20;
        coinEl.innerText = crntCoin
        alert(`📞 calling ${cardSub} ${phoneNum}....`)
        const data = {
            date: new Date().toLocaleTimeString()
        }

        const container = getElements("new-container")
        const newContainer = document.createElement("div")
        newContainer.innerHTML = `
         <div class="flex items-center justify-between shadow-sm bg-[var(--Surface,rgba(250,250,250,1))]  rounded-sm  mt-5">
                <div>
                    <p class="text-[var(--Dark, rgba(17, 17, 17, 1))] font-semibold p-3 pb-1">${cardTitle}</p>
                    <p class="text-gray-400 font-bold p-3 pt-0">${phoneNum}</p>
                </div>
                <div class="pr-3 text-[var(--Dark, rgba(17, 17, 17, 1))] font-semibold ">
                    <p>${data.date}</p>
                </div>
            </div>
        `
        container.append(newContainer);
    }
})

getElements("clear-button").addEventListener('click', function(e){
    e.preventDefault()
    getElements("new-container").innerText = ""
})


