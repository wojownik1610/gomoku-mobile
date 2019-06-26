window.onload=function(){
    poczatek();
}
var kopanie=3;
var kolejGracza;
var info=0;
var wybrane=[];
var partia=0;
var wynikG=0;
var wynikK=0;
var wynikGsz = [];
var wynikKsz = [];
for(var i=0; i<5; i++){
    wynikGsz.push(0);
    wynikKsz.push(0);
}
var trudnosc;
var ktoZaczyna;
var przegrany="X";
var wygrany="X";
var zajPolaAkt;
var zajPolaNajw=0;
var zajPolaNajm=0;
var zaczynajacy="X";
var kolejneRuchyX = [];
var kolejneRuchyY = [];
var aktPokazRuch;
var cofKopia = [];
var cofZnak = [];
for(var i=0; i<15 ;i++){
    cofKopia[i] = [];
    cofZnak[i] = [];
    wybrane[i]=[];
}

for(var i=0; i<15; i++){
    for(var j=0; j<15; j++){
        wybrane[i][j]="P";
    }
}

function poczatek(){
   var nazwa;
    kolejneRuchyX.splice(0,kolejneRuchyX.length);
    kolejneRuchyY.splice(0, kolejneRuchyY.length);
    document.getElementById("guziczki").style.display="none";
    zajPolaAkt=0;
    poprzedniRuchX=15;
    poprzedniRuchY=15;
    ktoZaczyna=document.getElementById("startWybor").value;
    document.getElementById("zajPolaAkt").innerHTML="<b>Akt zapełnienie</b><br>"+zajPolaAkt+"/225 "+Math.floor(10000*zajPolaAkt/225)/100+"%";
    document.getElementById("zajPolaNajw").innerHTML="<b>Max zapełnienie</b><br>"+zajPolaNajw+"/225 "+Math.floor(10000*zajPolaNajw/225)/100+"%";
    document.getElementById("zajPolaMin").innerHTML="<b>Min zapełnienie</b><br>"+zajPolaNajm+"/225 "+Math.floor(10000*zajPolaNajm/225)/100+"%";
    
    partia++;
    kolejGracza=true;
    for(var i=0; i<15; i++){
        for(var j=0; j<15; j++){
            nazwa="pole["+j+"]["+i+"]";
            if(partia>1){
                document.getElementById(nazwa).innerHTML="";
                document.getElementById(nazwa).style.backgroundColor="cornflowerblue";
                wybrane[i][j]="P";
            }
            else{
                const el = document.createElement("div");
                el.id = nazwa;
                el.classList.add("pola");
                nazwa="wybor("+j+", "+i+");";
                el.setAttribute( 'onclick', nazwa );
                game.appendChild(el);
            }
        }
    }
    switch (ktoZaczyna){
        case "5": 
            ruchKomp(0,0);
            zaczynajacy="O";
            zajPolaAkt++;
            break;
        case "3":
            if(przegrany=="O"){
                ruchKomp(0,0);
                zaczynajacy="O";
                zajPolaAkt++;
            }
            break;
        case "2":
            if(wygrany=="O"){
                ruchKomp(0,0);
                zaczynajacy="O";
                zajPolaAkt++;
            }
            break;
        case "1":
            if(Math.floor(Math.random()*2)==1){
                ruchKomp(0,0);
                zaczynajacy="O";
                zajPolaAkt++;
            }
            break;
        case "6":
            if(zaczynajacy=="X"){
                ruchKomp(0,0);
                zaczynajacy="O";
                zajPolaAkt++;
            }
            break;
    }
}

function wybor(i, j){
    console.log(kolejGracza);
    if(!kolejGracza) return;
    if(wybrane[i][j]!="P") return;
    kolejGracza=false; 
    zajPolaAkt++;
    if(zajPolaAkt==1) zaczynajacy="X";
    var nazwa="pole["+i+"]["+j+"]";
    wybrane[i][j]="X";
    document.getElementById(nazwa).innerHTML="X";
    kolejneRuchyX.push(i);
    kolejneRuchyY.push(j);
    if(sprWyg(i, j)==false && zajPolaAkt<225){
        zajPolaAkt++;
        if(ruchKomp(i,j)!=true && zajPolaAkt<225){
            kolejGracza=true;
        }  
    }
    if(zajPolaAkt==225 && !czyWyg("X") && !czyWyg("O")) alert("Niewiarygodne!!!!! Jest remis!!! Gratulacje tworzysz historię!!!")
    document.getElementById("zajPolaAkt").innerHTML="<b>Akt zapełnienie</b><br>"+zajPolaAkt+"/225 "+Math.floor(10000*zajPolaAkt/225)/100+"%";
}

function sprWyg(x, y){
    var ile=0;
    var znak=wybrane[x][y];
    
    for(var i=-5; i<=5; i++){//poziomo
		if(x+i<0 || x+i>14){
            if(ile==5) {
                for(var h=-1; h>=-5; h--) wybrane[x+i+h][y]="W";
                break;
            }
            else continue;
        }
		if(wybrane[x+i][y]==znak) ile++;
		else{ if(ile<5) ile=0;
			else{ 
				if(ile==5) for(var h=-1; h>=-5; h--) wybrane[x+i+h][y]="W";
				break;
			}
		}
	}
	if(ile==5){ 
        wygrana(znak);
        console.log("koniec");
        return true;
    } 
	ile=0;
    
    for(var i=-5; i<=5; i++){//pionowo
		if(y+i<0 || y+i>14){
            if(ile==5) {
                for(var h=-1; h>=-5; h--) wybrane[x][y+i+h]="W";
                break;
            }
            else continue;
        }
		if(wybrane[x][y+i]==znak) ile++;
		else{ if(ile<5) ile=0;
			else{ 
				if(ile==5) for(var h=-1; h>=-5; h--) wybrane[x][y+i+h]="W";
				break;
			}
		}
	}
	if(ile==5){ 
       wygrana(znak);console.log("koniec");
        return true;
    }
	ile=0;
    
    for(var i=-5; i<=5; i++){//skos
		if(y+i<0 || y+i>14 || x+i<0 || x+i>14){
            if(ile==5) {
                for(var h=-1; h>=-5; h--) wybrane[x+i+h][y+i+h]="W";
                break;
            }
            else continue;
        }
		if(wybrane[x+i][y+i]==znak) ile++;
		else{ if(ile<5) ile=0;
			else{ 
				if(ile==5) for(var h=-1; h>=-5; h--) wybrane[x+i+h][y+i+h]="W";
				break;
			}
		}
	}
	if(ile==5){ 
       wygrana(znak);console.log("koniec");
        return true;
    }
	ile=0;
    
     for(var i=-5; i<=5; i++){//skos
		if(y-i>14 || y-i<0 || x+i<0 || x+i>14){
            if(ile==5) {
                for(var h=-1; h>=-5; h--) wybrane[x+i+h][y-i-h]="W";
                break;
            }
            else continue;
        }
		if(wybrane[x+i][y-i]==znak) ile++;
		else{ if(ile<5) ile=0;
			else{ 
				if(ile==5){ for(var h=-1; h>=-5; h--) {
                                wybrane[x+i+h][y-i-h]="W";
                }
                           
                          }
				break;
			}
		}
	}
	if(ile==5){ 
       wygrana(znak);console.log("koniec");
        return true;
    }
	ile=0;
    
    return false;
}

function wygrana(znak){
    var nazwa;
    for(var i=0; i<15; i++){
        for(var j=0; j<15; j++){
            if(wybrane[i][j]=="W"){
                nazwa="pole["+i+"]["+j+"]";
                document.getElementById(nazwa).style.backgroundColor="green";
                
            }
        }
    }
    if(znak=="X"){
        wynikG++;
        alert("Zwycięstwo!!!");
    }
    else{
        wynikK++;
         alert("Komputer okazał się lepszy!!!");
    }
    if(znak=="X") wynikGsz[trudnosc-1]++;
    else wynikKsz[trudnosc-1]++;
    document.getElementById("wynikCyfra").innerHTML=wynikG+" : "+wynikK;
    for(var i=0; i<5; i++){
        if(wynikGsz[i]==0 && wynikKsz[i]==0) continue;
            if(i==0) document.getElementById("wynikNapis1").innerHTML="<b>Dziecinny</b>";
            if(i==2) document.getElementById("wynikNapis3").innerHTML="<b>Łatwy</b>";
            if(i==3) document.getElementById("wynikNapis4").innerHTML="<b>Normalny</b>";
            if(i==4) document.getElementById("wynikNapis5").innerHTML="<b>Trudny</b>";
            var napis = "wynikCyfra"+(i+1);
        console.log(napis);
            document.getElementById(napis).innerHTML=wynikGsz[i]+" : "+wynikKsz[i];
    }
    if(znak=="X"){
        wygrany="X";
        przegrany="O";
    }
    else{
        wygrany="O";
        przegrany="X";
    }
    if(zajPolaAkt>zajPolaNajw) zajPolaNajw=zajPolaAkt;
    if(zajPolaNajm==0 || zajPolaNajm>zajPolaAkt) zajPolaNajm=zajPolaAkt;
    document.getElementById("guziczki").style.display="block";
    aktPokazRuch=kolejneRuchyX.length-1;
    document.getElementById("guziczkiKtory").innerHTML=kolejneRuchyX.length+"/"+kolejneRuchyX.length; 
    for(var i=0; i<15; i++){
        for(var j=0; j<15; j++){
            cofKopia[i][j]=wybrane[i][j];
            if(cofKopia[i][j]=="W"){
                    if(wygrany=="X"){
                        cofKopia[i][j]="X";
                    }
                    else{
                         cofKopia[i][j]="O";
                    }
             }
            cofZnak[i][j]="q";
        }
    }
    return;
}

function ruchKomp(x, y){
    /*  1. piątka kompa*/
    for(var i=0; i<15; i++){
        for(var j=0; j<15; j++){
             nazwa="pole["+i+"]["+j+"]";
            document.getElementById(nazwa).style.backgroundColor="cornflowerblue";
        }
    }
    if(trudnosc>1 && piatka(true)){
        return true;
    }
    if(trudnosc>1 && czteryOb(true)){
        return;
    }
    if(trudnosc>1 && czteryWyg(true)){
        return;
    }
    if(trudnosc>3 && cztery(true)){
        return;
    }
    if(trudnosc>3 && trzyOb(true)){
        return;
    }
    
    if(trudnosc>3 && ustWygUklad(true)){
        return;
    }
    if(trudnosc>3 && blokWygUklad(true)){
        return;
    }
    if(pierwszyRuch()){
        return;
    }
  /*  if(alfaBeta(kopanie, -1000001,1000001, "O")){
        return;
    }*/
    if(trzyWyg(true)){
        return;
    }
    if(trudnosc>4 && blokowanie(true, 3)){
        return;
    }
    if(trudnosc>1 && trzy(true)){
        return;
    }
    if(trudnosc>4 && blokowanie(true,2)){
        return;
    }
    if(trudnosc>1 && dwaNaj(true)){
        return;
    }
    if(trudnosc>4 && blokowanie(true, 1)){
        return;
    }
    if(trudnosc>1 && dwaOk(true)){
        return;
    }
           var puste;
   
        for(var i=0; i<15; i++){
            for(var j=0; j<15; j++){
                for(var k=1; k>=0; k--){
                    for(var l=1; l>=-1; l--){
                        if(k==0 && l<l) break;
                         var ile=0;
                            for(var h=-4; h<=4; h++){//skos
		                          if(i+h*k<0 || i+h*k>14 || j+h*l<0 || j+h*l>14) continue;
		                          if(wybrane[i+h*k][i+h*l]=="P") puste=true;
                                    if(wybrane[i+h*k][i+h*l]=="O") ile++;
                                    if(wybrane[i+h*k][i+h*l]=="O" || wybrane[i+h*k][i+h*l]=="P"){
                                        if(ile<4) ile=0;
			                             else{ 
                                            if(ile==4) for(var h=-1; h>=-5; h--) wybrane[x+i+h][y+i+h]="W";
                                             break;
                                            }
		                              }
	                           }
                    }
                }
            }
        }
    /* los - nieprzydatne*/
    do{
        var xWyb=Math.floor(Math.random()*15);
        var yWyb=Math.floor(Math.random()*15);
    }while(wybrane[xWyb][yWyb]=="X" || wybrane[xWyb][yWyb]=="O" || wybrane[xWyb][yWyb]=="W")
        wybrane[xWyb][yWyb]="O";
        kolejneRuchyX.push(xWyb);
        kolejneRuchyY.push(yWyb);
        var nazwa="pole["+xWyb+"]["+yWyb+"]";
        document.getElementById(nazwa).innerHTML="O"; document.getElementById(nazwa).style.backgroundColor="coral";
    sprWyg(xWyb, yWyb);
}

function piatka(ruch){
   var ile;
    var koniecPetli;
    var ruchIle=0;
    var wspX = [];
    var wspY = [];
/*poziomo*/
    for(var x=0; x<15; x++){
        for(var y=0; y<15; y++){
                if(wybrane[x][y]=="X") continue;
            for(var i=1; i>=0; i--){
                for(var j=1; j>=-1; j--){
                    if(i==0 && j==0) break;
                    if(x+4*i>=15 || y+4*j<0 || y+4*j>=15) continue;
                    if(x-i>=0 && y-j>=0 && y-j<15 && wybrane[x-i][y-j]=="O") continue;
                    if(x+5*i<15 && y+5*j>=0 && y+5*j<15 && wybrane[x+5*i][y+5*j]=="O") continue;
                    ile=0;
                    koniecPetli=false;
                    for(var k=0; k<5; k++){
                        switch(wybrane[x+i*k][y+j*k]){
                            case "O":
                                ile+=10;
                                break;
                            case "P":
                                ile+=1;
                                if(ile%10>1) koniecPetli=true;
                                break;
                            case "X":
                                koniecPetli=true;
                                break;   
                        }
                        if(koniecPetli) break;
                    }
                    if(koniecPetli) continue;
                    if(ile==41 && ruch){
                        for(var k=0; k<5; k++){
                            if(wybrane[x+i*k][y+j*k]=="P"){
                                wspX.push((x+i*k));
                                wspY.push((y+j*k));
                            }
                        }
                    }
                    if(ile==41 && !ruch){
                        ruchIle++;
                    }
                }
            }   
        }
    }
    if(!ruch) return ruchIle;
    
    if(wspX.length==0) return false;
    var najWsp;
    var najWynik=-1;
    var wynik;
    for(var i=0; i<wspX.length; i++){
        wynik=0;
        if(wybrane[wspX[i]][wspY[i]]!="P") continue;
        wybrane[wspX[i]][wspY[i]]="O";
                    wynik+=trzyWyg(false)*1000;
                    wynik+=trzy(false)*100;
                    wynik+=dwaNaj(false)*10;
                    wynik+=dwaOk(false);
        wybrane[wspX[i]][wspY[i]]="P";
                if(najWynik==wynik){
                    if(Math.floor(Math.random()*2)==1){
                        najWsp=i;
                    }
                }
                if(najWynik<wynik){
                    najWynik=wynik;
                    najWsp=i;
                }
    }
        wybrane[wspX[najWsp]][wspY[najWsp]]="O";
                        kolejneRuchyX.push(wspX[najWsp]);
                        kolejneRuchyY.push(wspY[najWsp]);
            var nazwa="pole["+wspX[najWsp]+"]["+wspY[najWsp]+"]";
            document.getElementById(nazwa).innerHTML="O"; document.getElementById(nazwa).style.backgroundColor="coral";
        sprWyg(wspX[najWsp], wspY[najWsp]);
        return true;
                        
}

function czteryOb(ruch){
    var ile;
    var koniecPetli;
    var ruchIle=0;
    var wspX = [];
    var wspY = [];
    
    
    for(var x=0; x<15; x++){
        for(var y=0; y<15; y++){
             if(wybrane[x][y]=="O") continue;
            for(var i=1; i>=0; i--){
                for(var j=1; j>=-1; j--){
                    ile=0;
                    koniecPetli=false;
                    if(x+4*i>=15 || y+4*j>=15 || y+4*j<0) continue;
                    if(i==0 && j==0) break;
                    if(x-i>=0 && y-j>=0 && y-j<15 && wybrane[x-i][y-j]=="X") continue;
                    if(x+5*i<15 && y+5*j>=0 && y+5*j<15 && wybrane[x+5*i][y+5*j]=="X") continue;
                     for(var k=0; k<5; k++){
                         switch(wybrane[x+k*i][y+k*j]){
                             case "X":
                                 ile+=10;
                                 break;
                             case "P":
                                 ile+=1;
                                 if(ile%10>1) koniecPetli=true;
                                 break;
                             case "O":
                                 koniecPetli=true;
                                 break;   
                         }
                         if(koniecPetli) break;
                     }
                        if(koniecPetli) continue;
                        if(ile==41 && ruch){
                            for(var k=0; k<5; k++){
                                if(wybrane[x+i*k][y+j*k]=="P"){
                                wspX.push((x+i*k));
                                wspY.push((y+j*k));
                            }  
                            }
                        }
                        if(ile==41 && !ruch){
                            ruchIle++;
                        }
                }
            }  
            }
    }
    if(!ruch) return ruchIle;
    
    if(wspX.length==0) return false;
    var najWsp;
    var najWynik=-1;
    var wynik;
    for(var i=0; i<wspX.length; i++){
        wynik=0;
        if(wybrane[wspX[i]][wspY[i]]!="P") continue;
        wybrane[wspX[i]][wspY[i]]="O";
                    wynik+=trzyWyg(false)*1000;
                    wynik+=trzy(false)*100;
                    wynik+=dwaNaj(false)*10;
                    wynik+=dwaOk(false);
        wybrane[wspX[i]][wspY[i]]="X";
                     wynik+=czteryOb(false)*1000;
                     wynik+=trzyOb(false)*1000;
                     wynik+=blokWygUklad(false)*1000;
        wybrane[wspX[i]][wspY[i]]="P";
                if(najWynik==wynik){
                    if(Math.floor(Math.random()*2)==1){
                        najWsp=i;
                    }
                }
                if(najWynik<wynik){
                    najWynik=wynik;
                    najWsp=i;
                }
    }
        wybrane[wspX[najWsp]][wspY[najWsp]]="O";
                                        kolejneRuchyX.push(wspX[najWsp]);
                                        kolejneRuchyY.push(wspY[najWsp]);
            var nazwa="pole["+wspX[najWsp]+"]["+wspY[najWsp]+"]";
            document.getElementById(nazwa).innerHTML="O"; document.getElementById(nazwa).style.backgroundColor="coral";
        return true;
}

function czteryWyg(ruch){
    var ile;
    var koniecPetli;
/*poziomo*/
    for(var x=0; x<=9; x++){
        for(var y=0; y<15; y++){
            ile=0;
            koniecPetli=false;
                if(wybrane[x][y]!="P") continue;
                if(x-1>=0 && wybrane[x-1][y]=="O") continue;
                if(x+6<15 && wybrane[x+6][y]=="O") continue;
                if(wybrane[x+5][y]!="P") continue;
            for(var i=1; i<5; i++){
                switch(wybrane[x+i][y]){
                    case "O":
                        ile+=10;
                        break;
                    case "P":
                        ile+=1;
                        if(ile%10>1) koniecPetli=true;
                        break;
                    case "X":
                        koniecPetli=true;
                        break;   
                }
                if(koniecPetli) break;
            }
            if(koniecPetli) continue;
            if(ile==31 && ruch){
                for(var i=1; i<5; i++){
                    if(wybrane[x+i][y]=="P"){
                        wybrane[x+i][y]="O";
                        kolejneRuchyX.push(x+i);
                        kolejneRuchyY.push(y);
                        var nazwa="pole["+(x+i)+"]["+y+"]";
                        document.getElementById(nazwa).innerHTML="O"; document.getElementById(nazwa).style.backgroundColor="coral"; 
                        return true;
                    }
                }
            }
            if(ile==31 && !ruch){
                return true;
            }
        }
    }
/*pionowo*/
    for(var x=0; x<15; x++){
        for(var y=0; y<=9; y++){
            ile=0;
            koniecPetli=false;
                if(wybrane[x][y]!="P") continue;
                if(y-1>=0 && wybrane[x][y-1]=="O") continue;
                if(y+5<15 && wybrane[x][y+6]=="O") continue;
                if(wybrane[x][y+5]!="P") continue;
            for(var i=1; i<5; i++){
                switch(wybrane[x][y+i]){
                    case "O":
                        ile+=10;
                        break;
                    case "P":
                        ile+=1;
                        if(ile%10>1) koniecPetli=true;
                        break;
                    case "X":
                        koniecPetli=true;
                        break;   
                }
                if(koniecPetli) break;
            }
            if(koniecPetli) continue;
            if(ile==31 && ruch){
                for(var i=1; i<5; i++){
                    if(wybrane[x][y+i]=="P"){
                        wybrane[x][y+i]="O";
                        kolejneRuchyX.push(x);
                        kolejneRuchyY.push(y+i);
                        var nazwa="pole["+x+"]["+(y+i)+"]";
                        document.getElementById(nazwa).innerHTML="O"; document.getElementById(nazwa).style.backgroundColor="coral"; 
                        return true;
                    }
                }
            }
            if(ile==31 && !ruch){
                return true;
            }
        }
    }
/*skos - backslash*/
    for(var x=0; x<=9; x++){
        for(var y=0; y<=9; y++){
            ile=0;
            koniecPetli=false;
                if(wybrane[x][y]!="P") continue;
                if(y-1>=0 && x-1>=0 && wybrane[x-1][y-1]=="O") continue;
                if(y+6<15 && x+6<15 && wybrane[x+6][y+6]=="O") continue;
                if(wybrane[x+5][y+5]!="P") continue;
            for(var i=1; i<5; i++){
                switch(wybrane[x+i][y+i]){
                    case "O":
                        ile+=10;
                        break;
                    case "P":
                        ile+=1;
                        if(ile%10>1) koniecPetli=true;
                        break;
                    case "X":
                        koniecPetli=true;
                        break;   
                }
                if(koniecPetli) break;
            }
            if(koniecPetli) continue;
            if(ile==31 && ruch){
                for(var i=1; i<5; i++){
                    if(wybrane[x+i][y+i]=="P"){
                        wybrane[x+i][y+i]="O";
                        kolejneRuchyX.push(x+i);
                        kolejneRuchyY.push(y+i);
                        var nazwa="pole["+(x+i)+"]["+(y+i)+"]";
                        document.getElementById(nazwa).innerHTML="O"; document.getElementById(nazwa).style.backgroundColor="coral"; 
                        return true;
                    }
                }
            }
            if(ile==31 && !ruch){
                return true;
            }
        }
    }
/*skos - slash*/
    for(var x=0; x<=9; x++){
        for(var y=5; y<15; y++){
            ile=0;
            koniecPetli=false;
                if(wybrane[x][y]!="P") continue;
                if(y+1<15 && x-1>=0 && wybrane[x-1][y+1]=="O") continue;
                if(y-6>=0 && x+6<15 && wybrane[x+6][y-6]=="O") continue;
                if(wybrane[x+5][y-5]!="P") continue;
            for(var i=1; i<5; i++){
                switch(wybrane[x+i][y-i]){
                    case "O":
                        ile+=10;
                        break;
                    case "P":
                        ile+=1;
                        if(ile%10>1) koniecPetli=true;
                        break;
                    case "X":
                        koniecPetli=true;
                        break;   
                }
                if(koniecPetli) break;
            }
            if(koniecPetli) continue;
            if(ile==31 && ruch){
                for(var i=1; i<5; i++){
                    if(wybrane[x+i][y-i]=="P"){
                        wybrane[x+i][y-i]="O";
                        kolejneRuchyX.push(x+i);
                        kolejneRuchyY.push(y-i);
                        var nazwa="pole["+(x+i)+"]["+(y-i)+"]";
                        document.getElementById(nazwa).innerHTML="O"; document.getElementById(nazwa).style.backgroundColor="coral";
                        return true;
                    }
                }
            }
            if(ile==31 && !ruch){
                return true;
            }
        }
    }
    return false;
}

