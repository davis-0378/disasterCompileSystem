let mapSize = 0, favIndex = 0;
let dataname, townname = null, countyname = null, fall = null, total = null, weatherData = null;
const favorite = [];

function clickfavorite(favIndex){
    countyname = favorite[favIndex].countyname;
    townname = favorite[favIndex].townname;
    weather = favorite[favIndex].weather;
    hourRain = favorite[favIndex].hourRain;
    dailyRain = favorite[favIndex].dailyRain;
    fall = favorite[favIndex].fall;
    total = favorite[favIndex].total;
    changePanel(countyname, townname, weather, hourRain, dailyRain, fall, total);
}
//fall total need to be deal with
function changePanel(countyname, townname, weather, hourRain, dailyRain, fall, total){
    $("div#show-panel h5").text(countyname + townname);
    if(townname === "士林區") {
        $("#landslide-deadline").css("visibility", "visible");
    }else{
        $("#landslide-deadline").css("visibility", "hidden");
    }
    $("#weather").text(weather);
    $("#rainfall-hour").text(hourRain);
    $("#rainfall-today").text(dailyRain);
    setChart(fall, total);

    getAreaWeatherDetail(townname.slice(0,2), 100);
}

function getWeather(townname) {
    for(i = 0; i < weatherData.length; i++){
        if(townname === weatherData[i].locationName){
            return weatherData[i].weatherElement[1].time[0].elementValue[0].value;
        }
    }
}

// need to change to real data
function getAreaWeatherDetail(areaName, precipitation){
    //console.log(areaName);

    fetch("dist/C-B0025-002/2022.json")
    .then(response => {
        return response.json()
    })
    .then(jsondata => {
        //jsondata.cwbdata.resources.resource.data.surfaceObs["location"][0].station.StationName
        const data = jsondata.cwbdata.resources.resource.data.surfaceObs["location"];
        
        for(i = 0; i < data.length; i++){
            //console.log(data[i].station.StationName);

            if(data[i].station.StationName === areaName)
            {
                let result =  countAreaPrecipitation(jsondata.cwbdata.resources.resource.data.surfaceObs["location"][i]);
                //console.log(result);
            }
        }

        //console.log(data.find(Location => Location.station.StationName === areaName));
    })
}

function countAreaPrecipitation(data) {
    let result, precipitationData = data.stationObsTimes.stationObsTime;

    for(i = 0; i < precipitationData.length; i++) {
        console.log(precipitationData[i].weatherElements.Precipitation);
        result += precipitationData[i].weatherElements.Precipitation;
    }
}

