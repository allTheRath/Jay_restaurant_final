if(navigator.serviceWorker) {
    navigator.serviceWorker.register('/sw.js').then(() => {
        console.log('registration completed.');
    })
    .catch(() => {
        console.log('registration failed. Check the internet connection.');
    })
}