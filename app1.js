// PART 1:

// # Declare fare prices and waiting price for each type of Uber:
const array_price_uber_x=[8000,12000,10000];
const array_price_uber_suv=[9000,14000,12000];
const array_price_uber_black=[10000,16000,14000];

const waiting_cost_uber_x=2000;
const waiting_cost_uber_suv=3000;
const waiting_cost_uber_black=4000;

const distance_level_1=1;
const distance_level_2=20;

// Determine the type of uber:
function find_uber_type(){
    if(document.getElementById("uberX").checked){
        return "uber_x";
    }
    else if(document.getElementById("uberSUV").checked){
        return "uber_suv";
    }
    else if(document.getElementById("uberBlack").checked){
        return "uber_black";
    }
}

// Compute waiting cost
function compute_waiting_cost(waiting_time,waiting_cost){
    if(waiting_time<3){
        return 0;
    }
    return Math.round(waiting_time/3)*waiting_cost;
}

// Compute total price:
function compute_total_price(price_array,waiting_time,waiting_cost,distance_travel){
    if(distance_travel<=distance_level_1){
        return compute_waiting_cost(waiting_time,waiting_cost)+price_array[0]*distance_level_1;
    }
    else if(distance_travel<=distance_level_2){
        return compute_waiting_cost(waiting_time,waiting_cost)+price_array[0]*distance_level_1+price_array[1]*(distance_travel-distance_level_1);
    }
    else{
        return compute_waiting_cost(waiting_time,waiting_cost)+price_array[0]*distance_level_1+price_array[1]*(distance_level_2-distance_level_1)+price_array[2]*(distance_travel-distance_level_2);
    }
}

function process_button(){
    var uber_type=find_uber_type();
    var distance_travel=document.getElementById("soKM").value;
    var waiting_time=document.getElementById("thoiGianCho").value;
    var total_amount;
    switch(uber_type){
        case "uber_x":
            total_amount=compute_total_price(array_price_uber_x,waiting_time,waiting_cost_uber_x,distance_travel)
        break;
        case "uber_suv":
            total_amount=compute_total_price(array_price_uber_suv,waiting_time,waiting_cost_uber_suv,distance_travel)
        break;
        case "uber_black":
            total_amount=compute_total_price(array_price_uber_black,waiting_time,waiting_cost_uber_black,distance_travel)
        break;
        default:
            alert("Please fill in all the blanks");
            return;
    }
    return total_amount;
}

document.getElementById("btnTinhTien").onclick=function(){
    document.getElementById("divThanhTien").style.display="block";
    document.getElementById("xuatTien").innerHTML=process_button();
}

// PART 2: 
function create_rows_for_km_used(uber_type,array_distance,array_price,tblBody){
    for(var i=0;i<array_distance.length;i++){

        var new_tr=document.createElement("tr");
        
        var car_type=document.createElement("td");
        var km_used=document.createElement("td");
        var price_per_unit=document.createElement("td");
        var total_price=document.createElement("td");

        car_type.innerHTML=uber_type;
        km_used.innerHTML=array_distance[i]+" km";
        price_per_unit.innerHTML=array_price[i];
        total_price.innerHTML=array_distance[i]*array_price[i];

        new_tr.appendChild(car_type);
        new_tr.appendChild(km_used);
        new_tr.appendChild(price_per_unit);
        new_tr.appendChild(total_price);

        tblBody.append(new_tr);
    }
}

function create_row_for_waiting_time(user_type,waiting_time,tblBody){
    var new_row=document.createElement("tr");
    var waiting_cost;

    if(user_type=="uber_x"){
        waiting_cost=waiting_cost_uber_x;
    }
    else if(user_type=="uber_suv"){
        waiting_cost=waiting_cost_uber_suv;
    }
    else{
        waiting_cost=waiting_cost_uber_black;
    }

    var detail=document.createElement("td");
    var time_waiting=document.createElement("td");
    var price_per_unit=document.createElement("td");
    var total_price=document.createElement("td");

    detail.innerHTML="Charge for waiting";
    time_waiting.innerHTML=waiting_time+" minutes";
    price_per_unit.innerHTML=waiting_cost;
    total_price.innerHTML=compute_waiting_cost(waiting_time,waiting_cost);

    new_row.appendChild(detail);
    new_row.appendChild(time_waiting);
    new_row.appendChild(price_per_unit);
    new_row.appendChild(total_price);

    tblBody.appendChild(new_row);
}

function create_row_for_total_price(tblBody){
    var new_row=document.createElement("tr");

    var title=document.createElement("td");
    title.colSpan="3";
    title.innerHTML="Total Fares";

    var total_amount=document.createElement("td");
    total_amount.innerHTML=document.getElementById("xuatTien").innerHTML;

    new_row.appendChild(title);
    new_row.appendChild(total_amount);

    tblBody.appendChild(new_row);
}

function print_receipt(uber_type,array_price,tblBody){
    var distance_travel=document.getElementById("soKM").value;
    var waiting_time=document.getElementById("thoiGianCho").value;

    if(distance_travel<=distance_level_1){
        create_rows_for_km_used(uber_type,[distance_level_1],array_price,tblBody);
        create_row_for_waiting_time(uber_type,waiting_time,tblBody);
    }
    else if(distance_travel<=distance_level_2){
        create_rows_for_km_used(uber_type,[distance_level_1,distance_travel-distance_level_1],array_price,tblBody);
        create_row_for_waiting_time(uber_type,waiting_time,tblBody);

    }
    else{
        create_rows_for_km_used(uber_type,[distance_level_1,distance_level_2-distance_level_1,distance_travel-distance_level_2],array_price,tblBody);
        create_row_for_waiting_time(uber_type,waiting_time,tblBody);

    }

    create_row_for_total_price(tblBody);
    
}

document.getElementById("btnInHD").onclick=function(){
    var tblBody=document.getElementById("tblBody");
    tblBody.innerHTML="";

    var uber_type=find_uber_type();
    var array_price;

    if(uber_type=="uber_x"){
        array_price=array_price_uber_x;
    }
    else if(uber_type=="uber_suv"){
        array_price=array_price_uber_suv;
    }
    else{
        array_price=array_price_uber_black;
    }

    print_receipt(uber_type,array_price,tblBody);
    
}