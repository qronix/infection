class systemManager{
    constructor(groupWidth){
        if(Number.isInteger(groupWidth)){
            this.cellGroupWidth = groupWidth;
            this.cellGroupSize = groupWidth**2;
            this.cellGroup = [];
            this.infectedCellCount = 0;
        }else{
            console.log(`${groupWidth} is an invalid width!`);
        }
    }
    setupCellGroup(){
        for(let i=0; i<this.cellGroupSize; i++){
            let cellObj = Cell.generateCell(i+1);
            cellObj.name = `Cell ${i}`;
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
        let virusStartCellId = Math.floor(Math.random()*this.cellGroup.length-1);
        this.cellGroup[virusStartCellId].setInfected(true);
        this.updateSystem();
    }
    borderCheckTest(){
        this.cellGroup.forEach((cell)=>{
            console.log(`Cell ${cell.cellId} is: ${this.checkIfBorderCell(cell.cellId)}`);
        });
    }
     updateSystem(){
        var id = setInterval(()=>{
            this.cellGroup.forEach((cell)=>{
                this.updateCell(cell);
            });
            this.updateCellDisplay();
            this.getInfectionCount();
            if(this.infectedCellCount===this.cellGroupSize){
                clearInterval(id);
            }
        },100);
        var displayId = setInterval(()=>{
            this.updateGameDisplay();
        },100);
    }
    getInfectionCount(){
        let infectionCount = 0;
        this.cellGroup.forEach((cell)=>{
            if(cell.infected){
                infectionCount++;
            }
        });
        this.infectedCellCount = infectionCount;
    }
    //implement async await with promises here to make for a smoother infection
    async updateCell(cell){
        if(cell.infected && cell.infectedAmount<100){
            await this.manageInfection(cell);
            console.log('Infection processed!');
        }
        if(cell.infectedAmount === 100){ //change to infection amount 100%
            //can be leftSide, rightSide, or neither
            var isBorderCell = this.checkIfBorderCell(cell.cellId);
            // console.log(`Cell id ${cell.cellId} Border status: ${isBorderCell}`);
            //check if surrounding cells can be infected
            // this.updateCellDisplay(cell.cellId-1);
            let eligibleCells = [];
            let surroundingCells = {
                topLeft:     (cell.cellId - 9)-1,
                above:       (cell.cellId - 8)-1,
                topRight:    (cell.cellId - 7)-1,
                right:       (cell.cellId + 1)-1,
                bottomRight: (cell.cellId + 9)-1,
                bottom:      (cell.cellId + 8)-1,
                bottomLeft:  (cell.cellId + 7)-1,
                left:        (cell.cellId - 1)-1
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
            // console.log(`Cell id: ${cell.cellId}`);
            // console.log(`isBorderCell: ${isBorderCell}`);
            // console.log('Surrounding cells: ');
            // console.dir(surroundingCells);

            for(let nearCell in surroundingCells){
                // console.log('Cellgroup of nearcell');
                // console.dir(this.cellGroup[surroundingCells[nearCell]]);
                if(this.cellGroup[surroundingCells[nearCell]] !== undefined &&
                !this.cellGroup[surroundingCells[nearCell]].infected){
                    eligibleCells.push(surroundingCells[nearCell]);
                }
            }
            if(eligibleCells.length>0){
                let target = Math.floor(Math.random()*(eligibleCells.length-1));
                // console.log(`Target ${target}`);
                // console.dir(eligibleCells);
                let targetId = eligibleCells[target];
                // console.log(`Target id: ${targetId}`);
                this.cellGroup[targetId].setInfected(true);
            }
        }
    }

    manageInfection(cell){
        return new Promise(resolve => {
            let redAmt = 0;
            let cellHtmlId = cell.cellId - 1;
            let target = document.getElementById(cellHtmlId);
            let greenAmt = 204;
            let maxGreenAmt = 204;
            let cellHealth = cell.health;
            let cellResistance = cell.resistance;
            let infectionAmt   = cell.infectedAmount;
            let virusStrength  = 8;
            let immune    = this.checkForImmunity(cell.resistance, virusStrength);
            if(immune){
                console.log('Cell is immune to virus!');
                cell.infected = false;
                return;
            }else{
                let id = setTimeout(function(){
                    infectionAmt += Math.abs(virusStrength-cellResistance); 
                    if(infectionAmt>=100){
                        infectionAmt=100;
                        console.log('Cell is fully infected!');
                        clearInterval(id);
                    }
                    if(greenAmt>maxGreenAmt){
                        greenAmt = maxGreenAmt;
                    }
                    if(greenAmt>0){
                        greenAmt -= Math.abs(Math.floor(infectionAmt*2));
                    }
                    if(greenAmt<0){
                        greenAmt = 0;
                    }
                    if(redAmt<256){
                        Math.abs(Math.floor((infectionAmt*2)+56));
                    }
                    if(redAmt>256){
                        redAmt = 256;
                    }
                    cell.setInfectionAmt(infectionAmt);
                    console.log(`Infection amt: ${infectionAmt}`);
                    console.log(`Red amt: ${redAmt}`);
                    console.log(`Green amt: ${greenAmt}`);
                    target.style.backgroundColor = `rgb(${redAmt},${greenAmt},0)`;
                
                },100);
            }
        });
    }

    checkForImmunity(cellResistance, virusStrength){
        let immunity = (virusStrength-cellResistance);
        if(immunity<=0){
            return true; //cell is immune
        }else{
            return false; //cell is not immune
        }
    }

    checkIfBorderCell(cellId){
        let leftSideRangeMax  = (this.cellGroupWidth-1);
        let leftSideRangeMin  = 0;
        let rightSideRangeMax = this.cellGroupWidth;
        let rightSideRangeMin = 1;

        //leftSideCheck
        let LSCyValue = (cellId-1)/this.cellGroupWidth;
        //rightSideCheck
        let RSCyValue = (cellId/this.cellGroupWidth);
        // console.log(`yValue is: ${yValue}`);
        if(Number.isInteger(LSCyValue)){
            if(LSCyValue>=leftSideRangeMin && LSCyValue <= leftSideRangeMax){
                return 'leftSide';
            }
        }else if(Number.isInteger(RSCyValue)){
            if(RSCyValue>=rightSideRangeMin && RSCyValue <= rightSideRangeMax){
                return 'rightSide';
            }
        }
        else{
            return 'neither';
        }
    }

    updateCellDisplay(){
        this.cellGroup.forEach((cell)=>{
            if(cell.infected){
                let target = document.getElementById(cell.cellId-1);
                target.classList.add('infected');
            }
        });
    }
    updateGameDisplay(){
        let cellInfectionCount = document.getElementById('cellInfectionCount');
        cellInfectionCount.innerText = this.infectedCellCount;
    }
}