function cztery(ruch){
    var ile;
    var koniecPetli;
    var ruchIle=0;
    var wspX = [];
    var wspY = [];
/*poziomo*/
    for(var x=0; x<15; x++){
        for(var y=0; y<15; y++){
            
            
                if(wybrane[x][y]=="X") continue;
            for(var i=1; i>=0; i--){
                for(var j=1; j>=-1; j--){
                    if(i==0 && j==0) break;
                    if(x+4*i>=15 || y+4*j<0 || y+4*j>=15) continue;
                    if(x-i>=0 && y-j>=0 && y-j<15 && wybrane[x-i][y-j]=="O") continue;
                    if(x+5*i<15 && y+5*j>=0 && y+5*j<15 && wybrane[x+5*i][y+5*j]=="O") continue;
                    ile=0;
                    koniecPetli=false;
                    for(var k=0; k<5; k++){
                        switch(wybrane[x+i*k][y+j*k]){
                            case "O":
                                ile+=10;
                                break;
                            case "P":
                                ile+=1;
                                if(ile%10>2) koniecPetli=true;
                                break;
                            case "X":
                                koniecPetli=true;
                                break;   
                        }
                        if(koniecPetli) break;
                    }
                    if(koniecPetli) continue;
                    if(ile==32 && ruch){
                        for(var k=0; k<5; k++){
                            if(wybrane[x+i*k][y+j*k]=="P"){
                                wspX.push((x+i*k));
                                wspY.push((y+j*k));
                            }
                        }
                    }
                    if(ile==32 && !ruch){
                        ruchIle++;
                    }
                }
            }   
        }
    }
    if(!ruch) return ruchIle;
    
    if(wspX.length==0) return false;
    var najWsp;
    var najWynik=-1;
    var wynik;
    for(var i=0; i<wspX.length; i++){
        wynik=0;
        if(wybrane[wspX[i]][wspY[i]]!="P") continue;
        wybrane[wspX[i]][wspY[i]]="O";
                    wynik+=trzyWyg(false)*1000;
                    wynik+=trzy(false)*100;
                    wynik+=dwaNaj(false)*10;
                    wynik+=dwaOk(false);
        wybrane[wspX[i]][wspY[i]]="X";
                     wynik+=czteryOb(false)*1000;
                     wynik+=trzyOb(false)*1000;
                     wynik+=blokWygUklad(false)*1000;
        wybrane[wspX[i]][wspY[i]]="P";
                if(najWynik==wynik){
                    if(Math.floor(Math.random()*2)==1){
                        najWsp=i;
                    }
                }
                if(najWynik<wynik){
                    najWynik=wynik;
                    najWsp=i;
                }
    }
        wybrane[wspX[najWsp]][wspY[najWsp]]="O";
                        kolejneRuchyX.push(wspX[najWsp]);
                        kolejneRuchyY.push(wspY[najWsp]);
            var nazwa="pole["+wspX[najWsp]+"]["+wspY[najWsp]+"]";
            document.getElementById(nazwa).innerHTML="O"; document.getElementById(nazwa).style.backgroundColor="coral";
        return true;
                        
}

function trzyOb(ruch){
    var ile;
    var koniecPetli;
    var ruchIle=0;
    var wspX = [];
    var wspY = [];
    
    for(var x=0; x<15; x++){
        for(var y=0; y<15; y++){
            if(wybrane[x][y]!="P") continue;
            
            for(var i=1; i>=0; i--){
                for(var j=1; j>=-1; j--){
                    if(i==0 && j==0) break;
                    if(x+5*i>=15 || y+5*j<0 || y+5*j>=15) continue;
                    if(wybrane[x+5*i][y+5*j]!="P") continue;
                    if(x-i>=0 && y-j>=0 &&y-j<15 && wybrane[x-i][y-j]=="X") continue;
                    if(x+6*i<15 && y+6*j>=0 &&y+6*j<15 && wybrane[x+6*i][y+6*j]=="X") continue;
                    ile=0;
                    koniecPetli=false;
                    for(var k=1; k<5; k++){
                        switch(wybrane[x+i*k][y+j*k]){
                            case "X":
                                ile+=10;
                                break;
                            case "P":
                                ile+=1;
                                if(ile%10>1) koniecPetli=true;
                                break;
                            case "O":
                                koniecPetli=true;
                                break;   
                        }
                        if(koniecPetli) break;
                    }
                    if(koniecPetli) continue;
                    if(ile==31 && ruch){
                        for(var k=1; k<5; k++){
                            if(wybrane[x+i*k][y+j*k]=="P"){
                                wspX.push((x+i*k));
                                wspY.push((y+j*k));
                            }
                        }
                    }
                    if(ile==31 && !ruch){
                        ruchIle++;
                    }
                }
            }   
        }
    }
    if(!ruch) return ruchIle;
    
    if(wspX.length==0) return false;
    var najWsp;
    var najWynik=-1;
    var wynik;
    for(var i=0; i<wspX.length; i++){
        wynik=0;
        if(wybrane[wspX[i]][wspY[i]]!="P") continue;
        wybrane[wspX[i]][wspY[i]]="O";
                    wynik+=trzyWyg(false)*1000;
                    wynik+=trzy(false)*100;
                    wynik+=dwaNaj(false)*10;
                    wynik+=dwaOk(false);
        wybrane[wspX[i]][wspY[i]]="X";
                     wynik+=czteryOb(false)*1000;
                     wynik+=trzyOb(false)*1000;
                     wynik+=blokWygUklad(false)*1000;
        wybrane[wspX[i]][wspY[i]]="P";
                if(najWynik==wynik){
                    if(Math.floor(Math.random()*2)==1){
                        najWsp=i;
                    }
                }
                if(najWynik<wynik){
                    najWynik=wynik;
                    najWsp=i;
                }
    }
        wybrane[wspX[najWsp]][wspY[najWsp]]="O";
                        kolejneRuchyX.push(wspX[najWsp]);
                        kolejneRuchyY.push(wspY[najWsp]);
            var nazwa="pole["+wspX[najWsp]+"]["+wspY[najWsp]+"]";
            document.getElementById(nazwa).innerHTML="O"; document.getElementById(nazwa).style.backgroundColor="coral";
        return true;
}

function ustWygUklad(ruch){
   
    var ileUkladow;
    for(var x=0; x<15; x++){
        for(var y=0; y<15; y++){
            ileUkladow=0;
            if(wybrane[x][y]!="P") continue;
            for(var i=1; i>=0; i--){
                for(var j=1; j>=-1; j--){
                    if(i==0 && j==0) break;
                    // O X_XXP N
                        if(x-i>=0 && x+3*i<15 && y-j>=0 && y-j<15 && y+3*j>=0 && y+3*j<15 && (x-2*i<0 || y-2*j<0 || y-2*j>=15 || wybrane[x-2*i][y-2*j]=="X") && (x+4*i>=15 || y+4*j<0 || y+4*j>=15 || wybrane[x+4*i][y+4*j]!="O") && wybrane[x-i][y-j]=="O" && wybrane[x+i][y+j]=="O" && wybrane[x+2*i][y+2*j]=="O" && wybrane[x+3*i][y+3*j]=="P"){
                            ileUkladow++; continue;
                        }
                    // O X_XPX N
                        if(x-i>=0 && x+3*i<15 && y-j>=0 && y-j<15 && y+3*j>=0 && y+3*j<15 && (x-2*i<0 || y-2*j<0 || y-2*j>=15 || wybrane[x-2*i][y-2*j]=="X") && (x+4*i>=15 || y+4*j<0 || y+4*j>=15 || wybrane[x+4*i][y+4*j]!="O") && wybrane[x-i][y-j]=="O" && wybrane[x+i][y+j]=="O" && wybrane[x+2*i][y+2*j]=="P" && wybrane[x+3*i][y+3*j]=="O"){
                            ileUkladow++; continue;
                        }
                    // O X_PXX N
                        if(x-i>=0 && x+3*i<15 && y-j>=0 && y-j<15 && y+3*j>=0 && y+3*j<15 && (x-2*i<0 || y-2*j<0 || y-2*j>=15 || wybrane[x-2*i][y-2*j]=="X") && (x+4*i>=15 || y+4*j<0 || y+4*j>=15 || wybrane[x+4*i][y+4*j]!="O") && wybrane[x-i][y-j]=="O" && wybrane[x+i][y+j]=="P" && wybrane[x+2*i][y+2*j]=="O" && wybrane[x+3*i][y+3*j]=="O"){
                            ileUkladow++; continue;
                        }
                    
                    // O XX_XP N
                        if(x-2*i>=0 && x+2*i<15 && y-2*j>=0 && y-2*j<15 && y+2*j>=0 && y+2*j<15 && (x-3*i<0 || y-3*j<0 || y-3*j>=15 || wybrane[x-3*i][y-3*j]=="X") && (x+3*i>=15 || y+3*j<0 || y+3*j>=15 || wybrane[x+3*i][y+3*j]!="O") && wybrane[x-2*i][y-2*j]=="O" && wybrane[x-i][y-j]=="O" && wybrane[x+i][y+j]=="O" && wybrane[x+2*i][y+2*j]=="P") {
                            ileUkladow++; continue;
                        }
                    // O XX_PX N
                        if(x-2*i>=0 && x+2*i<15 && y-2*j>=0 && y-2*j<15 && y+2*j>=0 && y+2*j<15 && (x-3*i<0 || y-3*j<0 || y-3*j>=15 || wybrane[x-3*i][y-3*j]=="X") && (x+3*i>=15 || y+3*j<0 || y+3*j>=15 || wybrane[x+3*i][y+3*j]!="O") && wybrane[x-2*i][y-2*j]=="O" && wybrane[x-i][y-j]=="O" && wybrane[x+i][y+j]=="P" && wybrane[x+2*i][y+2*j]=="O") {
                            ileUkladow++; continue;
                        }
                    // O XP_XX N
                        if(x-2*i>=0 && x+2*i<15 && y-2*j>=0 && y-2*j<15 && y+2*j>=0 && y+2*j<15 && (x-3*i<0 || y-3*j<0 || y-3*j>=15 || wybrane[x-3*i][y-3*j]=="X") && (x+3*i>=15 || y+3*j<0 || y+3*j>=15 || wybrane[x+3*i][y+3*j]!="O") && wybrane[x-2*i][y-2*j]=="O" && wybrane[x-i][y-j]=="P" && wybrane[x+i][y+j]=="O" && wybrane[x+2*i][y+2*j]=="O"){
                            ileUkladow++;continue;
                        }
                    
                    // O XXX_P N
                        if(x-3*i>=0 && x+i<15 && y-3*j>=0 && y-3*j<15 && y+j>=0 && y+j<15 && (x-4*i<0 || y-4*j<0 || y-4*j>=15 || wybrane[x-4*i][y-4*j]=="X") && (x+2*i>=15 || y+2*j<0 || y+2*j>=15 || wybrane[x+2*i][y+2*j]!="O") && wybrane[x-3*i][y-3*j]=="O" && wybrane[x-2*i][y-2*j]=="O" && wybrane[x-i][y-j]=="O" && wybrane[x+i][y+j]=="P"){
                            ileUkladow++;continue;
                            ileUkladow++;continue;
                            ileUkladow++;continue;
                            ileUkladow++;continue;
                            ileUkladow++;continue;
                        }
                    // O XXP_X N
                        if(x-3*i>=0 && x+i<15 && y-3*j>=0 && y-3*j<15 && y+j>=0 && y+j<15 && (x-4*i<0 || y-4*j<0 || y-4*j>=15 || wybrane[x-4*i][y-4*j]=="X") && (x+2*i>=15 || y+2*j<0 || y+2*j>=15 || wybrane[x+2*i][y+2*j]!="O") && wybrane[x-3*i][y-3*j]=="O" && wybrane[x-2*i][y-2*j]=="O" && wybrane[x-i][y-j]=="P" && wybrane[x+i][y+j]=="O"){
                            ileUkladow++;continue;
                        }
                    // O XPX_X N
                        if(x-3*i>=0 && x+i<15 && y-3*j>=0 && y-3*j<15 && y+j>=0 && y+j<15 && (x-4*i<0 || y-4*j<0 || y-4*j>=15 || wybrane[x-4*i][y-4*j]=="X") && (x+2*i>=15 || y+2*j<0 || y+2*j>=15 || wybrane[x+2*i][y+2*j]!="O") && wybrane[x-3*i][y-3*j]=="O" && wybrane[x-2*i][y-2*j]=="P" && wybrane[x-i][y-j]=="O" && wybrane[x+i][y+j]=="O"){
                            ileUkladow++;continue;
                        }
                    
                    // O XXXP_ N
                        if(x-4*i>=0 && y-4*j>=0 && y-4*j<15 && (x-5*i<0 || y-5*j<0 || y-5*j>=15 || wybrane[x-5*i][y-5*j]=="X") && (x+i>=15 || y+j<0 || y+j>=15 || wybrane[x+i][y+j]!="O") && wybrane[x-4*i][y-4*j]=="O" && wybrane[x-3*i][y-3*j]=="O" && wybrane[x-2*i][y-2*j]=="O" && wybrane[x-i][y-j]=="P"){
                            ileUkladow++;continue;
                        }
                    // O XXPX_ N
                        if(x-4*i>=0 && y-4*j>=0 && y-4*j<15 && (x-5*i<0 || y-5*j<0 || y-5*j>=15 || wybrane[x-5*i][y-5*j]=="X") && (x+i>=15 || y+j<0 || y+j>=15 || wybrane[x+i][y+j]!="O") && wybrane[x-4*i][y-4*j]=="O" && wybrane[x-3*i][y-3*j]=="O" && wybrane[x-2*i][y-2*j]=="P" && wybrane[x-i][y-j]=="O"){
                            ileUkladow++;continue;
                        }
                    // O XPXX_ N
                        if(x-4*i>=0 && y-4*j>=0 && y-4*j<15 && (x-5*i<0 || y-5*j<0 || y-5*j>=15 || wybrane[x-5*i][y-5*j]=="X") && (x+i>=15 || y+j<0 || y+j>=15 || wybrane[x+i][y+j]!="O") && wybrane[x-4*i][y-4*j]=="O" && wybrane[x-3*i][y-3*j]=="P" && wybrane[x-2*i][y-2*j]=="O" && wybrane[x-i][y-j]=="O"){
                            ileUkladow++;continue;
                        }
                    
                    
                    // N _PXXX O
                         if(x+4*i<15 && y+4*j>=0 && y+4*j<15 && (x+5*i>=15 || y+5*j<0 || y+5*j>=15 || wybrane[x+5*i][y+5*j]=="X") && (x-i<0 || y-j<0 || y-j>=15 || wybrane[x-i][y-j]!="O") && wybrane[x+4*i][y+4*j]=="O" && wybrane[x+3*i][y+3*j]=="O" && wybrane[x+2*i][y+2*j]=="O" && wybrane[x+i][y+j]=="P"){
                            ileUkladow++;continue;
                        }
                    // N _XPXX O
                         if(x+4*i<15 && y+4*j>=0 && y+4*j<15 && (x+5*i>=15 || y+5*j<0 || y+5*j>=15 || wybrane[x+5*i][y+5*j]=="X") && (x-i<0 || y-j<0 || y-j>=15 || wybrane[x-i][y-j]!="O") && wybrane[x+4*i][y+4*j]=="O" && wybrane[x+3*i][y+3*j]=="O" && wybrane[x+2*i][y+2*j]=="P" && wybrane[x+i][y+j]=="O") {
                            ileUkladow++;continue;
                        }
                    // N _XXPX O
                         if(x+4*i<15 && y+4*j>=0 && y+4*j<15 && (x+5*i>=15 || y+5*j<0 || y+5*j>=15 || wybrane[x+5*i][y+5*j]=="X") && (x-i<0 || y-j<0 || y-j>=15 || wybrane[x-i][y-j]!="O") && wybrane[x+4*i][y+4*j]=="O" && wybrane[x+3*i][y+3*j]=="P" && wybrane[x+2*i][y+2*j]=="O" && wybrane[x+i][y+j]=="O") {
                            ileUkladow++;continue;
                        }
                    
                    //N P_XXX O
                        if(x-i>=0 && x+3*i<15 && y-j>=0 && y-j<15 && y+3*j>=0 && y+3*j<15 && (x+4*i>=15 || y+4*j<0 || y+4*j>=15 || wybrane[x+4*i][y+4*j]=="X") && (x-2*i<0 || y-2*j<0 || y-2*j>=15 || wybrane[x-2*i][y-2*j]!="O") && wybrane[x-i][y-j]=="P" && wybrane[x+i][y+j]=="O" && wybrane[x+2*i][y+2*j]=="O" &&  wybrane[x+3*i][y+3*j]=="O"){
                            ileUkladow++;continue;
                        }
                    //N X_PXX O
                        if(x-i>=0 && x+3*i<15 && y-j>=0 && y-j<15 && y+3*j>=0 && y+3*j<15 && (x+4*i>=15 || y+4*j<0 || y+4*j>=15 || wybrane[x+4*i][y+4*j]=="X") && (x-2*i<0 || y-2*j<0 || y-2*j>=15 || wybrane[x-2*i][y-2*j]!="O") && wybrane[x-i][y-j]=="O" && wybrane[x+i][y+j]=="P" && wybrane[x+2*i][y+2*j]=="O" &&  wybrane[x+3*i][y+3*j]=="O"){
                            ileUkladow++;continue;
                        }
                    //N X_XPX O
                        if(x-i>=0 && x+3*i<15 && y-j>=0 && y-j<15 && y+3*j>=0 && y+3*j<15 && (x+4*i>=15 || y+4*j<0 || y+4*j>=15 || wybrane[x+4*i][y+4*j]=="X") && (x-2*i<0 || y-2*j<0 || y-2*j>=15 || wybrane[x-2*i][y-2*j]!="O") && wybrane[x-i][y-j]=="O" && wybrane[x+i][y+j]=="O" && wybrane[x+2*i][y+2*j]=="P" &&  wybrane[x+3*i][y+3*j]=="O"){
                            ileUkladow++;continue;
                        }
                    
                    // N PX_XX O
                        if(x-2*i>=0 && x+2*i<15 && y-2*j>=0 && y-2*j<15 && y+2*j>=0 && y+2*j<15 && (x+3*i>=15 || y+3*j<0 || y+3*j>=15 || wybrane[x+3*i][y+3*j]=="X") && (x-3*i<0 || y-3*j<0 || y-3*j>=15 || wybrane[x-3*i][y-3*j]!="O") && wybrane[x-2*i][y-2*j]=="P" && wybrane[x-i][y-j]=="O" && wybrane[x+i][y+j]=="O" &&  wybrane[x+2*i][y+2*j]=="O"){
                            ileUkladow++;continue;
                        }
                    // N XP_XX O
                        if(x-2*i>=0 && x+2*i<15 && y-2*j>=0 && y-2*j<15 && y+2*j>=0 && y+2*j<15 && (x+3*i>=15 || y+3*j<0 || y+3*j>=15 || wybrane[x+3*i][y+3*j]=="X") && (x-3*i<0 || y-3*j<0 || y-3*j>=15 || wybrane[x-3*i][y-3*j]!="O") && wybrane[x-2*i][y-2*j]=="O" && wybrane[x-i][y-j]=="P" && wybrane[x+i][y+j]=="O" &&  wybrane[x+2*i][y+2*j]=="O"){
                            ileUkladow++;continue;
                        }
                    // N XX_PX O
                        if(x-2*i>=0 && x+2*i<15 && y-2*j>=0 && y-2*j<15 && y+2*j>=0 && y+2*j<15 && (x+3*i>=15 || y+3*j<0 || y+3*j>=15 || wybrane[x+3*i][y+3*j]=="X") && (x-3*i<0 || y-3*j<0 || y-3*j>=15 || wybrane[x-3*i][y-3*j]!="O") && wybrane[x-2*i][y-2*j]=="O" && wybrane[x-i][y-j]=="O" && wybrane[x+i][y+j]=="P" &&  wybrane[x+2*i][y+2*j]=="O"){
                            ileUkladow++;continue;
                        }
                    
                    // N PXX_X O
                        if(x-3*i>=0 && x+i<15 && y-3*j>=0 && y-3*j<15 && y+j>=0 && y+j<15 && (x+2*i>=15 || y+2*j<0 || y+2*j>=15 || wybrane[x+2*i][y+2*j]=="X") && (x-4*i<0 || y-4*j<0 || y-4*j>=15 || wybrane[x-4*i][y-4*j]!="O") && wybrane[x-3*i][y-3*j]=="P" && wybrane[x-2*i][y-2*j]=="O" && wybrane[x-i][y-j]=="O" &&  wybrane[x+i][y+j]=="O"){
                            ileUkladow++;continue;
                        }
                    // N XPX_X O
                        if(x-3*i>=0 && x+i<15 && y-3*j>=0 && y-3*j<15 && y+j>=0 && y+j<15 && (x+2*i>=15 || y+2*j<0 || y+2*j>=15 || wybrane[x+2*i][y+2*j]=="X") && (x-4*i<0 || y-4*j<0 || y-4*j>=15 || wybrane[x-4*i][y-4*j]!="O") && wybrane[x-3*i][y-3*j]=="O" && wybrane[x-2*i][y-2*j]=="P" && wybrane[x-i][y-j]=="O" &&  wybrane[x+i][y+j]=="O"){
                            ileUkladow++;continue;
                        }
                    // N XXP_X O
                        if(x-3*i>=0 && x+i<15 && y-3*j>=0 && y-3*j<15 && y+j>=0 && y+j<15 && (x+2*i>=15 || y+2*j<0 || y+2*j>=15 || wybrane[x+2*i][y+2*j]=="X") && (x-4*i<0 || y-4*j<0 || y-4*j>=15 || wybrane[x-4*i][y-4*j]!="O") && wybrane[x-3*i][y-3*j]=="O" && wybrane[x-2*i][y-2*j]=="O" && wybrane[x-i][y-j]=="P" &&  wybrane[x+i][y+j]=="O"){
                            ileUkladow++;continue;
                        }
                    
                    
                    
                    // NP _XXP PN
                        if(x-i>=0 && x+4*i<15 && y-j>=0 && y-j<15 && y+4*j>=0 && y+4*j<15 && (x-2*i<0 || y-2*j<0 || y-2*j>=15 || wybrane[x-2*i][y-2*j]!="O") && (x+5*i>=15 || y+5*j<0 || y+5*j>=15 || wybrane[x+5*i][y+5*j]!="O") && wybrane[x-i][y-j]=="P" && wybrane[x+i][y+j]=="O" && wybrane[x+2*i][y+2*j]=="O" && wybrane[x+3*i][y+3*j]=="P" && wybrane[x+4*i][y+4*j]=="P"){
                            ileUkladow++;continue;
                        }
                    // NP _XPX PN
                        if(x-i>=0 && x+4*i<15 && y-j>=0 && y-j<15 && y+4*j>=0 && y+4*j<15 && (x-2*i<0 || y-2*j<0 || y-2*j>=15 || wybrane[x-2*i][y-2*j]!="O") && (x+5*i>=15 || y+5*j<0 || y+5*j>=15 || wybrane[x+5*i][y+5*j]!="O") && wybrane[x-i][y-j]=="P" && wybrane[x+i][y+j]=="O" && wybrane[x+2*i][y+2*j]=="P" && wybrane[x+3*i][y+3*j]=="O" && wybrane[x+4*i][y+4*j]=="P"){
                            ileUkladow++;continue;
                        }
                    // NP _PXX PN
                        if(x-i>=0 && x+4*i<15 && y-j>=0 && y-j<15 && y+4*j>=0 && y+4*j<15 && (x-2*i<0 || y-2*j<0 || y-2*j>=15 || wybrane[x-2*i][y-2*j]!="O") && (x+5*i>=15 || y+5*j<0 || y+5*j>=15 || wybrane[x+5*i][y+5*j]!="O") && wybrane[x-i][y-j]=="P" && wybrane[x+i][y+j]=="P" && wybrane[x+2*i][y+2*j]=="O" && wybrane[x+3*i][y+3*j]=="O" && wybrane[x+4*i][y+4*j]=="P"){
                            ileUkladow++;continue;
                        }
                    
                    // NP X_XP PN
                        if(x-2*i>=0 && x+3*i<15 && y-2*j>=0 && y-2*j<15 && y+3*j>=0 && y+3*j<15 && (x-3*i<0 || y-3*j<0 || y-3*j>=15 || wybrane[x-3*i][y-3*j]!="O") && (x+4*i>=15 || y+4*j<0 || y+4*j>=15 || wybrane[x+4*i][y+4*j]!="O") && wybrane[x-2*i][y-2*j]=="P" && wybrane[x-i][y-j]=="O" && wybrane[x+i][y+j]=="O" && wybrane[x+2*i][y+2*j]=="P" && wybrane[x+3*i][y+3*j]=="P"){
                            ileUkladow++;continue;
                        }
                    // NP X_PX PN
                        if(x-2*i>=0 && x+3*i<15 && y-2*j>=0 && y-2*j<15 && y+3*j>=0 && y+3*j<15 && (x-3*i<0 || y-3*j<0 || y-3*j>=15 || wybrane[x-3*i][y-3*j]!="O") && (x+4*i>=15 || y+4*j<0 || y+4*j>=15 || wybrane[x+4*i][y+4*j]!="O") && wybrane[x-2*i][y-2*j]=="P" && wybrane[x-i][y-j]=="O" && wybrane[x+i][y+j]=="P" && wybrane[x+2*i][y+2*j]=="O" && wybrane[x+3*i][y+3*j]=="P"){
                            ileUkladow++;continue;
                        }
                    // NP P_XX PN
                        if(x-2*i>=0 && x+3*i<15 && y-2*j>=0 && y-2*j<15 && y+3*j>=0 && y+3*j<15 && (x-3*i<0 || y-3*j<0 || y-3*j>=15 || wybrane[x-3*i][y-3*j]!="O") && (x+4*i>=15 || y+4*j<0 || y+4*j>=15 || wybrane[x+4*i][y+4*j]!="O") && wybrane[x-2*i][y-2*j]=="P" && wybrane[x-i][y-j]=="P" && wybrane[x+i][y+j]=="O" && wybrane[x+2*i][y+2*j]=="O" && wybrane[x+3*i][y+3*j]=="P"){
                            ileUkladow++;continue;
                        }
                    
                    // NP XX_P PN
                        if(x-3*i>=0 && x+2*i<15 && y-3*j>=0 && y-3*j<15 && y+2*j>=0 && y+2*j<15 && (x-4*i<0 || y-4*j<0 || y-4*j>=15 || wybrane[x-4*i][y-4*j]!="O") && (x+3*i>=15 || y+3*j<0 || y+3*j>=15 || wybrane[x+3*i][y+3*j]!="O") && wybrane[x-3*i][y-3*j]=="P" && wybrane[x-2*i][y-2*j]=="O" && wybrane[x-i][y-j]=="O" && wybrane[x+i][y+j]=="P" && wybrane[x+2*i][y+2*j]=="P"){
                            ileUkladow++;continue;
                        }
                    // NP XP_X PN
                        if(x-3*i>=0 && x+2*i<15 && y-3*j>=0 && y-3*j<15 && y+2*j>=0 && y+2*j<15 && (x-4*i<0 || y-4*j<0 || y-4*j>=15 || wybrane[x-4*i][y-4*j]!="O") && (x+3*i>=15 || y+3*j<0 || y+3*j>=15 || wybrane[x+3*i][y+3*j]!="O") && wybrane[x-3*i][y-3*j]=="P" && wybrane[x-2*i][y-2*j]=="O" && wybrane[x-i][y-j]=="P" && wybrane[x+i][y+j]=="O" && wybrane[x+2*i][y+2*j]=="P"){
                            ileUkladow++;continue;
                        }
                    // NP PX_X PN
                        if(x-3*i>=0 && x+2*i<15 && y-3*j>=0 && y-3*j<15 && y+2*j>=0 && y+2*j<15 && (x-4*i<0 || y-4*j<0 || y-4*j>=15 || wybrane[x-4*i][y-4*j]!="O") && (x+3*i>=15 || y+3*j<0 || y+3*j>=15 || wybrane[x+3*i][y+3*j]!="O") && wybrane[x-3*i][y-3*j]=="P" && wybrane[x-2*i][y-2*j]=="P" && wybrane[x-i][y-j]=="O" && wybrane[x+i][y+j]=="O" && wybrane[x+2*i][y+2*j]=="P"){
                            ileUkladow++;continue;
                        }
                    
                    // NP XXP_ PN
                        if(x-4*i>=0 && x+i<15 && y-4*j>=0 && y-4*j<15 && y+j>=0 && y+j<15 && (x-5*i<0 || y-5*j<0 || y-5*j>=15 || wybrane[x-5*i][y-5*j]!="O") && (x+2*i>=15 || y+2*j<0 || y+2*j>=15 || wybrane[x+2*i][y+2*j]!="O") && wybrane[x-4*i][y-4*j]=="P" && wybrane[x-3*i][y-3*j]=="O" && wybrane[x-2*i][y-2*j]=="O" && wybrane[x-i][y-j]=="P" && wybrane[x+i][y+j]=="P"){
                            ileUkladow++;continue;
                        }
                    // NP XPX_ PN
                        if(x-4*i>=0 && x+i<15 && y-4*j>=0 && y-4*j<15 && y+j>=0 && y+j<15 && (x-5*i<0 || y-5*j<0 || y-5*j>=15 || wybrane[x-5*i][y-5*j]!="O") && (x+2*i>=15 || y+2*j<0 || y+2*j>=15 || wybrane[x+2*i][y+2*j]!="O") && wybrane[x-4*i][y-4*j]=="P" && wybrane[x-3*i][y-3*j]=="O" && wybrane[x-2*i][y-2*j]=="P" && wybrane[x-i][y-j]=="O" && wybrane[x+i][y+j]=="P"){
                            ileUkladow++;continue;
                        }
                    // NP PXX_ PN
                        if(x-4*i>=0 && x+i<15 && y-4*j>=0 && y-4*j<15 && y+j>=0 && y+j<15 && (x-5*i<0 || y-5*j<0 || y-5*j>=15 || wybrane[x-5*i][y-5*j]!="O") && (x+2*i>=15 || y+2*j<0 || y+2*j>=15 || wybrane[x+2*i][y+2*j]!="O") && wybrane[x-4*i][y-4*j]=="P" && wybrane[x-3*i][y-3*j]=="P" && wybrane[x-2*i][y-2*j]=="O" && wybrane[x-i][y-j]=="O" && wybrane[x+i][y+j]=="P"){
                            ileUkladow++;continue;
                        }
                }
            }
            if(ileUkladow>1 && ruch){
                        wybrane[x][y]="O";
                        kolejneRuchyX.push(x);
                        kolejneRuchyY.push(y);
                        var nazwa="pole["+x+"]["+y+"]";
                        document.getElementById(nazwa).innerHTML="O"; document.getElementById(nazwa).style.backgroundColor="coral"; 
                        return true;
            }
            if(ileUkladow>1 && !ruch){
                
                return true;
            }
        }
    }
    
    return false;
}

