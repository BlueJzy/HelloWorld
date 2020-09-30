$(document).ready(() => {
    $("#submit").click((e) =>{
        e.preventDefault()
        let location = $("#get_location").val()
        
        fetch("http://localhost:3000/location?place="+location).then( (data) => {
            data.json().then((dt_val) => {
                if(dt_val.error){
                    let error = dt_val.Error
                    $("#para").text(error)
                }else{
                    let lctin = dt_val.place
                    let weather = dt_val.weather
                    let output = "In " + lctin + " Today Weather seems to be mostly like: " + weather
                    $("#para").text(output)
                }
            })
        })
    })
})