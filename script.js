let matrix = 8;
let countCubiks = matrix * matrix;
let arrayCubiks = [];
let arrayColors = [];
let firstCubik = null;
let countFailed = 0;
let isEnd = true;

document.getElementById('cubiks').style.width = matrix * 100 + 22 * matrix + 'px';


function randomCubiks() {
    for (let i=0; i<countCubiks / 2; i++) {
        let color = {
            red: Math.round(Math.random() * 255),
            green: Math.round(Math.random() * 255),
            blue: Math.round(Math.random() * 255),
        }
        arrayColors.push(color);
        arrayColors.push(color);
    }

    arrayColors = arrayColors.sort(function() {
        return Math.random() - 0.5;
    });

    for (let i = 0; i < arrayColors.length; i++) {
        let cubik = {
            id: i,
            red: arrayColors[i].red,
            green: arrayColors[i].green,
            blue: arrayColors[i].blue,
            view: false,
        }
        arrayCubiks.push(cubik);
    }
};


randomCubiks();

console.log(arrayCubiks);

function renderCubiks(arrayCubiks) {
    arrayCubiks.map(cubik => {
        if (!document.getElementById('cubik_' + cubik.id)) {
            let div = document.createElement('div');
            div.id = 'cubik_' + cubik.id;
            div.className = 'cubik';
            div.onclick = event => cubikClick(event);
            document.getElementById('cubiks').append(div);
        }

        renderCubik(cubik, cubik.id);
    });
}

renderCubiks(arrayCubiks);

function cubikClick(event) {
    let cubikid = Number(event.target.id.slice(6));
    let isRollBack = false;
    let isForward = false;

    arrayCubiks.map(cubik => {
        if (cubik.id === cubikid) {
            if (firstCubik) {
                if (firstCubik.red === cubik.red && firstCubik.green === cubik.green && firstCubik.blue === cubik.blue) {
                    isForward = true;
                }
                else {
                    isRollBack = true;
                }
            }

            else {
                firstCubik = cubik;
            }

            cubik.view = true;
        }
    });
    renderCubiks(arrayCubiks);
    if (isRollBack) {
        const firstId = firstCubik.id;
        firstCubik = null;
        countFailed+=1;
        console.log('Вы совершили ' + countFailed + ' неудачных попыток!');
        setTimeout(() => {
            arrayCubiks.map(cubik => {
                if (cubik.id === firstId || cubik.id === cubikid) {
                    cubik.view = false;
                }
            });
            renderCubiks(arrayCubiks);
        }, 500);
    }

    if (isForward) {
        firstCubik = null;

        isEnd = true;
        arrayCubiks.map(cubik => {
            if (!cubik.view) {
                isEnd = false;
            }
        });

        if (isEnd) {
            console.log('Игра окончена, у вас было ' + countFailed + ' неудачных попыток!');
        }

        else {
            console.log('Вы молодец, продолжаем!');
        }
        renderCubiks(arrayCubiks)
    }
}

function renderCubik(cubik) {
    if (cubik.view) {
        document.getElementById('cubik_' + cubik.id).style.backgroundColor = 'rgb(' + cubik.red + ',' + cubik.green + ',' + cubik.blue + ')';
    }
    else {
        document.getElementById('cubik_' + cubik.id).style.backgroundColor = 'rgb(0,0,0)';
    }
}
