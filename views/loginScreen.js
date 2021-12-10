const loginScreen = 
`
<section class="hero d-flex flex-column justify-content-center align-items-center" id="hero">
        <form action="" class="d-flex flex-column justify-content-center">
            <div class="form-header">Kahoot!</div>
            <input type="text" placeholder="Room ID">
            <input type="text" placeholder="Password">
            <button><span>Enter</span></button>
        </form>
    </section>
`


function onload() {
    
}

export default {
    content: loginScreen,
    onload: onload,
}