function repHistorico(hist){
  return hist.replace("/" , "÷").replace("*" , "x")
}


let teste = '8 / 4'

console.log(repHistorico(teste))