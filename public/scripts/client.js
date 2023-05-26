/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

/* a function that generates the format for each tweet */
const createTweetElement = function(tweet) {
  const $tweetTime = timeago.format(tweet.created_at);
  const $tweet = $(
    `<article class="tweet">
    <header>
      <div class="top-left">
        <span class="image">
          <img src="${tweet.user.avatars}" alt="user-avatar" />
        </span>
        <span class = "username">
          ${tweet.user.name}
        </span>
      </div>
      <div class="handle">
        <h2>${tweet.user.handle}</h2>
      </div>
    </header>
    <div class="tweet-line">
      <h4 class="tweet-words">${escape(tweet.content.text)}</h4>
    </div>
    <footer>
      <div class="bottom">
      <span class="time">
        <h6 class="time-length">${$tweetTime}</h6>
      </span>
        <span class="icons">
          <span class="heart">
            <i class="fa-solid fa-heart"></i>
          </span>
          <span class="retweet">
            <i class="fa-solid fa-retweet"></i>
          </span>
          <span class="flag">
            <i class="fa-solid fa-flag"></i>
          </span>
        </span>
      </div>
    </footer>
  </article>`
  );
  return $tweet
};

/* a function that renders the existing tweets */
const renderTweets = function(tweets) {
  const $tweetsContainer = $('#tweets-container');
  $tweetsContainer.empty();
  for (const tweet of tweets) {
    const $tweet = createTweetElement(tweet);
    $tweetsContainer.prepend($tweet);
  }
};

/* a function that sends an AJAX request to /tweets. If successful, calls the renderTweets function*/
function loadTweets () {
  $.ajax({
    url: "/tweets",
    method: "GET",
    success: function (data){
      renderTweets(data);
    }
  })
}

/* a function that validates the text length and condition when creating a tweet */
const validation = function(tweet) {
  const $errorContainer = $("#error-container");
  if (tweet.length > 140) {
    const errorMessage = "📢Text length is greater than 140!📢";
    $errorContainer.text(errorMessage).slideDown();
    return false;
  } 
  if (!tweet) {
    const errorMessage = "🤫Silence May Be Golden, But Please Write A Tweet🤫";
    $errorContainer.text(errorMessage).slideDown();
    return false;
  }
  return true;
};

/* a function that sends an AJAX request to /tweets. If successful, it calls the functions which loads tweets, clears out the text input area, and resets the counter respectfully */
const submitTweet = function(tweet) {
  $.post("/tweets", tweet)
  .then(function () {
    loadTweets();
    $("textarea").val("");
    $(".counter").text("140");
  })
}

/* this function helps prevent potential vulnerabilities */
const escape = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

/* ensures that the event handlers are properly functioning and being triggered at the right moments  */
$(document).ready(function() {

loadTweets();

$("form").on("submit", function(event) {
  event.preventDefault();
  const tweet = $("textarea").val();
  const $errorContainer = $("#error-container");
  $errorContainer.hide();
  if(validation(tweet)) {
    const Formdata = $(this).serialize();
    submitTweet(Formdata);
  };
});
});


//$errorContainer.text(errorMessage).alert();

// $.ajax({
//   type: "POST",
//   url: "/tweets",
//   data: Formdata,
//   success: function(response) {
//     console.log("success");
//   },
//   dataType: 

// });