let countCubiks = 4 * 4;
let arrayCubiks = [];

document.getElementById('cubiks').style.width = 4 * 100 + 22 * 4 + 'px';

for (let i=0; i<countCubiks / 2; i++) {
    let cubik = {
        red: Math.round(Math.random() * 255),
        green: Math.round(Math.random() * 255),
        blue: Math.round(Math.random() * 255),
        view: false,
    }
    arrayCubiks.push(cubik);
}

arrayCubiks = [...arrayCubiks, ...arrayCubiks];

console.log(arrayCubiks);

function renderCubiks(arrayCubiks) {
    arrayCubiks.map((cubik, index) => {
        if (!document.getElementById('cubik_' + index)) {
            let div = document.createElement('div');
            div.id = 'cubik_' + index;
            div.className = 'cubik';
            div.onclick = event => cubikClick(event);
            document.getElementById('cubiks').append(div);
        }

        renderCubik(cubik, index);
    });
}

renderCubiks(arrayCubiks);

function cubikClick(event) {
    let cubikid = Number(event.target.id.slice(6));

    arrayCubiks.map((cubik, index) => {
        if (index === cubikid) {
            cubik.view = true;
        }
    });
    renderCubiks(arrayCubiks);
}

function renderCubik(cubik,index) {
    if (cubik.view) {
        document.getElementById('cubik_' + index).style.backgroundColor = 'rgb(' + cubik.red + ',' + cubik.green + ',' + cubik.blue + ')';
    }
}
