$(document).ready(function() {
    console.log("Huddle up!");

    $('.joinTeam').click(function() {
        $.ajax({
            url: '/joinTeam',
            type: 'POST',
            data: {
                code: $('.code').val(),
                child: $('.childName').val()
            }
        })
        .then(function(response) {
            if (response === 'joinTeam') {
                window.location.href = '/userHome';
            }
        });
    });

    function check(response) {
        if (response === 'match') {
            window.location.href = '/userHome';
        } else if (response === 'not match'){
            swal({
                title: "Error!",
                text: "Passwords do not match",
                type: "error",
                confirmButtonText: "Try again"
            });
        } else if (response === 'fail') {
            swal({
                title: "Error!",
                text: "Try again",
                type: "error",
                confirmButtonText: "Try again"
            });
        } else if (response === 'empty') {
            swal({
                title: "Error!",
                text: "You must fill out all the fields!",
                type: "error",
                confirmButtonText: "Cool"
            });
        } else if (response === 'taken') {
            swal({
                title: "Error!",
                text: "User already exists!",
                type: "error",
                confirmButtonText: "Cool"
            });
        }else if (response === 'success'){
            swal({
                title: "Success!",
                text: "Event Created",
                type: "success",
                confirmButtonText: "Cool"
            }).then(function(){
                // window.location.href = '/teamHome';
                location.reload();
            });
        }

    }

    $('#submitLogin').click(function(event) {
        event.preventDefault();
        console.log('were in teh function');
        $.ajax({
            url: "/submitLogin",
            type: "POST",
            data: {
                email: $('.email').val(),
                password: $('.password').val(),
            }
        })
        .then(function(response) {
            console.log('response: ' + response);
            check(response);

        })
        .catch(function(err) {
            console.log(err.message);
        });
    });

    $('#signUpButton').click(function() {
        $.ajax({
            url: "/signUp",
            type: "POST",
            data: {
                first: $('.first').val(),
                last: $('.last').val(),
                email: $('.email').val(),
                cellPhone: $('.cellPhone').val(),
                homePhone: $('.homePhone').val(),
                password: $('.password').val(),
                confirm: $('.confirmPassword').val()
            }
        })
        .then(function(response) {
            check(response);
        })
        .catch(function(err) {
            console.log(err.message);
        });
    });

    $('#createEventButton').click(function(event){
        event.preventDefault();
        $.ajax({
            url: "/team/createEvent",
            type: "POST",
            data: {
                title: $('.title').val(),
                date: $('.date').val(),
                startTime: $('.startTime').val(),
                endTime: $('.endTime').val(),
                location: $('.location').val(),
                comments: $('.comments').val()
            }
        })
        .then(function(response) {
            check(response);
        })
        .catch(function(err) {
            console.log(err.message);
        });
    });

    $('.joinTeamButton').click(function() {
        swal.setDefaults({
          input: 'text',
          confirmButtonText: 'Next &rarr;',
          showCancelButton: true,
          animation: false,
          progressSteps: ['1', '2']
      });
        var steps = [
          {
            title: 'Team Code',
            text: "Enter the code you recieved from your Team's coach."
          },
          {
            title: "Child's Name",
            text: "Enter your child's name."
          },
      ];
        swal.queue(steps).then(function (result) {
            var teamCode = result[0];
            var childName = result[1];
          swal.resetDefaults();
          swal({
            title: 'All done!',
            html:
              'Enjoy the Season!',
            confirmButtonText: 'Great!',
            showCancelButton: false
        }).then(function() {
            swal.resetDefaults();

            // Ajax
            console.log('we are here');
            $.ajax({
                url: "/joinTeam",
                type: "POST",
                data: {
                    teamCode: teamCode,
                    childName: childName
                }
            })
            .then(function(response) {
                check(response);
            })
            .catch(function(err) {
                console.log(err.message);
            });
        });

      });
  });


});
