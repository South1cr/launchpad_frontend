export const handle401 = (error) => {
    if(error && error.response && error.response.status === 401){
        window.location.reload();
    }
}