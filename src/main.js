import { NameSearch, SymptomSearch } from './doctor-search.js';
import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';

$(document).ready(function()
{
  //Fields initially hidden
  $("#search-results").hide();
  $("#symptom-search").hide();
  $("#doctor-search").hide();
  //Navigate to search by Name
  $("button#doctor-search-start").click(function()
  {
    $("#main-page").hide();
    $("#doctor-search").show();
  });
  //Navigate to search by symptom
  $("button#symptom-search-start").click(function()
  {
    $("#main-page").hide();
    $("#symptom-search").show();
  });
  //Search by Name
  $("form#doctor-form").submit(function(event)
  {
    event.preventDefault();

    $("#search-results").text("");
    $("#search-results").show();

    let name = $("#doctor-input").val();
    $("#doctor-input").val("");

    let promise = NameSearch(name);
    promise.then(function(response)
    {
      let doctors = JSON.parse(response);

      if(doctors.data[0] === undefined)
      {
        $("#search-results").append("No results found");
      }
      else
      {
        doctors.data.forEach(function(doctor)
        {
          $("#search-results").append(`<p>___</p>
            <img src="${doctor.profile.image_url}">
            <ul>
            <li>Name: ${doctor.profile.first_name} ${doctor.profile.last_name}</li>
            <li>Specialty: ${doctor.specialties[0].name}</li>
            <li>Address: <p>${doctor.practices[0].visit_address.street}</p>
            <p>${doctor.practices[0].visit_address.city}, ${doctor.practices[0].visit_address.state} ${doctor.practices[0].visit_address.zip}</p></li>
          <li>Phone Number: ${doctor.practices[0].phones[0].number}</li>
          <li>Website: ${doctor.practices[0].website}</li>
          <li>Doctor accepting new patients? ${doctor.practices[0].accepts_new_patients}</li>
          </ul><p>${doctor.profile.bio}`)
        });
      }
    },
    function(error)
    {
      $('#error-field').text(`There was an error, message reads: ${error.message}`);
    });
  });
  //Search by Symptom
  $("form#symptom-form").submit(function(event)
  {
    event.preventDefault();

    $("#search-results").text("");
    $("#search-results").show();

    let symptom = $("#symptom-input").val();
    $("#symptom-input").val("");

    let promise = SymptomSearch(symptom);
    promise.then(function(response)
    {
      let symptom = JSON.parse(response);

      if(symptom.data[0] === undefined)
      {
        $("#search-results").append("No results found");
      }
      else
      {
        symptom.data.forEach(function(doctor)
        {
          $("#search-results").append(`<p>___</p>
            <img src="${doctor.profile.image_url}">
            <ul>
            <li>Name: ${doctor.profile.first_name} ${doctor.profile.last_name}</li>
            <li>Specialty: ${doctor.specialties[0].name}</li>
            <li>Address: <p>${doctor.practices[0].visit_address.street}</p>
            <p>${doctor.practices[0].visit_address.city}, ${doctor.practices[0].visit_address.state} ${doctor.practices[0].visit_address.zip}</p></li>
          <li>Phone Number: ${doctor.practices[0].phones[0].number}</li>
          <li>Website: ${doctor.practices[0].website}</li>
          <li>Doctor accepting new patients? ${doctor.practices[0].accepts_new_patients}</li>
          </ul><p>${doctor.profile.bio}`)
        });
      }

    }, function(error)
    {
      $('#error-field').text(`There was an error, message reads: ${error.message}`);
    });
  });
});
