//$(document).ready(function(){

    class square{
        constructor(number, piece, colour) {
          this.column = number;
          this.piece = piece;
          this.colour = colour;
  
        }
    }       
    let row1=[];
    let row2=[];
    let row3=[];
    let row4=[];
    let row5=[];
    let row6=[];
    let row7=[];
    let row8=[];
    
    let board = [row1, row2, row3, row4, row5, row6, row7, row8];


    for(i=0; i<board.length; i++){
        row = board[i];
        piece=null;
        for(j=0; j<8; j++){
            if((i%2==0) == (j%2==1)){
                colour = "black";
            }else{
                colour = "white";
            }
            row.push(new square(j, piece, colour));
        }
    }

    console.log(board);

//});