function blokWygUklad(ruch){
    var ileUkladow;
    var ruchIle=0;
    for(var x=0; x<15; x++){
        for(var y=0; y<15; y++){
            ileUkladow=0;
            if(wybrane[x][y]!="P") continue;
                    var wspX = [];
                    var wspY = [];
                        wspX.push(x);
                        wspY.push(y);
            for(var i=1; i>=0; i--){
                for(var j=1; j>=-1; j--){
                    if(i==0 && j==0) break;
                    
                    // O X_XXP N
                        if(x-i>=0 && x+3*i<15 && y-j>=0 && y-j<15 && y+3*j>=0 && y+3*j<15 && (x-2*i<0 || y-2*j<0 || y-2*j>=15 || wybrane[x-2*i][y-2*j]=="O") && (x+4*i>=15 || y+4*j<0 || y+4*j>=15 || wybrane[x+4*i][y+4*j]!="X") && wybrane[x-i][y-j]=="X" && wybrane[x+i][y+j]=="X" && wybrane[x+2*i][y+2*j]=="X" && wybrane[x+3*i][y+3*j]=="P"){
                            wspX.push(x+3*i);
                            wspY.push(y+3*j);
                            ileUkladow++; continue;
                        }
                    // O X_XPX N
                        if(x-i>=0 && x+3*i<15 && y-j>=0 && y-j<15 && y+3*j>=0 && y+3*j<15 && (x-2*i<0 || y-2*j<0 || y-2*j>=15 || wybrane[x-2*i][y-2*j]=="O") && (x+4*i>=15 || y+4*j<0 || y+4*j>=15 || wybrane[x+4*i][y+4*j]!="X") && wybrane[x-i][y-j]=="X" && wybrane[x+i][y+j]=="X" && wybrane[x+2*i][y+2*j]=="P" && wybrane[x+3*i][y+3*j]=="X"){
                            wspX.push(x+2*i);
                            wspY.push(y+2*j);
                            ileUkladow++; continue;
                        }
                    // O X_PXX N
                        if(x-i>=0 && x+3*i<15 && y-j>=0 && y-j<15 && y+3*j>=0 && y+3*j<15 && (x-2*i<0 || y-2*j<0 || y-2*j>=15 || wybrane[x-2*i][y-2*j]=="O") && (x+4*i>=15 || y+4*j<0 || y+4*j>=15 || wybrane[x+4*i][y+4*j]!="X") && wybrane[x-i][y-j]=="X" && wybrane[x+i][y+j]=="P" && wybrane[x+2*i][y+2*j]=="X" && wybrane[x+3*i][y+3*j]=="X"){
                            wspX.push(x+i);
                            wspY.push(y+j);
                            ileUkladow++; continue;
                        }
                    
                    // O XX_XP N
                        if(x-2*i>=0 && x+2*i<15 && y-2*j>=0 && y-2*j<15 && y+2*j>=0 && y+2*j<15 && (x-3*i<0 || y-3*j<0 || y-3*j>=15 || wybrane[x-3*i][y-3*j]=="O") && (x+3*i>=15 || y+3*j<0 || y+3*j>=15 || wybrane[x+3*i][y+3*j]!="X") && wybrane[x-2*i][y-2*j]=="X" && wybrane[x-i][y-j]=="X" && wybrane[x+i][y+j]=="X" && wybrane[x+2*i][y+2*j]=="P") {
                            wspX.push(x+2*i);
                            wspY.push(y+2*j);
                            ileUkladow++; continue;
                        }
                    // O XX_PX N
                        if(x-2*i>=0 && x+2*i<15 && y-2*j>=0 && y-2*j<15 && y+2*j>=0 && y+2*j<15 && (x-3*i<0 || y-3*j<0 || y-3*j>=15 || wybrane[x-3*i][y-3*j]=="O") && (x+3*i>=15 || y+3*j<0 || y+3*j>=15 || wybrane[x+3*i][y+3*j]!="X") && wybrane[x-2*i][y-2*j]=="X" && wybrane[x-i][y-j]=="X" && wybrane[x+i][y+j]=="P" && wybrane[x+2*i][y+2*j]=="X") {
                            wspX.push(x+i);
                            wspY.push(y+j);
                            ileUkladow++; continue;
                        }
                    // O XP_XX N
                        if(x-2*i>=0 && x+2*i<15 && y-2*j>=0 && y-2*j<15 && y+2*j>=0 && y+2*j<15 && (x-3*i<0 || y-3*j<0 || y-3*j>=15 || wybrane[x-3*i][y-3*j]=="O") && (x+3*i>=15 || y+3*j<0 || y+3*j>=15 || wybrane[x+3*i][y+3*j]!="X") && wybrane[x-2*i][y-2*j]=="X" && wybrane[x-i][y-j]=="P" && wybrane[x+i][y+j]=="X" && wybrane[x+2*i][y+2*j]=="X"){
                            wspX.push(x-i);
                            wspY.push(y-j);
                            ileUkladow++;continue;
                        }
                    
                    // O XXX_P N
                        if(x-3*i>=0 && x+i<15 && y-3*j>=0 && y-3*j<15 && y+j>=0 && y+j<15 && (x-4*i<0 || y-4*j<0 || y-4*j>=15 || wybrane[x-4*i][y-4*j]=="O") && (x+2*i>=15 || y+2*j<0 || y+2*j>=15 || wybrane[x+2*i][y+2*j]!="X") && wybrane[x-3*i][y-3*j]=="X" && wybrane[x-2*i][y-2*j]=="X" && wybrane[x-i][y-j]=="X" && wybrane[x+i][y+j]=="P"){
                            wspX.push(x+i);
                            wspY.push(y+j);
                            ileUkladow++;continue;
                        }
                    // O XXP_X N
                        if(x-3*i>=0 && x+i<15 && y-3*j>=0 && y-3*j<15 && y+j>=0 && y+j<15 && (x-4*i<0 || y-4*j<0 || y-4*j>=15 || wybrane[x-4*i][y-4*j]=="O") && (x+2*i>=15 || y+2*j<0 || y+2*j>=15 || wybrane[x+2*i][y+2*j]!="X") && wybrane[x-3*i][y-3*j]=="X" && wybrane[x-2*i][y-2*j]=="X" && wybrane[x-i][y-j]=="P" && wybrane[x+i][y+j]=="X"){
                            wspX.push(x-i);
                            wspY.push(y-j);
                            ileUkladow++;continue;
                        }
                    // O XPX_X N
                        if(x-3*i>=0 && x+i<15 && y-3*j>=0 && y-3*j<15 && y+j>=0 && y+j<15 && (x-4*i<0 || y-4*j<0 || y-4*j>=15 || wybrane[x-4*i][y-4*j]=="O") && (x+2*i>=15 || y+2*j<0 || y+2*j>=15 || wybrane[x+2*i][y+2*j]!="X") && wybrane[x-3*i][y-3*j]=="X" && wybrane[x-2*i][y-2*j]=="P" && wybrane[x-i][y-j]=="X" && wybrane[x+i][y+j]=="X"){
                            wspX.push(x-2*i);
                            wspY.push(y-2*j);
                            ileUkladow++;continue;
                        }
                    
                    // O XXXP_ N
                        if(x-4*i>=0 && y-4*j>=0 && y-4*j<15 && (x-5*i<0 || y-5*j<0 || y-5*j>=15 || wybrane[x-5*i][y-5*j]=="O") && (x+i>=15 || y+j<0 || y+j>=15 || wybrane[x+i][y+j]!="X") && wybrane[x-4*i][y-4*j]=="X" && wybrane[x-3*i][y-3*j]=="X" && wybrane[x-2*i][y-2*j]=="X" && wybrane[x-i][y-j]=="P"){
                            wspX.push(x-i);
                            wspY.push(y-j);
                            ileUkladow++;continue;
                        }
                    // O XXPX_ N
                        if(x-4*i>=0 && y-4*j>=0 && y-4*j<15 && (x-5*i<0 || y-5*j<0 || y-5*j>=15 || wybrane[x-5*i][y-5*j]=="O") && (x+i>=15 || y+j<0 || y+j>=15 || wybrane[x+i][y+j]!="X") && wybrane[x-4*i][y-4*j]=="X" && wybrane[x-3*i][y-3*j]=="X" && wybrane[x-2*i][y-2*j]=="P" && wybrane[x-i][y-j]=="X"){
                            wspX.push(x-2*i);
                            wspY.push(y-2*j);
                            ileUkladow++;continue;
                        }
                    // O XPXX_ N
                        if(x-4*i>=0 && y-4*j>=0 && y-4*j<15 && (x-5*i<0 || y-5*j<0 || y-5*j>=15 || wybrane[x-5*i][y-5*j]=="O") && (x+i>=15 || y+j<0 || y+j>=15 || wybrane[x+i][y+j]!="X") && wybrane[x-4*i][y-4*j]=="X" && wybrane[x-3*i][y-3*j]=="P" && wybrane[x-2*i][y-2*j]=="X" && wybrane[x-i][y-j]=="X"){
                            wspX.push(x-3*i);
                            wspY.push(y-3*j);
                            ileUkladow++;continue;
                        }
                    
                    
                    // N _PXXX O
                         if(x+4*i<15 && y+4*j>=0 && y+4*j<15 && (x+5*i>=15 || y+5*j<0 || y+5*j>=15 || wybrane[x+5*i][y+5*j]=="O") && (x-i<0 || y-j<0 || y-j>=15 || wybrane[x-i][y-j]!="X") && wybrane[x+4*i][y+4*j]=="X" && wybrane[x+3*i][y+3*j]=="X" && wybrane[x+2*i][y+2*j]=="X" && wybrane[x+i][y+j]=="P"){
                            wspX.push(x+i);
                            wspY.push(y+j);
                            ileUkladow++;continue;
                        }
                    // N _XPXX O
                         if(x+4*i<15 && y+4*j>=0 && y+4*j<15 && (x+5*i>=15 || y+5*j<0 || y+5*j>=15 || wybrane[x+5*i][y+5*j]=="O") && (x-i<0 || y-j<0 || y-j>=15 || wybrane[x-i][y-j]!="X") && wybrane[x+4*i][y+4*j]=="X" && wybrane[x+3*i][y+3*j]=="X" && wybrane[x+2*i][y+2*j]=="P" && wybrane[x+i][y+j]=="X") {
                            wspX.push(x+2*i);
                            wspY.push(y+2*j);
                            ileUkladow++;continue;
                        }
                    // N _XXPX O
                         if(x+4*i<15 && y+4*j>=0 && y+4*j<15 && (x+5*i>=15 || y+5*j<0 || y+5*j>=15 || wybrane[x+5*i][y+5*j]=="O") && (x-i<0 || y-j<0 || y-j>=15 || wybrane[x-i][y-j]!="X") && wybrane[x+4*i][y+4*j]=="X" && wybrane[x+3*i][y+3*j]=="P" && wybrane[x+2*i][y+2*j]=="X" && wybrane[x+i][y+j]=="X") {
                            wspX.push(x+3*i);
                            wspY.push(y+3*j);
                            ileUkladow++;continue;
                        }
                    
                    //N P_XXX O
                        if(x-i>=0 && x+3*i<15 && y-j>=0 && y-j<15 && y+3*j>=0 && y+3*j<15 && (x+4*i>=15 || y+4*j<0 || y+4*j>=15 || wybrane[x+4*i][y+4*j]=="O") && (x-2*i<0 || y-2*j<0 || y-2*j>=15 || wybrane[x-2*i][y-2*j]!="X") && wybrane[x-i][y-j]=="P" && wybrane[x+i][y+j]=="X" && wybrane[x+2*i][y+2*j]=="X" &&  wybrane[x+3*i][y+3*j]=="X"){
                            wspX.push(x-i);
                            wspY.push(y-j);
                            ileUkladow++;continue;
                        }
                    //N X_PXX O
                        if(x-i>=0 && x+3*i<15 && y-j>=0 && y-j<15 && y+3*j>=0 && y+3*j<15 && (x+4*i>=15 || y+4*j<0 || y+4*j>=15 || wybrane[x+4*i][y+4*j]=="O") && (x-2*i<0 || y-2*j<0 || y-2*j>=15 || wybrane[x-2*i][y-2*j]!="X") && wybrane[x-i][y-j]=="X" && wybrane[x+i][y+j]=="P" && wybrane[x+2*i][y+2*j]=="X" &&  wybrane[x+3*i][y+3*j]=="X"){
                            wspX.push(x+i);
                            wspY.push(y+j);
                            ileUkladow++;continue;
                        }
                    //N X_XPX O
                        if(x-i>=0 && x+3*i<15 && y-j>=0 && y-j<15 && y+3*j>=0 && y+3*j<15 && (x+4*i>=15 || y+4*j<0 || y+4*j>=15 || wybrane[x+4*i][y+4*j]=="O") && (x-2*i<0 || y-2*j<0 || y-2*j>=15 || wybrane[x-2*i][y-2*j]!="X") && wybrane[x-i][y-j]=="X" && wybrane[x+i][y+j]=="X" && wybrane[x+2*i][y+2*j]=="P" &&  wybrane[x+3*i][y+3*j]=="X"){
                            wspX.push(x+2*i);
                            wspY.push(y+2*j);
                            ileUkladow++;continue;
                        }
                    
                    // N PX_XX O
                        if(x-2*i>=0 && x+2*i<15 && y-2*j>=0 && y-2*j<15 && y+2*j>=0 && y+2*j<15 && (x+3*i>=15 || y+3*j<0 || y+3*j>=15 || wybrane[x+3*i][y+3*j]=="O") && (x-3*i<0 || y-3*j<0 || y-3*j>=15 || wybrane[x-3*i][y-3*j]!="X") && wybrane[x-2*i][y-2*j]=="P" && wybrane[x-i][y-j]=="X" && wybrane[x+i][y+j]=="X" &&  wybrane[x+2*i][y+2*j]=="X"){
                            wspX.push(x-2*i);
                            wspY.push(y-2*j);
                            ileUkladow++;continue;
                        }
                    // N XP_XX O
                        if(x-2*i>=0 && x+2*i<15 && y-2*j>=0 && y-2*j<15 && y+2*j>=0 && y+2*j<15 && (x+3*i>=15 || y+3*j<0 || y+3*j>=15 || wybrane[x+3*i][y+3*j]=="O") && (x-3*i<0 || y-3*j<0 || y-3*j>=15 || wybrane[x-3*i][y-3*j]!="X") && wybrane[x-2*i][y-2*j]=="X" && wybrane[x-i][y-j]=="P" && wybrane[x+i][y+j]=="X" &&  wybrane[x+2*i][y+2*j]=="X"){
                            wspX.push(x-i);
                            wspY.push(y-j);
                            ileUkladow++;continue;
                        }
                    // N XX_PX O
                        if(x-2*i>=0 && x+2*i<15 && y-2*j>=0 && y-2*j<15 && y+2*j>=0 && y+2*j<15 && (x+3*i>=15 || y+3*j<0 || y+3*j>=15 || wybrane[x+3*i][y+3*j]=="O") && (x-3*i<0 || y-3*j<0 || y-3*j>=15 || wybrane[x-3*i][y-3*j]!="X") && wybrane[x-2*i][y-2*j]=="X" && wybrane[x-i][y-j]=="X" && wybrane[x+i][y+j]=="P" &&  wybrane[x+2*i][y+2*j]=="X"){
                            wspX.push(x+i);
                            wspY.push(y+j);
                            ileUkladow++;continue;
                        }
                    
                    // N PXX_X O
                        if(x-3*i>=0 && x+i<15 && y-3*j>=0 && y-3*j<15 && y+j>=0 && y+j<15 && (x+2*i>=15 || y+2*j<0 || y+2*j>=15 || wybrane[x+2*i][y+2*j]=="O") && (x-4*i<0 || y-4*j<0 || y-4*j>=15 || wybrane[x-4*i][y-4*j]!="X") && wybrane[x-3*i][y-3*j]=="P" && wybrane[x-2*i][y-2*j]=="X" && wybrane[x-i][y-j]=="X" &&  wybrane[x+i][y+j]=="X"){
                            wspX.push(x-3*i);
                            wspY.push(y-3*j);
                            ileUkladow++;continue;
                        }
                    // N XPX_X O
                        if(x-3*i>=0 && x+i<15 && y-3*j>=0 && y-3*j<15 && y+j>=0 && y+j<15 && (x+2*i>=15 || y+2*j<0 || y+2*j>=15 || wybrane[x+2*i][y+2*j]=="O") && (x-4*i<0 || y-4*j<0 || y-4*j>=15 || wybrane[x-4*i][y-4*j]!="X") && wybrane[x-3*i][y-3*j]=="X" && wybrane[x-2*i][y-2*j]=="P" && wybrane[x-i][y-j]=="X" &&  wybrane[x+i][y+j]=="X"){
                            wspX.push(x-2*i);
                            wspY.push(y-2*j);
                            ileUkladow++;continue;
                        }
                    // N XXP_X O
                        if(x-3*i>=0 && x+i<15 && y-3*j>=0 && y-3*j<15 && y+j>=0 && y+j<15 && (x+2*i>=15 || y+2*j<0 || y+2*j>=15 || wybrane[x+2*i][y+2*j]=="O") && (x-4*i<0 || y-4*j<0 || y-4*j>=15 || wybrane[x-4*i][y-4*j]!="X") && wybrane[x-3*i][y-3*j]=="X" && wybrane[x-2*i][y-2*j]=="X" && wybrane[x-i][y-j]=="P" &&  wybrane[x+i][y+j]=="X"){
                            wspX.push(x-i);
                            wspY.push(y-j);
                            ileUkladow++;continue;
                        }
                    
                    
                    
                    // NP _XXP PN
                        if(x-i>=0 && x+4*i<15 && y-j>=0 && y-j<15 && y+4*j>=0 && y+4*j<15 && (x-2*i<0 || y-2*j<0 || y-2*j>=15 || wybrane[x-2*i][y-2*j]!="X") && (x+5*i>=15 || y+5*j<0 || y+5*j>=15 || wybrane[x+5*i][y+5*j]!="X") && wybrane[x-i][y-j]=="P" && wybrane[x+i][y+j]=="X" && wybrane[x+2*i][y+2*j]=="X" && wybrane[x+3*i][y+3*j]=="P" && wybrane[x+4*i][y+4*j]=="P"){
                            wspX.push(x+3*i);
                            wspY.push(y+3*j);
                            wspX.push(x-i);
                            wspY.push(y-j);
                            wspX.push(x+4*i);
                            wspY.push(y+4*j);
                            ileUkladow++;continue;
                        }
                    // NP _XPX PN
                        if(x-i>=0 && x+4*i<15 && y-j>=0 && y-j<15 && y+4*j>=0 && y+4*j<15 && (x-2*i<0 || y-2*j<0 || y-2*j>=15 || wybrane[x-2*i][y-2*j]!="X") && (x+5*i>=15 || y+5*j<0 || y+5*j>=15 || wybrane[x+5*i][y+5*j]!="X") && wybrane[x-i][y-j]=="P" && wybrane[x+i][y+j]=="X" && wybrane[x+2*i][y+2*j]=="P" && wybrane[x+3*i][y+3*j]=="X" && wybrane[x+4*i][y+4*j]=="P"){
                            wspX.push(x+2*i);
                            wspY.push(y+2*j);
                            wspX.push(x-i);
                            wspY.push(y-j);
                            wspX.push(x+4*i);
                            wspY.push(y+4*j);
                            ileUkladow++;continue;
                        }
                    // NP _PXX PN
                        if(x-i>=0 && x+4*i<15 && y-j>=0 && y-j<15 && y+4*j>=0 && y+4*j<15 && (x-2*i<0 || y-2*j<0 || y-2*j>=15 || wybrane[x-2*i][y-2*j]!="X") && (x+5*i>=15 || y+5*j<0 || y+5*j>=15 || wybrane[x+5*i][y+5*j]!="X") && wybrane[x-i][y-j]=="P" && wybrane[x+i][y+j]=="P" && wybrane[x+2*i][y+2*j]=="X" && wybrane[x+3*i][y+3*j]=="X" && wybrane[x+4*i][y+4*j]=="P"){
                            wspX.push(x+i);
                            wspY.push(y+j);
                            wspX.push(x+4*i);
                            wspY.push(y+4*j);
                            ileUkladow++;continue;
                        }
                    
                    // NP X_XP PN
                        if(x-2*i>=0 && x+3*i<15 && y-2*j>=0 && y-2*j<15 && y+3*j>=0 && y+3*j<15 && (x-3*i<0 || y-3*j<0 || y-3*j>=15 || wybrane[x-3*i][y-3*j]!="X") && (x+4*i>=15 || y+4*j<0 || y+4*j>=15 || wybrane[x+4*i][y+4*j]!="X") && wybrane[x-2*i][y-2*j]=="P" && wybrane[x-i][y-j]=="X" && wybrane[x+i][y+j]=="X" && wybrane[x+2*i][y+2*j]=="P" && wybrane[x+3*i][y+3*j]=="P"){
                            wspX.push(x+2*i);
                            wspY.push(y+2*j);
                            wspX.push(x-2*i);
                            wspY.push(y-2*j);
                            wspX.push(x+3*i);
                            wspY.push(y+3*j);
                            ileUkladow++;continue;
                        }
                    // NP X_PX PN
                        if(x-2*i>=0 && x+3*i<15 && y-2*j>=0 && y-2*j<15 && y+3*j>=0 && y+3*j<15 && (x-3*i<0 || y-3*j<0 || y-3*j>=15 || wybrane[x-3*i][y-3*j]!="X") && (x+4*i>=15 || y+4*j<0 || y+4*j>=15 || wybrane[x+4*i][y+4*j]!="X") && wybrane[x-2*i][y-2*j]=="P" && wybrane[x-i][y-j]=="X" && wybrane[x+i][y+j]=="P" && wybrane[x+2*i][y+2*j]=="X" && wybrane[x+3*i][y+3*j]=="P"){
                            wspX.push(x+i);
                            wspY.push(y+j);
                            wspX.push(x-2*i);
                            wspY.push(y-2*j);
                            wspX.push(x+3*i);
                            wspY.push(y+3*j);
                            ileUkladow++;continue;
                        }
                    // NP P_XX PN
                        if(x-2*i>=0 && x+3*i<15 && y-2*j>=0 && y-2*j<15 && y+3*j>=0 && y+3*j<15 && (x-3*i<0 || y-3*j<0 || y-3*j>=15 || wybrane[x-3*i][y-3*j]!="X") && (x+4*i>=15 || y+4*j<0 || y+4*j>=15 || wybrane[x+4*i][y+4*j]!="X") && wybrane[x-2*i][y-2*j]=="P" && wybrane[x-i][y-j]=="P" && wybrane[x+i][y+j]=="X" && wybrane[x+2*i][y+2*j]=="X" && wybrane[x+3*i][y+3*j]=="P"){
                            wspX.push(x-i);
                            wspY.push(y-j);
                            wspX.push(x+3*i);
                            wspY.push(y+3*j);
                            ileUkladow++;continue;
                        }
                    
                    // NP XX_P PN
                        if(x-3*i>=0 && x+2*i<15 && y-3*j>=0 && y-3*j<15 && y+2*j>=0 && y+2*j<15 && (x-4*i<0 || y-4*j<0 || y-4*j>=15 || wybrane[x-4*i][y-4*j]!="X") && (x+3*i>=15 || y+3*j<0 || y+3*j>=15 || wybrane[x+3*i][y+3*j]!="X") && wybrane[x-3*i][y-3*j]=="P" && wybrane[x-2*i][y-2*j]=="X" && wybrane[x-i][y-j]=="X" && wybrane[x+i][y+j]=="P" && wybrane[x+2*i][y+2*j]=="P"){
                            wspX.push(x+i);
                            wspY.push(y+j);
                            wspX.push(x-3*i);
                            wspY.push(y-3*j);
                            ileUkladow++;continue;
                        }
                    // NP XP_X PN
                        if(x-3*i>=0 && x+2*i<15 && y-3*j>=0 && y-3*j<15 && y+2*j>=0 && y+2*j<15 && (x-4*i<0 || y-4*j<0 || y-4*j>=15 || wybrane[x-4*i][y-4*j]!="X") && (x+3*i>=15 || y+3*j<0 || y+3*j>=15 || wybrane[x+3*i][y+3*j]!="X") && wybrane[x-3*i][y-3*j]=="P" && wybrane[x-2*i][y-2*j]=="X" && wybrane[x-i][y-j]=="P" && wybrane[x+i][y+j]=="X" && wybrane[x+2*i][y+2*j]=="P"){
                            wspX.push(x-i);
                            wspY.push(y-j);
                            wspX.push(x-3*i);
                            wspY.push(y-3*j);
                            wspX.push(x+2*i);
                            wspY.push(y+2*j);
                            ileUkladow++;continue;
                        }
                    // NP PX_X PN
                        if(x-3*i>=0 && x+2*i<15 && y-3*j>=0 && y-3*j<15 && y+2*j>=0 && y+2*j<15 && (x-4*i<0 || y-4*j<0 || y-4*j>=15 || wybrane[x-4*i][y-4*j]!="X") && (x+3*i>=15 || y+3*j<0 || y+3*j>=15 || wybrane[x+3*i][y+3*j]!="X") && wybrane[x-3*i][y-3*j]=="P" && wybrane[x-2*i][y-2*j]=="P" && wybrane[x-i][y-j]=="X" && wybrane[x+i][y+j]=="X" && wybrane[x+2*i][y+2*j]=="P"){
                            wspX.push(x-2*i);
                            wspY.push(y-2*j);
                            wspX.push(x-3*i);
                            wspY.push(y-3*j);
                            wspX.push(x+2*i);
                            wspY.push(y+2*j);
                            ileUkladow++;continue;
                        }
                    
                    // NP XXP_ PN
                        if(x-4*i>=0 && x+i<15 && y-4*j>=0 && y-4*j<15 && y+j>=0 && y+j<15 && (x-5*i<0 || y-5*j<0 || y-5*j>=15 || wybrane[x-5*i][y-5*j]!="X") && (x+2*i>=15 || y+2*j<0 || y+2*j>=15 || wybrane[x+2*i][y+2*j]!="X") && wybrane[x-4*i][y-4*j]=="P" && wybrane[x-3*i][y-3*j]=="X" && wybrane[x-2*i][y-2*j]=="X" && wybrane[x-i][y-j]=="P" && wybrane[x+i][y+j]=="P"){
                            wspX.push(x-i);
                            wspY.push(y-j);
                            wspX.push(x-4*i);
                            wspY.push(y-4*j);
                            ileUkladow++;continue;
                        }
                    // NP XPX_ PN
                        if(x-4*i>=0 && x+i<15 && y-4*j>=0 && y-4*j<15 && y+j>=0 && y+j<15 && (x-5*i<0 || y-5*j<0 || y-5*j>=15 || wybrane[x-5*i][y-5*j]!="X") && (x+2*i>=15 || y+2*j<0 || y+2*j>=15 || wybrane[x+2*i][y+2*j]!="X") && wybrane[x-4*i][y-4*j]=="P" && wybrane[x-3*i][y-3*j]=="X" && wybrane[x-2*i][y-2*j]=="P" && wybrane[x-i][y-j]=="X" && wybrane[x+i][y+j]=="P"){
                            wspX.push(x-2*i);
                            wspY.push(y-2*j);
                            wspX.push(x-4*i);
                            wspY.push(y-4*j);
                            wspX.push(x+i);
                            wspY.push(y+j);
                            ileUkladow++;continue;
                        }
                    // NP PXX_ PN
                        if(x-4*i>=0 && x+i<15 && y-4*j>=0 && y-4*j<15 && y+j>=0 && y+j<15 && (x-5*i<0 || y-5*j<0 || y-5*j>=15 || wybrane[x-5*i][y-5*j]!="X") && (x+2*i>=15 || y+2*j<0 || y+2*j>=15 || wybrane[x+2*i][y+2*j]!="X") && wybrane[x-4*i][y-4*j]=="P" && wybrane[x-3*i][y-3*j]=="P" && wybrane[x-2*i][y-2*j]=="X" && wybrane[x-i][y-j]=="X" && wybrane[x+i][y+j]=="P"){
                            wspX.push(x-3*i);
                            wspY.push(y-3*j);
                            wspX.push(x-4*i);
                            wspY.push(y-4*j);
                            wspX.push(x+i);
                            wspY.push(y+j);
                            ileUkladow++;continue;
                        }
                }
            }
            if(ileUkladow>2 && ruch){
                console.log(ileUkladow);
                        wybrane[x][y]="O";
                        kolejneRuchyX.push(x);
                        kolejneRuchyY.push(y);
                        var nazwa="pole["+x+"]["+y+"]";
                        document.getElementById(nazwa).innerHTML="O"; document.getElementById(nazwa).style.backgroundColor="coral";
                        return true;
            }
            if(ileUkladow==2 && ruch){
                var wynik=0;
                var wynikAkt;
                var wspNaj;
                    for(var h=0; h<wspX.length; h++){
                        wynikAkt=0;
                        if(wybrane[wspX[h]][wspY[h]]!="P") continue;
                            wybrane[wspX[h]][wspY[h]]="O";
                                wynikAkt+=trzyWyg(false)*1000;
                                wynikAkt+=trzy(false)*100;
                                wynikAkt+=dwaNaj(false)*10;
                                wynikAkt+=dwaOk(false);
                        wybrane[wspX[h]][wspY[h]]="X";
                            wynik+=czteryOb(false)*1000;
                            wynik+=trzyOb(false)*1000;
                            wynik+=blokWygUklad(false)*1000;
                            wybrane[wspX[h]][wspY[h]]="P";
                        if(wynikAkt>wynik){
                            wynik=wynikAkt;
                            wspNaj=h;
                        }
                        if(wynikAkt==wynik){
                            if(Math.floor(Math.random()*2)==1){
                                wspNaj=h;
                            }
                        }
                    }
                        wybrane[wspX[wspNaj]][wspY[wspNaj]]="O";
                                        kolejneRuchyX.push(wspX[wspNaj]);
                                        kolejneRuchyY.push(wspY[wspNaj]);
                        var nazwa="pole["+wspX[wspNaj]+"]["+wspY[wspNaj]+"]";
                        document.getElementById(nazwa).innerHTML="O"; document.getElementById(nazwa).style.backgroundColor="coral";
                        return true;
            }
            if(ileUkladow>1 && !ruch){
                if(ileUkladow==2) ruchIle++;
                else ruchIle+=10;
            }
        }
    }
    if(!ruch) return ruchIle;
    return false;
}
var pokaz=false;
function alfaBeta(deep, alfa, beta, znakGracza){
    if( czyWyg("O")){
     return 1000000;
    }
   // if(deep!=kopanie && znakGracza=="O" && (piatka(false) || czteryWyg(false) || ustWygUklad(false))) return 1000000;info=1;
   // if(znakGracza=="X" && (czteryOb(false)>0 /*|| blokWygUklad(false)>0*/)) return -1000000;
    if(czyWyg("X")) return -1000000;
    if(deep==kopanie-1) console.log("kopie");
    if(deep==0){
        var wynik=0;
        wynik+=piatka(false)*100000;
        wynik+=czteryWyg(false)*100000;
        wynik+=ustWygUklad(false)*100000;
        wynik+=czteryOb(false)*(-1000);
        wynik+=trzyOb(false)*(-1000);
        wynik+=blokWygUklad(false)*(-1000);
        wynik+=cztery(false)*(1000);
        wynik+=trzyWyg(false)*1000;
        wynik+=trzy(false)*100;
        wynik+=dwaNaj(false)*10;
        wynik+=dwaOk(false)*1;
        
        return wynik;
    }
    
    var m;
    var wspX=15;
    var wspY=15;
    
    for(var x=0; x<15; x++){info=2;
        for(var y=0; y<15; y++){info=3;
                                if(deep==kopanie){
                                    if(x==5 && y==5 ) pokaz=true;
                                    else pokaz=false;
                                }
            if(wybrane[x][y]!="P") continue;
            var czyJest=false;info=4;
            for(var i=-1; i<=1; i++){info=5;
                for(var j=-1; j<=1; j++){info=6;
                    for(var k=1; k<3; k++){info=7;
                        if(czyJest) break;
                        if(x+i*k>=0 && x+i*k<15 && y+j*k>=0 && x+j*k<15 && ( wybrane[x+i*k][y+j*k]=="X" || wybrane[x+i*k][y+j*k]=="O")) czyJest=true;
                    }
                    if(czyJest) break;
                }
                if(czyJest) break;
            }
            if(!czyJest) continue;
            info=8;
            wybrane[x][y]=znakGracza;
            if(znakGracza=="O") m=alfaBeta(deep-1, alfa, beta, "X");
            else m=alfaBeta(deep-1, alfa, beta, "O");
            wybrane[x][y]="P";
                               if(pokaz && deep==kopanie-1) console.log("alfa "+m+" x="+x+" y="+y);
            if(deep==kopanie){info=9;
               // console.log("alfa "+m+" x="+x+" y="+y);
                if(m>alfa){
                    wspX=x;
                    wspY=y;
                } 
                if(m==alfa){info=10;
                    if(Math.floor(Math.random()*2)==1){
                        wspX=x;
                        wspY=y;
                    }
                } 
            }info=11;
            if(znakGracza=="O" && m>alfa) alfa=m;
            if(znakGracza=="X" && m<beta) beta=m;
           if(alfa>=beta && deep<kopanie){
                if(znakGracza=="X") return alfa;
                else return beta;
            }
        }
    }
    if(deep==kopanie){info=12+wspX*1000;
        if(wspX!=15){
            console.log("WYNIK!!!= "+alfa);
            wybrane[wspX][wspY]="O";
            var nazwa="pole["+(wspX)+"]["+(wspY)+"]";
            document.getElementById(nazwa).innerHTML="O"; document.getElementById(nazwa).style.backgroundColor="coral";
            return true;
        }
        else return false;
    }info=13;
    if(znakGracza=="O") return alfa;
    else return beta;
}

