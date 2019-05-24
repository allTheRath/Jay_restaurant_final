if(navigator.serviceWorker) {
    navigator.serviceWorker.register('/Jay_restaurant_final/sw.js').then(() => {
        console.log('registration completed.');
    })
    .catch(() => {
        console.log('registration failed. Check the internet connection.');
    })
}