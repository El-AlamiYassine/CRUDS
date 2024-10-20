let ecran = document.querySelector('.ecran');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let create = document.getElementById('create');
let tbody = document.getElementById('t')
let title = document.getElementById('title');
let count = document.getElementById('count');
let category = document.getElementById('category');
let Deleteall = document.getElementById('Deleteall');
let datapro;
var j=0;
// afficher le totale :
function total() {
    let totale = '';
    if (price.value !== '' && taxes.value !== '' && ads.value !== '') {
        if (!isNaN(price.value) && !isNaN(taxes.value) && !isNaN(ads.value) && !isNaN(discount.value)) {
            totale = Number(price.value) + Number(taxes.value) + Number(ads.value) - Number(discount.value);
            ecran.style.backgroundColor = 'green';
        }
    }
    if(price.value === '' || taxes.value === '' || ads.value === ''){
            totale = '';
            ecran.style.backgroundColor = 'rgba(255, 88, 88, 0.562)';
    }
    ecran.textContent = `Totale :${totale}`;
    return totale; 
}
(function(){
    if(localStorage.product != null){
        datapro = JSON.parse(localStorage.product);
    }else{
        datapro = [];
    }   
})();
create.onclick = function(){
    if (count.value === '' || count.value === 1){
         let newprodact = {
            titl:title.value,
            pric:price.value,
            taxe:taxes.value,
            adse:ads.value,
            discont:discount.value,
            total:total(),
            catgory:category.value
        };
        datapro.push(newprodact);
        j++;
    }else{
        for(let k = 0;k < count.value ;k++){
            let newprodact = {
                titl:title.value,
                pric:price.value,
                taxe:taxes.value,
                adse:ads.value,
                discont:discount.value,
                total:total(),
                catgory:category.value
            };
            datapro.push(newprodact);
            j++;             
        }  
    }
    localStorage.setItem('product',JSON.stringify(datapro));
    cleardata();   
    showdata();
}
onload = showdata();
function cleardata(){
    title.value= '';
    price.value = '';   
    taxes.value = ''; 
    ads.value = ''; 
    discount.value = ''; 
    category.value = ''; 
    count.value = '';
    total();
}
function showdata(){
    tbody.innerHTML ='';
    for(i=0 ; i < datapro.length ;i++){
        let row = document.createElement('tr');
            row.innerHTML = `
                <td>${i+1}</td>
                <td>${datapro[i].titl}</td>
                <td>${datapro[i].pric}</td>
                <td>${datapro[i].taxe}</td>
                <td>${datapro[i].adse}</td>
                <td>${datapro[i].discont}</td>
                <td>${Number(datapro[i].pric) + Number(datapro[i].taxe) + Number(datapro[i].adse) - Number(datapro[i].discont)}</td>
                <td>${datapro[i].catgory}</td>
                <td><button  type="button" onclick="updatelement(${i})">Update</button></td>
                <td><button id="delete" type="button" onclick="deletelement(${i})">Delete</button></td>
             `;
             tbody.appendChild(row);
    }  
}
Deleteall.onclick = function(){
    tbody.textContent ='';
    Deleteall.textContent =`Delete All`;
    if(localStorage.product != null){
        localStorage.clear();
        datapro = [];
    }
}
function deletelement(index){
    datapro.splice(index,1);
    localStorage.product = JSON.stringify(datapro);
    showdata(); 
}
function updatelement(index){
    count.style.display ='none'
    title.value= datapro[index].titl;
    price.value = datapro[index].pric;   
    taxes.value = datapro[index].taxe; 
    ads.value = datapro[index].adse; 
    discount.value = datapro[index].discont; 
    category.value = datapro[index].catgory;
    create.innerHTML = 'Update';
    create.onclick = function(){
        let newprodact = {
            titl:title.value,
            pric:price.value,
            taxe:taxes.value,
            adse:ads.value,
            discont:discount.value,
            total:total(),
            catgory:category.value
        };
        total();
        datapro.splice(index,1,newprodact);
        localStorage.product = JSON.stringify(datapro);
        cleardata(); 
        showdata();
        create.innerHTML = 'Create';
        count.style.display ='block' 
    } 
}
let searchbtn = document.getElementById('searchbtn');
let searchbtnc = document.getElementById('searchbtnc');
let search = document.getElementById('search');
search.onkeyup = function(){
        if(search.value != ''){
            tbody.innerHTML ='';
            for(let h=0;h < datapro.length;h++){
                if(datapro[h].titl.includes(search.value) == true){
                    let row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${h+1}</td>
                        <td>${datapro[h].titl}</td>
                        <td>${datapro[h].pric}</td>
                        <td>${datapro[h].taxe}</td>
                        <td>${datapro[h].adse}</td>
                        <td>${datapro[h].discont}</td>
                        <td>${Number(datapro[h].pric) + Number(datapro[h].taxe) + Number(datapro[h].adse) - Number(datapro[h].discont)}</td>
                        <td>${datapro[h].catgory}</td>
                        <td><button  type="button" onclick="updatelement(${i})">Update</button></td>
                        <td><button id="delete" type="button" onclick="deletelement(${i})">Delete</button></td>
                    `;
                    tbody.appendChild(row); 
                }
            }
        }else{
            showdata();
        }
        searchbtnc.onclick = function searchbycategory(){
            if(search.value != ''){
                tbody.innerHTML ='';
                for(let h=0;h < datapro.length;h++){
                    if(datapro[h].catgory.includes(search.value) == true){
                        let row = document.createElement('tr');
                        row.innerHTML = `
                            <td>${h+1}</td>
                            <td>${datapro[h].titl}</td>
                            <td>${datapro[h].pric}</td>
                            <td>${datapro[h].taxe}</td>
                            <td>${datapro[h].adse}</td>
                            <td>${datapro[h].discont}</td>
                            <td>${Number(datapro[h].pric) + Number(datapro[h].taxe) + Number(datapro[h].adse) - Number(datapro[h].discont)}</td>
                            <td>${datapro[h].catgory}</td>
                            <td><button  type="button" onclick="updatelement(${i})">Update</button></td>
                            <td><button id="delete" type="button" onclick="deletelement(${i})">Delete</button></td>
                        `;
                        tbody.appendChild(row); 
                    }
                }
            }else{
                showdata();
            } 
        } 
}