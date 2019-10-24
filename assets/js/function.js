// Initialize Firebase
 var config = {
    apiKey: "AIzaSyC06FZSDWV8_6XXWMY50miAYDvg5ttRyWQ",
    authDomain: "class-activities-78993.firebaseapp.com",
    databaseURL: "https://class-activities-78993.firebaseio.com",
    projectId: "class-activities-78993",
    storageBucket: "class-activities-78993.appspot.com",
    messagingSenderId: "391231950551",
    appId: "1:391231950551:web:6886991434204ac55a6a92",
    measurementId: "G-KSMR5PXLW8"
  };
  firebase.initializeApp(config);
  // Create a variable to reference the database.
  var database = firebase.database();
  // Initial Values
  var trainName = "";
  var destination = "";
  var time = 0;
  var frequency = "";
  // Capture Button Click
  $("#add-train").on("click", function(event) {
    event.preventDefault();
    // Grabbed values from text boxes
    trainName = $("#trainName-here").val();
    destination = $("#destination-here").val();
    time = $("#time-here").val();
    frequency = $("#frequency-here").val();
    //Moment.js
    // var firstTime = time;
    // var trainFrequency = frequency;
    // Convert time
    // var timeConverted = moment(firstTime, "HH:mm");
    // Current Time
    // var currentTime = moment();
     // Difference between the times
    // var diffTime = moment().diff(moment(timeConverted), "minutes");
     // Time Modulus
    // var timeModulus = diffTime % trainFrequency;
     // Minutes Until Train Arrives
    // var minutesArriv = trainFrequency - timeModulus;
     // Time next train arraives
    // var nextTrain = moment().add(minutesArriv, "minutes");
    // var trainArrivTime = moment(nextTrain).format("hh:mm A");

    // Code for handling the push
    database.ref().push({
      trainName: trainName,
      destination: destination,
      time: time,
      frequency: frequency,
      // minutesArriv: minutesArriv,
      // trainArrivTime: trainArrivTime,
      dateAdded: firebase.database.ServerValue.TIMESTAMP
    });
    //empty input fields
    $("#trainName-here").val("");
    $("#destination-here").val("");
    $("#time-here").val("");
    $("#frequency-here").val("");
  });
  // Firebase watcher .on("child_added"
  database.ref().on("child_added", function(snapshot) {
    // storing the snapshot.val() in a variable for convenience
    var sv = snapshot.val();
    //Moment.js
    var firstTime = sv.time
    var trainFrequency = sv.frequency
    // Convert time
    var timeConverted = moment(firstTime, "HH:mm");
    // Current Time
    var currentTime = moment();
     // Difference between the times
    var diffTime = moment().diff(moment(timeConverted), "minutes");
     // Time Modulus
    var timeModulus = diffTime % trainFrequency;
     // Minutes Until Train Arrives
    var minutesArriv = trainFrequency - timeModulus;
     // Time next train arraives
    var nextTrain = moment().add(minutesArriv, "minutes");
    var trainArrivTime = moment(nextTrain).format("hh:mm A");
    // Change the HTML to reflect
    var newRow = $("<tr>").append(
      $("<td>").text(sv.trainName),
      $("<td>").text(sv.destination),
      $("<td>").text(sv.frequency),
      $("<td>").text(trainArrivTime),
      $("<td>").text(minutesArriv),
      );
    $("#table-body").append(newRow);
    // Handle the errors
  }, function(errorObject) {
    console.log("Errors handled: " + errorObject.code);
    alert("Sorry incorrect format");
  });
