function auto(){

    var indexBox = document.getElementsByClassName("indexbox")[0]
    indexBox.style.top = "0px"
    var offsetHeight = indexBox.offsetHeight
    var innerHeight = window.innerHeight
    var tops = parseInt((innerHeight - offsetHeight)/2)
    
    indexBox.style.top = tops + "px"
    
}
export {
    auto
}