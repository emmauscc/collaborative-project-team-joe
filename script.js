$(document).ready(function(){
    let row = 1;
    let column = 1;
    let movingToColumn = 1;
    let movingToRow = 1;
    //let colour = 'squareBrown';
    let movingPiece = '';
    let first = true
    let playerMoving;
    let occupiedBy;
    let id;
    let occupied = false;
    let player1Grave = [];
    let player2Grave = [];
    let pieceTakenType = '';
    let turn = 0;
    var timerId;
    let timeLeft = 30;

    let r;
    let c;

    function countdown(player){

        timerId = setTimeout(function(){ countdown(player) }, 1000);
    
        if (timeLeft == -1) {

            if (player == 1){
                endP1();
            } else if(player == 2){
                endP2();
            } 

        } else {
            $('#t'+player).html("");
            $('#t'+player).html(timeLeft + ' sec');
            timeLeft--;
        }
        
    }
    
    function check(){

        var checkTimer = setTimeout(function(){ check() }, 50);

        console.log("Turn "+turn);

        if (r == 8 && c == 8) {

            clearTimeout(checkTimer);
            console.log("finished");
            
        } else {
            input = r.toString()+c.toString();
            console.log(input);
            pieceF(null, input);

            if (c == 8){
                r = r+1;
                c = 1;
            } else {
                c = c+1;
            }

        }

        
    }

    function initButtons(){
        $('#end1').prop('disabled', true);
        $('#end1').css('background-color', '#53687E');
        $('#end1').css('color', '#53687E');
        $('#start2').prop('disabled', true);
        $('#start2').css('background-color', '#53687E');
        $('#start2').css('color', '#53687E');
        $('#end2').prop('disabled', true);
        $('#end2').css('background-color', '#53687E');
        $('#end2').css('color', '#53687E');
    }

    function endP1() {
        clearTimeout(timerId);
        $('#t1').html("");
        timeLeft = 30;
        //$('#end1').prop('disabled', true);
        //$('#end1').css('background-color', '#53687E');
        //$('#end1').css('color', '#53687E');
        turn = 2;
        //$('#end2').prop('disabled', false);
        //$('#end2').css('background-color', '#6B4E71');
        //$('#end2').css('color', '#C2B2B4');
        countdown(2);
    }

    function endP2() {
        clearTimeout(timerId);
        $('#t2').html("");
        timeLeft = 30;
        //$('#end2').prop('disabled', true);
        //$('#end2').css('background-color', '#53687E');
        //$('#end2').css('color', '#53687E');
        turn = 1;
        //$('#end1').prop('disabled', false);
        //$('#end1').css('background-color', '#C2B2B4');
        //$('#end1').css('color', '#6B4E71');
        countdown(1);
        
    }

    initButtons();

    $("#start1").click(function(){
       
        //r = 1;
        //c = 1;
        //check();
        $('#start1').prop('disabled', true);
        $('#start1').css('background-color', '#53687E');
        $('#start1').css('color', '#53687E');
        turn = 1;
        //$('#end1').prop('disabled', false);
        //$('#end1').css('background-color', '#C2B2B4');
        //$('#end1').css('color', '#6B4E71');
        countdown(1);

    });

    /*
    $("#end1").click(function(){
        endP1();
    });

    $("#end2").click(function(){
        endP2();
    });
    */



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

        console.log(board);

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

        $('.squareBrown, .squareWhite').click(function(){
            console.log(this);
            id = $(this).attr('id');
            console.log(id);
            pieceF(this, id);
        });

    }

    function pieceF(ELEMENT, ID){

        console.log("Running piece F with element "+ELEMENT+" and id "+ID);
            
        if(first != true){
            $('.board').html("<div class='smallBanner'></div>");
            $('#GY1').html("<div id='p1' class='subtitle'>Graveyard</div>");
            $('#GY2').html("<div id='p2' class='subtitle'>Graveyard</div>");

            buildDisplayBoard();
            displayPieces();

            if (ELEMENT != null){

                if($(ELEMENT).css('background-color')=='yellow'){
                    movingToRow = parseFloat(ID.charAt(0));
                    movingToColumn = parseFloat(ID.charAt(1));
                    movePiece();
                }

            }

        }

        id = ID;
        console.log(id);
        row = parseFloat(id.charAt(0));
        storedRow = parseFloat(id.charAt(0));
        column = parseFloat(id.charAt(1));
        storedColumn = parseFloat(id.charAt(1));
        if(board[row][column]['piece'] != null){
            movingPiece = board[row][column]['piece']['type'];
            playerMoving = board[row][column]['piece']['playerNo'];
            pieceNumber = board[row][column]['piece']['number'];
        }else{
            movingPiece = null;
        }
        console.log("row: "+row+"; column: "+column+" piece: "+movingPiece);

        if (playerMoving == turn){

            if($(ELEMENT).css('background-color')!='yellow'){
                showAvailableMoves();
            }

        } 

        if (turn == 0){
            showAvailableMoves();
        }
        
        first = false;

        function movePiece() {
            class piece{
                constructor(playerNo, type, number) {
                  this.playerNo = playerNo;
                  this.type = type;
                  this.number = number;
                }       
            }
            console.log(" previous row: "+storedRow+" previous column: "+storedColumn);
            console.log("Piece type: "+movingPiece+" Piece number: "+pieceNumber+" Player Moving: "+playerMoving);
            console.log("moving to this row: "+movingToRow+" and moving to this column: "+movingToColumn);
            board[storedRow][storedColumn]['piece'] = null;
            let pieceTaken = board[movingToRow][movingToColumn]['piece'];
            if(pieceTaken == null){
                board[movingToRow][movingToColumn]['piece'] = [];
            }else{
                pieceTakenType = board[movingToRow][movingToColumn]['piece']['type'];
                if(playerMoving==1){
                    player2Grave.push(pieceTakenType);
                }else if(playerMoving == 2){
                    player1Grave.push(pieceTakenType);
                }
                console.log(player1Grave);
                console.log(player2Grave);
            }
            board[movingToRow][movingToColumn]['piece'] = new piece(playerMoving, movingPiece, pieceNumber);
            console.log(board);
            $('.board').html("<div class='smallBanner'></div>");
            $('#GY1').html("<div id='p1' class='subtitle'>Graveyard</div>");
            $('#GY2').html("<div id='p2' class='subtitle'>Graveyard</div>");
            $('.board').html("<div class='smallBanner'></div>");
    
            buildDisplayBoard();
            displayPieces();
            
            if (playerMoving == 1){
                endP1();
            } else if (playerMoving == 2){
                endP2();
            } else {
                console.log("ERROR!!!")
            }
    
            if(pieceTakenType == 'King'){
                alert("Player "+playerMoving+" has WON!");
                location.reload();
            }else if(pieceTakenType == null){}
        
        };

    };

    

    function showAvailableMoves() {
        console.log("Showing moves for "+movingPiece);
        console.log(movingPiece);
        if(movingPiece == 'Rook'){    
            until(up);row = parseFloat(id.charAt(0));column = parseFloat(id.charAt(1));
            until(down);row = parseFloat(id.charAt(0));column = parseFloat(id.charAt(1));
            until(left);row = parseFloat(id.charAt(0));column = parseFloat(id.charAt(1));
            until(right);row = parseFloat(id.charAt(0));column = parseFloat(id.charAt(1));
        }else if(movingPiece == 'Knight'){
            up2Left();row = parseFloat(id.charAt(0));column = parseFloat(id.charAt(1));
            up2Right();row = parseFloat(id.charAt(0));column = parseFloat(id.charAt(1));
            down2Left();row = parseFloat(id.charAt(0));column = parseFloat(id.charAt(1));
            down2Right();row = parseFloat(id.charAt(0));column = parseFloat(id.charAt(1));
            left2Up();row = parseFloat(id.charAt(0));column = parseFloat(id.charAt(1));
            left2Down();row = parseFloat(id.charAt(0));column = parseFloat(id.charAt(1));
            right2Up();row = parseFloat(id.charAt(0));column = parseFloat(id.charAt(1));
            right2Down();row = parseFloat(id.charAt(0));column = parseFloat(id.charAt(1));
        }else if(movingPiece == 'Bishop'){
            until(upRight); row = parseFloat(id.charAt(0));column = parseFloat(id.charAt(1));
            until(upLeft);row = parseFloat(id.charAt(0));column = parseFloat(id.charAt(1));
            until(downRight);row = parseFloat(id.charAt(0));column = parseFloat(id.charAt(1));
            until(downRight);row = parseFloat(id.charAt(0));column = parseFloat(id.charAt(1));
        }else if(movingPiece == 'King'){
            up();row = parseFloat(id.charAt(0));column = parseFloat(id.charAt(1));
            down();row = parseFloat(id.charAt(0));column = parseFloat(id.charAt(1));
            left();row = parseFloat(id.charAt(0));column = parseFloat(id.charAt(1));
            right();row = parseFloat(id.charAt(0));column = parseFloat(id.charAt(1));
        }else if(movingPiece == 'Queen'){
            until(up); row = parseFloat(id.charAt(0));column = parseFloat(id.charAt(1));
            until(down); row = parseFloat(id.charAt(0));column = parseFloat(id.charAt(1));
            until(left); row = parseFloat(id.charAt(0));column = parseFloat(id.charAt(1));
            until(right);row = parseFloat(id.charAt(0));column = parseFloat(id.charAt(1));
            until(upLeft); row = parseFloat(id.charAt(0));column = parseFloat(id.charAt(1));
            until(upRight); row = parseFloat(id.charAt(0));column = parseFloat(id.charAt(1));
            until(downLeft); row = parseFloat(id.charAt(0));column = parseFloat(id.charAt(1));
            until(downRight);row = parseFloat(id.charAt(0));column = parseFloat(id.charAt(1));
        }else if(movingPiece == 'Pawn'){
            up();
            if((playerMoving==1 && row==6) || (playerMoving==2 && row==3)){
                up();
            }
            row = parseFloat(id.charAt(0));column = parseFloat(id.charAt(1));
            checkForTake();
            // make an if statement for if the piece is in their original position they can move twice. 
        }
    }

    function origPieces(){

        for(var i=1; i<5; i++){
            for (var j=1; j<9; j++){
                if (i==1){
                    board[i][j]['piece'] = p2Pieces[j];
                } else if (i==2){
                    board[i][j]['piece'] = p2Pawns[j];   
                } else if (i==3) {
                    board[7][j]['piece'] = p1Pawns[j];
                } else if (i==4) {
                    board[i+4][j]['piece'] = p1Pieces[j];
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

        for(var j=0; j<player1Grave.length; j++){
            $('#GY1').append("<div class='squareGrave'>"+player1Grave[j]+"</div>");
        }
        for(var g=0; g<player2Grave.length; g++){
            $('#GY2').append("<div class='squareGrave'>"+player2Grave[g]+"</div>");
        }

    }

    buildDataBoard();
    buildDisplayBoard();
    origPieces();
    displayPieces();

    //initialiseBoard()
    console.log(board);

    //bishop running until - moves diagonally until the square is occupied and can't move any further
    function until(move) {
        //move is a function being passed through until function
        console.log(move);
        occupied = false;
        
        //var fnstring = move;
        //var fn = window[fnstring];

        //console.log(fn);
        if (typeof fn === "function")fn();
        
        while(occupied == false){
            move();
            //runs move 3 times, then up function is no longer being run?
        }
    }

    function up(){ //currently running 3 times before it doesn't run anymore but the whole ting turns into an infinite loop
        
        if(playerMoving == 2){
            row = row+1;
        }else if(playerMoving == 1){
            row = row-1;
        }

        if(row>=1 && row<=8){
            if(board[row][column]['piece'] != null){
                occupiedBy = board[row][column]['piece']['playerNo'];
            }else{
                occupiedBy = 'empty';
            }
            
            if(occupiedBy == playerMoving){ //occupied by own piece
                occupied = true;
            }else if(occupiedBy == 'empty'){ //no piece on the empty grid
                $('#'+row+column+'').css("background-color", "yellow");
                occupied = false; 
                
            }else{      //occupied by opposite piece ?
                
                occupied = true;
                $('#'+row+column+'').css("background-color", "yellow");
                //occupied = true;
            }

        }else{

            occupied = true; //out of bounds

        };

    }

    function down(){ //this is being run as an INFINITE LOOP

        if(playerMoving == 2){
            row = row-1;
        }else if(playerMoving == 1){
            row = row+1;
        }
        
        if(row>=1 && row<=8){
            if(board[row][column]['piece'] != null){
                occupiedBy = board[row][column]['piece']['playerNo'];
            }else{
                occupiedBy = 'empty';
            }
            
            if(occupiedBy == playerMoving){ //occupied by own piece
                occupied = true;
            }else if(occupiedBy == 'empty'){ //no piece on the empty grid
                $('#'+row+column+'').css("background-color", "yellow");
                occupied = false; 
                
            }else{      //occupied by opposite piece ?
                
                occupied = true;
                $('#'+row+column+'').css("background-color", "yellow");
                //occupied = true;
            }

        }else{

            occupied = true; //out of bounds
        };
 
    }

    function left(){

        if(playerMoving== 2){
            column = column-1;
        }else if(playerMoving == 1){
            column = column+1;
        }
        if(1<=column && column<=8){
            if(board[row][column]['piece'] != null){
                occupiedBy = board[row][column]['piece']['playerNo'];
            }else{
                occupiedBy = 'empty';
            }

            if(occupiedBy == playerMoving){
                occupied = true;
            }else if(occupiedBy == 'empty'){
                $('#'+row+column+'').css("background-color", "yellow");
                occupied = false; 
            }else{
                $('#'+row+column+'').css("background-color", "yellow");
                occupied = true;
            }

        }else{

            occupied = true; //out of bounds
        };
    }

    function right(){

        if(playerMoving == 2){
            column = column+1;
        }else if(playerMoving == 1){
            column = column-1;
        }
        if(1<=column && column<=8){
            if(board[row][column]['piece'] != null){
                occupiedBy = board[row][column]['piece']['playerNo'];
            }else{
                occupiedBy = 'empty';
            }

            if(occupiedBy == playerMoving){
                occupied = true;
            }else if(occupiedBy == 'empty'){
                $('#'+row+column+'').css("background-color", "yellow");
                occupied = false; 
            }else{
                $('#'+row+column+'').css("background-color", "yellow");
                occupied = true;
            }

        }else{

            occupied = true; //out of bounds
        };

    }

    function upLeft(){
        if(playerMoving == 2){
            row = row+1;
            column = column+1;
        }else if(playerMoving == 1){
            row = row-1;
            column = column-1;
        }
        if(column>=1 && column<=8 && row>=1 && row<=8){
            if(board[row][column]['piece'] != null){
                occupiedBy = board[row][column]['piece']['playerNo'];
            }else{
                occupiedBy = 'empty';
            }

            if(occupiedBy == playerMoving){
                occupied = true;
            }else if(occupiedBy == 'empty'){
                $('#'+row+column+'').css("background-color", "yellow");
                occupied = false; 
            }else{
                $('#'+row+column+'').css("background-color", "yellow");
                occupied = true;
            }

        }else{           
            occupied = true;
        };

    }

    function downLeft(){
        if(playerMoving == 2){
            row = row-1;
            column = column+1;
        }else if(playerMoving == 1){
            row = row+1;
            column = column-1;
        }
        if(1<=row && row<=8 && 1<=column && column<=8){
            if(board[row][column]['piece'] != null){
                occupiedBy = board[row][column]['piece']['playerNo'];
            }else{
                occupiedBy = 'empty';
            }

            if(occupiedBy == playerMoving){
                occupied = true;
            }else if(occupiedBy == 'empty'){
                $('#'+row+column+'').css("background-color", "yellow");
                occupied = false; 
            }else{
                $('#'+row+column+'').css("background-color", "yellow");
                occupied = true;
            }

        }else{
            occupied = true;
        };
 
    }

    function upRight(){
        if(playerMoving == 2){
            row = row+1;
            column = column-1;
        }else if(playerMoving == 1){
            row = row-1;
            column = column+1;
        }
        if(1<=row && row<=8 && 1<=column && column<=8){
            if(board[row][column]['piece'] != null){
                occupiedBy = board[row][column]['piece']['playerNo'];
            }else{
                occupiedBy = 'empty';
            }

            if(occupiedBy == playerMoving){
                occupied = true;
            }else if(occupiedBy == 'empty'){
                $('#'+row+column+'').css("background-color", "yellow");
                occupied = false; 
            }else{
                $('#'+row+column+'').css("background-color", "yellow");
                occupied = true;
            }

        }else{
            occupied = true;
        };
    }

    function downRight(){
        if(playerMoving == 2){
            row = row-1;
            column = column-1;
        }else if(playerMoving== 1){
            row = row+1;
            column = column+1;
        }
        if(1<=row && row<=8 && 1<=column && column<=8){
            if(board[row][column]['piece'] != null){
                occupiedBy = board[row][column]['piece']['playerNo'];
            }else{
                occupiedBy = 'empty';
            }

            if(occupiedBy == playerMoving){
                occupied = true;
            }else if(occupiedBy == 'empty'){
                $('#'+row+column+'').css("background-color", "yellow");
                occupied = false; 
            }else{
                $('#'+row+column+'').css("background-color", "yellow");
                occupied = true;
            }

        }else{
            occupied = true;
        };
    }

    function up2Left(){
        if(playerMoving == 2){
            row = row+2;
            column = column-1;
        }else if(playerMoving == 1){
            row = row-2;
            column = column+1;
        }
        if(1<=row && row<=8 && 1<=column && column<=8){
            if(board[row][column]['piece'] != null){
                occupiedBy = board[row][column]['piece']['playerNo'];
            }else{
                occupiedBy = 'empty';
            }

            if(occupiedBy == playerMoving){
                occupied = true;
            }else if(occupiedBy == 'empty'){
                $('#'+row+column+'').css("background-color", "yellow");
                occupied = false; 
            }else{
                $('#'+row+column+'').css("background-color", "yellow");
                occupied = true;
            }

        }else{            
            occupied = true;
        };
    }

    function down2Left(){
        if(playerMoving == 2){
            row = row-2;
            column = column-1;
        }else if(playerMoving == 1){
            row = row+2;
            column = column+1;
        }

        if(1<=row && row<=8 && 1<=column && column<=8){
        
            if(board[row][column]['piece'] != null){
                occupiedBy = board[row][column]['piece']['playerNo'];
            }else{
                occupiedBy = 'empty';
            }

            if(occupiedBy == playerMoving){
                occupied = true;
            }else if(occupiedBy == 'empty'){
                $('#'+row+column+'').css("background-color", "yellow");
                occupied = false; 
            }else{
                $('#'+row+column+'').css("background-color", "yellow");
                occupied = true;
            }

        }else{
            occupied = true;

        }; 
    }

    function up2Right(){
        if(playerMoving== 2){
            row = row+2;
            column = column+1;
        }else if(playerMoving == 1){
            row = row-2;
            column = column-1;
        }
        if(1<=row && row<=8 && 1<=column && column<=8){
            if(board[row][column]['piece'] != null){
                occupiedBy = board[row][column]['piece']['playerNo'];
            }else{
                occupiedBy = 'empty';
            }

            if(occupiedBy == playerMoving){
                occupied = true;
            }else if(occupiedBy == 'empty'){
                $('#'+row+column+'').css("background-color", "yellow");
                occupied = false; 
            }else{
                $('#'+row+column+'').css("background-color", "yellow");
                occupied = true;
            }

        }else{
            occupied = true;

        };
    }

    function down2Right(){
        if(playerMoving == 2){
            row = row-2;
            column = column+1;
        }else if(board[row][column]['piece']['playerNo'] == 1){
            row = row+2;
            column = column-1;
        }
        if(1<=row && row<=8 && 1<=column && column<=8){
            if(board[row][column]['piece'] != null){
                occupiedBy = board[row][column]['piece']['playerNo'];
            }else{
                occupiedBy = 'empty';
            }

            if(occupiedBy == playerMoving){
                occupied = true;
            }else if(occupiedBy == 'empty'){
                $('#'+row+column+'').css("background-color", "yellow");
                occupied = false; 
            }else{
                $('#'+row+column+'').css("background-color", "yellow");
                occupied = true;
            }

        }else{
            occupied = true;

        };
    }

    function left2Up(){
        if(playerMoving == 2){
            row = row+1;
            column = column+2;
        }else if(playerMoving == 1){
            row = row-1;
            column = column-2;
        }
        if(1<=row && row<=8 && 1<=column && column<=8){
            if(board[row][column]['piece'] != null){
                occupiedBy = board[row][column]['piece']['playerNo'];
            }else{
                occupiedBy = 'empty';
            }

            if(occupiedBy == playerMoving){
                occupied = true;
            }else if(occupiedBy == 'empty'){
                $('#'+row+column+'').css("background-color", "yellow");
                occupied = false; 
            }else{
                $('#'+row+column+'').css("background-color", "yellow");
                occupied = true;
            }

        }else{
            occupied = true;

        }; 
    }

    function left2Down(){
        if(playerMoving == 2){
            row = row-1;
            column = column+2;
        }else if(playerMoving == 1){
            row = row+1;
            column = column-2;
        }
        if(1<=row && row<=8 && 1<=column && column<=8){
            if(board[row][column]['piece'] != null){
                occupiedBy = board[row][column]['piece']['playerNo'];
            }else{
                occupiedBy = 'empty';
            }

            if(occupiedBy == playerMoving){
                occupied = true;
            }else if(occupiedBy == 'empty'){
                $('#'+row+column+'').css("background-color", "yellow");
                occupied = false; 
            }else{
                $('#'+row+column+'').css("background-color", "yellow");
                occupied = true;
            }

        }else{
            occupied = true;

        };
    }

    function right2Up(){
        if(playerMoving == 2){
            row = row+1;
            column = column-2;
        }else if(playerMoving == 1){
            row = row-1;
            column = column+2;
        }
        if(1<=row && row<=8 && 1<=column && column<=8){

            if(board[row][column]['piece'] != null){
                occupiedBy = board[row][column]['piece']['playerNo'];
            }else{
                occupiedBy = 'empty';
            }
            if(occupiedBy == playerMoving){
                occupied = true;
            }else if(occupiedBy == 'empty'){
                $('#'+row+column+'').css("background-color", "yellow");
                occupied = false; 
            }else{
                $('#'+row+column+'').css("background-color", "yellow");
                occupied = true;
            }

        }else{
            occupied = true;

        };
    }

    function right2Down(){
        if(playerMoving == 2){
            row = row-1;
            column = column+2;
        }else if(playerMoving == 1){
            row = row+1;
            column = column-2;
        }
        if(1<=row && row<=8 && 1<=column && column<=8){
            if(board[row][column]['piece'] != null){
                occupiedBy = board[row][column]['piece']['playerNo'];
            }else{
                occupiedBy = 'empty';
            }

            if(occupiedBy == playerMoving){
                occupied = true;
            }else if(occupiedBy == 'empty'){
                $('#'+row+column+'').css("background-color", "yellow");
                occupied = false; 
            }else{
                $('#'+row+column+'').css("background-color", "yellow");
                occupied = true;
            }

        }else{
            occupied = true;

        };
    }

    function checkForTake(){
        if(playerMoving == 2){
            row = row+1;
            column = column-1;
        }else if(playerMoving == 1){
            row = row-1;
            column = column+1;
        }
        if(1<=row && row<=8 && 1<=column && column<=8){
            if(board[row][column]['piece'] != null){
                occupiedBy = board[row][column]['piece']['playerNo'];
            }else{
                occupiedBy = 'empty';
            }

            if(occupiedBy == playerMoving){
                occupied = true;
            }else if(occupiedBy == 'empty'){
                occupied = false; 
            }else{
                $('#'+row+column+'').css("background-color", "yellow");
                occupied = true;
            }

        }else{
            occupied = true;
        };
        row = parseFloat(id.charAt(0));column = parseFloat(id.charAt(1));

        if(playerMoving == 2){
            row = row+1;
            column = column+1;
        }else if(playerMoving == 1){
            row = row-1;
            column = column-1;
        }
        if(column>=1 && column<=8 && row>=1 && row<=8){
            if(board[row][column]['piece'] != null){
                occupiedBy = board[row][column]['piece']['playerNo'];
            }else{
                occupiedBy = 'empty';
            }

            if(occupiedBy == playerMoving){
                occupied = true;
            }else if(occupiedBy == 'empty'){
                occupied = false; 
            }else{
                $('#'+row+column+'').css("background-color", "yellow");
                occupied = true;
            }

        }else{           
            occupied = true;
        };
        
    }
    
});