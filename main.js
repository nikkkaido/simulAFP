var nombre,sexo,AFP,fondo,edad,rtaf;
var fecha = new Date();
var rentabilidad = {
    'CAPITAL' : {'A' : 0.0649,
                 'B' : 0.0557,
                 'C' : 0.0767,
                 'D' : 0.0408,
                 'E' : 0.0398,
                },
    'CUPRUM' : {'A' : 0.0648,
                'B' : 0.0557,
                'C' : 0.0798,
                'D' : 0.0423,
                'E' : 0.0416,
               },
    'HABITAT' : {'A' : 0.0658,
                'B' : 0.0570,
                'C' : 0.0799,
                'D' : 0.0433,
                'E' : 0.0424,
                },
    'MODELO' : {'A' : 0.0630,
                'B' : 0.0540,
                'C' : 0.0780,
                'D' : 0.04,
                'E' : 0.0370,
                },
    'PLANVITAL' : {'A' : 0.0613,
                'B' : 0.0533,
                'C' : 0.0786,
                'D' : 0.0370,
                'E' : 0.0344,
                },
    'PROVIDA' : {'A' : 0.0656,
                'B' : 0.0539,
                'C' : 0.0761,
                'D' : 0.0385,
                'E' : 0.0369,
                },
    'UNO' : {'A' : 0.0650,
                'B' : 0.0535,
                'C' : 0.0750,
                'D' : 0.0380,
                'E' : 0.037,
                },
      'SISTEMA' : {'A' : 0.0652,
                'B' : 0.0556,
                'C' : 0.0782,
                'D' : 0.0408,
                'E' : 0.0403,
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

function agregarPuntos(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  }

function calcularFondo(binario){
    edad = parseInt(sessionStorage.getItem('Edad'));
    rtaf = parseFloat(sessionStorage.getItem('rtaf'));
    if(parseFloat(document.getElementsByName("rtnew")[0].value) != 0 && document.getElementsByName("rtnew")[0].value != ''){
        rtaf = parseFloat(document.getElementsByName("rtnew")[0].value/100);
    }
    var ev = 90;
    var ej = 60;
    if(sessionStorage.getItem('Sexo') == "masculino"){ev = 85; ej = 65;}
    var VFH = parseFloat(document.getElementsByName("saldo")[0].value.replace(/\./g,''));
    var SIP = parseFloat(document.getElementsByName("sip")[0].value.replace(/\./g,''));
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
    var cotosip = COTO * SIP;
    if (cotosip > 2271189){cotosip = 2271189;}
    var CO = cotosip * ((ej-edad)*12);
    var CV = COTV * SIP * ((ej-edad)*12);
    var FPVR = (VFH+CO+CV) + ((ej-edad)*(VFH+CO+CV)*rtaf);
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
    }else if(document.getElementsByName("cotv")[0].value > 50 || document.getElementsByName("cotv")[0].value < 0){
        document.getElementById("error2").innerHTML = "¡Sobrepasaste un límite!";
        return false;
    }
    document.getElementById("fondoresultado").innerHTML = '$'+agregarPuntos(parseInt(FPVR));
    document.getElementById("jubilacionresultado").innerHTML = '$'+agregarPuntos(parseInt(P));
    document.getElementById("error1").innerHTML = null;
    document.getElementById("error2").innerHTML = null;
        }else{
        if(document.getElementsByName("saldo")[0].value == null || document.getElementsByName("saldo")[0].value == 0 || document.getElementsByName("jubilacionesperada")[0].value == null || document.getElementsByName("jubilacionesperada")[0].value == 0 || document.getElementsByName("rtaf2")[0].value == null){
            document.getElementById("error3").innerHTML = "¡Te faltan datos o debes ingresar los datos de arriba!";
            return false;
        }else if(document.getElementsByName("rtaf2")[0].value > 15 || document.getElementsByName("rtaf2")[0].value < 0){
            document.getElementById("error3").innerHTML = null;
            document.getElementById("error4").innerHTML = "¡Sobrepasaste un límite!";
            document.getElementById("error5").innerHTML = null
            return false;
        }else if(document.getElementsByName("jubilacionesperada")[0].value <= P){
            document.getElementById("error5").innerHTML = "¡La pensión esperada debe ser mayor a la calculada anteriormente!";
            return false;
        }
        document.getElementById("cotvresult").innerHTML = parseFloat(cotvresult).toFixed(2)+'%';
        document.getElementById("apvresult").innerHTML = '$'+agregarPuntos(parseInt(apvresult));
        document.getElementById("error3").innerHTML = null;
        document.getElementById("error4").innerHTML = null;
        document.getElementById("error5").innerHTML = null;
        }
    }
