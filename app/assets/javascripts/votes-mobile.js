$(".ballot").on("touchstart", function(event) {
  console.log("Started touch");
  console.log(event.originalEvent.touches);
  console.log(event.target.id)
});

$(".ballot").on("touchend", function(event) {
  console.log("Ended touch");
});

$(".ballot").on("touchmove", function(event) {
  let ballot = $(".ballot")[0];
let touchLocation = event.originalEvent.targetTouches[0];
  ballot.style.left = touchLocation.screenX + 'px';
  ballot.style.top = touchLocation.screenY + 'px';
});


function touchHandler(event) {
    var touch = event.changedTouches[0];

    var simulatedEvent = document.createEvent("MouseEvent");
        simulatedEvent.initMouseEvent({
        touchstart: "dragstart",
        touchmove: "ondrag",
        touchend: "dragend"
    }[event.type], true, true, window, 1,
        touch.screenX, touch.screenY,
        touch.clientX, touch.clientY, false,
        false, false, false, 0, null);

    touch.target.dispatchEvent(simulatedEvent);
    event.preventDefault();
}

function init() {
    document.addEventListener("touchstart", touchHandler, true);
    document.addEventListener("touchmove", touchHandler, true);
    document.addEventListener("touchend", touchHandler, true);
    document.addEventListener("touchcancel", touchHandler, true);
}