function trzyWyg(ruch){
    var ile;
    var koniecPetli;
    var ruchIle=0;
    var wspX = [];
    var wspY = [];
    for(var x=0; x<15; x++){
        for(var y=0; y<15; y++){
            
            if(wybrane[x][y]!="P") continue;
            for(var i=1; i>=0; i--){
                for(var j=1; j>=-1; j--){
                    ile=0;
                    koniecPetli=false;
                    if(x+5*i>=15 || y+5*j>=15 || y+5*j<0) continue;
                    if(i==0 && j==0) break;
                    if(x-i>=0 && y-j>=0 && y-j<15 && wybrane[x-i][y-j]=="O") continue;
                    if(wybrane[x+5*i][y+5*j]!="P") continue;
                    if(x+6*i<15 && y+6*j>=0 && y+6*j<15 && wybrane[x+6*i][y+6*j]=="O") continue;
                     for(var k=1; k<5; k++){
                         switch(wybrane[x+k*i][y+k*j]){
                             case "O":
                                 ile+=10;
                                 break;
                             case "P":
                                 ile+=1;
                                 if(ile%10>2) koniecPetli=true;
                                 break;
                             case "X":
                                 koniecPetli=true;
                                 break;   
                         }
                         if(koniecPetli) break;
                     }
                        if(koniecPetli) continue;
                        if(ile==22 && (wybrane[x+i][y+j]!="O" || wybrane[x+4*i][y+4*j]!="O") && ruch){
                            for(var k=1; k<5; k++){
                                if(wybrane[x+i*k][y+j*k]=="P"){
                                wspX.push((x+i*k));
                                wspY.push((y+j*k));
                            }  
                            }
                        }
                        if(ile==22 && (wybrane[x+i][y+j]!="O" || wybrane[x+4*i][y+4*j]!="O") && !ruch){
                            ruchIle++;
                        }
                }
            }  
            }
    }
    if(!ruch) return ruchIle;
    
    if(wspX.length==0) return false;
    var najWsp;
    var najWynik=-1;
    var wynik;
    for(var i=0; i<wspX.length; i++){
        wynik=0;
        if(wybrane[wspX[i]][wspY[i]]!="P") continue;
        wybrane[wspX[i]][wspY[i]]="O";
                    wynik+=trzyWyg(false)*1000;
                    wynik+=trzy(false)*100;
                    wynik+=dwaNaj(false)*10;
                    wynik+=dwaOk(false);
        wybrane[wspX[i]][wspY[i]]="X";
                     wynik+=czteryOb(false)*1000;
                     wynik+=trzyOb(false)*1000;
                     wynik+=blokWygUklad(false)*1000;
        wybrane[wspX[i]][wspY[i]]="P";
                if(najWynik==wynik){
                    if(Math.floor(Math.random()*2)==1){
                        najWsp=i;
                    }
                }
                if(najWynik<wynik){
                    najWynik=wynik;
                    najWsp=i;
                }
    }
        wybrane[wspX[najWsp]][wspY[najWsp]]="O";
                                        kolejneRuchyX.push(wspX[najWsp]);
                                        kolejneRuchyY.push(wspY[najWsp]);
            var nazwa="pole["+wspX[najWsp]+"]["+wspY[najWsp]+"]";
            document.getElementById(nazwa).innerHTML="O"; document.getElementById(nazwa).style.backgroundColor="coral";
        return true;
}

function trzy(ruch){
    var ile;
    var koniecPetli;
    var ruchIle=0;
    var wspX = [];
    var wspY = [];
    for(var x=0; x<15; x++){
        for(var y=0; y<15; y++){
            
            if(wybrane[x][y]=="X") continue;
            for(var i=1; i>=0; i--){
                for(var j=1; j>=-1; j--){
                    ile=0;
                    koniecPetli=false;
                    if(x+4*i>=15 || y+4*j>=15 || y+4*j<0) continue;
                    if(i==0 && j==0) break;
                    if(x-i>=0 && y-j>=0 && y-j<15 && wybrane[x-i][y-j]=="O") continue;
                    if(x+5*i<15 && y+5*j>=0 && y+5*j<15 && wybrane[x+5*i][y+5*j]=="O") continue;
                     for(var k=0; k<5; k++){
                         switch(wybrane[x+k*i][y+k*j]){
                             case "O":
                                 if(ile>10){
                                     if(wybrane[x+(k-1)*i][y+(k-1)*j]!="O" && wybrane[x+(k-2)*i][y+(k-2)*j]!="O") koniecPetli=true;
                                 }
                                 ile+=10;
                                 break;
                             case "P":
                                 ile+=1;
                                 if(ile%10>3) koniecPetli=true;
                                 break;
                             case "X":
                                 koniecPetli=true;
                                 break;   
                         }
                         if(koniecPetli) break;
                     }
                        if(koniecPetli) continue;
                        if(ile==23 && ruch){
                            for(var k=0; k<5; k++){
                                if(wybrane[x+k*i][y+k*j]=="P" && ((k-1>=0 && wybrane[x+(k-1)*i][y+(k-1)*j]=="O") ||(k+1<5 && wybrane[x+(k+1)*i][y+(k+1)*j]=="O"))){
                                    wspX.push((x+i*k));
                                    wspY.push((y+j*k));
                                }   
                            }
                        }
                        if(ile==23 && !ruch){
                            ruchIle++;
                        }
                }
            }  
            }
    }
    if(!ruch) return ruchIle;
    
    if(wspX.length==0) return false;
    var najWsp;
    var najWynik=-1;
    var wynik;
    for(var i=0; i<wspX.length; i++){
        wynik=0;
        if(wybrane[wspX[i]][wspY[i]]!="P") continue;
        wybrane[wspX[i]][wspY[i]]="O";
                    wynik+=trzyWyg(false)*1000;
                    wynik+=trzy(false)*100;
                    wynik+=dwaNaj(false)*10;
                    wynik+=dwaOk(false);
        wybrane[wspX[i]][wspY[i]]="X";
                     wynik+=czteryOb(false)*1000;
                     wynik+=trzyOb(false)*1000;
                     wynik+=blokWygUklad(false)*1000;
                    wybrane[wspX[i]][wspY[i]]="P";
                if(najWynik==wynik){
                    if(Math.floor(Math.random()*2)==1){
                        najWsp=i;
                    }
                }
                if(najWynik<wynik){
                    najWynik=wynik;
                    najWsp=i;
                }
        console.log(i+" "+wspX[i]+" "+wspY[i]+" "+wynik);
    }
        wybrane[wspX[najWsp]][wspY[najWsp]]="O";
                                        kolejneRuchyX.push(wspX[najWsp]);
                                        kolejneRuchyY.push(wspY[najWsp]);
            var nazwa="pole["+wspX[najWsp]+"]["+wspY[najWsp]+"]";
            document.getElementById(nazwa).innerHTML="O"; document.getElementById(nazwa).style.backgroundColor="coral";
        return true;
}

