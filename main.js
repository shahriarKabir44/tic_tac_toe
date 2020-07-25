var grid = [[0, 0, 0], [0, 0, 0], [0, 0, 0]]
var priority = [[1, 1, 1], [1, 1, 1], [1, 1, 1]]
var a = 0;
var b = -1;


function res(x,y){
    if(x=='r'){
        return grid[y][0]+grid[y][1]+grid[y][2];
    }
    else if(x=='c'){
        return grid[0][y]+grid[1][y]+grid[2][y];
    }
    else if(x=='d' && y==1){
        return grid[0][0]+grid[1][1]+grid[2][2];
    }
    else if(x=='d' && y==2){
        return grid[2][0]+grid[1][1]+grid[0][2];
    }
}

function find(x,y){
    if(x==0 && y==0){
        return 1;
    }
    else if(x==0 && y==1){
        return 2;
    }
    else if(x==0 && y==2){
        return 3;
    }
    else if(x==1 && y==0){
        return 4;
    }
    else if(x==1 && y==1){
        return 5;
    }
    else if(x==1 && y==2){
        return 6;
    }
    else if(x==2 && y==0){
        return 7;
    }
    else if(x==2 && y==1){
        return 8;
    }
    else if(x==2 && y==2){
        return 9;
    }
}


function prioritizer(){
    var n,k,a=0,b=0,c=0,d=0,sm=0;

    for(n=0;n<3;n++){
        for(k=0;k<3;k++){
            if(grid[n][k]!=0){
                priority[n][k]=0;
            }
            else{
                sm = 0;
                a = b = c = d = 0;
                if(n==k){
                    sm=grid[0][0]+grid[1][1]+grid[2][2];
                    if(sm==10){
                        sm=3;
                    }
                    else if(sm==2){
                        sm=2;
                    }
                    else{
                        sm=1;
                    }
                    a=sm;
                    sm=0;
                }
                else if(n+k==2){
                    sm=grid[0][2]+grid[1][1]+grid[2][0];
                    if(sm==10){
                        sm=3;
                    }
                    else if(sm==2){
                        sm=2;
                    }
                    else{
                        sm=1;
                    }
                    b=sm;
                    sm=0;
                }
                sm = grid[0][k]+grid[1][k]+grid[2][k];
                if(sm==10){
                    sm=3;
                }
                else if(sm==2){
                    sm=2;
                }
                else{
                    sm=1;
                }
                c=sm;
                sm=0;
    
                sm=grid[n][0]+grid[n][1]+grid[n][2]
                if(sm==10){
                    sm=3;
                }
                else if(sm==2){
                    sm=2;
                }
                else{
                    sm=1;
                }
                d=sm;
                sm=0;
                priority[n][k]=Math.max(a,b,c,d);
            }
            }
            
    }
}


function printprior(){
    var n,k;
}

function printgrid(){
    var n,k;
}



function compinp(){
    var j=Math.max(Math.max.apply(null,priority[0]),Math.max.apply(null,priority[1]),Math.max.apply(null,priority[2]));
    console.log(j);
    var c=0;
    var n,k;
    for(n=0;n<3;n++){
        for(k=0;k<3;k++){
            if(priority[n][k]==j){
                c++;
            }
        }
    }
    var u=Math.ceil(Math.random()*c);
    c=0;
    for(n=0;n<3;n++){
        for(k=0;k<3;k++){
            if(priority[n][k]==j){
                c++;
            }
            if(c==u){
                grid[n][k]=5;
                document.getElementById(find(n,k)).innerHTML="O";
                return ;
            }
        }
    }
}


function result(){
    if(res('r',0)==3 || res('r',1)==3 || res('r',2)==3  ){
        return 1;
    }
    else if(res('c',0)==3 || res('c',1)==3 || res('c',2)==3 ){
        return 1;
    }
    else if(res('d',1)==3 || res('d',2)==3){
        return 1;
    }
    else if(res('r',0)==15 || res('r',1)==15 || res('r',2)==15 ){
        return 2;
    }
    else if(res('c',0)==15 || res('c',1)==15 || res('c',2)==15 ){
        return 2;
    }
    else if(res('d',1)==15 || res('d',2)==15){
        return 2;
    }
    else {return 0;}
}


function f(x,y){
    var v;
    v=find(x,y);
    document.getElementById(v).innerHTML='X';
    a=x;
    b=y;
    grid[a][b]=1;
    if(result()==1){
        window.alert("player won!");
        window.location.reload(false);
        return;
    }
    else if(result()==2){
        window.alert("CPU wins!");
        window.location.reload(false);
        return;
    }
    prioritizer();
    printprior();
    compinp();
    if(result()==1){
        window.alert("player won!");
        window.location.reload(false);
        return;
    }
    else if(result()==2){
        window.alert("CPU wins!");
        window.location.reload(false);
        return;
    }

}
