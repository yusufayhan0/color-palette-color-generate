let colorPalette = document.getElementById("color-palette")
let currentEleman;

function notification(msg) {
    let old_div = document.querySelector(".alert")
    if (old_div) {
        old_div.parentNode.removeChild(old_div)
    }

    let div = document.createElement("div")
    div.className = "alert"
    div.innerHTML = msg
    document.body.appendChild(div)


    setTimeout(() => {
        div.classList.add("active")
    }, 10);

    setTimeout(() => {
        div.classList.remove("active")
    }, 1000);
}

function generateColorPalette() {
    colorPalette.innerHTML = ""

    for (let i = 0; i < 5; i++) {
        let color = generateColor()
        colorPalette.innerHTML += `
            <li>
                <span class="color" style="--color:${color}"></span>
                <span class="text">${color}</span>
                <input name="color" type="text" value="${color}" />
            </li>
        `
    }

    document.querySelectorAll("ul.color-palette li").forEach(a => {
        a.addEventListener("mouseover", (e) => {
            currentEleman = e.target.parentNode
        })
    })

    document.querySelectorAll("ul.color-palette li").forEach(a => {
        a.addEventListener("click", (e) => {
            let input = e.target.parentNode.querySelector("input[name='color']")
            input.select()
            document.execCommand("copy")
            notification("Color " + input.value + " copied to your clipboard")

        })
    })


}
generateColorPalette()

window.addEventListener("keypress", function (e) {
    if (e.keyCode === 32) {
        generateColorPalette()
    }
    else if (e.keyCode === 99 && currentEleman) {
        let input = currentEleman.querySelector("input[name='color']")
        input.select()
        document.execCommand("copy")
        notification("Color " + input.value + " copied to your clipboard")
    }
    e.preventDefault()
})

function generateColor() {
    let str = "abcdef0123456789"
    let color = "#"
    for (let i = 0; i <= 5; i++) {
        color += str[Math.floor(Math.random() * str.length)]
    }
    return color
}