function blokowanie(ruch, ilePolPrzeciwnikaMin){
     var ile;
    var koniecPetli;
    var min=40;
    var wspX = [];
    var wspY = [];
while(min>=(ilePolPrzeciwnikaMin*10+(4-ilePolPrzeciwnikaMin)) && wspX.length==0){
     for(var x=0; x<15; x++){
        for(var y=0; y<15; y++){
            
            if(wybrane[x][y]=="O") continue;
            for(var i=1; i>=-1; i--){
                for(var j=1; j>=-1; j--){
                    ile=0;
                    koniecPetli=false;
                    if(x+4*i>=15 || x+4*i<0 || y+4*j>=15 || y+4*j<0) continue;
                    //if(i==0 && j==0) break;
                    if(x-i>=0 && x-i<15 && y-j>=0 && y-j<15 && wybrane[x-i][y-j]!="O") continue;
                    if(x+4*i<15 && x+4*i>=0 && y+4*j>=0 && y+4*j<15 && wybrane[x+4*i][y+4*j]!="P") continue;
                    if(x+5*i<15 && x+5*i>=0 && y+5*j>=0 && y+5*j<15 && wybrane[x+5*i][y+5*j]=="X") continue;
                     for(var k=0; k<4; k++){
                         switch(wybrane[x+k*i][y+k*j]){
                             case "X":
                                 ile+=10;
                                 break;
                             case "P":
                                 ile+=1;
                                 break;
                             case "O":
                                 koniecPetli=true;
                                 break;   
                         }
                         if(koniecPetli) break;
                     }
                        if(koniecPetli) continue;
                        if(ile==min && ruch){
                            for(var k=0; k<5; k++){
                                if(wybrane[x+k*i][y+k*j]=="P"){
                                    wspX.push((x+i*k));
                                    wspY.push((y+j*k));
                                }   
                            }
                        }
                        if(ile==min && !ruch){
                            ruchIle++;
                        }
                }
            }  
            }
    }
    min-=9;
}
    if(!ruch) return ruchIle;
    
    if(wspX.length==0) return false;
    var najWsp;
    var najWynik=-1;
    var wynik;
    for(var i=0; i<wspX.length; i++){
        wynik=0;
        if(wybrane[wspX[i]][wspY[i]]!="P") continue;
        wybrane[wspX[i]][wspY[i]]="O";
                    wynik+=trzyWyg(false)*1000;
                    wynik+=trzy(false)*100;
                    wynik+=dwaNaj(false)*10;
                    wynik+=dwaOk(false);
        wybrane[wspX[i]][wspY[i]]="X";
                     wynik+=czteryOb(false)*1000;
                     wynik+=trzyOb(false)*1000;
                     wynik+=blokWygUklad(false)*1000;
                    wybrane[wspX[i]][wspY[i]]="P";
                if(najWynik==wynik){
                    if(Math.floor(Math.random()*2)==1){
                        najWsp=i;
                    }
                }
                if(najWynik<wynik){
                    najWynik=wynik;
                    najWsp=i;
                }
        console.log(i+" "+wspX[i]+" "+wspY[i]+" "+wynik);
    }
        wybrane[wspX[najWsp]][wspY[najWsp]]="O";
                                        kolejneRuchyX.push(wspX[najWsp]);
                                        kolejneRuchyY.push(wspY[najWsp]);
            var nazwa="pole["+wspX[najWsp]+"]["+wspY[najWsp]+"]";
            document.getElementById(nazwa).innerHTML="O"; document.getElementById(nazwa).style.backgroundColor="coral";
        return true;
}

function dwaNaj(ruch){
    var ile;
    var koniecPetli;
    var ruchIle=0;
    var wspX = [];
    var wspY = [];

    for(var x=0; x<15; x++){
        for(var y=0; y<15; y++){
            
            if(wybrane[x][y]!="P") continue;
            for(var i=1; i>=0; i--){
                for(var j=1; j>=-1; j--){
                    ile=0;
                    koniecPetli=false;
                    if(x+5*i>=15 || y+5*j>=15 || y+5*j<0) continue;
                    if(i==0 && j==0) break;
                    if(x-i>=0 && y-j>=0 && y-j<15 && wybrane[x-i][y-j]=="O") continue;
                    if(x+5*i<15 && y+5*j>=0 && y+5*j<15 && wybrane[x+5*i][y+5*j]!="P") continue;
                    if(x+6*i<15 && y+6*j>=0 && y+6*j<15 && wybrane[x+6*i][y+6*j]=="O") continue;
                     for(var k=1; k<5; k++){
                         switch(wybrane[x+k*i][y+k*j]){
                             case "O":
                                 ile+=10;
                                 break;
                             case "P":
                                 ile+=1;
                                 break;
                             case "X":
                                 koniecPetli=true;
                                 break;   
                         }
                         if(koniecPetli) break;
                     }
                        if(koniecPetli) continue;
                        if(ile==13 && ruch){
                            for(var k=1; k<5; k++){
                                if(wybrane[x+k*i][y+k*j]=="P"){
                                    wspX.push((x+i*k));
                                    wspY.push((y+j*k));
                                }   
                            }
                        }
                    if(ile==13 && !ruch){
                        ruchIle+=1;
                    }
                }
            }  
            }
    }
    if(!ruch) return ruchIle;
    
    if(wspX.length==0) return false;
    var najWsp;
    var najWynik=-1;
    var wynik;
    for(var i=0; i<wspX.length; i++){
        wynik=0;
        if(wybrane[wspX[i]][wspY[i]]!="P") continue;
        wybrane[wspX[i]][wspY[i]]="O";
                    wynik+=trzyWyg(false)*1000;
                    wynik+=trzy(false)*100;
                    wynik+=dwaNaj(false)*10;
                    wynik+=dwaOk(false);
        wybrane[wspX[i]][wspY[i]]="X";
                     wynik+=czteryOb(false)*1000;
                     wynik+=trzyOb(false)*1000;
                     wynik+=blokWygUklad(false)*1000;
        wybrane[wspX[i]][wspY[i]]="P";
                if(najWynik==wynik){
                    if(Math.floor(Math.random()*2)==1){
                        najWsp=i;
                    }
                }
                if(najWynik<wynik){
                    najWynik=wynik;
                    najWsp=i;
                }
    }
        wybrane[wspX[najWsp]][wspY[najWsp]]="O";
                                        kolejneRuchyX.push(wspX[najWsp]);
                                        kolejneRuchyY.push(wspY[najWsp]);
            var nazwa="pole["+wspX[najWsp]+"]["+wspY[najWsp]+"]";
            document.getElementById(nazwa).innerHTML="O"; document.getElementById(nazwa).style.backgroundColor="coral";
        return true;
}

function dwaOk(ruch){
    var ile;
    var koniecPetli;
    var ruchIle=0;
    var wspX = [];
    var wspY = [];

    for(var x=0; x<15; x++){
        for(var y=0; y<15; y++){
            
            if(wybrane[x][y]=="X") continue;
            for(var i=1; i>=0; i--){
                for(var j=1; j>=-1; j--){
                    ile=0;
                    koniecPetli=false;
                    if(x+4*i>=15 || y+4*j>=15 || y+4*j<0) continue;
                    if(i==0 && j==0) break;
                    if(x-i>=0 && y-j>=0 && y-j<15 && wybrane[x-i][y-j]=="O") continue;
                    if(x+5*i<15 && y+5*j>=0 && y+5*j<15 && wybrane[x+5*i][y+5*j]=="O") continue;
                     for(var k=0; k<5; k++){
                         switch(wybrane[x+k*i][y+k*j]){
                             case "O":
                                 ile+=10;
                                 break;
                             case "P":
                                 ile+=1;
                                 break;
                             case "X":
                                 koniecPetli=true;
                                 break;   
                         }
                         if(koniecPetli) break;
                     }
                        if(koniecPetli) continue;
                        if(ile==14 && ruch){
                            for(var k=0; k<5; k++){
                                if(wybrane[x+k*i][y+k*j]=="P"){
                                    wspX.push((x+i*k));
                                    wspY.push((y+j*k));
                                }   
                            }
                        }
                    if(ile==14 && !ruch){
                        ruchIle+=1;
                    }
                }
            }  
            }
    }
    if(!ruch) return ruchIle;
    
    if(wspX.length==0) return false;
    var najWsp;
    var najWynik=-1;
    var wynik;
    for(var i=0; i<wspX.length; i++){
        wynik=0;
        if(wybrane[wspX[i]][wspY[i]]!="P") continue;
        wybrane[wspX[i]][wspY[i]]="O";
                    wynik+=trzyWyg(false)*1000;
                    wynik+=trzy(false)*100;
                    wynik+=dwaNaj(false)*10;
                    wynik+=dwaOk(false);
        wybrane[wspX[i]][wspY[i]]="X";
                     wynik+=czteryOb(false)*1000;
                     wynik+=trzyOb(false)*1000;
                     wynik+=blokWygUklad(false)*1000;
        wybrane[wspX[i]][wspY[i]]="P";
                if(najWynik==wynik){
                    if(Math.floor(Math.random()*2)==1){
                        najWsp=i;
                    }
                }
                if(najWynik<wynik){
                    najWynik=wynik;
                    najWsp=i;
                }
    }
        wybrane[wspX[najWsp]][wspY[najWsp]]="O";
                                        kolejneRuchyX.push(wspX[najWsp]);
                                        kolejneRuchyY.push(wspY[najWsp]);
            var nazwa="pole["+wspX[najWsp]+"]["+wspY[najWsp]+"]";
            document.getElementById(nazwa).innerHTML="O"; document.getElementById(nazwa).style.backgroundColor="coral";
        return true;
}

function pierwszyRuch(){
        trudnosc=document.getElementById("poziomTrudnosci").value;
    var ileKol=0;
    for(var i=0; i<15; i++){
        for(var j=0; j<15; j++){
            if(wybrane[i][j]=="O") ileKol++;
        }
    }
    if(ileKol>0) return false;
    var x;
    var y;
     for(var i=0; i<15; i++){
        for(var j=0; j<15; j++){
            if(wybrane[i][j]=="X"){
                
                do{
                        x = i+Math.floor(Math.random()*3-1);
                        y = j+Math.floor(Math.random()*3-1);
                    
                }while(x<1 || x>13 || y<1 || y>13 || (x==i && y==j))
                    wybrane[x][y]="O";
                                        kolejneRuchyX.push(x);
                                        kolejneRuchyY.push(y);
                                    var nazwa="pole["+(x)+"]["+(y)+"]";
                                    document.getElementById(nazwa).innerHTML="O"; document.getElementById(nazwa).style.backgroundColor="coral";
                    return true;
                
            }
        }
     }
        x=Math.floor(Math.random()*7+4);
         y=Math.floor(Math.random()*7+4);
            wybrane[x][y]="O";
                                        kolejneRuchyX.push(x);
                                        kolejneRuchyY.push(y);
            var nazwa="pole["+(x)+"]["+(y)+"]";
            document.getElementById(nazwa).innerHTML="O"; document.getElementById(nazwa).style.backgroundColor="coral";
        return true;
    
}
    
function czyWyg(znak){
    for(var i=1; i>=0; i--){
        for(var j=1; j>=-1; j--){
            if(i==0 && j==0) break;
            
            for(var x=0; x<15; x++){
                for(var y=0; y<15; y++){
                    if(x+i*4>=15 || y+4*j<0 || y+4*j>=15) continue;
                    if(wybrane[x][y]!=znak) continue;
                    if(wybrane[x+i][y+j]!=znak) continue;
                    if(wybrane[x+2*i][y+2*j]!=znak) continue;
                    if(wybrane[x+3*i][y+3*j]!=znak) continue;
                    if(wybrane[x+4*i][y+4*j]!=znak) continue;
                    return true;
                }
            }
        }
    }
    return false;
}

function cofanie(jakiRuch){
   if(jakiRuch>0 && aktPokazRuch==kolejneRuchyX.length-1) return;
    if(jakiRuch<0 && aktPokazRuch==-1) return;
    var nazwa;
    for(var i=0; i<15; i++){
            for(var j=0; j<15; j++){
                nazwa="pole["+i+"]["+j+"]";
                document.getElementById(nazwa).style.backgroundColor="cornflowerblue";
                if(wybrane[i][j]=="W"/* && cofKopia[j][i]!="P"*/) document.getElementById(nazwa).style.backgroundColor="green";
            }
    }
    if(jakiRuch==-2){
        aktPokazRuch=-1;
        for(var i=0; i<15; i++){
            for(var j=0; j<15; j++){
                cofKopia[i][j]="P";
                console.log("-2 "+wybrane[i][j]);
                nazwa="pole["+j+"]["+i+"]";
                document.getElementById(nazwa).innerHTML="";
            }
        }
    }
    if(jakiRuch==-1){
        cofKopia[kolejneRuchyX[aktPokazRuch]][kolejneRuchyY[aktPokazRuch]]="P";
        console.log(aktPokazRuch+" "+kolejneRuchyX[aktPokazRuch]+" "+kolejneRuchyY[aktPokazRuch]);
        nazwa=nazwa="pole["+kolejneRuchyX[aktPokazRuch]+"]["+kolejneRuchyY[aktPokazRuch]+"]";
        document.getElementById(nazwa).innerHTML="";
        if(wybrane[kolejneRuchyX[aktPokazRuch]][kolejneRuchyY[aktPokazRuch]]=="W") document.getElementById(nazwa).style.backgroundColor="green";
         else document.getElementById(nazwa).style.backgroundColor="cornflowerblue";
        aktPokazRuch--;
    }
    if(jakiRuch==1){
        aktPokazRuch++;
        nazwa="pole["+kolejneRuchyX[aktPokazRuch]+"]["+kolejneRuchyY[aktPokazRuch]+"]";
        console.log("1 "+wybrane[kolejneRuchyX[aktPokazRuch]][kolejneRuchyY[aktPokazRuch]]);
        if(wybrane[kolejneRuchyX[aktPokazRuch]][kolejneRuchyY[aktPokazRuch]]=="X"){
            document.getElementById(nazwa).innerHTML="X";
            cofKopia[kolejneRuchyX[aktPokazRuch]][kolejneRuchyY[aktPokazRuch]]="X";
        }
        else{
                if(wybrane[kolejneRuchyX[aktPokazRuch]][kolejneRuchyY[aktPokazRuch]]=="O"){
                    document.getElementById(nazwa).innerHTML="O"; 
                    cofKopia[kolejneRuchyX[aktPokazRuch]][kolejneRuchyY[aktPokazRuch]]="O";
                }
                else {
                    console.log("11(-1) "+wybrane[kolejneRuchyX[aktPokazRuch]-1][kolejneRuchyY[aktPokazRuch]-1]);
                    if(wygrany=="X"){
                         document.getElementById(nazwa).innerHTML="X"; 
                        cofKopia[kolejneRuchyX[aktPokazRuch]][kolejneRuchyY[aktPokazRuch]]="X";
                    }
                    else{
                         document.getElementById(nazwa).innerHTML="O"; 
                        cofKopia[kolejneRuchyX[aktPokazRuch]][kolejneRuchyY[aktPokazRuch]]="O";
                    }
                    document.getElementById(nazwa).style.backgroundColor="green";
                }
            } 
        console.log("11 "+wybrane[kolejneRuchyX[aktPokazRuch]][kolejneRuchyY[aktPokazRuch]]);
    }
    if(jakiRuch==2){
        if(aktPokazRuch==-1) aktPokazRuch=0;
        for(aktPokazRuch; aktPokazRuch<kolejneRuchyX.length; aktPokazRuch++){
           nazwa="pole["+kolejneRuchyX[aktPokazRuch]+"]["+kolejneRuchyY[aktPokazRuch]+"]";
        if(wybrane[kolejneRuchyX[aktPokazRuch]][kolejneRuchyY[aktPokazRuch]]=="X"){
            document.getElementById(nazwa).innerHTML="X";
            cofKopia[kolejneRuchyX[aktPokazRuch]][kolejneRuchyY[aktPokazRuch]]="X";
        }
        else{
                if(wybrane[kolejneRuchyX[aktPokazRuch]][kolejneRuchyY[aktPokazRuch]]=="O"){
                    document.getElementById(nazwa).innerHTML="O"; 
                    cofKopia[kolejneRuchyX[aktPokazRuch]][kolejneRuchyY[aktPokazRuch]]="O";
                }
                else {
                    console.log("11(-1) "+wybrane[kolejneRuchyX[aktPokazRuch]-1][kolejneRuchyY[aktPokazRuch]-1]);
                    if(wygrany=="X"){
                         document.getElementById(nazwa).innerHTML="X"; 
                        cofKopia[kolejneRuchyX[aktPokazRuch]][kolejneRuchyY[aktPokazRuch]]="X";
                    }
                    else{
                         document.getElementById(nazwa).innerHTML="O"; 
                        cofKopia[kolejneRuchyX[aktPokazRuch]][kolejneRuchyY[aktPokazRuch]]="O";
                    }
                    document.getElementById(nazwa).style.backgroundColor="green";
                }
            }
        }
        aktPokazRuch--;
    } 
     document.getElementById("guziczkiKtory").innerHTML=(aktPokazRuch+1)+"/"+kolejneRuchyX.length; 
    cofanieCzteryOb();
    cofanieTrzyOb();
    cofanieCztery();
    cofaniepPiatka();
    cofanieBlokWygUklad();
    cofanieAtakkWygUklad()
}

function cofanieCzteryOb(){
    var ile;
    var koniecPetli;
    var ruchIle=0;
    var wspX = [];
    var wspY = [];
    
    
    for(var x=0; x<15; x++){
        for(var y=0; y<15; y++){
             if(cofKopia[x][y]=="O") continue;
            for(var i=1; i>=0; i--){
                for(var j=1; j>=-1; j--){
                    ile=0;
                    koniecPetli=false;
                    if(x+4*i>=15 || y+4*j>=15 || y+4*j<0) continue;
                    if(i==0 && j==0) break;
                    if(x-i>=0 && y-j>=0 && y-j<15 && cofKopia[x-i][y-j]=="X") continue;
                    if(x+5*i<15 && y+5*j>=0 && y+5*j<15 && cofKopia[x+5*i][y+5*j]=="X") continue;
                     for(var k=0; k<5; k++){
                         switch(cofKopia[x+k*i][y+k*j]){
                             case "X":
                                 ile+=10;
                                 break;
                             case "P":
                                 ile+=1;
                                 if(ile%10>1) koniecPetli=true;
                                 break;
                             case "O":
                                 koniecPetli=true;
                                 break;   
                         }
                         if(koniecPetli) break;
                     }
                        if(koniecPetli) continue;
                        if(ile==41){
                            for(var k=0; k<5; k++){
                                if(cofKopia[x+i*k][y+j*k]=="X"){
                                     var nazwa="pole["+(x+i*k)+"]["+(y+j*k)+"]";
                                    document.getElementById(nazwa).style.backgroundColor="yellow";
                                wspX.push((x+i*k));
                                wspY.push((y+j*k));
                            }  
                            }
                        }
                }
            }  
            }
    } 
    if(wspX.length==0) return false;
        return true;
}

function cofanieTrzyOb(){
    var ile;
    var koniecPetli;
    var ruchIle=0;
    var wspX = [];
    var wspY = [];
    
    for(var x=0; x<15; x++){
        for(var y=0; y<15; y++){
            if(cofKopia[x][y]!="P") continue;
            
            for(var i=1; i>=0; i--){
                for(var j=1; j>=-1; j--){
                    if(i==0 && j==0) break;
                    if(x+5*i>=15 || y+5*j<0 || y+5*j>=15) continue;
                    if(cofKopia[x+5*i][y+5*j]!="P") continue;
                    if(x-i>=0 && y-j>=0 &&y-j<15 && cofKopia[x-i][y-j]=="X") continue;
                    if(x+6*i<15 && y+6*j>=0 &&y+6*j<15 && cofKopia[x+6*i][y+6*j]=="X") continue;
                    ile=0;
                    koniecPetli=false;
                    for(var k=1; k<5; k++){
                        switch(cofKopia[x+i*k][y+j*k]){
                            case "X":
                                ile+=10;
                                break;
                            case "P":
                                ile+=1;
                                if(ile%10>1) koniecPetli=true;
                                break;
                            case "O":
                                koniecPetli=true;
                                break;   
                        }
                        if(koniecPetli) break;
                    }
                    if(koniecPetli) continue;
                    if(ile==31){
                        for(var k=1; k<5; k++){
                            if(cofKopia[x+i*k][y+j*k]=="X"){
                                 var nazwa="pole["+(x+i*k)+"]["+(y+j*k)+"]";
                                    document.getElementById(nazwa).style.backgroundColor="yellow";
                                wspX.push((x+i*k));
                                wspY.push((y+j*k));
                            }
                        }
                    }
                }
            }   
        }
    }
    
    if(wspX.length==0) return false;
        return true;
}

function cofanieCztery(){
    var ile;
    var koniecPetli;
    var ruchIle=0;
    var wspX = [];
    var wspY = [];
/*poziomo*/
    for(var x=0; x<15; x++){
        for(var y=0; y<15; y++){
            
            
                if(cofKopia[x][y]!="P") continue;
            for(var i=1; i>=0; i--){
                for(var j=1; j>=-1; j--){
                    if(i==0 && j==0) break;
                    if(x+5*i>=15 || y+5*j<0 || y+5*j>=15 || cofKopia[x+5*i][y+5*j]!="P") continue;
                    if(x-i>=0 && y-j>=0 && y-j<15 && cofKopia[x-i][y-j]=="O") continue;
                    if(x+6*i<15 && y+6*j>=0 && y+6*j<15 && cofKopia[x+6*i][y+6*j]=="O") continue;
                    ile=0;
                    koniecPetli=false;
                    for(var k=1; k<5; k++){
                        switch(cofKopia[x+i*k][y+j*k]){
                            case "O":
                                ile+=10;
                                break;
                            case "P":
                                ile+=1;
                                if(ile%10>1) koniecPetli=true;
                                break;
                            case "X":
                                koniecPetli=true;
                                break;   
                        }
                        if(koniecPetli) break;
                    }
                    if(koniecPetli) continue;
                    if(ile==31){
                        for(var k=1; k<5; k++){
                            if(cofKopia[x+i*k][y+j*k]=="O"){
                                    var nazwa="pole["+(x+i*k)+"]["+(y+j*k)+"]";
                                    document.getElementById(nazwa).style.backgroundColor="pink";
                                wspX.push((x+i*k));
                                wspY.push((y+j*k));
                            }
                        }
                    }
                }
            }   
        }
    }
    if(wspX.length==0) return false;
        return true;
                        
}

