

console.log('Client side javascript file is loaded!');



// fetch('http://localhost:3000/weather?address=surat').then((response)=>{
//     response.json().then((data)=>{
//         if(data.error){
//             console.log(data.error)
//         }else{
//             console.log(data.location)
//             console.log(data.forecastData)
//         }
//     })
// })
const weatherForm = document.querySelector('form');
// weatherForm.addEventListener('submit',(e)=>{ 
//     e.preventDefault();
//     console.log('testing');
    
//     // const location = document.querySelector('input').value;
//     // console.log(location)
//     // fetch('http://localhost:3000/weather?address='+location).then((response)=>{
//     //     response.json().then((data)=>{
//     //         if(data.error){
//     //             console.log(data.error)
//     //         }else{
//     //             console.log(data.location)
//     //             console.log(data.forecastData)
//     //         }
//     //     })
//     // })
// })

document.addEventListener('DOMContentLoaded', (event) => {
    const form = document.getElementById('myForm'); // Replace 'myForm' with your form's ID
    const message = document.getElementById('message'); // Replace 'myInput' with your input's ID
 // Replace 'myInput' with your input's ID
    
    if (form) {
        form.addEventListener('submit', (e) => {
            const location = document.querySelector('input').value; 
            e.preventDefault(); // Prevent the default form submission
            console.log(location);
            fetch('/weather?address='+location).then((response)=>{
                response.json().then((data)=>{
                    if(data.error){
                        message.textContent = data.error;
                        console.log(data.error)
                    }else{
                        message.textContent = data.location+' '+data.forecastData;    
                        console.log(data.location)
                        console.log(data.forecastData)
                    }
                })
            })
        });
    } else {
        console.error('Form not found');
    }
});