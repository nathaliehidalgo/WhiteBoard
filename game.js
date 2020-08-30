var scrollVertical = 0;
var scrollHorizontal = 0;
var selectedColor = "#000000";

window.addEventListener("load", () => {
  $("#demo-input").colorpicker({
    format: "hex",
  });

  // Example using an event, to change the color of the #demo div background:
  $("#demo-input").on("colorpickerChange", function (event) {
    selectedColor = event.color.toString();
  });

  const canvas = document.querySelector("#canvas");
  const context = canvas.getContext("2d");

  canvas.height = window.innerHeight;
  canvas.width = window.innerWidth;

  //variables

  let painting = false;

  function startPosition(e) {
    painting = true;
    draw(e);
  }
  function finishedPosition() {
    painting = false;
    context.beginPath(); //restart
  }

  function draw(e) {
    if (!painting) return;
    context.lineWidth = 10;
    context.lineCap = "round";
    context.strokeStyle = selectedColor;

    context.lineTo(e.clientX + scrollHorizontal, e.clientY + scrollVertical);
    context.stroke();
    context.beginPath();
    context.moveTo(e.clientX + scrollHorizontal, e.clientY + scrollVertical); //smoother
  }

  //EventListeners

  window.addEventListener("mousedown", startPosition);
  window.addEventListener("mouseup", finishedPosition);
  window.addEventListener("mousemove", draw);
});
//window.addEventListener("resize", () => {
// custom 'scrolldelta' event extends 'scroll' event
jQuery.event.special.scrolldelta = {
  delegateType: "scroll",
  bindType: "scroll",
  handle: function (event) {
    var handleObj = event.handleObj;
    var targetData = jQuery.data(event.target);
    var ret = null;
    var elem = event.target;
    var isDoc = elem === document;
    var oldTop = targetData.top || 0;
    var oldLeft = targetData.left || 0;
    targetData.top = isDoc
      ? elem.documentElement.scrollTop + elem.body.scrollTop
      : elem.scrollTop;
    targetData.left = isDoc
      ? elem.documentElement.scrollLeft + elem.body.scrollLeft
      : elem.scrollLeft;
    event.scrollTopDelta = targetData.top - oldTop;
    event.scrollTop = targetData.top;
    event.scrollLeftDelta = targetData.left - oldLeft;
    event.scrollLeft = targetData.left;
    event.type = handleObj.origType;
    ret = handleObj.handler.apply(this, arguments);
    event.type = handleObj.type;
    return ret;
  },
};

// bind to custom 'scrolldelta' event
$(window).on("scrolldelta", function (e) {
  var top = e.scrollTop;
  var topDelta = e.scrollTopDelta;
  var left = e.scrollLeft;
  var leftDelta = e.scrollLeftDelta;
  // do stuff with the above info; for now just display it to user
  scrollVertical = top;
  scrollHorizontal = left;
});
