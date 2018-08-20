class systemManager{
    constructor(groupWidth){
        if(Number.isInteger(groupWidth)){
            this.cellGroupWidth = groupWidth;
            this.cellGroupSize = groupWidth**2;
            this.cellGroup = [];
        }else{
            console.log(`${groupWidth} is an invalid width!`);
        }
    }
    setupCellGroup(){
        for(let i=0; i<this.cellGroupSize; i++){
            let cellObj = Cell.generateCell(i+1);
            cellObj.name = `Cell ${i+1}`;
            this.cellGroup.push(new Cell(cellObj));
        }
    }
    addVirus(virusObj){
        let virus = new virus;
    }
    getCellInfo(cellId){
        return this.cellGroup[cellId].getInfo();
    }
    displayCellInfo(cellElement,cellId){
        let cellObj = this.getCellInfo(cellId);
        let infoWindow = document.createElement('div');
        infoWindow.classList.add('infoWindow');
        for(let property in cellObj){
            let infoLine = document.createElement('p');
            infoLine.innerText = `${property[0].toUpperCase() + property.substr(1,property.length)}: ${cellObj[property]}`;
            infoWindow.appendChild(infoLine);
        }
        cellElement.appendChild(infoWindow);
    }
    removeCellInfo(cellElement){
        let target = cellElement.childNodes[0];
        cellElement.removeChild(target);
    }
    begin(){
        let virusStartCellId = 0;//Math.floor(Math.random()*this.cellGroup.length-1);
        this.cellGroup[virusStartCellId].setInfected(true);
        this.updateSystem();
    }
     updateSystem(){
        var id = setInterval(()=>{
            this.cellGroup.forEach((cell)=>{
                this.updateCell(cell);
            });
        },500);
    }
    //implement async await with promises here to make for a smoother infection
    updateCell(cell){
        if(cell.infected){
            //can be leftSide, rightSide, or neither
            var isBorderCell = this.checkIfBorderCell(cell.cellId);

            //check if surrounding cells can be infected
            this.updateCellDisplay(cell.cellId);
            let eligibleCells = [];
            let surroundingCells = {
                topLeft:     (cell.cellId - 9),
                above:       (cell.cellId - 8),
                topRight:    (cell.cellId - 7),
                right:       (cell.cellId + 1),
                bottomRight: (cell.cellId + 9),
                bottom:      (cell.cellId + 8),
                bottomLeft:  (cell.cellId + 7),
                left:        (cell.cellId - 1)
            }
            
            //implementing checks for border cells
            
            if(isBorderCell==='leftSide'){
                delete surroundingCells.topLeft;
                delete surroundingCells.bottomLeft;
                delete surroundingCells.left;
            }
            if(isBorderCell === 'rightSide'){
                delete surroundingCells.topRight;
                delete surroundingCells.right;
                delete surroundingCells.bottomRight;
            }
            console.log(`Cell id: ${cell.cellId}`);
            console.log(`isBorderCell: ${isBorderCell}`);
            console.log('Surrounding cells: ');
            console.dir(surroundingCells);

            for(let nearCell in surroundingCells){
                console.dir(this.cellGroup[surroundingCells[nearCell]]);
                if(this.cellGroup[surroundingCells[nearCell]] !== undefined &&
                this.cellGroup[surroundingCells[nearCell]].infected){
                    eligibleCells.push(surroundingCells[nearCell]);
                }
            }
            let target = Math.floor(Math.random()*(eligibleCells.length));
            let targetId = eligibleCells[target];
            this.cellGroup[targetId].setInfected(true);
        }
    }

    checkIfBorderCell(cellId){
        let leftSideRangeMax  = (this.cellGroupWidth-1);
        let leftSideRangeMin  = 0;
        let rightSideRangeMax = this.cellGroupWidth;
        let rightSideRangeMin = 1;

        //leftSideCheck
        let yValue = (cellId-1)/this.cellGroupWidth;
        // console.log(`yValue is: ${yValue}`);
        if(Number.isInteger(yValue)){
            if(yValue>=leftSideRangeMin && yValue <= leftSideRangeMax){
                return 'leftSide';
            }
        }else if(Number.isInteger(yValue)){
            //right side check
            let yValue = (cellId/this.cellGroupWidth);
            if(yValue>=rightSideRangeMin && yValue <= rightSideRangeMax){
                return 'rightSide';
            }
        }
        else{
            return 'neither';
        }
    }

    updateCellDisplay(cellId){
        let target = document.getElementById(cellId);
        target.classList.add('infected');
    }
}