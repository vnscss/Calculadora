const drawResult = document.getElementById("hiddenDisplay") , historico = document.getElementById("hiddenHistorico");
let resultado = 0 , resultadoVerificador = 0 , verificardor = 0 , contaVerificador = 0 , operador = "" , lastnun = '', savenun = '', operadorVerificador = 0 , virgulaVerificador = 0 , sinalConta = "";


function clean(){
    drawResult.innerHTML = "0";
    historico.innerHTML = "ㅤ";
    resultado = 0
    resultadoVerificador = 0
    verificardor = 0
    contaVerificador = 0
    operador = ""
    lastnun = ''
    operadorVerificador = 0
    savenun = ''
    virgulaVerificador = 0
    sinalConta = ""
}

function save(num){
    lastnun = lastnun + num
}

function draw(num){
    
    if((verificardor === 0) & (contaVerificador === 0)){
        drawResult.innerHTML = ""
        drawResult.innerHTML = num
        verificardor = 1
        return;
    }

    if((verificardor === 1) & (contaVerificador === 0)){
        var oldDraw = drawResult.innerHTML
        drawResult.innerHTML =  oldDraw + num
        verificardor = 1
        return;
    }

    if((verificardor === 1) & (contaVerificador === 2)){
        drawResult.innerHTML = ""
        drawResult.innerHTML = num
        verificardor = 1
        contaVerificador = 0
        return;
    }
    
    
}

function drawVirgula(num){

    if(virgulaVerificador === 1){
        return;
    }


    if((verificardor === 0) & (contaVerificador === 0)){
        
        if(drawResult.innerHTML == 0){
            drawResult.innerHTML = ""
            drawResult.innerHTML =  "0" + num
            verificardor = 1
            virgulaVerificador = 1
            return;
        }

        else{
            drawResult.innerHTML = ""
            drawResult.innerHTML = num
            verificardor = 1
            virgulaVerificador = 1
            return;
        }
    }

    if((verificardor === 1) & (contaVerificador === 0)){
        var oldDraw = drawResult.innerHTML
        drawResult.innerHTML =  oldDraw + num
        verificardor = 1
        virgulaVerificador = 1
        return;
    }

    if((verificardor === 1) & (contaVerificador === 2)){
        drawResult.innerHTML = "0" + num
        verificardor = 1
        lastnun = 0
        virgulaVerificador = 1
        return;
    }
}

function conta(sinal){

    sinalConta = sinal

    if(resultadoVerificador === 0){
        historico.innerHTML = drawResult.innerHTML + " " +sinal
        contaVerificador = 2
        resultadoVerificador = 0
        operador = sinal
        operadorVerificador = 1
        virgulaVerificador = 0

    }

    if(resultadoVerificador === 1){
        historico.innerHTML = drawResult.innerHTML + " " +sinal
        contaVerificador = 2
        resultadoVerificador = 0
        operador = sinal
        operadorVerificador = 1
        virgulaVerificador = 0
    }

    savenun = lastnun
    lastnun = ''

}

function contaEspecial(sinal){

    switch (sinal) {
        case '1':
            if(sinalConta === '/'){
                
            }

            break;
    
        case '2':
            break;

        case '3':
            break;
        
        case '4':
            break;

        case '5':
            break;
    }

}

function rep(str){
    return (str.replace(",",".")).replace(",",".")
}

function virgRep(str){
    return (str.replace("," , ""))
}

function spaceRep(str){
    let repStr = str
    repStr = (repStr.replace(" " , ""))
    repStr = (repStr.replace("+" , ""))
    
    return repStr
}

function igual(){
   
    if(operadorVerificador === 0){
        if(((drawResult.innerHTML).includes(",")) & (savenun === '')){
            drawResult.innerHTML = virgRep(drawResult.innerHTML)
        }
        return;
    }

    if(operadorVerificador === 1){
        if(((drawResult.innerHTML).includes(",")) & (savenun === '')){
            drawResult.innerHTML = virgRep(drawResult.innerHTML)
            savenun = virgRep(savenun)
            savenun = virgRep(savenun)
            virgulaVerificador = 0
        }

    }

    if((resultadoVerificador === 0) || (resultadoVerificador === 2)){
        resultado = historico.innerHTML + drawResult.innerHTML
        historico.innerHTML = historico.innerHTML + " "+drawResult.innerHTML + "="
        drawResult.innerHTML = eval(rep(resultado))
        resultadoVerificador = 1
        contaVerificador = 1 
        virgulaVerificador = 0
    }


    else{
        if((contaVerificador === 1) & (lastnun ==='')){
            lastnun = savenun
        }
        historico.innerHTML = drawResult.innerHTML + " " + operador + " " + lastnun + "="
        resultado = drawResult.innerHTML + " " + operador + " "+lastnun
        drawResult.innerHTML= eval(rep(resultado))
        resultadoVerificador = 1
        contaVerificador = 2
        virgulaVerificador = 0
    }
    
}


function repHistorico(hist){
    return hist.replace("/" , "÷").replace("*" , "x")
}


const observer = new MutationObserver(() => {
    document.getElementById("display").innerHTML = document.getElementById("hiddenDisplay").innerHTML
   
    if(virgulaVerificador === 0){
        const formatter = new Intl.NumberFormat('pt');
        let formatado =  formatter.format(rep(document.getElementById("hiddenDisplay").innerHTML))

        document.getElementById("display").innerHTML = formatado
    }

    
  });
  
  observer.observe(document.getElementById("hiddenDisplay"), {
    subtree: true,
    childList: true,
  });


  const historicoObserver = new MutationObserver(() => {
    document.getElementById("historico").innerText = repHistorico(document.getElementById("hiddenHistorico").innerHTML)
   
    
  });
  
  historicoObserver.observe(document.getElementById("hiddenHistorico"), {
    subtree: true,
    childList: true,
  });
  

