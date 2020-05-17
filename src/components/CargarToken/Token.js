function getToken(ElToken){
    let token = '';
    fetch('http://localhost:8000/api/login',{
        method: 'post',
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token},
        body: JSON.stringify(
             ElToken,
        )
    })

    return token = ElToken;
}