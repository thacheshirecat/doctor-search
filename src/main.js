import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';

$(document).ready(function()
{
  $("#search-results").hide();
  $("#symptom-search").hide();
  $("#doctor-search").hide();

  $("button#doctor-search-start").click(function()
  {
    $("#main-page").hide();
    $("#doctor-search").show();
  });

  $("button#symptom-search-start").click(function()
  {
    $("#main-page").hide();
    $("#symptom-search").show();
  });

  $("form#doctor-form").submit(function(event)
  {
    event.preventDefault();

    $("#symptom-search").hide();
    $("#search-results").show();

    let name = $("#doctor-input").val();
    $("#doctor-input").val("");


    let promise = new Promise(function(resolve, reject)
    {
      let request = new XMLHttpRequest();
      let url = `https://api.betterdoctor.com/2016-03-01/doctors?name=${name}&location=wa-seattle&user_location=37.773%2C-122.413&skip=0&limit=10&user_key=` + process.env.exports.apiKey;
      request.onload = function()
      {
        if(this.status === 200)
        {
          resolve(request.response);
        }
        else
        {
          reject(Error(request.statusText));
        }
      }
      request.open("GET", url, true);
      request.send();
    });
    promise.then(function(response)
    {
      let doctors = JSON.parse(response);
      $("#text-results").text(response);
    }, function(error)
    {
      $('#error-field').text(`There was an error, message reads: ${error.message}`);
    });
  });

  // $("form#symptom-form").submit(function(event)
  // {
  //   event.preventDefault();
  //
  //   $("#symptom-search").hide();
  //   $("#search-results").show();
  //
  //   let promise = new Promise(function(resolve, reject)
  //   {
  //     let request = new XMLHttpRequest();
  //     let url = ``;
  //     request.onload = function()
  //     {
  //       if(this.status === 200)
  //       {
  //         resolve(request.response);
  //       }
  //       else
  //       {
  //         reject(Error(request.statusText));
  //       }
  //     }
  //     request.open("GET", url, true);
  //     request.send();
  //   });
  //   promise.then(function(response)
  //   {
  //     let doctors = JSON.parse(response);
  //   }, function(error)
  //   {
  //     $('#error-field').text(`There was an error, message reads: ${error.message}`);
  //   });
  // });
// });




});
