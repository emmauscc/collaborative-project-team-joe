$(document).ready(function(){
    let row;
    let column;

    class square{
        constructor(number, piece) {
          this.column = number;
          this.piece = piece;
        }
    }      
    
    class piece{
        constructor(playerNo, type, number) {
          this.playerNo = playerNo;
          this.type = type;
          this.number = number;
        }       
    }

    let row1=[null];
    let row2=[null];
    let row3=[null]; 
    let row4=[null];
    let row5=[null];
    let row6=[null];
    let row7=[null];
    let row8=[null];
    
    let board = [null, row1, row2, row3, row4, row5, row6, row7, row8];

    let p1Pawns = [];
    let p2Pawns = [];
    let p1Pieces = [null, new piece(1, "Rook", 1), new piece(1, "Knight", 1), new piece(1, "Bishop", 1), new piece(1, "Queen", 1), new piece(1, "King", 1), new piece(1, "Bishop", 2), new piece(1, "Knight", 2), new piece(1, "Rook", 2)];
    let p2Pieces = [null, new piece(2, "Rook", 1), new piece(2, "Knight", 1), new piece(2, "Bishop", 1), new piece(2, "Queen", 1), new piece(2, "King", 1), new piece(2, "Bishop", 2), new piece(2, "Knight", 2), new piece(2, "Rook", 2)];

    for (var i=1; i<9; i++){

        p1Pawns[i] = new piece(1, "Pawn", i);
        p2Pawns[i] = new piece(2, "Pawn", i);

    } 

    function buildDataBoard(){

        for(var i=1; i<9; i++){
            row = board[i];
            piece=null;
            for(var j=1; j<9; j++){
                row.push(new square(j, piece));
            }
        }

    }

    function buildDisplayBoard(){

        for(var i=1; i<9; i++){
            for(var j=1; j<9; j++){
                if((i%2==0) == (j%2==1)){
                    $('.board').append("<div id='"+i+j+"' class='squareBrown'></div>")
                }else{
                    $('.board').append("<div id='"+i+j+"' class='squareWhite'></div>");
                }
            }
        }

    }

    function origPieces(){

        for(var i=1; i<5; i++){
            for (var j=1; j<9; j++){
                if (i==1){
                    board[i][j]['piece'] = p1Pieces[j];
                } else if (i==2){
                    board[i][j]['piece'] = p1Pawns[j];   
                } else if (i==3) {
                    board[i+4][j]['piece'] = p2Pawns[j];
                } else if (i==4) {
                    board[i+4][j]['piece'] = p2Pieces[j];
                }
            }
        }

    }

    function displayPieces(){

        for(var i=1; i<9; i++){
            for (var j=1; j<9; j++){
                if (board[i][j]['piece'] != null){
                    $('#'+i+j).append("<div class='piece"+board[i][j]['piece']['playerNo']+"'>"+board[i][j]['piece']['type']+"</div>");
                }
            }
        }

    }

    buildDataBoard();
    buildDisplayBoard();
    origPieces();
    displayPieces();

    //initialiseBoard()
    console.log(board);

    
    $('.squareBrown, .squareWhite').click(function piece(){
        let id = $(this).attr('id');
        row = id.charAt(0);
        column = id.charAt(1);
        let movingPiece = board[row][column]['piece']['type'];
        console.log("row: "+row+"; column: "+column+" piece: "+movingPiece);

        if(movingPiece == 'Rook'){
            until(up);
            until(down);
            until(left);
            unti(right);
        }else if(movingPiece == 'Knight'){
            up2Left();
            up2Right();
            down2Left();
            down2Right();
            left2Up();
            left2Down();
            right2Up();
            right2Down();
        }else if(movingPiece == 'Bishop'){
            until(upRight); 
            until(upLeft);
            until(downRight);
            until(downLeft);
        }else if(movingPiece == 'King'){
            up();
            down();
            left();
            right();
        }else if(movingPiece == 'Queen'){
            until(up); 
            until(down); 
            until(left); 
            until(right);
            until(upLeft); 
            until(upRight); 
            until(downLeft); 
            until(downRight);
        }else if(movingPiece == 'Pawn'){
            up();
            // make an if statement for if the piece is in their original position they can move twice. 
        }

    });
    
    
    function until(move) {
        occupied = false;
        while(occupied == false){
            move();  // not sure if this will work but we'll see when i can test it :)
        }
    }

    function up(){                  // note to self, update these so they check if the edge of the board is there 
        occupied = false;
        if(board[row][column]['piece']['playerNo'] == 1){
            row = row+1;
        }else if(board[row][column][colour] = 1){
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