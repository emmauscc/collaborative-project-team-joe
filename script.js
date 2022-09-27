$(document).ready(function(){

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
    let whitePieces = ['wRook1', 'wKnight1', 'wBishop1', 'wKing', 'wQueen', 'wBishop2', 'wKnight2', 'wRook2', 'wPawn1', 'wPawn2', 'wPawn3', 'wPawn4', 'wPawn5', 'wPawn6', 'wPawn7', 'wPawn8'];
    let blackPieces = ['bRook1', 'bKnight1', 'bBishop1', 'bKing', 'bQueen', 'bBishop2', 'bKnight2', 'bRook2', 'bPawn1', 'bPawn2', 'bPawn3', 'bPawn4', 'bPawn5', 'bPawn6', 'bPawn7', 'bPawn8'];

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
    //initialiseBoard()

});