// registers an event handler, which calculates the  length of input value in the textarea.
$(document).ready(function () {
  $("#tweet-text").on("input", function() {
    console.log("this", $(this).parent());
    const textareaNumber = $(this).val();
    const textareaLength = textareaNumber.length;
    const remainingText = 140 - textareaLength;
    const counterText = $(this).parent().children(".characteristics").children(".counter");
    counterText.text(remainingText);
    
    // generates the visuals (e.g. colour) for textarea limit based on remaining characters.
    if (remainingText < 0) {
      counterText.addClass("red");
    } else {
      counterText.removeClass("red");
    }
  });
});