var nombre,sexo,AFP,fondo,edad,rtaf;
var fecha = new Date();
var rentabilidad = {
    'CAPITAL' : {'A' : 0.0031,
                 'B' : -0.0011,
                 'C' : -0.0046,
                 'D' : -0.0086,
                 'E' : -0.0118,
                },
    'CUPRUM' : {'A' : 0.0044,
                'B' : 0,
                'C' : -0.0047,
                'D' : -0.0085,
                'E' : -0.0110,
               },
    'HABITAT' : {'A' : 0.0053,
                'B' : 0.0017,
                'C' : -0.0040,
                'D' : -0.0083,
                'E' : -0.0105,
                },
    'MODELO' : {'A' : 0.0031,
                'B' : -0.0011,
                'C' : -0.0046,
                'D' : -0.0065,
                'E' : -0.0105,
                },
    'PLANVITAL' : {'A' : 0.0047,
                'B' : -0.0003,
                'C' : -0.0049,
                'D' : -0.0085,
                'E' : -0.0113,
                },
    'PROVIDA' : {'A' : 0.0055,
                'B' : 0.0007,
                'C' : -0.0047,
                'D' : -0.0093,
                'E' : -0.0130,
                },
    'UNO' : {'A' : 0.0020,
                'B' : -0.0013,
                'C' : -0.0080,
                'D' : -0.0090,
                'E' : -0.0156,
                },
      'SISTEMA' : {'A' : 0.0046,
                'B' : 0.0003,
                'C' : -0.0045,
                'D' : -0.0087,
                'E' : -0.0114,
                },
            }
function fechaNacimiento(fecha){
    var nacimiento = new Date(fecha);
    var month_diff = Date.now() - nacimiento.getTime();
    var age_dt = new Date(month_diff);
    var year = age_dt.getUTCFullYear();
    var age= Math.abs(year - 1970);
    //console.log("Edad = ");
    //console.log(age);
    return age;
};
function extraerDatos() {
    nombre = document.getElementsByName("nombre")[0].value;
    sexo = document.getElementsByName("sexo")[0].value;
    fecha = document.getElementsByName("year")[0].value+"-"+document.getElementsByName("month")[0].value+"-"+document.getElementsByName("days")[0].value;
    edad = fechaNacimiento(fecha);
    AFP = document.getElementsByName("AFP")[0].value;
    fondo = document.getElementsByName("fondo")[0].value;
    renta = rentabilidad[AFP][fondo];
    if(nombre == null || nombre == "" || document.getElementsByName("year")[0].value == null || document.getElementsByName("year")[0].value == 0){
        document.getElementById("error").innerHTML = "¡Te faltan datos!";
        return false;
    }
    else{
        sessionStorage.setItem('Nombre', nombre);
        sessionStorage.setItem('Edad', edad);
        sessionStorage.setItem('Sexo', sexo);
        sessionStorage.setItem('AFP', AFP);
        sessionStorage.setItem('Fondo', fondo);
        sessionStorage.setItem('rtaf', renta);
        window.location.href = '/simulador.html';
    }
}

function imprimirDatos(){
    console.log(sessionStorage.getItem('Nombre'));
    console.log(sessionStorage.getItem('Edad'));
    console.log(sessionStorage.getItem('Sexo'));
    console.log(sessionStorage.getItem('AFP'));
    console.log(sessionStorage.getItem('Fondo'));
    console.log(sessionStorage.getItem('rtaf'));
}

function calcularFondo(binario){
    edad = parseInt(sessionStorage.getItem('Edad'));
    rtaf = parseFloat(sessionStorage.getItem('rtaf'));
    var ev = 90;
    var ej = 60;
    if(sessionStorage.getItem('Sexo') == "masculino"){ev = 85; ej = 65;}
    var VFH = parseFloat(document.getElementsByName("saldo")[0].value);
    var SIP = parseFloat(document.getElementsByName("sip")[0].value);
    var COTV = parseFloat(document.getElementsByName("cotv")[0].value)/100;
    if(document.getElementsByName("cotv")[0].value == null || document.getElementsByName("cotv")[0].value == 0){
        COTV = 0;
    }
    var P2 = parseFloat(document.getElementsByName("jubilacionesperada")[0].value);
    var rtaf2 = parseFloat(document.getElementsByName("rtaf2")[0].value)/100;
    if(document.getElementsByName("rtaf2")[0].value == null || document.getElementsByName("rtaf2")[0].value == 0){
        rtaf2 = 0;
    }
    var COTO = 0.1;
    var CO = COTO * SIP * ((ej-edad)*12);
    var CV = COTV * SIP * ((ej-edad)*12);
    var FPVR = (VFH+CO+CV) + (4*(ej-edad)*(VFH+CO+CV)*rtaf);
    var P = FPVR / (12*(ev - ej));
    var P2sin = P2 - (P2*rtaf2);
    var CV = COTV * SIP * ((ej-edad)*12);
    var apvresult = P2sin * 12*(ev-ej) - VFH - CO; 
    var cotvresult = 100 * parseFloat(apvresult / (SIP * ((ej-edad)*12)));
    apvresult = SIP * cotvresult/100;
    if(binario == 1){
    if(document.getElementsByName("saldo")[0].value == null || document.getElementsByName("saldo")[0].value == 0 || document.getElementsByName("sip")[0].value == null || document.getElementsByName("sip")[0].value == 0){
        document.getElementById("error1").innerHTML = "¡Te faltan datos!";
        return false;
    }else if(document.getElementsByName("cotv")[0].value > 50){
        document.getElementById("error2").innerHTML = "¡Sobrepasaste un límite!";
        return false;
    }
    document.getElementById("fondoresultado").innerHTML = '$'+parseInt(FPVR);
    document.getElementById("jubilacionresultado").innerHTML = '$'+parseInt(P);
    document.getElementById("error1").innerHTML = null;
    document.getElementById("error2").innerHTML = null;
        }else{
        if(document.getElementsByName("saldo")[0].value == null || document.getElementsByName("saldo")[0].value == 0 || document.getElementsByName("jubilacionesperada")[0].value == null || document.getElementsByName("jubilacionesperada")[0].value == 0 || document.getElementsByName("rtaf2")[0].value == null){
            document.getElementById("error3").innerHTML = "¡Te faltan datos o debes ingresar los datos de arriba!";
            return false;
        }else if(document.getElementsByName("cotv")[0].value > 15){
            document.getElementById("error4").innerHTML = "¡Sobrepasaste un límite!";
            return false;
        }
        document.getElementById("cotvresult").innerHTML = parseFloat(cotvresult).toFixed(2)+'%';
        document.getElementById("apvresult").innerHTML = '$'+parseInt(apvresult);
        document.getElementById("error3").innerHTML = null;
        document.getElementById("error4").innerHTML = null;
        }
    }
