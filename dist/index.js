import "./C-B0025-002/2022.json"

let mapSize = 0;
let dataname, townname = null, countyname = null, fall = null, total = null;
const favorite = [];

function clickfavorite(index){
    countyname = favorite[index].countyname;
    townname = favorite[index].townname;
    fall = favorite[index].fall;
    total = favorite[index].total;
    changeLook(countyname, townname, fall, total);
}

function changeLook(countyname, townname, fall, total){
    $("div#show-panel h5").text(countyname + townname);
    if(townname === "士林區") {
        $("#landslide-deadline").css("visibility", "visible");
    }else{
        $("#landslide-deadline").css("visibility", "hidden");
    }
    $("#rainfall-hour").text("15mm");
    $("#rainfall-today").text("100mm");
    setChart(fall, total);
}



$(function(){
    //點台灣地圖的縣市，進入縣市小圖
    $("path").click(function(){
        dataname = $(this).attr("data-name");
        if(mapSize == 0){
            //在台灣縣市地圖上選擇了某個縣市
            mapSize = 1;

            $("svg").css("display", "none");

            if(dataname === "新北市") $("svg#新北市").css("display", "inline");
            else if(dataname === "基隆市") $("svg#基隆市").css("display", "inline");
            else if(dataname === "臺北市") $("svg#臺北市").css("display", "inline");
            else if(dataname === "桃園市") $("svg#桃園市").css("display", "inline");
            else if(dataname === "新竹縣") $("svg#新竹").css("display", "inline");
            else if(dataname === "新竹市") $("svg#新竹").css("display", "inline");
            else if(dataname === "宜蘭縣") $("svg#宜蘭縣").css("display", "inline");
            else if(dataname === "苗栗縣") $("svg#苗栗縣").css("display", "inline");
            else if(dataname === "臺中市") $("svg#臺中市").css("display", "inline");
            else if(dataname === "南投縣") $("svg#南投縣").css("display", "inline");
            else if(dataname === "彰化縣") $("svg#彰化縣").css("display", "inline");
            else if(dataname === "雲林縣") $("svg#雲林縣").css("display", "inline");
            else if(dataname === "嘉義縣") $("svg#嘉義").css("display", "inline");
            else if(dataname === "嘉義市") $("svg#嘉義").css("display", "inline");
            else if(dataname === "花蓮縣") $("svg#花蓮縣").css("display", "inline");
            else if(dataname === "臺東縣") $("svg#臺東縣").css("display", "inline");
            else if(dataname === "臺南市") $("svg#臺南市").css("display", "inline");
            else if(dataname === "高雄市") $("svg#高雄市").css("display", "inline");
            else if(dataname === "屏東縣") $("svg#屏東縣").css("display", "inline");
            else if(dataname === "金門縣") $("svg#金門縣").css("display", "inline");
            else if(dataname === "澎湖縣") $("svg#澎湖縣").css("display", "inline");
            else if(dataname === "連江縣") $("svg#連江縣").css("display", "inline");
        }else{
            //在某縣市地圖上選擇了某行政區
            $("#weather").css("visibility", "visible");
            townname = $(this).attr("townname");
            countyname = $(this).attr("countyname");
            fall = $(this).attr("fall");
            total = $(this).attr("total");
            changeLook(countyname, townname, fall, total);
        }
        
    });

    //點back按鈕，回到全台縣市地圖
    $("#btn-back").click(
        function(){
            $("svg").css("display", "none");
            $("svg#taiwan-map").css("display", "inline");
            mapSize = 0;
        }
    )
}); 

//設置喜愛點
$(document).ready(function(){
    $("#seat-favorite").click(function(){
        if(countyname === undefined){

        }else{
            $("#favorite #favorite-menu").append("<li></li>");
            $("#favorite-menu li:last-child").append("<button></button>");
            $("#favorite-menu li:last-child button").attr("class", "dropdown-item")
                .attr("onclick", "clickfavorite(" + favorite.length + ")")
                .attr("countyname", countyname)
                .attr("townname", townname)
                .text(countyname + townname);

            const place = {
                countyname : countyname,
                townname : townname,
                fall : fall,
                total : total
            };

            favorite.push(place);
        }
    })
});

