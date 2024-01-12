const socket = io()
function changeColor() {
    const navbar = document.getElementById("navbar")
    const footer = document.getElementById("foot")
    socket.emit("change_color")
    socket.on("change_color", (color) => {
        navbar.classList.replace(color.old, color.new)
        footer.classList.replace(color.old, color.new)
    })
}

var textInputElement
function limitCharacters(element)
{
    textInputElement = element
    socket.emit("limit_characters", textInputElement.value)
    socket.on("limit_characters", (newValue) => {
        textInputElement.value = newValue
    })
}

var isEmptyInput = false
function checkEmptyInput()
{
    const num1 = document.getElementById("num1")
    const num2 = document.getElementById("num2")
    const dialog = document.getElementById("dialog")
    if (num1.value.length == 0 || num2.value.length == 0)
    {
        var instance = M.Modal.init(dialog)
        instance.open()
        isEmptyInput = true
        return false
    }
    isEmptyInput = false
    return true
}

function openHistory()
{
    const historySidenav = document.getElementById("slide-out")
    var instance = M.Sidenav.init(historySidenav)
    instance.open()
}

function getHistory()
{
    $.get("/results", (res) => {
        console.log("get history success")
        updateHistory(res.data)
    })
}

function deleteHistory()
{
    $.get("/delete", (res) => {
        console.log("delete history success")
        updateHistory(res.data)
    })
}

function updateHistory(data)
{
    data.forEach(i => {
        var operation
        if (i.operation == "add")
            operation = "+"
        else if (i.operation == "sub")
            operation = "-"
        else if (i.operation == "mul")
            operation = "*"
        else if (i.operation == "div")
            operation = "/"
        else if (i.operation == "mod")
            operation = "%"
        else if (i.operation == "pow")
            operation = "^"
        collectionItem = '<li id='+i._id+' class="collection-item center active"><h6 class="center-align">'+i.numA+'&nbsp'+operation+'&nbsp'+i.numB+'&nbsp'+'&#61'+'&nbsp'+i.ans+'</h6></li>'
        $("#slide-out").append(collectionItem) 
    });
}

function getFormData()
{
    var formData = {}
    formData.numA = document.getElementById("num1").value
    formData.numB = document.getElementById("num2").value
    var operationRadios = document.getElementsByName("operation")
    for (var i = 0; i < operationRadios.length; i++)
    {
        if (operationRadios[i].checked)
        {
            formData.operation = operationRadios[i].value
            break
        }
    }
    formData.showDecimal = document.getElementById("decimal-switch").checked
    postData(formData)
}

function postData(formData)
{
    $.post("/results", formData, (res) => {
        console.log(res.data)
    })
}

$(function() {
    $("#form").on("submit", () => {
        if (!isEmptyInput)
            getFormData()
    })
    getHistory()
})