function predictRank() {
  var percentile = document.getElementById("myInput").value;
  console.log(percentile);
  var rank = (1 - percentile / 100) * 935741;
  rank = Math.ceil(rank);
  console.log(rank);
  if (percentile == 100) {
    rank = 1;
  }

  if (rank < 1 || isNaN(rank)) {
    document.getElementById("alert").classList.add("show");
  } else {
    $("#main_disp").hide();
    $("#disp").show();
    document.getElementById("h1").innerHTML = "Predicted JEE rank";
    document.getElementById("rank").value = rank;
  }
}

function hidePredictor() {
  $("#disp").hide();
}
