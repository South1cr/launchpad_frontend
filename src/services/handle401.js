export const handle401 = (error) => {
    if(error.response.status === 401){
        window.location.reload();
    }
}