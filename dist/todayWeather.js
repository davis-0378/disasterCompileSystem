$.ajax({
    url:'https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-D0047-093?Authorization=CWB-50039BA4-747A-4625-968B-A5EBD9CF74BD&limit=1&format=JSON&locationId=F-D0047-001',
    method: "GET",
    datatype:"json",
    success: function(res){
        data = res.records.locations;
        console.log(data);
    }
})