//Rental Item Class
class RentalItem {
    constructor(item, total, serviceNum, useNum, rentNum){
        this.item = item;
        this.total = total;
        this.serviceNum = serviceNum;
        this.useNum = useNum
        this.rentNum = rentNum;
    }
}

//UI Class
class UI {
    addRentalItemToList(rentalItem) {
        const list = document.querySelector("#rental-list");
        //Create tr element
        const row = document.createElement('tr');
        //Insert columns
        row.innerHTML = `
        <td class="item-data">${rentalItem.item}</td>
        <td class="item-data">${rentalItem.total}</td>
        <td class="item-data">${rentalItem.serviceNum}</td>
        <td class="item-data">${rentalItem.useNum}</td>
        <td class="item-data">${rentalItem.rentNum}</td>
        <td><button class="mui-btn mui-btn--small mui-btn--primary edit-button">Edit</button><button class="mui-btn mui-btn--small mui-btn--fab mui-btn--danger delete-button">X</button></td>
        `;
   
        list.appendChild(row);
    }

    displayAlert(message, className) {
        //Create div
        const div = document.createElement('div');
        //Add classes
        div.className = `alert ${className}`;
        //Add text
        div.appendChild(document.createTextNode(message));
        //Get Parent
        const container = document.querySelector('.mui-container');
        //Get Parent
        const form = document.querySelector('#equipment-form');
        //Insert alert
        container.insertBefore(div, form);
        //Timeout
        setTimeout(function(){
            document.querySelector('.alert').remove();
        }, 3000);
    }

    deleteRentalItem(target) {
        if(target.className === 'mui-btn mui-btn--small mui-btn--fab mui-btn--danger delete-button'){
            target.parentElement.parentElement.remove();
        }
    }

    editRentalItem(target) {
        if(target.className ==='mui-btn mui-btn--small mui-btn--primary edit-button'){
            let itemCells = target.parentElement.parentElement.querySelectorAll('.item-data');
            //Iterate to allow data edit
            itemCells.forEach(item => {
                item.contentEditable = true;
                item.classList.add('edit-data');
            });
            //

            //Save table edit
            
            //Validate table data to preserve type

        }
    }

    clearFields() {
        document.querySelector('#item').value = '';
        document.querySelector('#total').value = '';
        document.querySelector('#service').value = '';
        document.querySelector('#in-use').value = '';
        document.querySelector('#rentable').value = '';
    } 

}

//Event listener add Rental Item
document.querySelector('#equipment-form').addEventListener('submit', 
    function(e){
    // Form values
    const item = document.querySelector('#item').value,
          total = document.querySelector('#total').value,
          serviceNum = document.querySelector('#service').value,
          useNum = document.querySelector('#in-use').value,
          rentNum = document.querySelector('#rentable').value;

    //Instantiate rentalItem      
    const rentalItem = new RentalItem(item, total, serviceNum, useNum, rentNum); 
    
    //Insantiate UI
    const ui = new UI();

    //Validation
    if(item === '' || total === '' ||  serviceNum === '' || useNum === '' || rentNum === ''){
        //UI Error alert
        ui.displayAlert('Please fill in all fields', 'mui--text-white mui--bg-danger');
    } else {
         //Add rental item to list
         ui.addRentalItemToList(rentalItem);
    

        //Display Added Item
        ui.displayAlert('Item Added', 'mui--text-white mui--bg-primary')

        ui.clearFields();
    
    }

    e.preventDefault();
})

//Event Listener Delete Rental Item
document.querySelector('#rental-list').addEventListener('click', function(e){
    //Insantiate UI
    const ui = new UI();

    ui.deleteRentalItem(e.target);

    if (e.target.className === 'mui-btn mui-btn--small mui-btn--fab mui-btn--danger delete-button') {
        ui.displayAlert('Rental Item Removed', 'mui--text-white mui--bg-primary');
    } 

    e.preventDefault();
})

//Even Listener Edit Rental Item
document.querySelector('#rental-list').addEventListener('click', function(e){
    //Insantiate UI
    const ui = new UI();

    ui.editRentalItem(e.target);

    

    e.preventDefault();
})