//切換前端地圖，以及順便下載縣市雨量資料
$(function(){
    //點台灣地圖的縣市，進入縣市小圖
    $("path").click(function(){
        dataname = $(this).attr("data-name");
        if(mapSize == 0){
            //在台灣縣市地圖上選擇了某個縣市
            mapSize = 1;

            $("svg").css("display", "none");

            if(dataname === "新北市") {
                $("svg#新北市").css("display", "inline");
                
                $.ajax({
                    url:'https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-D0047-093?Authorization=CWB-50039BA4-747A-4625-968B-A5EBD9CF74BD&limit=1&format=JSON&locationId=F-D0047-069',
                    method: "GET",
                    datatype:"json",
                    success: function(res){
                        weatherData = res.records.locations[0].location;
                    }
                })
            }else if(dataname === "基隆市") {
                $("svg#基隆市").css("display", "inline");
                
                $.ajax({
                    url:'https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-D0047-093?Authorization=CWB-50039BA4-747A-4625-968B-A5EBD9CF74BD&limit=1&format=JSON&locationId=F-D0047-049',
                    method: "GET",
                    datatype:"json",
                    success: function(res){
                        weatherData = res.records.locations[0].location;
                    }
                })
            }else if(dataname === "臺北市") {
                $("svg#臺北市").css("display", "inline");
                
                $.ajax({
                    url:'https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-D0047-093?Authorization=CWB-50039BA4-747A-4625-968B-A5EBD9CF74BD&limit=1&format=JSON&locationId=F-D0047-061',
                    method: "GET",
                    datatype:"json",
                    success: function(res){
                        weatherData = res.records.locations[0].location;
                    }
                })
            }else if(dataname === "桃園市") {
                $("svg#桃園市").css("display", "inline");
                
                $.ajax({
                    url:'https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-D0047-093?Authorization=CWB-50039BA4-747A-4625-968B-A5EBD9CF74BD&format=JSON&locationId=F-D0047-005&elementName=&sort=time',
                    method: "GET",
                    datatype:"json",
                    success: function(res){
                        weatherData = res.records.locations[0].location;
                    }
                })
            }else if(dataname === "新竹縣") {
                $("svg#新竹").css("display", "inline");
                
                $.ajax({
                    url:'https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-D0047-093?Authorization=CWB-50039BA4-747A-4625-968B-A5EBD9CF74BD&format=JSON&locationId=F-D0047-009',
                    method: "GET",
                    datatype:"json",
                    success: function(res){
                        weatherData = res.records.locations[0].location;
                    }
                })
            }else if(dataname === "新竹市") {
                $("svg#新竹").css("display", "inline");
                
                $.ajax({
                    url:'https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-D0047-093?Authorization=CWB-50039BA4-747A-4625-968B-A5EBD9CF74BD&limit=1&format=JSON&locationId=F-D0047-053',
                    method: "GET",
                    datatype:"json",
                    success: function(res){
                        weatherData = res.records.locations[0].location;
                    }
                })
            }else if(dataname === "宜蘭縣") {
                $("svg#宜蘭縣").css("display", "inline");

                $.ajax({
                    url:'https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-D0047-093?Authorization=CWB-50039BA4-747A-4625-968B-A5EBD9CF74BD&limit=1&format=JSON&locationId=F-D0047-001',
                    method: "GET",
                    datatype:"json",
                    success: function(res){
                        weatherData = res.records.locations[0].location;
                    }
                })
            }else if(dataname === "苗栗縣") {
                $("svg#苗栗縣").css("display", "inline");
                
                $.ajax({
                    url:'https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-D0047-093?Authorization=CWB-50039BA4-747A-4625-968B-A5EBD9CF74BD&limit=1&format=JSON&locationId=F-D0047-013',
                    method: "GET",
                    datatype:"json",
                    success: function(res){
                        weatherData = res.records.locations[0].location;
                    }
                })
            }else if(dataname === "臺中市") {
                $("svg#臺中市").css("display", "inline");
                
                $.ajax({
                    url:'https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-D0047-093?Authorization=CWB-50039BA4-747A-4625-968B-A5EBD9CF74BD&limit=1&format=JSON&locationId=F-D0047-073',
                    method: "GET",
                    datatype:"json",
                    success: function(res){
                        weatherData = res.records.locations[0].location;
                    }
                })
            }else if(dataname === "南投縣") {
                $("svg#南投縣").css("display", "inline");
                
                $.ajax({
                    url:'https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-D0047-093?Authorization=CWB-50039BA4-747A-4625-968B-A5EBD9CF74BD&limit=1&format=JSON&locationId=F-D0047-021',
                    method: "GET",
                    datatype:"json",
                    success: function(res){
                        weatherData = res.records.locations[0].location;
                    }
                })
            }else if(dataname === "彰化縣") {
                $("svg#彰化縣").css("display", "inline");
                
                $.ajax({
                    url:'https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-D0047-093?Authorization=CWB-50039BA4-747A-4625-968B-A5EBD9CF74BD&limit=1&format=JSON&locationId=F-D0047-017',
                    method: "GET",
                    datatype:"json",
                    success: function(res){
                        weatherData = res.records.locations[0].location;
                    }
                })
            }else if(dataname === "雲林縣") {
                $("svg#雲林縣").css("display", "inline");
                
                $.ajax({
                    url:'https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-D0047-093?Authorization=CWB-50039BA4-747A-4625-968B-A5EBD9CF74BD&limit=1&format=JSON&locationId=F-D0047-025',
                    method: "GET",
                    datatype:"json",
                    success: function(res){
                        weatherData = res.records.locations[0].location;
                    }
                })
            }else if(dataname === "嘉義縣") {
                $("svg#嘉義").css("display", "inline");
                
                $.ajax({
                    url:'https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-D0047-093?Authorization=CWB-50039BA4-747A-4625-968B-A5EBD9CF74BD&limit=1&format=JSON&locationId=F-D0047-029',
                    method: "GET",
                    datatype:"json",
                    success: function(res){
                        weatherData = res.records.locations[0].location;
                    }
                })
            }else if(dataname === "嘉義市") {
                $("svg#嘉義").css("display", "inline");
                
                $.ajax({
                    url:'https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-D0047-093?Authorization=CWB-50039BA4-747A-4625-968B-A5EBD9CF74BD&limit=1&format=JSON&locationId=F-D0047-057',
                    method: "GET",
                    datatype:"json",
                    success: function(res){
                        weatherData = res.records.locations[0].location;
                    }
                })
            }else if(dataname === "花蓮縣") {
                $("svg#花蓮縣").css("display", "inline");
                
                $.ajax({
                    url:'https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-D0047-093?Authorization=CWB-50039BA4-747A-4625-968B-A5EBD9CF74BD&limit=1&format=JSON&locationId=F-D0047-041',
                    method: "GET",
                    datatype:"json",
                    success: function(res){
                        weatherData = res.records.locations[0].location;
                    }
                })
            }else if(dataname === "臺東縣") {
                $("svg#臺東縣").css("display", "inline");
                
                $.ajax({
                    url:'https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-D0047-093?Authorization=CWB-50039BA4-747A-4625-968B-A5EBD9CF74BD&limit=1&format=JSON&locationId=F-D0047-037',
                    method: "GET",
                    datatype:"json",
                    success: function(res){
                        weatherData = res.records.locations[0].location;
                    }
                })
            }else if(dataname === "臺南市") {
                $("svg#臺南市").css("display", "inline");
                
                $.ajax({
                    url:'https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-D0047-093?Authorization=CWB-50039BA4-747A-4625-968B-A5EBD9CF74BD&limit=1&format=JSON&locationId=F-D0047-077',
                    method: "GET",
                    datatype:"json",
                    success: function(res){
                        weatherData = res.records.locations[0].location;
                        console.log(weatherData);
                    }
                })
            }else if(dataname === "高雄市") {
                $("svg#高雄市").css("display", "inline");
                
                $.ajax({
                    url:'https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-D0047-093?Authorization=CWB-50039BA4-747A-4625-968B-A5EBD9CF74BD&limit=1&format=JSON&locationId=F-D0047-065',
                    method: "GET",
                    datatype:"json",
                    success: function(res){
                        weatherData = res.records.locations[0].location;
                    }
                })
            }else if(dataname === "屏東縣") {
                $("svg#屏東縣").css("display", "inline");
                
                $.ajax({
                    url:'https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-D0047-093?Authorization=CWB-50039BA4-747A-4625-968B-A5EBD9CF74BD&limit=1&format=JSON&locationId=F-D0047-033',
                    method: "GET",
                    datatype:"json",
                    success: function(res){
                        weatherData = res.records.locations[0].location;
                    }
                })
            }else if(dataname === "金門縣") {
                $("svg#金門縣").css("display", "inline");
                
                $.ajax({
                    url:'https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-D0047-093?Authorization=CWB-50039BA4-747A-4625-968B-A5EBD9CF74BD&limit=1&format=JSON&locationId=F-D0047-085',
                    method: "GET",
                    datatype:"json",
                    success: function(res){
                        weatherData = res.records.locations[0].location;
                    }
                })
            }else if(dataname === "澎湖縣") {
                $("svg#澎湖縣").css("display", "inline");
                
                $.ajax({
                    url:'https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-D0047-093?Authorization=CWB-50039BA4-747A-4625-968B-A5EBD9CF74BD&limit=1&format=JSON&locationId=F-D0047-045',
                    method: "GET",
                    datatype:"json",
                    success: function(res){
                        weatherData = res.records.locations[0].location;
                    }
                })
            }else if(dataname === "連江縣") {
                $("svg#連江縣").css("display", "inline");
                
                $.ajax({
                    url:'https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-D0047-093?Authorization=CWB-50039BA4-747A-4625-968B-A5EBD9CF74BD&limit=1&format=JSON&locationId=F-D0047-081',
                    method: "GET",
                    datatype:"json",
                    success: function(res){
                        weatherData = res.records.locations[0].location;
                    }
                })
            }
        }else{
            //在某縣市地圖上選擇了某行政區
            $("#weather").css("visibility", "visible");
            townname = $(this).attr("townname");
            countyname = $(this).attr("countyname");
            weather = getWeather(townname);
            hourRain = townHourRainData(countyname, townname);
            dailyRain = townDailyRainData(countyname, townname);
            fall = 
            total = 
            changePanel(countyname, townname, weather, hourRain, dailyRain, fall, total);
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

//用爬蟲去 https://www.cwb.gov.tw/V8/C/P/Rainfall/Rainfall_10Min_County.html 拿資料
function townHourRainData(countyname, townname){

}

//用爬蟲去 https://www.cwb.gov.tw/V8/C/P/Rainfall/Rainfall_10Min_County.html 拿資料
function townDailyRainData(countyname, townname){
    
}

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
                weather : $("#weather").text(),
                hourRain : $("#rainfall-hour").text(),
                dailyRain : $("#rainfall-today").text(),
                fall : $("#rainfall-hour").text(),
                total : $("#rainfall-today").text()
            };

            //console.log(place);
            favorite.push(place);
        }
    })
});

