$(document).ready(function(){
    let row;
    let column;

    class square{
        constructor(number, piece, colour) {
          this.column = number;
          this.piece = piece;
          this.colour = colour;
  
        }
    }       
    let row1=[]; let row2=[]; let row3=[]; let row4=[]; let row5=[]; let row6=[]; let row7=[]; let row8=[];
    
    let board = [row1, row2, row3, row4, row5, row6, row7, row8];
    //let whitePieceIDs = ['wRook1', 'wKnight1', 'wBishop1', 'wKing', 'wQueen', 'wBishop2', 'wKnight2', 'wRook2', 'wPawn1', 'wPawn2', 'wPawn3', 'wPawn4', 'wPawn5', 'wPawn6', 'wPawn7', 'wPawn8'];
    //let blackPiecIDs = ['bRook1', 'bKnight1', 'bBishop1', 'bKing', 'bQueen', 'bBishop2', 'bKnight2', 'bRook2', 'bPawn1', 'bPawn2', 'bPawn3', 'bPawn4', 'bPawn5', 'bPawn6', 'bPawn7', 'bPawn8'];

    for(i=0; i<board.length; i++){
        row = board[i];
        piece=null;
        for(j=0; j<8; j++){
            if((i%2==0) == (j%2==1)){
                colour = "brown";
                $('.board').append("<div id='"+(i+1)+(j+1)+"' class='squareBrown'></div>");
                console.log('IT WORKED!!!');
            }else{
                colour = "white";
                $('.board').append("<div id='"+(i+1)+(j+1)+"' class='squareWhite'></div>");
                console.log('IT WORKED!!!');
            }
            row.push(new square(j, piece, colour));
        }
    }

    $('#11').append("<div class='pieceBrown'> PIECE</div>");

    console.log(board);

    $('.squareBrown, .squareWhite').click(function piece(){
        let id = $(this).attr('id');
        row = id.charAt(0);
        column = id.charAt(1);
        //let piece = board[row][column][piece];
        console.log("row: "+row+"; column: "+column);
    });

    let pieces = [rook, knight, bishop, king, queen, pawn];
    let rook = [until(up()), until(down()), until(left()), unti(right())];
    let knight = [up2Left(), up2Right(), down2Left(), down2Right(), left2Up(), left2Down(), right2Up(), right2Down()];
    let bishop = [until(upRight()), until(upLeft()), until(downRight), until(downLeft())];
    let king = [up(), down(), left(), right()];
    let queen = [until(up()), until(down()), until(left()), until(right()), until(upLeft()), until(upRight()), until(downLeft()), until(downRight())];
    let pawn = [up()];

    function until(move) {
        occupied = false;
        while(occupied == false){
            move();  // not sure if this will work but we'll see when i can test it :)
        }
    }

    function up(){                  // note to self, update these so they check if the edge of the board is there 
        occupied = false;
        if(board[row][column][colour] = "white"){
            row = row+1;
        }else if(board[row][column][colour] = "brown"){
            row = row-1;
        }
        if(board[row][column][piece] != null){
            $('#'+row+column+'').css("background-color", "yellow");
        }else{}; 
    }
   
    function down(){
        occupied = false;
        if(board[row][column][colour] = "white"){
            row = row-1;
        }else if(board[row][column][colour] = "brown"){
            row = row+1;
        }
        if(board[row][column][piece] != null){
            $('#'+row+column+'').css("background-color", "yellow");
        }else{}; 
    }

    function left(){
        occupied = false;
        if(board[row][column][colour] = "white"){
            column = column-1;
        }else if(board[row][column][colour] = "brown"){
            column = column+1;
        }
        if(board[row][column][piece] != null){
            $('#'+row+column+'').css("background-color", "yellow");
        }else{}; 
    }

    function right(){
        occupied = false;
        if(board[row][column][colour] = "white"){
            column = column+1;
        }else if(board[row][column][colour] = "brown"){
            column = column-1;
        }
        if(board[row][column][piece] != null){
            $('#'+row+column+'').css("background-color", "yellow");
        }else{}; 
    }

    function upLeft(){
        occupied = false;
        if(board[row][column][colour] = "white"){
            row = row+1;
            column = column-1;
        }else if(board[row][column][colour] = "brown"){
            row = row-1;
            column = column+1;
        }
        if(board[row][column][piece] != null){
            $('#'+row+column+'').css("background-color", "yellow");
        }else{}; 
    }

    function downLeft(){
        occupied = false;
        if(board[row][column][colour] = "white"){
            row = row-1;
            column = column-1;
        }else if(board[row][column][colour] = "brown"){
            row = row+1;
            column = column+1;
        }
        if(board[row][column][piece] != null){
            $('#'+row+column+'').css("background-color", "yellow");
        }else{}; 
    }

    function upRight(){
        occupied = false;
        if(board[row][column][colour] = "white"){
            row = row+1;
            column = column+1;
        }else if(board[row][column][colour] = "brown"){
            row = row-1;
            column = column-1;
        }
        if(board[row][column][piece] != null){
            $('#'+row+column+'').css("background-color", "yellow");
        }else{}; 
    }

    function downRight(){
        occupied = false;
        if(board[row][column][colour] = "white"){
            row = row-1;
            column = column+1;
        }else if(board[row][column][colour] = "brown"){
            row = row+1;
            column = column-1;
        }
        if(board[row][column][piece] != null){
            $('#'+row+column+'').css("background-color", "yellow");
        }else{}; 
    }

    function up2Left(){
        occupied = false;
        if(board[row][column][colour] = "white"){
            row = row+2;
            column = column-1;
        }else if(board[row][column][colour] = "brown"){
            row = row-2;
            column = column+1;
        }
        if(board[row][column][piece] != null){
            $('#'+row+column+'').css("background-color", "yellow");
        }else{}; 
    }

    function down2Left(){
        occupied = false;
        if(board[row][column][colour] = "white"){
            row = row-2;
            column = column-1;
        }else if(board[row][column][colour] = "brown"){
            row = row+2;
            column = column+1;
        }
        if(board[row][column][piece] != null){
            $('#'+row+column+'').css("background-color", "yellow");
        }else{}; 
    }

    function up2Right(){
        occupied = false;
        if(board[row][column][colour] = "white"){
            row = row+2;
            column = column+1;
        }else if(board[row][column][colour] = "brown"){
            row = row-2;
            column = column-1;
        }
        if(board[row][column][piece] != null){
            $('#'+row+column+'').css("background-color", "yellow");
        }else{}; 
    }

    function down2Right(){
        occupied = false;
        if(board[row][column][colour] = "white"){
            row = row-2;
            column = column+1;
        }else if(board[row][column][colour] = "brown"){
            row = row+2;
            column = column-1;
        }
        if(board[row][column][piece] != null){
            $('#'+row+column+'').css("background-color", "yellow");
        }else{}; 
    }

    function left2Up(){
        occupied = false;
        if(board[row][column][colour] = "white"){
            row = row+1;
            column = column-2;
        }else if(board[row][column][colour] = "brown"){
            row = row-1;
            column = column+2;
        }
        if(board[row][column][piece] != null){
            $('#'+row+column+'').css("background-color", "yellow");
        }else{}; 
    }

    function left2Down(){
        occupied = false;
        if(board[row][column][colour] = "white"){
            row = row-1;
            column = column-2;
        }else if(board[row][column][colour] = "brown"){
            row = row+1;
            column = column+2;
        }
        if(board[row][column][piece] != null){
            $('#'+row+column+'').css("background-color", "yellow");
        }else{}; 
    }

    function right2Up(){
        occupied = false;
        if(board[row][column][colour] = "white"){
            row = row+1;
            column = column+2;
        }else if(board[row][column][colour] = "brown"){
            row = row-1;
            column = column-2;
        }
        if(board[row][column][piece] != null){
            $('#'+row+column+'').css("background-color", "yellow");
        }else{}; 
    }

    function right2Down(){
        occupied = false;
        if(board[row][column][colour] = "white"){
            row = row-1;
            column = column+2;
        }else if(board[row][column][colour] = "brown"){
            row = row+1;
            column = column-2;
        }
        if(board[row][column][piece] != null){
            $('#'+row+column+'').css("background-color", "yellow");
        }else{}; 
    }
    
});