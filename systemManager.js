class systemManager{
    constructor(cellGroupSize){
        this.cellGroupSize = cellGroupSize;
        this.cellGroup = [];
    }
    setupCellGroup(){
        for(let i=0; i<this.cellGroupSize; i++){
            let cellObj = Cell.generateCell(i);
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
        let virusCellStart = Math.floor(Math.random()*this.cellGroup.length-1);
        this.cellGroup[virusCellStart].setInfected(true);
        this.updateSystem();
    }
     updateSystem(){
        var id = setInterval(()=>{
            this.cellGroup.forEach((cell)=>{
                this.updateCell(cell);
            });
        },100);
    }
    //implement async await with promises here to make for a smoother infection
    updateCell(cell){
        if(cell.infected){

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
            for(let nearCell in surroundingCells){
                if(this.cellGroup[surroundingCells[nearCell]] !== undefined){
                    eligibleCells.push(surroundingCells[nearCell]);
                }
            }
            let target = Math.floor(Math.random()*(eligibleCells.length));
            let targetId = eligibleCells[target];
            this.cellGroup[targetId].setInfected(true);
        }
    }

    updateCellDisplay(cellId){
        let target = document.getElementById(cellId);
        target.classList.add('infected');
    }
}