function cofaniepPiatka(){
   var ile;
    var koniecPetli;
    var ruchIle=0;
    var wspX = [];
    var wspY = [];
/*poziomo*/
    for(var x=0; x<15; x++){
        for(var y=0; y<15; y++){
                if(cofKopia[x][y]=="X") continue;
            for(var i=1; i>=0; i--){
                for(var j=1; j>=-1; j--){
                    if(i==0 && j==0) break;
                    if(x+4*i>=15 || y+4*j<0 || y+4*j>=15) continue;
                    if(x-i>=0 && y-j>=0 && y-j<15 && cofKopia[x-i][y-j]=="O") continue;
                    if(x+5*i<15 && y+5*j>=0 && y+5*j<15 && cofKopia[x+5*i][y+5*j]=="O") continue;
                    ile=0;
                    koniecPetli=false;
                    for(var k=0; k<5; k++){
                        switch(cofKopia[x+i*k][y+j*k]){
                            case "O":
                                ile+=10;
                                break;
                            case "P":
                                ile+=1;
                                if(ile%10>1) koniecPetli=true;
                                break;
                            case "X":
                                koniecPetli=true;
                                break;   
                        }
                        if(koniecPetli) break;
                    }
                    if(koniecPetli) continue;
                    if(ile==41){
                        for(var k=0; k<5; k++){
                            if(cofKopia[x+i*k][y+j*k]=="O"){
                                 var nazwa="pole["+(x+i*k)+"]["+(y+j*k)+"]";
                                    document.getElementById(nazwa).style.backgroundColor="pink";
                                wspX.push((x+i*k));
                                wspY.push((y+j*k));
                            }
                        }
                    }
                }
            }   
        }
    }
    if(wspX.length==0) return false;
        return true;
                        
}

function cofanieBlokWygUklad(){
    var ileUkladow;
    var ruchIle=0;
    for(var x=0; x<15; x++){
        for(var y=0; y<15; y++){
            ileUkladow=0;
            if(cofKopia[x][y]!="P") continue;
                    var wspX = [];
                    var wspY = [];
            for(var i=1; i>=0; i--){
                for(var j=1; j>=-1; j--){
                    if(i==0 && j==0) break;
                    
                    // O X_XXP N
                        if(x-i>=0 && x+3*i<15 && y-j>=0 && y-j<15 && y+3*j>=0 && y+3*j<15 && (x-2*i<0 || y-2*j<0 || y-2*j>=15 || cofKopia[x-2*i][y-2*j]=="O") && (x+4*i>=15 || y+4*j<0 || y+4*j>=15 || cofKopia[x+4*i][y+4*j]!="X") && cofKopia[x-i][y-j]=="X" && cofKopia[x+i][y+j]=="X" && cofKopia[x+2*i][y+2*j]=="X" && cofKopia[x+3*i][y+3*j]=="P"){
                            var nazwa
                            for(var h=-1; h<=3; h++){
                                if(cofKopia[x+i*h][y+j*h]=="X"){
                                    wspX.push(x+i*h); wspY.push(y+j*h);
                                    
                                }
                            }
                                                                                ileUkladow++; continue;
                        }
                    // O X_XPX N
                        if(x-i>=0 && x+3*i<15 && y-j>=0 && y-j<15 && y+3*j>=0 && y+3*j<15 && (x-2*i<0 || y-2*j<0 || y-2*j>=15 || cofKopia[x-2*i][y-2*j]=="O") && (x+4*i>=15 || y+4*j<0 || y+4*j>=15 || cofKopia[x+4*i][y+4*j]!="X") && cofKopia[x-i][y-j]=="X" && cofKopia[x+i][y+j]=="X" && cofKopia[x+2*i][y+2*j]=="P" && cofKopia[x+3*i][y+3*j]=="X"){
                            var nazwa
                            for(var h=-1; h<=3; h++){
                                if(cofKopia[x+i*h][y+j*h]=="X"){
                                    wspX.push(x+i*h); wspY.push(y+j*h);
                                    
                                }
                            }
                                                                                ileUkladow++; continue;
                        }
                    // O X_PXX N
                        if(x-i>=0 && x+3*i<15 && y-j>=0 && y-j<15 && y+3*j>=0 && y+3*j<15 && (x-2*i<0 || y-2*j<0 || y-2*j>=15 || cofKopia[x-2*i][y-2*j]=="O") && (x+4*i>=15 || y+4*j<0 || y+4*j>=15 || cofKopia[x+4*i][y+4*j]!="X") && cofKopia[x-i][y-j]=="X" && cofKopia[x+i][y+j]=="P" && cofKopia[x+2*i][y+2*j]=="X" && cofKopia[x+3*i][y+3*j]=="X"){
                            var nazwa
                            for(var h=-1; h<=3; h++){
                                if(cofKopia[x+i*h][y+j*h]=="X"){
                                    wspX.push(x+i*h); wspY.push(y+j*h);
                                    
                                }
                            }
                                                                            ileUkladow++; continue;
                        }
                    
                    // O XX_XP N
                        if(x-2*i>=0 && x+2*i<15 && y-2*j>=0 && y-2*j<15 && y+2*j>=0 && y+2*j<15 && (x-3*i<0 || y-3*j<0 || y-3*j>=15 || cofKopia[x-3*i][y-3*j]=="O") && (x+3*i>=15 || y+3*j<0 || y+3*j>=15 || cofKopia[x+3*i][y+3*j]!="X") && cofKopia[x-2*i][y-2*j]=="X" && cofKopia[x-i][y-j]=="X" && cofKopia[x+i][y+j]=="X" && cofKopia[x+2*i][y+2*j]=="P") {
                            var nazwa
                            for(var h=-2; h<=2; h++){
                                if(cofKopia[x+i*h][y+j*h]=="X"){
                                    wspX.push(x+i*h); wspY.push(y+j*h);
                                    
                                }
                            }
                                                                                ileUkladow++; continue;
                        }
                    // O XX_PX N
                        if(x-2*i>=0 && x+2*i<15 && y-2*j>=0 && y-2*j<15 && y+2*j>=0 && y+2*j<15 && (x-3*i<0 || y-3*j<0 || y-3*j>=15 || cofKopia[x-3*i][y-3*j]=="O") && (x+3*i>=15 || y+3*j<0 || y+3*j>=15 || cofKopia[x+3*i][y+3*j]!="X") && cofKopia[x-2*i][y-2*j]=="X" && cofKopia[x-i][y-j]=="X" && cofKopia[x+i][y+j]=="P" && cofKopia[x+2*i][y+2*j]=="X") {
                            var nazwa
                            for(var h=-2; h<=2; h++){
                                if(cofKopia[x+i*h][y+j*h]=="X"){
                                    wspX.push(x+i*h); wspY.push(y+j*h);
                                    
                                }
                            }
                                                                            ileUkladow++; continue;
                        }
                    // O XP_XX N
                        if(x-2*i>=0 && x+2*i<15 && y-2*j>=0 && y-2*j<15 && y+2*j>=0 && y+2*j<15 && (x-3*i<0 || y-3*j<0 || y-3*j>=15 || cofKopia[x-3*i][y-3*j]=="O") && (x+3*i>=15 || y+3*j<0 || y+3*j>=15 || cofKopia[x+3*i][y+3*j]!="X") && cofKopia[x-2*i][y-2*j]=="X" && cofKopia[x-i][y-j]=="P" && cofKopia[x+i][y+j]=="X" && cofKopia[x+2*i][y+2*j]=="X"){
                            var nazwa
                            for(var h=-2; h<=2; h++){
                                if(cofKopia[x+i*h][y+j*h]=="X"){
                                    wspX.push(x+i*h); wspY.push(y+j*h);
                                    
                                }
                            }
                                                                            ileUkladow++;continue;
                        }
                    
                    // O XXX_P N
                        if(x-3*i>=0 && x+i<15 && y-3*j>=0 && y-3*j<15 && y+j>=0 && y+j<15 && (x-4*i<0 || y-4*j<0 || y-4*j>=15 || cofKopia[x-4*i][y-4*j]=="O") && (x+2*i>=15 || y+2*j<0 || y+2*j>=15 || cofKopia[x+2*i][y+2*j]!="X") && cofKopia[x-3*i][y-3*j]=="X" && cofKopia[x-2*i][y-2*j]=="X" && cofKopia[x-i][y-j]=="X" && cofKopia[x+i][y+j]=="P"){
                            var nazwa
                            for(var h=-3; h<=1; h++){
                                if(cofKopia[x+i*h][y+j*h]=="X"){
                                    wspX.push(x+i*h); wspY.push(y+j*h);
                                    
                                }
                            }
                                                                            ileUkladow++;continue;
                        }
                    // O XXP_X N
                        if(x-3*i>=0 && x+i<15 && y-3*j>=0 && y-3*j<15 && y+j>=0 && y+j<15 && (x-4*i<0 || y-4*j<0 || y-4*j>=15 || cofKopia[x-4*i][y-4*j]=="O") && (x+2*i>=15 || y+2*j<0 || y+2*j>=15 || cofKopia[x+2*i][y+2*j]!="X") && cofKopia[x-3*i][y-3*j]=="X" && cofKopia[x-2*i][y-2*j]=="X" && cofKopia[x-i][y-j]=="P" && cofKopia[x+i][y+j]=="X"){
                            var nazwa
                            for(var h=-3; h<=1; h++){
                                if(cofKopia[x+i*h][y+j*h]=="X"){
                                    wspX.push(x+i*h); wspY.push(y+j*h);
                                    
                                }
                            }
                                                                            ileUkladow++;continue;
                        }
                    // O XPX_X N
                        if(x-3*i>=0 && x+i<15 && y-3*j>=0 && y-3*j<15 && y+j>=0 && y+j<15 && (x-4*i<0 || y-4*j<0 || y-4*j>=15 || cofKopia[x-4*i][y-4*j]=="O") && (x+2*i>=15 || y+2*j<0 || y+2*j>=15 || cofKopia[x+2*i][y+2*j]!="X") && cofKopia[x-3*i][y-3*j]=="X" && cofKopia[x-2*i][y-2*j]=="P" && cofKopia[x-i][y-j]=="X" && cofKopia[x+i][y+j]=="X"){
                            var nazwa
                            for(var h=-3; h<=1; h++){
                                if(cofKopia[x+i*h][y+j*h]=="X"){
                                    wspX.push(x+i*h); wspY.push(y+j*h);
                                    
                                }
                            }
                                                                                ileUkladow++;continue;
                        }
                    
                    // O XXXP_ N
                        if(x-4*i>=0 && y-4*j>=0 && y-4*j<15 && (x-5*i<0 || y-5*j<0 || y-5*j>=15 || cofKopia[x-5*i][y-5*j]=="O") && (x+i>=15 || y+j<0 || y+j>=15 || cofKopia[x+i][y+j]!="X") && cofKopia[x-4*i][y-4*j]=="X" && cofKopia[x-3*i][y-3*j]=="X" && cofKopia[x-2*i][y-2*j]=="X" && cofKopia[x-i][y-j]=="P"){
                            var nazwa
                            for(var h=-4; h<=0; h++){
                                if(cofKopia[x+i*h][y+j*h]=="X"){
                                    wspX.push(x+i*h); wspY.push(y+j*h);
                                    
                                }
                            }
                                                                            ileUkladow++;continue;
                        }
                    // O XXPX_ N
                        if(x-4*i>=0 && y-4*j>=0 && y-4*j<15 && (x-5*i<0 || y-5*j<0 || y-5*j>=15 || cofKopia[x-5*i][y-5*j]=="O") && (x+i>=15 || y+j<0 || y+j>=15 || cofKopia[x+i][y+j]!="X") && cofKopia[x-4*i][y-4*j]=="X" && cofKopia[x-3*i][y-3*j]=="X" && cofKopia[x-2*i][y-2*j]=="P" && cofKopia[x-i][y-j]=="X"){
                            var nazwa
                            for(var h=-4; h<=0; h++){
                                if(cofKopia[x+i*h][y+j*h]=="X"){
                                    wspX.push(x+i*h); wspY.push(y+j*h);
                                    
                                }
                            }
                                                                                ileUkladow++;continue;
                        }
                    // O XPXX_ N
                        if(x-4*i>=0 && y-4*j>=0 && y-4*j<15 && (x-5*i<0 || y-5*j<0 || y-5*j>=15 || cofKopia[x-5*i][y-5*j]=="O") && (x+i>=15 || y+j<0 || y+j>=15 || cofKopia[x+i][y+j]!="X") && cofKopia[x-4*i][y-4*j]=="X" && cofKopia[x-3*i][y-3*j]=="P" && cofKopia[x-2*i][y-2*j]=="X" && cofKopia[x-i][y-j]=="X"){
                            var nazwa
                            for(var h=-4; h<=0; h++){
                                if(cofKopia[x+i*h][y+j*h]=="X"){
                                    wspX.push(x+i*h); wspY.push(y+j*h);
                                    
                                }
                            }
                                                                                ileUkladow++;continue;
                        }
                    
                    
                    // N _PXXX O
                         if(x+4*i<15 && y+4*j>=0 && y+4*j<15 && (x+5*i>=15 || y+5*j<0 || y+5*j>=15 || cofKopia[x+5*i][y+5*j]=="O") && (x-i<0 || y-j<0 || y-j>=15 || cofKopia[x-i][y-j]!="X") && cofKopia[x+4*i][y+4*j]=="X" && cofKopia[x+3*i][y+3*j]=="X" && cofKopia[x+2*i][y+2*j]=="X" && cofKopia[x+i][y+j]=="P"){
                            var nazwa
                            for(var h=0; h<=4; h++){
                                if(cofKopia[x+i*h][y+j*h]=="X"){
                                    wspX.push(x+i*h); wspY.push(y+j*h);
                                    
                                }
                            }
                                                                            ileUkladow++;continue;
                        }
                    // N _XPXX O
                         if(x+4*i<15 && y+4*j>=0 && y+4*j<15 && (x+5*i>=15 || y+5*j<0 || y+5*j>=15 || cofKopia[x+5*i][y+5*j]=="O") && (x-i<0 || y-j<0 || y-j>=15 || cofKopia[x-i][y-j]!="X") && cofKopia[x+4*i][y+4*j]=="X" && cofKopia[x+3*i][y+3*j]=="X" && cofKopia[x+2*i][y+2*j]=="P" && cofKopia[x+i][y+j]=="X") {
                            var nazwa
                            for(var h=0; h<=4; h++){
                                if(cofKopia[x+i*h][y+j*h]=="X"){
                                    wspX.push(x+i*h); wspY.push(y+j*h);
                                    
                                }
                            }
                                                                                ileUkladow++;continue;
                        }
                    // N _XXPX O
                         if(x+4*i<15 && y+4*j>=0 && y+4*j<15 && (x+5*i>=15 || y+5*j<0 || y+5*j>=15 || cofKopia[x+5*i][y+5*j]=="O") && (x-i<0 || y-j<0 || y-j>=15 || cofKopia[x-i][y-j]!="X") && cofKopia[x+4*i][y+4*j]=="X" && cofKopia[x+3*i][y+3*j]=="P" && cofKopia[x+2*i][y+2*j]=="X" && cofKopia[x+i][y+j]=="X") {
                            var nazwa
                            for(var h=0; h<=4; h++){
                                if(cofKopia[x+i*h][y+j*h]=="X"){
                                    wspX.push(x+i*h); wspY.push(y+j*h);
                                    
                                }
                            }
                                                                                ileUkladow++;continue;
                        }
                    
                    //N P_XXX O
                        if(x-i>=0 && x+3*i<15 && y-j>=0 && y-j<15 && y+3*j>=0 && y+3*j<15 && (x+4*i>=15 || y+4*j<0 || y+4*j>=15 || cofKopia[x+4*i][y+4*j]=="O") && (x-2*i<0 || y-2*j<0 || y-2*j>=15 || cofKopia[x-2*i][y-2*j]!="X") && cofKopia[x-i][y-j]=="P" && cofKopia[x+i][y+j]=="X" && cofKopia[x+2*i][y+2*j]=="X" &&  cofKopia[x+3*i][y+3*j]=="X"){
                            var nazwa
                            for(var h=-1; h<=3; h++){
                                if(cofKopia[x+i*h][y+j*h]=="X"){
                                    wspX.push(x+i*h); wspY.push(y+j*h);
                                    
                                }
                            }
                                                                            ileUkladow++;continue;
                        }
                    //N X_PXX O
                        if(x-i>=0 && x+3*i<15 && y-j>=0 && y-j<15 && y+3*j>=0 && y+3*j<15 && (x+4*i>=15 || y+4*j<0 || y+4*j>=15 || cofKopia[x+4*i][y+4*j]=="O") && (x-2*i<0 || y-2*j<0 || y-2*j>=15 || cofKopia[x-2*i][y-2*j]!="X") && cofKopia[x-i][y-j]=="X" && cofKopia[x+i][y+j]=="P" && cofKopia[x+2*i][y+2*j]=="X" &&  cofKopia[x+3*i][y+3*j]=="X"){
                            var nazwa
                            for(var h=-1; h<=3; h++){
                                if(cofKopia[x+i*h][y+j*h]=="X"){
                                    wspX.push(x+i*h); wspY.push(y+j*h);
                                    
                                }
                            }
                                                                            ileUkladow++;continue;
                        }
                    //N X_XPX O
                        if(x-i>=0 && x+3*i<15 && y-j>=0 && y-j<15 && y+3*j>=0 && y+3*j<15 && (x+4*i>=15 || y+4*j<0 || y+4*j>=15 || cofKopia[x+4*i][y+4*j]=="O") && (x-2*i<0 || y-2*j<0 || y-2*j>=15 || cofKopia[x-2*i][y-2*j]!="X") && cofKopia[x-i][y-j]=="X" && cofKopia[x+i][y+j]=="X" && cofKopia[x+2*i][y+2*j]=="P" &&  cofKopia[x+3*i][y+3*j]=="X"){
                            var nazwa
                            for(var h=-1; h<=3; h++){
                                if(cofKopia[x+i*h][y+j*h]=="X"){
                                    wspX.push(x+i*h); wspY.push(y+j*h);
                                    
                                }
                            }
                                                                                ileUkladow++;continue;
                        }
                    
                    // N PX_XX O
                        if(x-2*i>=0 && x+2*i<15 && y-2*j>=0 && y-2*j<15 && y+2*j>=0 && y+2*j<15 && (x+3*i>=15 || y+3*j<0 || y+3*j>=15 || cofKopia[x+3*i][y+3*j]=="O") && (x-3*i<0 || y-3*j<0 || y-3*j>=15 || cofKopia[x-3*i][y-3*j]!="X") && cofKopia[x-2*i][y-2*j]=="P" && cofKopia[x-i][y-j]=="X" && cofKopia[x+i][y+j]=="X" &&  cofKopia[x+2*i][y+2*j]=="X"){
                            var nazwa
                            for(var h=-2; h<=2; h++){
                                if(cofKopia[x+i*h][y+j*h]=="X"){
                                    wspX.push(x+i*h); wspY.push(y+j*h);
                                    
                                }
                            }
                                                                                ileUkladow++;continue;
                        }
                    // N XP_XX O
                        if(x-2*i>=0 && x+2*i<15 && y-2*j>=0 && y-2*j<15 && y+2*j>=0 && y+2*j<15 && (x+3*i>=15 || y+3*j<0 || y+3*j>=15 || cofKopia[x+3*i][y+3*j]=="O") && (x-3*i<0 || y-3*j<0 || y-3*j>=15 || cofKopia[x-3*i][y-3*j]!="X") && cofKopia[x-2*i][y-2*j]=="X" && cofKopia[x-i][y-j]=="P" && cofKopia[x+i][y+j]=="X" &&  cofKopia[x+2*i][y+2*j]=="X"){
                            var nazwa
                            for(var h=-2; h<=2; h++){
                                if(cofKopia[x+i*h][y+j*h]=="X"){
                                    wspX.push(x+i*h); wspY.push(y+j*h);
                                    
                                }
                            }
                                                                            ileUkladow++;continue;
                        }
                    // N XX_PX O
                        if(x-2*i>=0 && x+2*i<15 && y-2*j>=0 && y-2*j<15 && y+2*j>=0 && y+2*j<15 && (x+3*i>=15 || y+3*j<0 || y+3*j>=15 || cofKopia[x+3*i][y+3*j]=="O") && (x-3*i<0 || y-3*j<0 || y-3*j>=15 || cofKopia[x-3*i][y-3*j]!="X") && cofKopia[x-2*i][y-2*j]=="X" && cofKopia[x-i][y-j]=="X" && cofKopia[x+i][y+j]=="P" &&  cofKopia[x+2*i][y+2*j]=="X"){
                            var nazwa
                            for(var h=-2; h<=2; h++){
                                if(cofKopia[x+i*h][y+j*h]=="X"){
                                    wspX.push(x+i*h); wspY.push(y+j*h);
                                    
                                }
                            }
                                                                            ileUkladow++;continue;
                        }
                    
                    // N PXX_X O
                        if(x-3*i>=0 && x+i<15 && y-3*j>=0 && y-3*j<15 && y+j>=0 && y+j<15 && (x+2*i>=15 || y+2*j<0 || y+2*j>=15 || cofKopia[x+2*i][y+2*j]=="O") && (x-4*i<0 || y-4*j<0 || y-4*j>=15 || cofKopia[x-4*i][y-4*j]!="X") && cofKopia[x-3*i][y-3*j]=="P" && cofKopia[x-2*i][y-2*j]=="X" && cofKopia[x-i][y-j]=="X" &&  cofKopia[x+i][y+j]=="X"){
                            var nazwa
                            for(var h=-3; h<=1; h++){
                                if(cofKopia[x+i*h][y+j*h]=="X"){
                                    wspX.push(x+i*h); wspY.push(y+j*h);
                                    
                                }
                            }
                                                                                ileUkladow++;continue;
                        }
                    // N XPX_X O
                        if(x-3*i>=0 && x+i<15 && y-3*j>=0 && y-3*j<15 && y+j>=0 && y+j<15 && (x+2*i>=15 || y+2*j<0 || y+2*j>=15 || cofKopia[x+2*i][y+2*j]=="O") && (x-4*i<0 || y-4*j<0 || y-4*j>=15 || cofKopia[x-4*i][y-4*j]!="X") && cofKopia[x-3*i][y-3*j]=="X" && cofKopia[x-2*i][y-2*j]=="P" && cofKopia[x-i][y-j]=="X" &&  cofKopia[x+i][y+j]=="X"){
                            var nazwa
                            for(var h=-3; h<=1; h++){
                                if(cofKopia[x+i*h][y+j*h]=="X"){
                                    wspX.push(x+i*h); wspY.push(y+j*h);
                                    
                                }
                            }
                                                                                ileUkladow++;continue;
                        }
                    // N XXP_X O
                        if(x-3*i>=0 && x+i<15 && y-3*j>=0 && y-3*j<15 && y+j>=0 && y+j<15 && (x+2*i>=15 || y+2*j<0 || y+2*j>=15 || cofKopia[x+2*i][y+2*j]=="O") && (x-4*i<0 || y-4*j<0 || y-4*j>=15 || cofKopia[x-4*i][y-4*j]!="X") && cofKopia[x-3*i][y-3*j]=="X" && cofKopia[x-2*i][y-2*j]=="X" && cofKopia[x-i][y-j]=="P" &&  cofKopia[x+i][y+j]=="X"){
                            var nazwa
                            for(var h=-3; h<=1; h++){
                                if(cofKopia[x+i*h][y+j*h]=="X"){
                                    wspX.push(x+i*h); wspY.push(y+j*h);
                                    
                                }
                            }
                                                                            ileUkladow++;continue;
                        }
                    
                    
                    
                    // NP _XXP PN
                        if(x-i>=0 && x+4*i<15 && y-j>=0 && y-j<15 && y+4*j>=0 && y+4*j<15 && (x-2*i<0 || y-2*j<0 || y-2*j>=15 || cofKopia[x-2*i][y-2*j]!="X") && (x+5*i>=15 || y+5*j<0 || y+5*j>=15 || cofKopia[x+5*i][y+5*j]!="X") && cofKopia[x-i][y-j]=="P" && cofKopia[x+i][y+j]=="X" && cofKopia[x+2*i][y+2*j]=="X" && cofKopia[x+3*i][y+3*j]=="P" && cofKopia[x+4*i][y+4*j]=="P"){ 
                            var nazwa
                            for(var h=0; h<=3; h++){
                                if(cofKopia[x+i*h][y+j*h]=="X"){
                                    wspX.push(x+i*h); wspY.push(y+j*h);
                                    
                                }
                            }
                                                                                                                                                                                    ileUkladow++;continue;
                        }
                    // NP _XPX PN
                        if(x-i>=0 && x+4*i<15 && y-j>=0 && y-j<15 && y+4*j>=0 && y+4*j<15 && (x-2*i<0 || y-2*j<0 || y-2*j>=15 || cofKopia[x-2*i][y-2*j]!="X") && (x+5*i>=15 || y+5*j<0 || y+5*j>=15 || cofKopia[x+5*i][y+5*j]!="X") && cofKopia[x-i][y-j]=="P" && cofKopia[x+i][y+j]=="X" && cofKopia[x+2*i][y+2*j]=="P" && cofKopia[x+3*i][y+3*j]=="X" && cofKopia[x+4*i][y+4*j]=="P"){ 
                            var nazwa
                            for(var h=0; h<=3; h++){
                                if(cofKopia[x+i*h][y+j*h]=="X"){
                                    wspX.push(x+i*h); wspY.push(y+j*h);
                                    
                                }
                            }
                                                                                                                                                                                    ileUkladow++;continue;
                        }
                    // NP _PXX PN
                        if(x-i>=0 && x+4*i<15 && y-j>=0 && y-j<15 && y+4*j>=0 && y+4*j<15 && (x-2*i<0 || y-2*j<0 || y-2*j>=15 || cofKopia[x-2*i][y-2*j]!="X") && (x+5*i>=15 || y+5*j<0 || y+5*j>=15 || cofKopia[x+5*i][y+5*j]!="X") && cofKopia[x-i][y-j]=="P" && cofKopia[x+i][y+j]=="P" && cofKopia[x+2*i][y+2*j]=="X" && cofKopia[x+3*i][y+3*j]=="X" && cofKopia[x+4*i][y+4*j]=="P"){ 
                            var nazwa
                            for(var h=0; h<=3; h++){
                                if(cofKopia[x+i*h][y+j*h]=="X"){
                                    wspX.push(x+i*h); wspY.push(y+j*h);
                                    
                                }
                            }
                                                                                                                                ileUkladow++;continue;
                        }
                    
                    // NP X_XP PN
                        if(x-2*i>=0 && x+3*i<15 && y-2*j>=0 && y-2*j<15 && y+3*j>=0 && y+3*j<15 && (x-3*i<0 || y-3*j<0 || y-3*j>=15 || cofKopia[x-3*i][y-3*j]!="X") && (x+4*i>=15 || y+4*j<0 || y+4*j>=15 || cofKopia[x+4*i][y+4*j]!="X") && cofKopia[x-2*i][y-2*j]=="P" && cofKopia[x-i][y-j]=="X" && cofKopia[x+i][y+j]=="X" && cofKopia[x+2*i][y+2*j]=="P" && cofKopia[x+3*i][y+3*j]=="P"){ 
                            var nazwa
                            for(var h=-1; h<=2; h++){
                                if(cofKopia[x+i*h][y+j*h]=="X"){
                                    wspX.push(x+i*h); wspY.push(y+j*h);
                                    
                                }
                            }
                                                                                                                                                                                        ileUkladow++;continue;
                        }
                    // NP X_PX PN
                        if(x-2*i>=0 && x+3*i<15 && y-2*j>=0 && y-2*j<15 && y+3*j>=0 && y+3*j<15 && (x-3*i<0 || y-3*j<0 || y-3*j>=15 || cofKopia[x-3*i][y-3*j]!="X") && (x+4*i>=15 || y+4*j<0 || y+4*j>=15 || cofKopia[x+4*i][y+4*j]!="X") && cofKopia[x-2*i][y-2*j]=="P" && cofKopia[x-i][y-j]=="X" && cofKopia[x+i][y+j]=="P" && cofKopia[x+2*i][y+2*j]=="X" && cofKopia[x+3*i][y+3*j]=="P"){ 
                            var nazwa
                            for(var h=-1; h<=2; h++){
                                if(cofKopia[x+i*h][y+j*h]=="X"){
                                    wspX.push(x+i*h); wspY.push(y+j*h);
                                    
                                }
                            }
                                                                                                                ileUkladow++;continue;
                        }
                    // NP P_XX PN
                        if(x-2*i>=0 && x+3*i<15 && y-2*j>=0 && y-2*j<15 && y+3*j>=0 && y+3*j<15 && (x-3*i<0 || y-3*j<0 || y-3*j>=15 || cofKopia[x-3*i][y-3*j]!="X") && (x+4*i>=15 || y+4*j<0 || y+4*j>=15 || cofKopia[x+4*i][y+4*j]!="X") && cofKopia[x-2*i][y-2*j]=="P" && cofKopia[x-i][y-j]=="P" && cofKopia[x+i][y+j]=="X" && cofKopia[x+2*i][y+2*j]=="X" && cofKopia[x+3*i][y+3*j]=="P"){ 
                            var nazwa
                            for(var h=-1; h<=2; h++){
                                if(cofKopia[x+i*h][y+j*h]=="X"){
                                    wspX.push(x+i*h); wspY.push(y+j*h);
                                    
                                }
                            }
                                                                                                                                ileUkladow++;continue;
                        }
                    
                    // NP XX_P PN
                        if(x-3*i>=0 && x+2*i<15 && y-3*j>=0 && y-3*j<15 && y+2*j>=0 && y+2*j<15 && (x-4*i<0 || y-4*j<0 || y-4*j>=15 || cofKopia[x-4*i][y-4*j]!="X") && (x+3*i>=15 || y+3*j<0 || y+3*j>=15 || cofKopia[x+3*i][y+3*j]!="X") && cofKopia[x-3*i][y-3*j]=="P" && cofKopia[x-2*i][y-2*j]=="X" && cofKopia[x-i][y-j]=="X" && cofKopia[x+i][y+j]=="P" && cofKopia[x+2*i][y+2*j]=="P"){ 
                            var nazwa
                            for(var h=-2; h<=1; h++){
                                if(cofKopia[x+i*h][y+j*h]=="X"){
                                    wspX.push(x+i*h); wspY.push(y+j*h);
                                    
                                }
                            }
                                                                                                                                ileUkladow++;continue;
                        }
                    // NP XP_X PN
                        if(x-3*i>=0 && x+2*i<15 && y-3*j>=0 && y-3*j<15 && y+2*j>=0 && y+2*j<15 && (x-4*i<0 || y-4*j<0 || y-4*j>=15 || cofKopia[x-4*i][y-4*j]!="X") && (x+3*i>=15 || y+3*j<0 || y+3*j>=15 || cofKopia[x+3*i][y+3*j]!="X") && cofKopia[x-3*i][y-3*j]=="P" && cofKopia[x-2*i][y-2*j]=="X" && cofKopia[x-i][y-j]=="P" && cofKopia[x+i][y+j]=="X" && cofKopia[x+2*i][y+2*j]=="P"){ 
                            var nazwa
                            for(var h=-2; h<=1; h++){
                                if(cofKopia[x+i*h][y+j*h]=="X"){
                                    wspX.push(x+i*h); wspY.push(y+j*h);
                                    
                                }
                            }
                                                                                                                                                                                    ileUkladow++;continue;
                        }
                    // NP PX_X PN
                        if(x-3*i>=0 && x+2*i<15 && y-3*j>=0 && y-3*j<15 && y+2*j>=0 && y+2*j<15 && (x-4*i<0 || y-4*j<0 || y-4*j>=15 || cofKopia[x-4*i][y-4*j]!="X") && (x+3*i>=15 || y+3*j<0 || y+3*j>=15 || cofKopia[x+3*i][y+3*j]!="X") && cofKopia[x-3*i][y-3*j]=="P" && cofKopia[x-2*i][y-2*j]=="P" && cofKopia[x-i][y-j]=="X" && cofKopia[x+i][y+j]=="X" && cofKopia[x+2*i][y+2*j]=="P"){ 
                            var nazwa
                            for(var h=-2; h<=1; h++){
                                if(cofKopia[x+i*h][y+j*h]=="X"){
                                    wspX.push(x+i*h); wspY.push(y+j*h);
                                    
                                }
                            }
                                                                                                                                                                                        ileUkladow++;continue;
                        }
                    
                    // NP XXP_ PN
                        if(x-4*i>=0 && x+i<15 && y-4*j>=0 && y-4*j<15 && y+j>=0 && y+j<15 && (x-5*i<0 || y-5*j<0 || y-5*j>=15 || cofKopia[x-5*i][y-5*j]!="X") && (x+2*i>=15 || y+2*j<0 || y+2*j>=15 || cofKopia[x+2*i][y+2*j]!="X") && cofKopia[x-4*i][y-4*j]=="P" && cofKopia[x-3*i][y-3*j]=="X" && cofKopia[x-2*i][y-2*j]=="X" && cofKopia[x-i][y-j]=="P" && cofKopia[x+i][y+j]=="P"){ 
                            var nazwa
                            for(var h=-3; h<=0; h++){
                                if(cofKopia[x+i*h][y+j*h]=="X"){
                                    wspX.push(x+i*h); wspY.push(y+j*h);
                                    
                                }
                            }
                                                                                                                                ileUkladow++;continue;
                        }
                    // NP XPX_ PN
                        if(x-4*i>=0 && x+i<15 && y-4*j>=0 && y-4*j<15 && y+j>=0 && y+j<15 && (x-5*i<0 || y-5*j<0 || y-5*j>=15 || cofKopia[x-5*i][y-5*j]!="X") && (x+2*i>=15 || y+2*j<0 || y+2*j>=15 || cofKopia[x+2*i][y+2*j]!="X") && cofKopia[x-4*i][y-4*j]=="P" && cofKopia[x-3*i][y-3*j]=="X" && cofKopia[x-2*i][y-2*j]=="P" && cofKopia[x-i][y-j]=="X" && cofKopia[x+i][y+j]=="P"){ 
                            var nazwa
                            for(var h=-3; h<=0; h++){
                                if(cofKopia[x+i*h][y+j*h]=="X"){
                                    wspX.push(x+i*h); wspY.push(y+j*h);
                                    
                                }
                            }
                                                                                                                                                                                    ileUkladow++;continue;
                        }
                    // NP PXX_ PN
                        if(x-4*i>=0 && x+i<15 && y-4*j>=0 && y-4*j<15 && y+j>=0 && y+j<15 && (x-5*i<0 || y-5*j<0 || y-5*j>=15 || cofKopia[x-5*i][y-5*j]!="X") && (x+2*i>=15 || y+2*j<0 || y+2*j>=15 || cofKopia[x+2*i][y+2*j]!="X") && cofKopia[x-4*i][y-4*j]=="P" && cofKopia[x-3*i][y-3*j]=="P" && cofKopia[x-2*i][y-2*j]=="X" && cofKopia[x-i][y-j]=="X" && cofKopia[x+i][y+j]=="P"){ 
                            var nazwa
                            for(var h=-3; h<=0; h++){
                                if(cofKopia[x+i*h][y+j*h]=="X"){
                                    wspX.push(x+i*h); wspY.push(y+j*h);
                                    
                                }
                            }
                                                                                                                                                                                    ileUkladow++;continue;
                        }
                }
            }
            if(ileUkladow>1){
                var nazwa;
                for(var i=0; i<wspX.length; i++){
                    nazwa="pole["+(wspX[i])+"]["+(wspY[i])+"]";
                    document.getElementById(nazwa).style.backgroundColor="yellow";
                }
            }
        }
    }
    return true;
}

