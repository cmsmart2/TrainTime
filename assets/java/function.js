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

    // Code for handling the push
    database.ref().push({
      trainName: trainName,
      destination: destination,
      time: time,
      frequency: frequency,
      dateAdded: firebase.database.ServerValue.TIMESTAMP
    });

  });

  // Firebase watcher .on("child_added"
  database.ref().on("child_added", function(snapshot) {
    // storing the snapshot.val() in a variable for convenience
    var sv = snapshot.val();

    // Console.loging the last user's data
    console.log(sv.trainName);
    console.log(sv.destination);
    console.log(sv.time);
    console.log(sv.frequency);

    // Change the HTML to reflect
   

    // Handle the errors
  }, function(errorObject) {
    console.log("Errors handled: " + errorObject.code);
  });
// `.on("child_added")` method, begin to retrieve your  data from the database and populating the records into your table.
// momentJS knowledge to calculations needed