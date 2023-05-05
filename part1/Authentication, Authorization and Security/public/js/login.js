console.log("Submit hello")

const login = async (email, password)=>{
    try{

        const res = await axios({
            method: 'POST',
            url: 'https://127.0.0.1/api/v1/users/login',
            data: {email, password}
        })
        console.log(res)

    } catch(err){
        console.error(err)
        console.log("Something happened here")
    }
}
document.querySelector('.form').addEventListener('submit', e =>{
    e.preventDefault()
    const email = document.querySelector("#email").value
    const pwd = document.querySelector("#password").value  
    login(email, pwd) 
    
   


    
    console.log("suibitted")
})