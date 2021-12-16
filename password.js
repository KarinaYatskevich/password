const passwordElement = document.getElementById("password");
passwordElement.addEventListener('keyup', makePassword) //Метод addEventListener() регистрирует обработчик события для целевого объекта (eventTarget), для которого он будет вызываться при возникновении события. 
                                                //Событие keyup срабатывает, когда клавиша была отпущена

function makePassword(){
    const pwd = passwordElement.value
    if (pwd.length === 0) {
        document.getElementById("progresslabel").innerHTML = "";
        document.getElementById("progress").value = "0";
    }

    //const prog = [/[$@$!%*#?&]/, /[A-Z]/, /[0-9]/, /[a-z]/].reduce((m, t) => m + t.test(pwd), 0);
    //Суть метода reduce () в том, что вы превращаете массив значений в одно конечное значение

    const beginWithoutDigit = /[0-9]/
    const withoutSpecialChars = /[$@$!%*#?&]/
    const beginWithoutCapitalLetter = /[A-Z]/
    const beginWithoutSmallLetter = /[a-z]/
    let prog = 0

    function f(){
        if( beginWithoutDigit.test(pwd)){
            prog+=1
        }
        if( withoutSpecialChars.test(pwd)){
            prog+=1
        }
        if( beginWithoutCapitalLetter.test(pwd)){
            prog+=1
        }
        if( beginWithoutSmallLetter.test(pwd)){
            prog+=1
        }
        return prog
    }


    if(prog > 1 && pwd.length > 8){ //&& = и
        prog++;
    }
    
    function checkDifficultyLevel(){
        let progress = "";
        let strength = "";
        let color = "";
        switch (prog) { //Конструкция switch заменяет собой сразу несколько if 
            case 0:
            case 1: //(if (prog === 1))
                strength = "Too short";
                progress = "0%";
                color = 'rgb(116, 116, 114)';
                break;
            case 2:
                strength = "Weak";
                progress = "25";
                color = 'red';
                break; //Если break нет, то выполнение пойдёт ниже по следующим case, при этом остальные проверки игнорируются.
            case 3:
                strength = "Fair";
                progress = "50";
                color = 'yellow';
                break;
            case 4:
                strength = "Good";
                progress = "75";
                color = 'blue';
                break;
            case 5:
                strength = "Strong";
                progress = "100";
                color = 'green';
                break;
        }

    document.getElementById("progresslabel").innerHTML = strength;
    document.getElementById("progress").value = progress;
    document.getElementById("progress").style.color = color;
    document.getElementById("progresslabel").style.color = color;
    };
    
    f();
    checkDifficultyLevel();
}