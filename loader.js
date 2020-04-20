var myVar;

function myFunction() {
    myVar = setTimeout(showPage, 3000);
}

function showPage() {
    document.querySelector('.loader-wrapper').style.display = "none";
    document.querySelector('.wrapper').style.display = "block";
}