function cofanieAtakkWygUklad(){
    var ileUkladow;
    var ruchIle=0;
    for(var x=0; x<15; x++){
        for(var y=0; y<15; y++){
            ileUkladow=0;
            if(cofKopia[x][y]!="P") continue;
                    var wspX = [];
                    var wspY = [];
            for(var i=1; i>=0; i--){
                for(var j=1; j>=-1; j--){
                    if(i==0 && j==0) break;
                    
                    // O X_XXP N
                        if(x-i>=0 && x+3*i<15 && y-j>=0 && y-j<15 && y+3*j>=0 && y+3*j<15 && (x-2*i<0 || y-2*j<0 || y-2*j>=15 || cofKopia[x-2*i][y-2*j]=="X") && (x+4*i>=15 || y+4*j<0 || y+4*j>=15 || cofKopia[x+4*i][y+4*j]!="O") && cofKopia[x-i][y-j]=="O" && cofKopia[x+i][y+j]=="O" && cofKopia[x+2*i][y+2*j]=="O" && cofKopia[x+3*i][y+3*j]=="P"){
                            var nazwa
                            for(var h=-1; h<=3; h++){
                                if(cofKopia[x+i*h][y+j*h]=="O"){
                                    wspX.push(x+i*h); wspY.push(y+j*h);
                                    
                                }
                            }
                                                                                ileUkladow++; continue;
                        }
                    // O X_XPX N
                        if(x-i>=0 && x+3*i<15 && y-j>=0 && y-j<15 && y+3*j>=0 && y+3*j<15 && (x-2*i<0 || y-2*j<0 || y-2*j>=15 || cofKopia[x-2*i][y-2*j]=="X") && (x+4*i>=15 || y+4*j<0 || y+4*j>=15 || cofKopia[x+4*i][y+4*j]!="O") && cofKopia[x-i][y-j]=="O" && cofKopia[x+i][y+j]=="O" && cofKopia[x+2*i][y+2*j]=="P" && cofKopia[x+3*i][y+3*j]=="O"){
                            var nazwa
                            for(var h=-1; h<=3; h++){
                                if(cofKopia[x+i*h][y+j*h]=="O"){
                                    wspX.push(x+i*h); wspY.push(y+j*h);
                                    
                                }
                            }
                                                                                ileUkladow++; continue;
                        }
                    // O X_PXX N
                        if(x-i>=0 && x+3*i<15 && y-j>=0 && y-j<15 && y+3*j>=0 && y+3*j<15 && (x-2*i<0 || y-2*j<0 || y-2*j>=15 || cofKopia[x-2*i][y-2*j]=="X") && (x+4*i>=15 || y+4*j<0 || y+4*j>=15 || cofKopia[x+4*i][y+4*j]!="O") && cofKopia[x-i][y-j]=="O" && cofKopia[x+i][y+j]=="P" && cofKopia[x+2*i][y+2*j]=="O" && cofKopia[x+3*i][y+3*j]=="O"){
                            var nazwa
                            for(var h=-1; h<=3; h++){
                                if(cofKopia[x+i*h][y+j*h]=="O"){
                                    wspX.push(x+i*h); wspY.push(y+j*h);
                                    
                                }
                            }
                                                                            ileUkladow++; continue;
                        }
                    
                    // O XX_XP N
                        if(x-2*i>=0 && x+2*i<15 && y-2*j>=0 && y-2*j<15 && y+2*j>=0 && y+2*j<15 && (x-3*i<0 || y-3*j<0 || y-3*j>=15 || cofKopia[x-3*i][y-3*j]=="X") && (x+3*i>=15 || y+3*j<0 || y+3*j>=15 || cofKopia[x+3*i][y+3*j]!="O") && cofKopia[x-2*i][y-2*j]=="O" && cofKopia[x-i][y-j]=="O" && cofKopia[x+i][y+j]=="O" && cofKopia[x+2*i][y+2*j]=="P") {
                            var nazwa
                            for(var h=-2; h<=2; h++){
                                if(cofKopia[x+i*h][y+j*h]=="O"){
                                    wspX.push(x+i*h); wspY.push(y+j*h);
                                    
                                }
                            }
                                                                                ileUkladow++; continue;
                        }
                    // O XX_PX N
                        if(x-2*i>=0 && x+2*i<15 && y-2*j>=0 && y-2*j<15 && y+2*j>=0 && y+2*j<15 && (x-3*i<0 || y-3*j<0 || y-3*j>=15 || cofKopia[x-3*i][y-3*j]=="X") && (x+3*i>=15 || y+3*j<0 || y+3*j>=15 || cofKopia[x+3*i][y+3*j]!="O") && cofKopia[x-2*i][y-2*j]=="O" && cofKopia[x-i][y-j]=="O" && cofKopia[x+i][y+j]=="P" && cofKopia[x+2*i][y+2*j]=="O") {
                            var nazwa
                            for(var h=-2; h<=2; h++){
                                if(cofKopia[x+i*h][y+j*h]=="O"){
                                    wspX.push(x+i*h); wspY.push(y+j*h);
                                    
                                }
                            }
                                                                            ileUkladow++; continue;
                        }
                    // O XP_XX N
                        if(x-2*i>=0 && x+2*i<15 && y-2*j>=0 && y-2*j<15 && y+2*j>=0 && y+2*j<15 && (x-3*i<0 || y-3*j<0 || y-3*j>=15 || cofKopia[x-3*i][y-3*j]=="X") && (x+3*i>=15 || y+3*j<0 || y+3*j>=15 || cofKopia[x+3*i][y+3*j]!="O") && cofKopia[x-2*i][y-2*j]=="O" && cofKopia[x-i][y-j]=="P" && cofKopia[x+i][y+j]=="O" && cofKopia[x+2*i][y+2*j]=="O"){
                            var nazwa
                            for(var h=-2; h<=2; h++){
                                if(cofKopia[x+i*h][y+j*h]=="O"){
                                    wspX.push(x+i*h); wspY.push(y+j*h);
                                    
                                }
                            }
                                                                            ileUkladow++;continue;
                        }
                    
                    // O XXX_P N
                        if(x-3*i>=0 && x+i<15 && y-3*j>=0 && y-3*j<15 && y+j>=0 && y+j<15 && (x-4*i<0 || y-4*j<0 || y-4*j>=15 || cofKopia[x-4*i][y-4*j]=="X") && (x+2*i>=15 || y+2*j<0 || y+2*j>=15 || cofKopia[x+2*i][y+2*j]!="O") && cofKopia[x-3*i][y-3*j]=="O" && cofKopia[x-2*i][y-2*j]=="O" && cofKopia[x-i][y-j]=="O" && cofKopia[x+i][y+j]=="P"){
                            var nazwa
                            for(var h=-3; h<=1; h++){
                                if(cofKopia[x+i*h][y+j*h]=="O"){
                                    wspX.push(x+i*h); wspY.push(y+j*h);
                                    
                                }
                            }
                                                                            ileUkladow++;continue;
                        }
                    // O XXP_X N
                        if(x-3*i>=0 && x+i<15 && y-3*j>=0 && y-3*j<15 && y+j>=0 && y+j<15 && (x-4*i<0 || y-4*j<0 || y-4*j>=15 || cofKopia[x-4*i][y-4*j]=="X") && (x+2*i>=15 || y+2*j<0 || y+2*j>=15 || cofKopia[x+2*i][y+2*j]!="O") && cofKopia[x-3*i][y-3*j]=="O" && cofKopia[x-2*i][y-2*j]=="O" && cofKopia[x-i][y-j]=="P" && cofKopia[x+i][y+j]=="O"){
                            var nazwa
                            for(var h=-3; h<=1; h++){
                                if(cofKopia[x+i*h][y+j*h]=="O"){
                                    wspX.push(x+i*h); wspY.push(y+j*h);
                                    
                                }
                            }
                                                                            ileUkladow++;continue;
                        }
                    // O XPX_X N
                        if(x-3*i>=0 && x+i<15 && y-3*j>=0 && y-3*j<15 && y+j>=0 && y+j<15 && (x-4*i<0 || y-4*j<0 || y-4*j>=15 || cofKopia[x-4*i][y-4*j]=="X") && (x+2*i>=15 || y+2*j<0 || y+2*j>=15 || cofKopia[x+2*i][y+2*j]!="O") && cofKopia[x-3*i][y-3*j]=="O" && cofKopia[x-2*i][y-2*j]=="P" && cofKopia[x-i][y-j]=="O" && cofKopia[x+i][y+j]=="O"){
                            var nazwa
                            for(var h=-3; h<=1; h++){
                                if(cofKopia[x+i*h][y+j*h]=="O"){
                                    wspX.push(x+i*h); wspY.push(y+j*h);
                                    
                                }
                            }
                                                                                ileUkladow++;continue;
                        }
                    
                    // O XXXP_ N
                        if(x-4*i>=0 && y-4*j>=0 && y-4*j<15 && (x-5*i<0 || y-5*j<0 || y-5*j>=15 || cofKopia[x-5*i][y-5*j]=="X") && (x+i>=15 || y+j<0 || y+j>=15 || cofKopia[x+i][y+j]!="O") && cofKopia[x-4*i][y-4*j]=="O" && cofKopia[x-3*i][y-3*j]=="O" && cofKopia[x-2*i][y-2*j]=="O" && cofKopia[x-i][y-j]=="P"){
                            var nazwa
                            for(var h=-4; h<=0; h++){
                                if(cofKopia[x+i*h][y+j*h]=="O"){
                                    wspX.push(x+i*h); wspY.push(y+j*h);
                                    
                                }
                            }
                                                                            ileUkladow++;continue;
                        }
                    // O XXPX_ N
                        if(x-4*i>=0 && y-4*j>=0 && y-4*j<15 && (x-5*i<0 || y-5*j<0 || y-5*j>=15 || cofKopia[x-5*i][y-5*j]=="X") && (x+i>=15 || y+j<0 || y+j>=15 || cofKopia[x+i][y+j]!="O") && cofKopia[x-4*i][y-4*j]=="O" && cofKopia[x-3*i][y-3*j]=="O" && cofKopia[x-2*i][y-2*j]=="P" && cofKopia[x-i][y-j]=="O"){
                            var nazwa
                            for(var h=-4; h<=0; h++){
                                if(cofKopia[x+i*h][y+j*h]=="O"){
                                    wspX.push(x+i*h); wspY.push(y+j*h);
                                    
                                }
                            }
                                                                                ileUkladow++;continue;
                        }
                    // O XPXX_ N
                        if(x-4*i>=0 && y-4*j>=0 && y-4*j<15 && (x-5*i<0 || y-5*j<0 || y-5*j>=15 || cofKopia[x-5*i][y-5*j]=="X") && (x+i>=15 || y+j<0 || y+j>=15 || cofKopia[x+i][y+j]!="O") && cofKopia[x-4*i][y-4*j]=="O" && cofKopia[x-3*i][y-3*j]=="P" && cofKopia[x-2*i][y-2*j]=="O" && cofKopia[x-i][y-j]=="O"){
                            var nazwa
                            for(var h=-4; h<=0; h++){
                                if(cofKopia[x+i*h][y+j*h]=="O"){
                                    wspX.push(x+i*h); wspY.push(y+j*h);
                                    
                                }
                            }
                                                                                ileUkladow++;continue;
                        }
                    
                    
                    // N _PXXX O
                         if(x+4*i<15 && y+4*j>=0 && y+4*j<15 && (x+5*i>=15 || y+5*j<0 || y+5*j>=15 || cofKopia[x+5*i][y+5*j]=="X") && (x-i<0 || y-j<0 || y-j>=15 || cofKopia[x-i][y-j]!="O") && cofKopia[x+4*i][y+4*j]=="O" && cofKopia[x+3*i][y+3*j]=="O" && cofKopia[x+2*i][y+2*j]=="O" && cofKopia[x+i][y+j]=="P"){
                            var nazwa
                            for(var h=0; h<=4; h++){
                                if(cofKopia[x+i*h][y+j*h]=="O"){
                                    wspX.push(x+i*h); wspY.push(y+j*h);
                                    
                                }
                            }
                                                                            ileUkladow++;continue;
                        }
                    // N _XPXX O
                         if(x+4*i<15 && y+4*j>=0 && y+4*j<15 && (x+5*i>=15 || y+5*j<0 || y+5*j>=15 || cofKopia[x+5*i][y+5*j]=="X") && (x-i<0 || y-j<0 || y-j>=15 || cofKopia[x-i][y-j]!="O") && cofKopia[x+4*i][y+4*j]=="O" && cofKopia[x+3*i][y+3*j]=="O" && cofKopia[x+2*i][y+2*j]=="P" && cofKopia[x+i][y+j]=="O") {
                            var nazwa
                            for(var h=0; h<=4; h++){
                                if(cofKopia[x+i*h][y+j*h]=="O"){
                                    wspX.push(x+i*h); wspY.push(y+j*h);
                                    
                                }
                            }
                                                                                ileUkladow++;continue;
                        }
                    // N _XXPX O
                         if(x+4*i<15 && y+4*j>=0 && y+4*j<15 && (x+5*i>=15 || y+5*j<0 || y+5*j>=15 || cofKopia[x+5*i][y+5*j]=="X") && (x-i<0 || y-j<0 || y-j>=15 || cofKopia[x-i][y-j]!="O") && cofKopia[x+4*i][y+4*j]=="O" && cofKopia[x+3*i][y+3*j]=="P" && cofKopia[x+2*i][y+2*j]=="O" && cofKopia[x+i][y+j]=="O") {
                            var nazwa
                            for(var h=0; h<=4; h++){
                                if(cofKopia[x+i*h][y+j*h]=="O"){
                                    wspX.push(x+i*h); wspY.push(y+j*h);
                                    
                                }
                            }
                                                                                ileUkladow++;continue;
                        }
                    
                    //N P_XXX O
                        if(x-i>=0 && x+3*i<15 && y-j>=0 && y-j<15 && y+3*j>=0 && y+3*j<15 && (x+4*i>=15 || y+4*j<0 || y+4*j>=15 || cofKopia[x+4*i][y+4*j]=="X") && (x-2*i<0 || y-2*j<0 || y-2*j>=15 || cofKopia[x-2*i][y-2*j]!="O") && cofKopia[x-i][y-j]=="P" && cofKopia[x+i][y+j]=="O" && cofKopia[x+2*i][y+2*j]=="O" &&  cofKopia[x+3*i][y+3*j]=="O"){
                            var nazwa
                            for(var h=-1; h<=3; h++){
                                if(cofKopia[x+i*h][y+j*h]=="O"){
                                    wspX.push(x+i*h); wspY.push(y+j*h);
                                    
                                }
                            }
                                                                            ileUkladow++;continue;
                        }
                    //N X_PXX O
                        if(x-i>=0 && x+3*i<15 && y-j>=0 && y-j<15 && y+3*j>=0 && y+3*j<15 && (x+4*i>=15 || y+4*j<0 || y+4*j>=15 || cofKopia[x+4*i][y+4*j]=="X") && (x-2*i<0 || y-2*j<0 || y-2*j>=15 || cofKopia[x-2*i][y-2*j]!="O") && cofKopia[x-i][y-j]=="O" && cofKopia[x+i][y+j]=="P" && cofKopia[x+2*i][y+2*j]=="O" &&  cofKopia[x+3*i][y+3*j]=="O"){
                            var nazwa
                            for(var h=-1; h<=3; h++){
                                if(cofKopia[x+i*h][y+j*h]=="O"){
                                    wspX.push(x+i*h); wspY.push(y+j*h);
                                    
                                }
                            }
                                                                            ileUkladow++;continue;
                        }
                    //N X_XPX O
                        if(x-i>=0 && x+3*i<15 && y-j>=0 && y-j<15 && y+3*j>=0 && y+3*j<15 && (x+4*i>=15 || y+4*j<0 || y+4*j>=15 || cofKopia[x+4*i][y+4*j]=="X") && (x-2*i<0 || y-2*j<0 || y-2*j>=15 || cofKopia[x-2*i][y-2*j]!="O") && cofKopia[x-i][y-j]=="O" && cofKopia[x+i][y+j]=="O" && cofKopia[x+2*i][y+2*j]=="P" &&  cofKopia[x+3*i][y+3*j]=="O"){
                            var nazwa
                            for(var h=-1; h<=3; h++){
                                if(cofKopia[x+i*h][y+j*h]=="O"){
                                    wspX.push(x+i*h); wspY.push(y+j*h);
                                    
                                }
                            }
                                                                                ileUkladow++;continue;
                        }
                    
                    // N PX_XX O
                        if(x-2*i>=0 && x+2*i<15 && y-2*j>=0 && y-2*j<15 && y+2*j>=0 && y+2*j<15 && (x+3*i>=15 || y+3*j<0 || y+3*j>=15 || cofKopia[x+3*i][y+3*j]=="X") && (x-3*i<0 || y-3*j<0 || y-3*j>=15 || cofKopia[x-3*i][y-3*j]!="O") && cofKopia[x-2*i][y-2*j]=="P" && cofKopia[x-i][y-j]=="O" && cofKopia[x+i][y+j]=="O" &&  cofKopia[x+2*i][y+2*j]=="O"){
                            var nazwa
                            for(var h=-2; h<=2; h++){
                                if(cofKopia[x+i*h][y+j*h]=="O"){
                                    wspX.push(x+i*h); wspY.push(y+j*h);
                                    
                                }
                            }
                                                                                ileUkladow++;continue;
                        }
                    // N XP_XX O
                        if(x-2*i>=0 && x+2*i<15 && y-2*j>=0 && y-2*j<15 && y+2*j>=0 && y+2*j<15 && (x+3*i>=15 || y+3*j<0 || y+3*j>=15 || cofKopia[x+3*i][y+3*j]=="X") && (x-3*i<0 || y-3*j<0 || y-3*j>=15 || cofKopia[x-3*i][y-3*j]!="O") && cofKopia[x-2*i][y-2*j]=="O" && cofKopia[x-i][y-j]=="P" && cofKopia[x+i][y+j]=="O" &&  cofKopia[x+2*i][y+2*j]=="O"){
                            var nazwa
                            for(var h=-2; h<=2; h++){
                                if(cofKopia[x+i*h][y+j*h]=="O"){
                                    wspX.push(x+i*h); wspY.push(y+j*h);
                                    
                                }
                            }
                                                                            ileUkladow++;continue;
                        }
                    // N XX_PX O
                        if(x-2*i>=0 && x+2*i<15 && y-2*j>=0 && y-2*j<15 && y+2*j>=0 && y+2*j<15 && (x+3*i>=15 || y+3*j<0 || y+3*j>=15 || cofKopia[x+3*i][y+3*j]=="X") && (x-3*i<0 || y-3*j<0 || y-3*j>=15 || cofKopia[x-3*i][y-3*j]!="O") && cofKopia[x-2*i][y-2*j]=="O" && cofKopia[x-i][y-j]=="O" && cofKopia[x+i][y+j]=="P" &&  cofKopia[x+2*i][y+2*j]=="O"){
                            var nazwa
                            for(var h=-2; h<=2; h++){
                                if(cofKopia[x+i*h][y+j*h]=="O"){
                                    wspX.push(x+i*h); wspY.push(y+j*h);
                                    
                                }
                            }
                                                                            ileUkladow++;continue;
                        }
                    
                    // N PXX_X O
                        if(x-3*i>=0 && x+i<15 && y-3*j>=0 && y-3*j<15 && y+j>=0 && y+j<15 && (x+2*i>=15 || y+2*j<0 || y+2*j>=15 || cofKopia[x+2*i][y+2*j]=="X") && (x-4*i<0 || y-4*j<0 || y-4*j>=15 || cofKopia[x-4*i][y-4*j]!="O") && cofKopia[x-3*i][y-3*j]=="P" && cofKopia[x-2*i][y-2*j]=="O" && cofKopia[x-i][y-j]=="O" &&  cofKopia[x+i][y+j]=="O"){
                            var nazwa
                            for(var h=-3; h<=1; h++){
                                if(cofKopia[x+i*h][y+j*h]=="O"){
                                    wspX.push(x+i*h); wspY.push(y+j*h);
                                    
                                }
                            }
                                                                                ileUkladow++;continue;
                        }
                    // N XPX_X O
                        if(x-3*i>=0 && x+i<15 && y-3*j>=0 && y-3*j<15 && y+j>=0 && y+j<15 && (x+2*i>=15 || y+2*j<0 || y+2*j>=15 || cofKopia[x+2*i][y+2*j]=="X") && (x-4*i<0 || y-4*j<0 || y-4*j>=15 || cofKopia[x-4*i][y-4*j]!="O") && cofKopia[x-3*i][y-3*j]=="O" && cofKopia[x-2*i][y-2*j]=="P" && cofKopia[x-i][y-j]=="O" &&  cofKopia[x+i][y+j]=="O"){
                            var nazwa
                            for(var h=-3; h<=1; h++){
                                if(cofKopia[x+i*h][y+j*h]=="O"){
                                    wspX.push(x+i*h); wspY.push(y+j*h);
                                    
                                }
                            }
                                                                                ileUkladow++;continue;
                        }
                    // N XXP_X O
                        if(x-3*i>=0 && x+i<15 && y-3*j>=0 && y-3*j<15 && y+j>=0 && y+j<15 && (x+2*i>=15 || y+2*j<0 || y+2*j>=15 || cofKopia[x+2*i][y+2*j]=="X") && (x-4*i<0 || y-4*j<0 || y-4*j>=15 || cofKopia[x-4*i][y-4*j]!="O") && cofKopia[x-3*i][y-3*j]=="O" && cofKopia[x-2*i][y-2*j]=="O" && cofKopia[x-i][y-j]=="P" &&  cofKopia[x+i][y+j]=="O"){
                            var nazwa
                            for(var h=-3; h<=1; h++){
                                if(cofKopia[x+i*h][y+j*h]=="O"){
                                    wspX.push(x+i*h); wspY.push(y+j*h);
                                    
                                }
                            }
                                                                            ileUkladow++;continue;
                        }
                    
                    
                    
                    // NP _XXP PN
                        if(x-i>=0 && x+4*i<15 && y-j>=0 && y-j<15 && y+4*j>=0 && y+4*j<15 && (x-2*i<0 || y-2*j<0 || y-2*j>=15 || cofKopia[x-2*i][y-2*j]!="O") && (x+5*i>=15 || y+5*j<0 || y+5*j>=15 || cofKopia[x+5*i][y+5*j]!="O") && cofKopia[x-i][y-j]=="P" && cofKopia[x+i][y+j]=="O" && cofKopia[x+2*i][y+2*j]=="O" && cofKopia[x+3*i][y+3*j]=="P" && cofKopia[x+4*i][y+4*j]=="P"){ 
                            var nazwa
                            for(var h=0; h<=3; h++){
                                if(cofKopia[x+i*h][y+j*h]=="O"){
                                    wspX.push(x+i*h); wspY.push(y+j*h);
                                    
                                }
                            }
                                                                                                                                                                                    ileUkladow++;continue;
                        }
                    // NP _XPX PN
                        if(x-i>=0 && x+4*i<15 && y-j>=0 && y-j<15 && y+4*j>=0 && y+4*j<15 && (x-2*i<0 || y-2*j<0 || y-2*j>=15 || cofKopia[x-2*i][y-2*j]!="O") && (x+5*i>=15 || y+5*j<0 || y+5*j>=15 || cofKopia[x+5*i][y+5*j]!="O") && cofKopia[x-i][y-j]=="P" && cofKopia[x+i][y+j]=="O" && cofKopia[x+2*i][y+2*j]=="P" && cofKopia[x+3*i][y+3*j]=="O" && cofKopia[x+4*i][y+4*j]=="P"){ 
                            var nazwa
                            for(var h=0; h<=3; h++){
                                if(cofKopia[x+i*h][y+j*h]=="O"){
                                    wspX.push(x+i*h); wspY.push(y+j*h);
                                    
                                }
                            }
                                                                                                                                                                                    ileUkladow++;continue;
                        }
                    // NP _PXX PN
                        if(x-i>=0 && x+4*i<15 && y-j>=0 && y-j<15 && y+4*j>=0 && y+4*j<15 && (x-2*i<0 || y-2*j<0 || y-2*j>=15 || cofKopia[x-2*i][y-2*j]!="O") && (x+5*i>=15 || y+5*j<0 || y+5*j>=15 || cofKopia[x+5*i][y+5*j]!="O") && cofKopia[x-i][y-j]=="P" && cofKopia[x+i][y+j]=="P" && cofKopia[x+2*i][y+2*j]=="O" && cofKopia[x+3*i][y+3*j]=="O" && cofKopia[x+4*i][y+4*j]=="P"){ 
                            var nazwa
                            for(var h=0; h<=3; h++){
                                if(cofKopia[x+i*h][y+j*h]=="O"){
                                    wspX.push(x+i*h); wspY.push(y+j*h);
                                    
                                }
                            }
                                                                                                                                ileUkladow++;continue;
                        }
                    
                    // NP X_XP PN
                        if(x-2*i>=0 && x+3*i<15 && y-2*j>=0 && y-2*j<15 && y+3*j>=0 && y+3*j<15 && (x-3*i<0 || y-3*j<0 || y-3*j>=15 || cofKopia[x-3*i][y-3*j]!="O") && (x+4*i>=15 || y+4*j<0 || y+4*j>=15 || cofKopia[x+4*i][y+4*j]!="O") && cofKopia[x-2*i][y-2*j]=="P" && cofKopia[x-i][y-j]=="O" && cofKopia[x+i][y+j]=="O" && cofKopia[x+2*i][y+2*j]=="P" && cofKopia[x+3*i][y+3*j]=="P"){ 
                            var nazwa
                            for(var h=-1; h<=2; h++){
                                if(cofKopia[x+i*h][y+j*h]=="O"){
                                    wspX.push(x+i*h); wspY.push(y+j*h);
                                    
                                }
                            }
                                                                                                                                                                                        ileUkladow++;continue;
                        }
                    // NP X_PX PN
                        if(x-2*i>=0 && x+3*i<15 && y-2*j>=0 && y-2*j<15 && y+3*j>=0 && y+3*j<15 && (x-3*i<0 || y-3*j<0 || y-3*j>=15 || cofKopia[x-3*i][y-3*j]!="O") && (x+4*i>=15 || y+4*j<0 || y+4*j>=15 || cofKopia[x+4*i][y+4*j]!="O") && cofKopia[x-2*i][y-2*j]=="P" && cofKopia[x-i][y-j]=="O" && cofKopia[x+i][y+j]=="P" && cofKopia[x+2*i][y+2*j]=="O" && cofKopia[x+3*i][y+3*j]=="P"){ 
                            var nazwa
                            for(var h=-1; h<=2; h++){
                                if(cofKopia[x+i*h][y+j*h]=="O"){
                                    wspX.push(x+i*h); wspY.push(y+j*h);
                                    
                                }
                            }
                                                                                                                ileUkladow++;continue;
                        }
                    // NP P_XX PN
                        if(x-2*i>=0 && x+3*i<15 && y-2*j>=0 && y-2*j<15 && y+3*j>=0 && y+3*j<15 && (x-3*i<0 || y-3*j<0 || y-3*j>=15 || cofKopia[x-3*i][y-3*j]!="O") && (x+4*i>=15 || y+4*j<0 || y+4*j>=15 || cofKopia[x+4*i][y+4*j]!="O") && cofKopia[x-2*i][y-2*j]=="P" && cofKopia[x-i][y-j]=="P" && cofKopia[x+i][y+j]=="O" && cofKopia[x+2*i][y+2*j]=="O" && cofKopia[x+3*i][y+3*j]=="P"){ 
                            var nazwa
                            for(var h=-1; h<=2; h++){
                                if(cofKopia[x+i*h][y+j*h]=="O"){
                                    wspX.push(x+i*h); wspY.push(y+j*h);
                                    
                                }
                            }
                                                                                                                                ileUkladow++;continue;
                        }
                    
                    // NP XX_P PN
                        if(x-3*i>=0 && x+2*i<15 && y-3*j>=0 && y-3*j<15 && y+2*j>=0 && y+2*j<15 && (x-4*i<0 || y-4*j<0 || y-4*j>=15 || cofKopia[x-4*i][y-4*j]!="O") && (x+3*i>=15 || y+3*j<0 || y+3*j>=15 || cofKopia[x+3*i][y+3*j]!="O") && cofKopia[x-3*i][y-3*j]=="P" && cofKopia[x-2*i][y-2*j]=="O" && cofKopia[x-i][y-j]=="O" && cofKopia[x+i][y+j]=="P" && cofKopia[x+2*i][y+2*j]=="P"){ 
                            var nazwa
                            for(var h=-2; h<=1; h++){
                                if(cofKopia[x+i*h][y+j*h]=="O"){
                                    wspX.push(x+i*h); wspY.push(y+j*h);
                                    
                                }
                            }
                                                                                                                                ileUkladow++;continue;
                        }
                    // NP XP_X PN
                        if(x-3*i>=0 && x+2*i<15 && y-3*j>=0 && y-3*j<15 && y+2*j>=0 && y+2*j<15 && (x-4*i<0 || y-4*j<0 || y-4*j>=15 || cofKopia[x-4*i][y-4*j]!="O") && (x+3*i>=15 || y+3*j<0 || y+3*j>=15 || cofKopia[x+3*i][y+3*j]!="O") && cofKopia[x-3*i][y-3*j]=="P" && cofKopia[x-2*i][y-2*j]=="O" && cofKopia[x-i][y-j]=="P" && cofKopia[x+i][y+j]=="O" && cofKopia[x+2*i][y+2*j]=="P"){ 
                            var nazwa
                            for(var h=-2; h<=1; h++){
                                if(cofKopia[x+i*h][y+j*h]=="O"){
                                    wspX.push(x+i*h); wspY.push(y+j*h);
                                    
                                }
                            }
                                                                                                                                                                                    ileUkladow++;continue;
                        }
                    // NP PX_X PN
                        if(x-3*i>=0 && x+2*i<15 && y-3*j>=0 && y-3*j<15 && y+2*j>=0 && y+2*j<15 && (x-4*i<0 || y-4*j<0 || y-4*j>=15 || cofKopia[x-4*i][y-4*j]!="O") && (x+3*i>=15 || y+3*j<0 || y+3*j>=15 || cofKopia[x+3*i][y+3*j]!="O") && cofKopia[x-3*i][y-3*j]=="P" && cofKopia[x-2*i][y-2*j]=="P" && cofKopia[x-i][y-j]=="O" && cofKopia[x+i][y+j]=="O" && cofKopia[x+2*i][y+2*j]=="P"){ 
                            var nazwa
                            for(var h=-2; h<=1; h++){
                                if(cofKopia[x+i*h][y+j*h]=="O"){
                                    wspX.push(x+i*h); wspY.push(y+j*h);
                                    
                                }
                            }
                                                                                                                                                                                        ileUkladow++;continue;
                        }
                    
                    // NP XXP_ PN
                        if(x-4*i>=0 && x+i<15 && y-4*j>=0 && y-4*j<15 && y+j>=0 && y+j<15 && (x-5*i<0 || y-5*j<0 || y-5*j>=15 || cofKopia[x-5*i][y-5*j]!="O") && (x+2*i>=15 || y+2*j<0 || y+2*j>=15 || cofKopia[x+2*i][y+2*j]!="O") && cofKopia[x-4*i][y-4*j]=="P" && cofKopia[x-3*i][y-3*j]=="O" && cofKopia[x-2*i][y-2*j]=="O" && cofKopia[x-i][y-j]=="P" && cofKopia[x+i][y+j]=="P"){ 
                            var nazwa
                            for(var h=-3; h<=0; h++){
                                if(cofKopia[x+i*h][y+j*h]=="O"){
                                    wspX.push(x+i*h); wspY.push(y+j*h);
                                    
                                }
                            }
                                                                                                                                ileUkladow++;continue;
                        }
                    // NP XPX_ PN
                        if(x-4*i>=0 && x+i<15 && y-4*j>=0 && y-4*j<15 && y+j>=0 && y+j<15 && (x-5*i<0 || y-5*j<0 || y-5*j>=15 || cofKopia[x-5*i][y-5*j]!="O") && (x+2*i>=15 || y+2*j<0 || y+2*j>=15 || cofKopia[x+2*i][y+2*j]!="O") && cofKopia[x-4*i][y-4*j]=="P" && cofKopia[x-3*i][y-3*j]=="O" && cofKopia[x-2*i][y-2*j]=="P" && cofKopia[x-i][y-j]=="O" && cofKopia[x+i][y+j]=="P"){ 
                            var nazwa
                            for(var h=-3; h<=0; h++){
                                if(cofKopia[x+i*h][y+j*h]=="O"){
                                    wspX.push(x+i*h); wspY.push(y+j*h);
                                    
                                }
                            }
                                                                                                                                                                                    ileUkladow++;continue;
                        }
                    // NP PXX_ PN
                        if(x-4*i>=0 && x+i<15 && y-4*j>=0 && y-4*j<15 && y+j>=0 && y+j<15 && (x-5*i<0 || y-5*j<0 || y-5*j>=15 || cofKopia[x-5*i][y-5*j]!="O") && (x+2*i>=15 || y+2*j<0 || y+2*j>=15 || cofKopia[x+2*i][y+2*j]!="O") && cofKopia[x-4*i][y-4*j]=="P" && cofKopia[x-3*i][y-3*j]=="P" && cofKopia[x-2*i][y-2*j]=="O" && cofKopia[x-i][y-j]=="O" && cofKopia[x+i][y+j]=="P"){ 
                            var nazwa
                            for(var h=-3; h<=0; h++){
                                if(cofKopia[x+i*h][y+j*h]=="O"){
                                    wspX.push(x+i*h); wspY.push(y+j*h);
                                    
                                }
                            }
                                                                                                                                                                                    ileUkladow++;continue;
                        }
                }
            }
            if(ileUkladow>1){
                var nazwa;
                for(var i=0; i<wspX.length; i++){
                    nazwa="pole["+(wspX[i])+"]["+(wspY[i])+"]";
                    document.getElementById(nazwa).style.backgroundColor="pink";
                }
            }
        }
    }
    return true;
}

