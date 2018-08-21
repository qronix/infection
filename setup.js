function Setup(systemManager){
    var targetArea = document.getElementById('virusDish');
    for(let i=0; i<systemManager.cellGroupWidth**2; i++){
        let cellElement = document.createElement('div');
        cellElement.id = i;
        cellElement.addEventListener('mouseenter',function(){
            systemManager.displayCellInfo(cellElement,cellElement.id);
        });
        cellElement.addEventListener('mouseleave',function(){
            systemManager.removeCellInfo(cellElement,cellElement.id);
        });
        cellElement.classList.add('cellElement');
        targetArea.appendChild(cellElement);
    }
}