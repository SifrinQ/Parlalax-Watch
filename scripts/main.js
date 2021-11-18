'use strict';

//Константа time отечает, за то какие палочки нужно подсветить, чтобы появилась конкретная цифра

const time = [
    [1, ['sv3', 'sv4']],
    [2, ['sh1', 'sv3', 'sh2', 'sv2', 'sh3']],
    [3, ['sh1', 'sv3', 'sh2', 'sv4', 'sh3']],
    [4, ['sv1', 'sh2', 'sv3', 'sv4']],
    [5, ['sh1', 'sv1', 'sh2', 'sv4', 'sh3']],
    [6, ['sh1', 'sv1', 'sv2', 'sh3', 'sv4', 'sh2']],
    [7, ['sh1', 'sv3', 'sv4']],
    [8, ['sv1', 'sv2', 'sh3', 'sv4', 'sv3', 'sh1', 'sh2']],
    [9, ['sv1', 'sh2', 'sv3', 'sh1', 'sv4', 'sh3']],
    [0, ['sv1', 'sv2', 'sh3', 'sv4', 'sv3', 'sh1']],
];

// Функция  getTimeNow конвертирует текущее время, в систему описанную в константе time, и возвращает масив id палочек, котрые нужно подсветить, для отображения текущего времяни

const getTimeNow = () => {
    const date = new Date();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    let hoursArray = [];
    let minuteArray = [];
    let secondArray = [];
    if(hours <=9){
        hoursArray.push(0);
        hoursArray.push(hours);
    }else{
        const hoursStr = hours.toString().split('');
        for(let i=0; i<hoursStr.length; i++){
            hoursArray.push(parseInt(hoursStr[i]));
        }
    }
    if(minutes <=9){
        minuteArray.push(0);
        minuteArray.push(minutes);
    }else{
        const minuteStr = minutes.toString().split('');
        for(let i=0; i<minuteStr.length; i++){
            minuteArray.push(parseInt(minuteStr[i]));
        }
    }
    if(seconds <=9){
        secondArray.push(0)
        secondArray.push(seconds)
    }else{
        const secondsStr = seconds.toString().split('');
        for(let i=0; i<secondsStr.length; i++){
            secondArray.push(parseInt(secondsStr[i]));
        }
    }
    return hoursArray.concat(minuteArray.concat(secondArray));
}

const timeNow = getTimeNow();

// Убирает класс active   

const unSetCurrentTime = timeNow => {
    for(let i=0; i<timeNow.length; i++){
        let section = 's'+(i+1);
        let number = timeNow[i];
        for(let q=0; q<time.length; q++){
            if(number === time[q][0]){
                for(let k=0; k<time[q][1].length; k++){
                    document.getElementById(`${section}${time[q][1][k]}`).classList.remove('active');
                }
            }
        }
    }
}

// Присвает класс active  

const setTimeNow = timeNow => {
    for(let i=0; i<timeNow.length; i++){
        let section = 's'+(i+1);
        let number = timeNow[i];
        for(let q=0; q<time.length; q++){
            if(number === time[q][0]){
                for(let k=0; k<time[q][1].length; k++){
                    document.getElementById(`${section}${time[q][1][k]}`).classList.add('active');                }
            }
        }
    }
}

// Основной цикл, запуск отображения времени

const updateWatchTime = (timeNow) => {
    setInterval(()=>{
        unSetCurrentTime(timeNow);
        timeNow = getTimeNow();
        setTimeNow(timeNow);
    },1000);
}

updateWatchTime(timeNow);