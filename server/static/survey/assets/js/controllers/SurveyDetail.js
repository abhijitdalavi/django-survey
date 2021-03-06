//'use strict';



var map = {
    center: {
        lat: 47.716,
        lng: -122.463
    },
    zoom: 9,
    marker: {
        visibility: true,
        lat: 47.716,
        lng: -122.463,
        icon: 'crosshair_white.png'
    },
    msg: null
};




function ZoomAlertCtrl($scope, dialog, $location) {
    $scope.loaded = false;
    $scope.$watch(function() {
        return $location.path();
    }, function() {
        if ($scope.loaded && dialog.isOpen()) {
            $scope.close();
        }
        $scope.loaded = true;
    });

    $scope.close = function(result) {
        dialog.close(result);
    };
}

function OutOfBoundsAlertCtrl($scope, dialog, $location) {
    $scope.loaded = false;
    $scope.$watch(function() {
        return $location.path();
    }, function() {
        if ($scope.loaded && dialog.isOpen()) {
            $scope.close();
        }
        $scope.loaded = true;
    });

    $scope.close = function(result) {
        dialog.close(result);
    };
}

function addMoreDialogCtrl($scope, dialog, remainingActivities, $location, moreToAdd) {
    $scope.loaded = false;
    $scope.moreToAdd = moreToAdd;
    $scope.$watch(function() {
        return $location.path();
    }, function() {
        if ($scope.loaded && dialog.isOpen()) {
            $scope.close();
        }
        $scope.loaded = true;
    });

    $scope.remainingActivities = remainingActivities;
    $scope.close = function(result) {
        dialog.close(result);
    };
}

function DoneDialogCtrl($scope, dialog, remainingActivities, $location, moreToAdd) {
    $scope.loaded = false;
    $scope.moreToAdd = moreToAdd;
    $scope.$watch(function() {
        return $location.path();
    }, function() {
        if ($scope.loaded && dialog.isOpen()) {
            $scope.close();
        }
        $scope.loaded = true;
    });

    $scope.remainingActivities = remainingActivities;
    $scope.close = function(result) {
        dialog.close(result);
    };
}

function ActivitiesCtrl($scope, dialog, $location) {
    $scope.loaded = false;
    $scope.$watch(function() {
        return $location.path();
    }, function() {
        if ($scope.loaded && dialog.isOpen()) {
            $scope.close();
        }
        $scope.loaded = true;
    });

    $scope.close = function(result) {
        dialog.close(result);
    };
}

function ActivitySelectorDialogCtrl($scope, dialog, $location, $window, question, activeMarker) {
    $scope.question = question;
    $scope.activeMarker = activeMarker;
    $scope.dialog = dialog;

    // This dialog has three panes.
    $scope.panes = {
        confirmPane: {},
        activitySelectionPane: {},
        deleteConfirmationPane: {},
        thankYouPane: {}
    };
    $scope.currentPane = null;
    $scope.show = function(paneName) {
        if (_.has($scope.panes, paneName)) {
            _.each($scope.panes, function(value, key, list) {
                $scope.panes[key].showing = false;
            });
            $scope.panes[paneName].showing = true;
            $scope.currentPane = $scope.panes[paneName];
        }
    };
    if ($scope.question && $scope.question.update) {
        // editing, no need to confirm location
        $scope.show('activitySelectionPane');
    } else {
        // new location, let's confirm
        $scope.show('confirmPane');
    }


    // Ensure modal doesn't stay open on change of URL.
    $scope.loaded = false;
    $scope.$watch(function() {
        return $location.path();
    }, function() {
        if ($scope.loaded && dialog.isOpen()) {
            $scope.close();
        }
        $scope.loaded = true;
    });
    $scope.close = function(result) {
        dialog.close(result);
    };
}

function LocationHoursDialogCtrl($scope, dialog, $location, $window, question, activeMarker) {
    $scope.question = question;
    $scope.activeMarker = activeMarker;
    $scope.dialog = dialog;

    // This dialog has three panes.
    $scope.panes = {
        confirmPane: {},
        howManyHoursPane: {},
        deleteConfirmationPane: {},
        thankYouPane: {}
    };
    $scope.currentPane = null;
    $scope.show = function(paneName) {
        if (_.has($scope.panes, paneName)) {
            _.each($scope.panes, function(value, key, list) {
                $scope.panes[key].showing = false;
            });
            $scope.panes[paneName].showing = true;
            $scope.currentPane = $scope.panes[paneName];
        }
    };
    $scope.show('howManyHoursPane');

    // Ensure modal doesn't stay open on change of URL.
    $scope.loaded = false;
    $scope.$watch(function() {
        return $location.path();
    }, function() {
        if ($scope.loaded && dialog.isOpen()) {
            $scope.close();
        }
        $scope.loaded = true;
    });
    $scope.close = function(result) {
        dialog.close(result);
    };
}

function LocationWhyDialogCtrl($scope, dialog, $location, $window, question, activeMarker) {
    $scope.question = question;
    $scope.activeMarker = activeMarker;
    $scope.dialog = dialog;

    // This dialog has three panes.
    $scope.panes = {
        confirmPane: {},
        whyThisSitePane: {},
        deleteConfirmationPane: {},
        thankYouPane: {}
    };
    $scope.currentPane = null;
    $scope.show = function(paneName) {
        if (_.has($scope.panes, paneName)) {
            _.each($scope.panes, function(value, key, list) {
                $scope.panes[key].showing = false;
            });
            $scope.panes[paneName].showing = true;
            $scope.currentPane = $scope.panes[paneName];
        }
    };
    $scope.show('whyThisSitePane');

    // Ensure modal doesn't stay open on change of URL.
    $scope.loaded = false;
    $scope.$watch(function() {
        return $location.path();
    }, function() {
        if ($scope.loaded && dialog.isOpen()) {
            $scope.close();
        }
        $scope.loaded = true;
    });
    $scope.close = function(result) {
        dialog.close(result);
    };
}

function LocationQualityDialogCtrl($scope, dialog, $location, $window, question, activeMarker) {
    $scope.question = question;
    $scope.activeMarker = activeMarker;
    $scope.dialog = dialog;

    // This dialog has three panes.
    $scope.panes = {
        confirmPane: {},
        rateTheQualityPane: {},
        deleteConfirmationPane: {},
        thankYouPane: {}
    };
    $scope.currentPane = null;
    $scope.show = function(paneName) {
        if (_.has($scope.panes, paneName)) {
            _.each($scope.panes, function(value, key, list) {
                $scope.panes[key].showing = false;
            });
            $scope.panes[paneName].showing = true;
            $scope.currentPane = $scope.panes[paneName];
        }
    };
    $scope.show('rateTheQualityPane');

    // Ensure modal doesn't stay open on change of URL.
    $scope.loaded = false;
    $scope.$watch(function() {
        return $location.path();
    }, function() {
        if ($scope.loaded && dialog.isOpen()) {
            $scope.close();
        }
        $scope.loaded = true;
    });
    $scope.close = function(result) {
        dialog.close(result);
    };
}

function LocationWhyQualityDialogCtrl($scope, dialog, $location, $window, question, activeMarker) {
    $scope.question = question;
    $scope.activeMarker = activeMarker;
    $scope.dialog = dialog;

    // This dialog has three panes.
    $scope.panes = {
        confirmPane: {},
        whyQualityPane: {},
        deleteConfirmationPane: {},
        thankYouPane: {}
    };
    $scope.currentPane = null;
    $scope.show = function(paneName) {
        if (_.has($scope.panes, paneName)) {
            _.each($scope.panes, function(value, key, list) {
                $scope.panes[key].showing = false;
            });
            $scope.panes[paneName].showing = true;
            $scope.currentPane = $scope.panes[paneName];
        }
    };
    $scope.show('whyQualityPane');

    // Ensure modal doesn't stay open on change of URL.
    $scope.loaded = false;
    $scope.$watch(function() {
        return $location.path();
    }, function() {
        if ($scope.loaded && dialog.isOpen()) {
            $scope.close();
        }
        $scope.loaded = true;
    });
    $scope.close = function(result) {
        dialog.close(result);
    };
}

function LocationInaccessibleDialogCtrl($scope, dialog, $location, $window, question, activeMarker) {
    $scope.question = question;
    $scope.activeMarker = activeMarker;
    $scope.dialog = dialog;

    // This dialog has three panes.
    $scope.panes = {
        confirmPane: {},
        imagineInaccessiblePane: {},
        deleteConfirmationPane: {},
        thankYouPane: {}
    };
    $scope.currentPane = null;
    $scope.show = function(paneName) {
        if (_.has($scope.panes, paneName)) {
            _.each($scope.panes, function(value, key, list) {
                $scope.panes[key].showing = false;
            });
            $scope.panes[paneName].showing = true;
            $scope.currentPane = $scope.panes[paneName];
        }
    };
    $scope.show('imagineInaccessiblePane');

    // Ensure modal doesn't stay open on change of URL.
    $scope.loaded = false;
    $scope.$watch(function() {
        return $location.path();
    }, function() {
        if ($scope.loaded && dialog.isOpen()) {
            $scope.close();
        }
        $scope.loaded = true;
    });
    $scope.close = function(result) {
        dialog.close(result);
    };
}

angular.module('askApp')
    .controller('SurveyDetailCtrl', function($scope, $routeParams, $http, $location, $dialog, $interpolate, $timeout) {
        $scope.loading = true;
        $scope.path = $location.path().slice(1, 5);
        if (app && app.user) {
            $scope.user = app.user;
        } else if (app.offline) {
            if (!app) {
                app = {};
            }
            app.next = $location.path();
            $location.path('/');
        }

        $scope.survey = {
            state: 'loading'
        };

        $scope.answers = {};
        // Only show the progress bar if we're ie9 and above
        $scope.showProgressBar = $("html").is(".lt-ie9");

        $scope.isAuthenticated = isAuthenticated;
        // landing page view
        $scope.landingView = 'survey-pages/' + $routeParams.surveySlug + '/landing.html';

        $scope.zoomModel = {
            zoomToResult: undefined
        };

        $scope.getAnswer = function(questionSlug) {
            var slug, gridSlug;
            if (_.string.include(questionSlug, ":")) {
                slug = questionSlug.split(':')[0];
                gridSlug = questionSlug.split(':')[1].replace(/-/g, '');
            } else {
                slug = questionSlug;
            }
            if ($scope.answers[slug]) {
                if (gridSlug) {
                    // return _.flatten(_.map($scope.answers[slug], function(answer) {
                    //     return _.map(answer[gridSlug], function(gridAnswer) {
                    //         return {
                    //             text: answer.text + ": " + gridAnswer,
                    //             label: _.string.slugify(answer.text + ": " + gridAnswer)
                    //         }
                    //     });
                    // }));
                    var gridObject = _.findWhere($scope.answers[slug], {activitySlug: gridSlug});
                    if (gridObject && gridObject.numberoftrips) {
                        return gridObject.numberoftrips
                    }
                } else {
                    return $scope.answers[slug];
                }
            } else {
                return false;
            }
        };


        $scope.gotoNextQuestion = function(numQsToSkips) {
            var nextUrl = $scope.getNextQuestionPath(numQsToSkips);
            if (nextUrl) {
                $location.path(nextUrl);
            }
        };
        $scope.gotoPreviousQuestion = function() {
            var prevUrl = null;
            var foundQuestion = false;

            var index = _.indexOf($scope.survey.questions, $scope.question) - 1;
            foundQuestion = $scope.survey.questions[index] || false;

            if (foundQuestion) {
                prevUrl = ['survey', $scope.survey.slug, foundQuestion.slug, $routeParams.uuidSlug, $routeParams.action].join('/');
            }

            if (prevUrl) {
                $location.path(prevUrl);
            }
        };

        $scope.gotoQuestion = function(questionSlug) {
            $location.path(['survey', $scope.survey.slug, questionSlug, $routeParams.uuidSlug, $routeParams.action].join('/'));
        }

        $scope.getNextQuestionPath = function(numQsToSkips) {
            var nextQuestion = $scope.getNextQuestion(numQsToSkips);
            $scope.loading = false;
            
            if (nextQuestion) {
                return ['survey', $scope.survey.slug, nextQuestion, $routeParams.uuidSlug, $routeParams.action].join('/');
            } else {
                return ['survey', $scope.survey.slug, 'complete', $routeParams.uuidSlug, $routeParams.action].join('/');
            }
        };

        $scope.deleteAnswer = function(question, uuidSlug) {
            var index;
            if (app.offline) {
                if ($scope.answers[question.slug]) {
                    delete $scope.answers[question.slug];
                }
                _.each(app.currentRespondent.responses, function(response, i) {
                    console.log(question.slug)
                    if (response.question.slug === question.slug) {
                        index = i;
                    }
                });

                if (index || index === 0) {
                    app.currentRespondent.responses.splice(index, 1);
                }
                $scope.saveState(app);
            }

        }

        $scope.getLastQuestion = function(numQsToSkips) {
            var index = _.indexOf($scope.survey.questions, $scope.question),
                lastQuestion = false;
            while (index >= 0 && !lastQuestion) {
                index--;
                if ($scope.survey.questions[index] && _.has($scope.answers, $scope.survey.questions[index].slug)) {
                    lastQuestion = $scope.survey.questions[index]
                }
            }
            return lastQuestion;
        }

        $scope.getNextQuestionWithSkip = function(numQsToSkips) {
            var index = _.indexOf($scope.survey.questions, $scope.question) + 1 + (numQsToSkips || 0);
            // should return the slug of the next question
            var nextQuestion = $scope.survey.questions[index];

            if (nextQuestion) {
                if ($scope.skipIf(nextQuestion)) {
                    $scope.deleteAnswer(nextQuestion, $routeParams.uuidSlug);
                    nextQuestion = false;
                }
            }

            return nextQuestion ? nextQuestion.slug : false;
        };


        $scope.getNextQuestion = function(numQsToSkips) {
            /*
            
            Params:
            numQsToSkip - [Integer] Optional, determines the number of questions to skip, defaults to 0.
            Returns: String containing next question slug or false. 
            */
            var foundQuestion = false,
                index = numQsToSkips || 0;
            while (foundQuestion === false && index < $scope.survey.questions.length) {
                foundQuestion = $scope.getNextQuestionWithSkip(index);
                index++;
            }
            return foundQuestion;
        };

        $scope.getResumeQuestionPath = function(lastQuestion) {
            var resumeQuestion = $scope.survey.questions[_.indexOf($scope.survey.questions, _.findWhere($scope.survey.questions, {
                slug: lastQuestion
            })) + 1];
            return ['survey', $scope.survey.slug, resumeQuestion.slug, $routeParams.uuidSlug].join('/');
        };

        /* () */
        $scope.shouldSkipNextQuestion = function(currentQuestionSlug, currentAnswer, callback) {
            switch (currentQuestionSlug) {
                case 'state':
                    $http.get('surveys/counties/' + (currentAnswer || {}).label + '.json')
                        .success(function(data) {
                            callback(false);
                        })
                        .error(function(data) {
                            callback(true);
                        });
                    break;

                case 'expenses':
                    callback(!(currentAnswer && currentAnswer.length > 0));
                    break;
                default:
                    callback(false);
            }
        };

        $scope.keepQuestion = function(op, answer, testCriteria) {
            if (op === '<') {
                return !isNaN(answer) && answer >= testCriteria;
            } else if (op === '>') {
                return !isNaN(answer) && answer <= testCriteria;
            } else if (op === '=') {
                if (!isNaN(answer)) { // if it is a number
                    return answer !== testCriteria;
                } else if (_.str.include(testCriteria, '|')) { // if condition is a list
                    // keep if intersection of condition list and answer list is empty
                    return _.intersection(testCriteria.split('|'), answer).length === 0;
                } else { // otherwise, condition is a string, keep if condition string is NOT contained in the answer
                    return !_.contains(answer, testCriteria);
                }
            } else if (op === '!') {
                if (!isNaN(answer)) { // if it is a number
                    // keep the question if equal (not not equal)
                    return answer === testCriteria;
                } else if (_.str.include(testCriteria, '|')) { // if condition is a list
                    // keep if intersection of condition list and answer list is populated
                    if (_.isArray(answer)) {
                        var trimmedAnswers = _.map(answer, function(a) { return a.trim(); });
                        return _.intersection(testCriteria.split('|'), trimmedAnswers).length > 0;
                    } else {
                        var trimmedAnswer = answer.trim();
                        return _.intersection(testCriteria.split('|'), trimmedAnswer).length > 0;
                    }
                } else { // otherwise, condition is a string, keep if condition string is contained in the answer
                    return _.contains(answer, testCriteria);
                }
            }
            return undefined;
        };


        $scope.skipIf = function(nextQuestion) {
            /*
            Skip question
            
            Params
            nextQuestion - [Question object] 
            Returns: Boolean
            */
            
            var keep = true;
            if (_.str.include(nextQuestion.slug, 'modal')) {
                return true;
            }

            if (nextQuestion.blocks && nextQuestion.blocks.length) {
                var blocks = nextQuestion.blocks;
            } else if (nextQuestion.skip_question && nextQuestion.skip_condition) {
                var blocks = [nextQuestion];
            } else {
                var blocks = []; //(return false)
            }
            _.each(blocks, function(block) {
                var questionSlug = _.findWhere($scope.survey.questions, {
                    resource_uri: block.skip_question
                }).slug,
                    answer = $scope.getAnswer(questionSlug),
                    condition = block.skip_condition,
                    op = condition[0],
                    testCriteria = condition.slice(1);

                if (_.isObject(answer)) {
                    if (_.isNumber(answer.answer)) {
                        answer = answer.answer;
                    } else if (_.isArray(answer)) {
                        answer = _.pluck(answer, "text");
                    } else if (_.isArray(answer.answer)) {
                        answer = _.pluck(answer.answer, "text");
                    } else {
                        answer = [answer.answer ? answer.answer.text : answer.text];
                    }
                }
                //answer = decodeURIComponent(answer);
                keep = keep && $scope.keepQuestion(op, answer, testCriteria);
            });

            return !keep;
        };

        $scope.terminateIf = function(answer, condition) {
            var op = condition[0],
                testCriteria = condition.slice(1),
                terminate = false;

            if (op === '<') {
                terminate = answer < testCriteria;
            } else if (op === '>') {
                terminate = answer > testCriteria;
            } else if (op === '=') {
                terminate = answer === testCriteria;
            }
            return terminate;
        };

        $scope.answerOffline = function(answer) {
            $scope.deleteAnswer($scope.question, $routeParams.uuidSlug);
            app.currentRespondent.responses.push(answer);
            app.currentRespondent.ts = new Date();
            app.currentRespondent.resumePath = window.location.hash;
            $scope.answers[$routeParams.questionSlug] = answer;
            $scope.saveState(app);
            $scope.gotoNextQuestion();

        };

        $scope.saveState = function(state) {
            var appCopy = angular.copy(state);
            delete appCopy.currentRespondent;
            appCopy.currentRespondantKey = 'hapifish-' + $routeParams.uuidSlug;
            localStorage.setItem('hapifish', JSON.stringify(appCopy));
            localStorage.setItem(appCopy.currentRespondantKey, JSON.stringify(state.currentRespondent));
        };

        $scope.answerQuestion = function(answer, otherAnswer) {
            // returnFlag is used for grid validation
            var gridValidated = true,
                url = ['/respond/answer', $scope.survey.slug, $routeParams.questionSlug, $routeParams.uuidSlug].join('/');

            if ($scope.question.type === 'integer' || $scope.question.type === 'number') {
                if ($scope.question.integer_max && $scope.question.integer_max < answer) {
                    return false;
                }
                if ($scope.question.integer_min && $scope.question.integer_min > answer) {
                    return false;
                }
                if ($scope.question.type === 'integer' && _.string.include($scope.answer, '.')) {
                    return false;
                }
            }

            if ($scope.question.type === 'grid') {
                // validate grid questions
                _.each($scope.question.grid_cols, function(col) {
                    _.each(answer, function(gridAnswer) {
                        if (col.required && (gridAnswer[col.label.replace(/-/g, '')] === undefined || gridAnswer[col.label.replace(/-/g, '')] === null)) {
                            gridValidated = false;
                        }
                    });
                });
                if (!gridValidated) {
                    return false;
                }
            }

            if ($scope.dialog) {
                // if (!$scope.question.update) {
                    $scope.dialog.options.save($scope.question, answer);
                    $scope.dialog.options.showNext($scope.question);
                    // $scope.dialog.$scope.close('askIfDone');
                // } else {
                //     $scope.dialog.options.save($scope.question, answer);
                //     $scope.dialog.$scope.close();
                // }
            } else {
                if ($scope.question.type === 'timepicker' || $scope.question.type === 'datepicker' || $scope.question.type === 'datetimepicker') {
                    if (!answer) {
                        answer = $scope.now;
                    }
                }
                // sometimes we'll have an other field with option text box
                if (answer === 'other' && otherAnswer) {
                    answer = otherAnswer;
                }
                if ($scope.question.required && (answer === undefined || answer === null)) {
                    return false;
                } else if (!$scope.question.required && (answer === undefined || answer === null)) {
                    answer = '';
                }


                if ($scope.locations && $scope.locations.length) {
                    answer = angular.toJson(_.map($scope.locations,
                        function(location) {
                            var returnValue = {
                                lat: location.lat,
                                lng: location.lng,
                                color: location.color,
                                answers: location.answers
                            };

                            if (location.pennies) {
                                returnValue.pennies = parseInt(location.pennies, 10);
                            }
                            return returnValue;
                        }));
                }
                if (app.offline) {
                    $scope.answerOffline({
                        answer: answer,
                        question: $scope.question
                    });
                } else {
                    $http({
                        url: url,
                        method: 'POST',
                        data: {
                            'answer': answer
                        },
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                        }
                    }).success(function(data) {
                        if (data.complete) {
                            $location.path(['survey', $scope.survey.slug, 'complete', $routeParams.uuidSlug].join('/'));
                        } else {
                            if ($scope.dialog) {
                                // we are in a dialog and need to handle it
                                $scope.dialog.close();
                                $scope.addLocation();
                            } else {
                                if ($scope.question.term_condition && $scope.terminateIf(answer, $scope.question.term_condition)) {
                                    $location.path(['survey', $scope.survey.slug, 'complete', $routeParams.uuidSlug, 'terminate', $routeParams.questionSlug].join('/'));
                                } else {
                                    $scope.answers[$routeParams.questionSlug] = answer;
                                    if (!app.data.responses) {
                                        app.data.responses = [];
                                    }

                                    app.data.responses.push({
                                        answer: answer,
                                        question: $scope.question
                                    });
                                    $scope.gotoNextQuestion();
                                }

                                app.data.responses.push({
                                    answer: answer,
                                    question: $scope.question
                                });

                                $scope.shouldSkipNextQuestion($scope.question.slug, answer, function(shouldSkip) {
                                    var numQsToSkips = shouldSkip ? 1 : 0;
                                    $scope.gotoNextQuestion(numQsToSkips);
                                });
                            }
                        }

                    }).error(function(data, status, headers, config) {
                        if (console) {
                            console.log(data);
                        }
                    });
                }
            }
        };

        $scope.onMultiSelectClicked = function(option, question) {
            option.checked = !option.checked;
            if (!option.checked && option.other) {
                $scope.question.otherAnswer = null;
            }
            $scope.isAnswerValid = $scope.validateMultiSelect(question);
        };

        $scope.validateMultiSelect = function(question) {
            var hoistedAnswers,
                answers,
                isOtherAnswerValid = true;

            if (!question.required) {
                return true;
            }

            answers = _.filter(question.options, function(option) {
                return option.checked;
            });

            // in case of multiselect containing groups 
            if (question.groupedOptions && question.groupedOptions.length) {
                answers = [];
                _.each(question.groupedOptions, function(groupedOption) {
                    answers = answers.concat(_.filter(groupedOption.options, function(option) {
                        return option.checked;
                    }));
                });
            }

            if (question.hoisted_options) {
                hoistedAnswers = _.filter(question.hoisted_options, function(option) {
                    return option.checked;
                });
                answers = answers.concat(hoistedAnswers);
            }

            if (question.allow_other && question.otherOption && question.otherOption.checked) {
                if (question.otherAnswer === null || question.otherAnswer.length < 1) {
                    // other answer is blank, report back as invalid
                    isOtherAnswerValid = false;
                } else {
                    answers.push(question.otherAnswer);
                }
            }

            if (question.slug === 'question-17') {
                if (answers.length == 2) {
                    return true;
                } else if (answers.length > 2) {
                    _.each(question.options, function(option) {
                        option.checked = false;
                    });
                    if (question.otherOption && question.otherOption.checked) {
                        question.otherOption.checked = false;
                    }
                    //$('#top-two-things').css('font-weight', 'bold');
                    $('#top-two-things').animate( { backgroundColor: "#ffffcc" }, 1 ).animate( { backgroundColor: "#C5E6EB" }, 1500 );
                    return false;
                } else {
                    return false;
                }
            }

            // enable/disable continue button
            return answers.length > 0 && isOtherAnswerValid;
        };

        /**
         * Filters out unselected items and submits an array of the selected options.
         * @param  {array} options An array of all options regardless of which options the
         * user selected.
         */
        $scope.answerMultiSelect = function(question) {
            var answers;

            if (!$scope.isAnswerValid) {
                return;
            }

            if (question.hoisted_options) {
                question.options = question.options.concat(question.hoisted_options);
            }
            answers = _.filter(question.options, function(option) {
                return option.checked;
            });

            // in case of multiselect containing groups 
            if (question.groupedOptions && question.groupedOptions.length) {
                answers = [];
                _.each(question.groupedOptions, function(groupedOption) {
                    answers = answers.concat(_.filter(groupedOption.options, function(option) {
                        return option.checked;
                    }));
                });
            }

            if (question.otherAnswer) {
                answers.push({
                    text: question.otherAnswer,
                    label: question.otherAnswer,
                    checked: true,
                    other: true
                });
            }

            //_.each(answers, function(answer) {
            //answer.text = encodeURIComponent(answer.text);
            //});

            $scope.answerQuestion(answers);
        };

        $scope.onSingleSelectClicked = function(option, question) {
            // turn off all other options
            _.each(_.without(question.options, option), function(option) {
                option.checked = false;
            });

            if (question.otherOption && option === question.otherOption) {
                question.otherOption.checked = !question.otherOption.checked;
            } else {

                option.checked = !option.checked;
                if (question.otherOption) {
                    question.otherOption.checked = false;
                }
            }

            // enable continue
            if (!question.required || (option.checked && option !== question.otherOption)) {
                $scope.isAnswerValid = true;
            } else {
                $scope.isAnswerValid = false;
            }

        };

        $scope.$watch('question.otherAnswer', function(newValue) {

            if ($scope.question && $scope.question.required && !$scope.answer) {
                if ($scope.question.allow_other && $scope.question.otherOption && $scope.question.otherOption.checked && $scope.question.otherAnswer && $scope.question.otherAnswer.length > 0) {
                    $scope.isAnswerValid = true;
                } else if ($scope.question.type === 'multi-select' && $scope.validateMultiSelect($scope.question)) {
                    $scope.isAnswerValid = true;
                } else {
                    $scope.isAnswerValid = false;
                }
            } else {
                $scope.isAnswerValid = true;
            }
        });

        $scope.answerSingleSelect = function(options, otherAnswer) {
            var answer = _.find(options, function(option) {
                return option.checked;
            });
            //var copy = {};
            //_.extend(copy, answer);

            if (answer) {
                //copy.text = encodeURIComponent(answer.text);
                //$scope.answerQuestion(copy);
                $scope.answerQuestion(answer);
            } else if (otherAnswer) {
                answer = {
                    checked: true,
                    label: otherAnswer,
                    text: otherAnswer,
                    other: true
                };
                $scope.answerQuestion(answer);
            } else if (!$scope.question.required) {
                // No answer given. Submit empty.
                $scope.answerQuestion({
                    text: 'NO_ANSWER'
                });
            }

        };

        $scope.answerAutoSingleSelect = function(answer, otherAnswer) {
            if (answer === 'other') {
                $scope.answerQuestion({
                    text: otherAnswer,
                    label: answer
                });
            } else {
                $scope.answerQuestion($scope.question.options[answer]);
            }
        };

        $scope.answerMapQuestion = function(locations) {
            $scope.answerQuestion(locations);
        };

        $scope.validateGrid = function(question) {
            // validate grid questions

            var gridValidated = true;
            _.each($scope.question.grid_cols, function(col) {
                _.each($scope.question.options, function(gridAnswer) {
                    if (col.required && (gridAnswer[col.label.replace(/-/g, '')] === undefined || gridAnswer[col.label.replace(/-/g, '')] === null)) {
                        gridValidated = false;
                    }
                });
            });
            if ($scope.question.slug === 'question-2b') {
                var colSum = 0;
                _.each($scope.question.options, function(gridAnswer) {
                    if (gridAnswer.numberoftrips) {
                        colSum += gridAnswer.numberoftrips;
                    }
                });
                if (colSum === parseInt($scope.getAnswer('question-2a')) ) {
                    gridValidated = true;
                } else {
                    gridValidated = false;
                    if (!_.contains(_.pluck($scope.question.options, 'numberoftrips'), undefined) && !_.contains(_.pluck($scope.question.options, 'numberoftrips'), null)) {
                        //$('#top-two-things').css('font-weight', 'bold');
                        $('#total-trips').animate( { backgroundColor: "#ffffcc" }, 1 ).animate( { backgroundColor: "#C5E6EB" }, 1500 );                    
                    }
                }
            }
            if ($scope.question.slug === 'question-5') {
                var colSum = 0;
                gridValidated = true;
                _.each($scope.question.options, function(gridAnswer) {
                    if (gridAnswer.numberofoutdoorrecreationtrips) {
                        colSum += gridAnswer.numberofoutdoorrecreationtrips;
                    } else {
                        gridValidated = false;
                    }
                });
                if (colSum >= $scope.getAnswer('question-2b:outdoorrecreation')) {
                    gridValidated = true;
                } 
            }
            // console.log(gridValidated);
            return gridValidated;
        };

        $scope.isNumberValid = function(value) {
            var greaterThanMin = true,
                lessThanMax = true;
            if (!value && value !==0) {
                $scope.isAnswerValid = false;
            } else {
                if ($scope.question.integer_min && value < $scope.question.integer_min) {
                    greaterThanMin = false;
                }
                if ($scope.question.integer_max && value > $scope.question.integer_max) {
                    lessThanMax = false;
                }
                $scope.isAnswerValid = greaterThanMin && lessThanMax;
            }
        };

        $scope.loadSurvey = function(data) {
            $scope.survey = data.survey;
            $scope.survey.status = data.status;
            if (!$routeParams.action === 'edit' && data.status === 'complete' || data.status === 'terminate') {
                $location.path(['survey', $scope.survey.slug, 'complete', $routeParams.uuidSlug].join('/'));
            }

            _.each(data.responses, function(response) {
                var slug = response.question.slug ? response.question.slug : response.question;
                try {
                    $scope.answers[slug] = JSON.parse(response.answer_raw);
                } catch (e) {
                    $scope.answers[slug] = response.answer;
                }
            });

            if (data.last_question && !data.complete) {
                $scope.resumeQuestionPath = $scope.getResumeQuestionPath(data.last_question);
            } else {
                $scope.resumeQuestionPath = 'NO_RESUME';
            }
            // if (data.complete) {
            //     $location.path(['survey', $scope.survey.slug, 'complete', $routeParams.uuidSlug].join('/'));
            // }
            // we may inject a question into the scope

            if ($routeParams.questionSlug === 'first') {
                app.offline = false;
                $scope.saveState(app);
                $location.path(['survey', $routeParams.surveySlug, $scope.survey.questions[0].slug, $routeParams.uuidSlug].join('/'));
            }
            if (!$scope.question) {
                $scope.question = _.find($scope.survey.questions, function(question) {
                    return question.slug === $routeParams.questionSlug;
                });

            }

            if ($scope.question && $scope.question.title) {
                $scope.question.displayTitle = $interpolate($scope.question.title)($scope);
            }

            if ($scope.question && $scope.question.type === 'info' && $scope.question.info) {
                $scope.infoView = 'survey-pages/' + $routeParams.surveySlug + '/' + $scope.question.info + '.html';

            }

            /* Specific to single and multi select for now. Adding use case for Integer questions (ensuring answer is within min/max specifications. */
            $scope.isAnswerValid = $scope.question && !$scope.question.required;

            // if ($scope.question && $scope.question.type === 'integer' || $scope.question.type === 'number') {
            //     $scope.$watch('answer', function (newVal) {
            //         if ($scope.question.required && !$scope.answer) {
            //             $scope.isAnswerValid = false;
            //         } else if ( (($scope.question.integer_min || $scope.question.integer_min === 0) && newValue < $scope.question.integer_min) 
            //                     || (($scope.question.integer_max || $scope.question.integer_max === 0) &&  newValue > $scope.question.integer_max) ) {
            //             $scope.isAnswerValid = false;
            //         } else {
            //             $scope.isAnswerValid = true;
            //         }
            //     });
            // }

            if ($scope.question && $scope.question.type === 'integer') {
                $scope.answer = parseInt($scope.getAnswer($routeParams.questionSlug), 10);

                // $scope.$watch('answer', function(newValue) {
                //     if ($scope.question && $scope.question.required && !$scope.answer) {
                //         $scope.isAnswerValid = false;
                //     } else if ( (($scope.question.integer_min || $scope.question.integer_min === 0) && newValue < $scope.question.integer_min) 
                //                 || (($scope.question.integer_max || $scope.question.integer_max === 0) &&  newValue > $scope.question.integer_max) ) {
                //         $scope.isAnswerValid = false;
                //     } else {
                //         $scope.isAnswerValid = true;
                //     }
                // }, true);

            } else if ($scope.question && $scope.question.options && $scope.question.options.length) {
                $scope.answer = $scope.getAnswer($routeParams.questionSlug);
                // check to make sure answer is in options
                if ($scope.answer && !_.isArray($scope.answer)) {
                    $scope.answer = [$scope.answer];
                }
                if ($scope.answer) {

                    _.each($scope.answer, function(answer) {
                        if (!answer.other) {

                            _.each($scope.question.options, function(option) {
                                if ((answer.text || answer.name) === (option.text || option.name)) {
                                    option.checked = true;
                                    $scope.isAnswerValid = true;
                                } else {
                                    option.checked = false;
                                }
                            });
                        } else {
                            // otherwise assume it is other
                            $scope.question.otherOption = {
                                checked: true,
                                'other': true
                            };
                            $scope.question.otherAnswer = answer;
                        }
                    });
                }
            } else {
                $scope.answer = $scope.getAnswer($routeParams.questionSlug);
                if (!$scope.answer) {
                    $scope.answer = null;
                }
            }
            // Fill options list.

            if ($scope.question && $scope.question.options_json && $scope.question.options_json.length > 0 && !$scope.question.options_from_previous_answer) {
                // Using the provided json file to set options.

                $http.get($scope.question.options_json).success(function(data) {
                    var groups = _.groupBy(data, function(item) {
                        return item.group;
                    }),
                        previousAnswers = [];

                    if ($scope.question.update && $scope.activeMarker) {
                        previousAnswers = _.pluck($scope.activeMarker.answers, 'text');
                    } else if ($scope.answer) {
                        if (_.isArray($scope.answer)) {
                            previousAnswers = _.pluck($scope.answer, 'text');
                        } else {
                            previousAnswers = [$scope.answer.text];
                        }

                    }

                    if ($scope.question.randomize_groups) {
                        $scope.question.options = _.flatten(_.shuffle(_.toArray(groups)));
                    } else {
                        $scope.question.options = data;
                    }


                    // Set answers for editing a marker.
                    if ($scope.activeMarker && $scope.activeMarker.answers) {
                        _.each($scope.question.options, function(option, index, list) {
                            var result = _.find($scope.activeMarker.answers, function(answer) {
                                return option.label === answer.label;
                            });
                            option.checked = !_.isUndefined(result);
                        });
                    }

                    // Hoist options.
                    if ($scope.question && $scope.question.hoist_answers) {
                        $scope.question.hoisted_options = [];

                        _.each($scope.getAnswer($scope.question.hoist_answers.slug), function(option) {
                            var newOption = {};

                            angular.extend(newOption, option);

                            if (_.contains(previousAnswers, option.text)) {
                                newOption.checked = true;
                            } else {
                                newOption.checked = false;
                            }



                            $scope.question.hoisted_options.unshift(newOption);
                            $scope.question.options = _.filter($scope.question.options, function(item) {
                                return item.label !== option.label;
                            });
                        });
                    }

                    _.each($scope.question.options, function(option) {

                        if (_.contains(previousAnswers, option.text)) {
                            option.checked = true;
                        } else {
                            option.checked = false;
                        }

                        //distinguish group titles
                        if (_.startsWith(option.text, '*')) {
                            option.text = _.splice(option.text, 1);
                            option.isGroupName = true;
                        }


                    });

                    if ($scope.question.type === "multi-select") {
                        $scope.isAnswerValid = $scope.validateMultiSelect($scope.question);
                    }
                });
            } else if ($scope.question && $scope.question.options_from_previous_answer && $scope.question.slug === 'county') {
                // County question is dependent on state answer to retrieve a
                // json file of counties for the selected state.

                var stateAbrv = 'NO_STATE',
                    stateAnswer = $scope.getAnswer($scope.question.options_from_previous_answer);
                if (stateAnswer.label && stateAnswer.label.length > 2) {
                    // submitted via other text box
                    stateAbrv = stateAnswer.label.toLowerCase().replace(/\s+/g, '');
                } else if (stateAnswer.label) {
                    stateAbrv = stateAnswer.label;
                }

                $http.get('surveys/counties/' + stateAbrv + '.json').success(function(data, status, headers, config) {
                    $scope.question.options = data;
                    if (!$scope.answer) {
                        return;
                    }

                    if (_.isArray($scope.answer)) {
                        $scope.answer = _.first($scope.answer);
                    }
                    _.each($scope.question.options, function(option, index) {
                        if (option.name === $scope.answer.name) {
                            option.checked = true;
                            $scope.isAnswerValid = true;
                        }
                    });

                }).error(function(data, status, headers, config) {
                    $scope.gotoNextQuestion();
                });
            } else if ($scope.question && $scope.question.hoist_answers) {
                // Hoist options
                if ($scope.question && $scope.question.hoist_answers) {
                    $scope.question.hoisted_options = [];
                    var answer = $scope.getAnswer($scope.question.hoist_answers.slug);
                    if (answer.length) {
                        _.each($scope.getAnswer($scope.question.hoist_answers.slug), function(option) {
                            var newOption = {
                                text: option.text,
                                label: option.label
                            };

                            $scope.question.hoisted_options.unshift(newOption);
                        });
                    } else {
                        $scope.question.hoisted_options.push(answer);
                    }                    
                }
                // the following is unnecessary as the watch on question.otherAnswer overrides isAnswerValid 
                // if ($scope.question.type === "multi-select") {
                //     $scope.isAnswerValid = $scope.validateMultiSelect($scope.question);
                // }
               
            } 

            if ($scope.question && $scope.question.type === 'yes-no') {
                if ($scope.answer && _.isArray($scope.answer)) {
                    $scope.question.options = [{
                        'text': 'Yes',
                        'label': "Yes",
                        checked: $scope.answer[0].text === 'Yes'
                    }, {
                        'text': 'No',
                        'label': "No",
                        checked: $scope.answer[0].text === 'No'
                    }]
                } else if ($scope.answer && !_.isArray($scope.answer)) {
                    $scope.question.options = [{
                        'text': 'Yes',
                        'label': "Yes",
                        checked: $scope.answer.text === 'Yes'
                    }, {
                        'text': 'No',
                        'label': "No",
                        checked: $scope.answer.text === 'No'
                    }]
                } else {
                    $scope.question.options = [{
                        'text': 'Yes',
                        'label': "Yes",
                        checked: false
                    }, {
                        'text': 'No',
                        'label': "No",
                        checked: false
                    }]
                }

            }

            if ($scope.question) {
                if ($scope.answer && $scope.question.allow_other && $scope.answer.other || _.isArray($scope.answer) && _.findWhere($scope.answer, {
                    other: true
                })) {
                    $scope.question.otherOption = {
                        'checked': true,
                        'other': true
                    };
                    $scope.question.otherAnswer = $scope.answer.text || _.findWhere($scope.answer, {
                        other: true
                    }).text;
                } else {
                    $scope.question.otherOption = {
                        'checked': false,
                        'other': true
                    };
                    $scope.question.otherAnswer = null;
                }
            }


            if ($scope.question && $scope.question.options_from_previous_answer) {
                $scope.question.options = $scope.getAnswer($scope.question.options_from_previous_answer);
                if ($scope.question.options) {
                    _.each($scope.question.options, function(item) {
                        item.checked = false;
                    });
                    if ($scope.answer) {
                        var answerArr = _.isArray($scope.answer) ? $scope.answer : [$scope.answer];
                        _.each($scope.question.options, function(item) {
                            _.each(answerArr, function(answer) {
                                if ((item.text || item.name) === (answer.text || answer.name)) {
                                    item.checked = true;
                                    $scope.isAnswerValid = true;
                                }
                            });
                        });
                    }
                }                
            }

            if ($scope.question) {
                var marker =  {
                    visibility: true,
                    lat: 47,
                    lng: -124,
                    icon: 'crosshair_white.png'
                };
                if ($routeParams.surveySlug == 'fish-market-survey') {
                    /* Fijian islands */
                    $scope.map = {
                        center: {
                            lat: -17.4624892,
                            lng: 179.2583049
                        },
                        zoom: 8,
                        marker: marker,
                        msg: null
                    };
                } else if ($routeParams.surveySlug == 'general-applicationmulti-use-survey') {
                    /* Newport up to Astoria */
                    $scope.map = {
                        center: {
                            lat: 45.382076,
                            lng: -123.8025571
                        },
                        zoom: 9,
                        marker: marker,
                        msg: null
                    };
                } else {
                    $scope.map = map;
                }
                //$scope.map = map;
                //$scope.map.center.lat = $scope.question.lat || map.center.lat;
                //$scope.map.center.lng = $scope.question.lng || map.center.lng;
                //$scope.map.zoom = $scope.question.zoom || map.zoom;
            }

            // penny question controller
            // This is auto-answer the pennies question if there is only 1 location tied to a Primary Activity
            if ($scope.question && ($scope.question.type === 'pennies' || $scope.question.slug === 'pennies-intro')) {
                if ($scope.question.options_from_previous_answer) {
                    $scope.primaryActivity = $scope.getAnswer($scope.question.options_from_previous_answer.split(',')[1]);
                    // $scope.primaryActivity = $scope.question.hoisted_options[0];

                    $scope.locations = _.filter(JSON.parse($scope.getAnswer($scope.question.options_from_previous_answer.split(',')[0])), function(location) {
                        return _.some(location.answers[0], function(item) {
                            return item.label === $scope.primaryActivity.label;
                        });
                    });
                }

                if ($scope.locations && $scope.locations.length === 1) {
                    // One location with primary activity. 
                    // Auto-answer with all pennies go to the one location.
                    $scope.locations.pennies = 100;
                    $scope.answerQuestion($scope.locations);
                }

                $scope.question.total = 100;

                $timeout(function () { 
                   map.zoom = 'ALL_MARKERS';
                }, 1000);

                _.each($scope.locations, function(location) {
                    location.pennies = null;
                    $scope.$watch(function() {
                        return location.pennies;
                    },

                    function(newValue) {
                        var timer;
                        if (newValue) {
                            if (timer) {
                                timer.cancel();
                            } else {
                                timer = $timeout(function() {
                                    var total = _.pluck($scope.locations, 'pennies');
                                    var sum = _.reduce(total, function(memo, num) {
                                        return parseInt(memo, 10) + parseInt(num ? num : 0, 10);
                                    }, 0);
                                    $scope.question.total = 100 - sum;
                                }, 300);
                            }

                        }

                    });
                });

                $scope.penniesTextBox_click = function ($event) {
                    if (_.has($event.target.attributes, "data-location-key")) {
                        var key = $event.target.attributes["data-location-key"].value;
                        $scope.zoomModel.zoomToResult = $scope.locations[key];
                        map.activeMarkerKey = key;
                    }
                };

                $scope.penniesTextBox_change = function (key) {
                    map.activeMarkerKey = new String(key);
                };

            }

            // map 
            if ($scope.question && $scope.question.type === 'map-multipoint') {
                $scope.activeMarker = false;

                if (!$scope.answer) {
                    $scope.locations = [];
                } else {
                    $scope.locations = JSON.parse($scope.answer);
                }

                $scope.updateCrosshair = function() {
                    if ($scope.activeMarker !== false) {
                        $scope.map.marker.icon = "crosshair_blank.png";

                    } else if ($scope.isCrosshairAlerting && !$scope.isZoomedIn()) {
                        $scope.map.marker.icon = "crosshair_red.png";

                    } else if ($scope.isCrosshairAlerting && $scope.isZoomedIn()) {
                        $scope.map.marker.icon = "crosshair_green.png";

                    } else {
                        $scope.map.marker.icon = "crosshair_white.png";
                    }
                };


                // TODO: Make this load in from a field or something
                $http.get("/static/survey/data/puget_sound.json").success(function(data) {
                   $scope.boundaryLayer = L.geoJson(data);
                }).error(function(data) {
                    debugger;
                });

                $scope.isOutOfBounds = function() {
                    var point, results;
                    if ($scope.boundaryLayer) {
                        point = new L.LatLng($scope.map.marker.lat, $scope.map.marker.lng);
                        results = leafletPip.pointInLayer(point, $scope.boundaryLayer, true);
                        // results is an array of L.Polygon objects containing that point
                        return results.length < 1;
                    }
                    return true; // not using a boundary layer
                };

                $scope.finishMapQuestion = function() {
                    var question = $scope.question;
                        answer = { "text": "User", "label": "" };
                    if (question.update) {
                        $scope.locations[_.indexOf($scope.locations, $scope.activeMarker)].answers = [answer];
                    } else {
                        $scope.addLocation({
                            lat: $scope.activeMarker.lat,
                            lng: $scope.activeMarker.lng,
                            color: $scope.activeMarker.color,
                            question: question,
                            answers: [answer]
                        });
                    }
                    $scope.activeMarker = false;
                    //$scope.answerMultiSelect($scope.question);
                    $scope.answerMapQuestion($scope.locations);

                    question.update = false;
                    $scope.activeMarker = false;
                    $scope.isCrosshairAlerting = false;
                    $scope.isAnswerValid = true;
                };
                $scope.addMarker = function() {
                    if ($scope.activeMarker) {
                        $scope.activeMarker.marker.closePopup();
                    }
                    if (!$scope.isZoomedIn()) {
                        $scope.isAnswerValid = false;
                        $scope.isCrosshairAlerting = true;
                        $scope.showZoomAlert();
                    } else if ($scope.boundaryLayer && $scope.isOutOfBounds()) {
                        $scope.showOutOfBoundsAlert();
                        $scope.isAnswerValid = false;
                    } else {
                        // Add location
                        $scope.activeMarker = {
                            lat: $scope.map.marker.lat,
                            lng: $scope.map.marker.lng,
                            color: $scope.getNextColor()
                        };
                        $scope.locations.push($scope.activeMarker);
                        $timeout(function() {
                           $scope.showAddLocationDialog();
                        }, 400);
                        // $scope.finishMapQuestion();
                        $scope.isCrosshairAlerting = false;
                    }
                    $scope.updateCrosshair();
                };

                $scope.addLocation = function(location) {
                    // var locations = _.without($scope.locations, $scope.activeMarker);
                    location.color = $scope.activeMarker.color;
                    $scope.locations[_.indexOf($scope.locations, $scope.activeMarker)] = location;
                    // $scope.locations = locations;
                    // $scope.locations.push(location);
                    
                    // $scope.activeMarker = false;
                    $scope.updateCrosshair();
                };

                $scope.cancelConfirmation = function() {
                    if ($scope.dialog) {
                        $scope.dialog.options.cancel();
                    } else {
                        $scope.removeLocation($scope.activeMarker);
                        $scope.activeMarker = false;
                    }
                }

                $scope.editMarker = function(location) {
                    if (!location.question) {
                        location.question = {};
                        angular.extend(location.question, $scope.question.modalQuestion);
                    }
                    location.question.update = true;
                    $scope.activeMarker = location;
                    $scope.showAddLocationDialog(location.question);
                };

                $scope.removeLocation = function(marker) {
                    // This is used for both canceling a new location and deleting an 
                    // existing location when in edit mode.
                    var locationToRemove = _.findWhere($scope.locations, {lat: marker.lat, lng: marker.lng, color: marker.color});
                    var locations = _.without($scope.locations, locationToRemove);
                    $scope.locations = locations;
                };

                $scope.showLocation = function(location) {
                    $scope.zoomModel.zoomToResult = location;
                };

                $scope.showAddLocationDialog = function(question) {
                    if (_.isUndefined(question)) {
                        question = $scope.question.modalQuestion;
                    }

                    $scope.dialog = $dialog.dialog({
                        backdrop: true,
                        keyboard: false,
                        backdropClick: false,
                        templateUrl: app.viewPath + 'views/locationActivitiesModal.html',
                        controller: 'ActivitySelectorDialogCtrl',
                        resolve: {
                            question: function() {
                                return question;
                            },
                            activeMarker: function() {
                                return $scope.activeMarker;
                            }
                        },
                        save: function(question, answer) {
                            // if (question.update) {
                            //     $scope.locations[_.indexOf($scope.locations, $scope.activeMarker)].answers[0] = answer;
                            // } else {
                            //     $scope.addLocation({
                            //         lat: $scope.activeMarker.lat,
                            //         lng: $scope.activeMarker.lng,
                            //         color: $scope.activeMarker.color,
                            //         question: question,
                            //         answers: [answer]
                            //     });
                            // } 

                            if ($scope.activeMarker.answers && $scope.activeMarker.answers.length) { // update
                                $scope.activeMarker.answers[0] = answer;
                            } else { // new marker
                                $scope.activeMarker.answers = [answer];
                            }                             


                            // $scope.activeMarker = false;
                            // question.update = false;
                        },
                        showNext: function(question) {
                            $scope.dialog.$scope.close('showNextModal');
                        }
                    });

                    $scope.dialog.open().then(function(result) {
                        $scope.dialog = null;
                        if (result == 'cancel') {
                            $scope.removeLocation($scope.activeMarker);
                            $scope.activeMarker = false;
                            if (question) {
                                question.update = false;
                            }
                            $scope.updateCrosshair();

                        } else if (result === 'showNextModal') {
                            $scope.isAnswerValid = false;
                            $scope.showHoursLocationDialog();
                        }
                    });
                };

                $scope.showHoursLocationDialog = function(question) {
                    if (_.isUndefined(question)) {
                        question = _.findWhere($scope.survey.questions, {'slug': 'mapping-modal-2'});
                    }

                    $scope.dialog = $dialog.dialog({
                        backdrop: true,
                        keyboard: false,
                        backdropClick: false,
                        templateUrl: app.viewPath + 'views/locationHoursModal.html',
                        controller: 'LocationHoursDialogCtrl',
                        resolve: {
                            question: function() {
                                return question;
                            },
                            activeMarker: function() {
                                return $scope.activeMarker;
                            }
                        },
                        save: function(question, answer) {
                            if ($scope.activeMarker.answers.length > 1) { // update
                                $scope.activeMarker.answers[1] = answer
                            } else { // new marker
                                $scope.activeMarker.answers.push(answer);
                            }  
                        },
                        showNext: function(question) {
                            $scope.dialog.$scope.close('showNextModal');
                        }
                    });

                    $scope.dialog.open().then(function(result) {
                        $scope.dialog = null;
                        if (result == 'cancel') {
                            $scope.removeLocation($scope.activeMarker);
                            $scope.activeMarker = false;
                            if (question) {
                                question.update = false;
                            }
                            $scope.updateCrosshair();
                        } else if (result === 'showNextModal') {
                            $scope.isAnswerValid = false;
                            $scope.showWhyLocationDialog();
                        }
                    });
                };

                $scope.showWhyLocationDialog = function(question) {
                    if (_.isUndefined(question)) {
                        question = _.findWhere($scope.survey.questions, {'slug': 'mapping-modal-3'});
                    }

                    $scope.dialog = $dialog.dialog({
                        backdrop: true,
                        keyboard: false,
                        backdropClick: false,
                        templateUrl: app.viewPath + 'views/locationWhyModal.html',
                        controller: 'LocationWhyDialogCtrl',
                        resolve: {
                            question: function() {
                                return question;
                            },
                            activeMarker: function() {
                                return $scope.activeMarker;
                            }
                        },
                        save: function(question, answer) {
                            if ($scope.activeMarker.answers.length > 2) { // update
                                $scope.activeMarker.answers[2] = answer;
                            } else { // new marker
                                $scope.activeMarker.answers.push(answer);
                            }  
                        },
                        showNext: function(question) {
                            $scope.dialog.$scope.close('showNextModal');
                            $scope.isAnswerValid = false;
                            $scope.updateCrosshair();
                        }
                    });

                    $scope.dialog.open().then(function(result) {
                        $scope.dialog = null;
                        if (result == 'cancel') {
                            $scope.removeLocation($scope.activeMarker);
                            $scope.activeMarker = false;
                            if (question) {
                                question.update = false;
                            }
                            $scope.updateCrosshair();

                        } else if (result === 'showNextModal') {
                            $scope.isAnswerValid = false;
                            $scope.showQualityLocationDialog();
                        }
                    });
                };

                $scope.showQualityLocationDialog = function(question) {
                    if (_.isUndefined(question)) {
                        question = _.findWhere($scope.survey.questions, {'slug': 'mapping-modal-4'});
                    }

                    $scope.dialog = $dialog.dialog({
                        backdrop: true,
                        keyboard: false,
                        backdropClick: false,
                        templateUrl: app.viewPath + 'views/locationQualityModal.html',
                        controller: 'LocationQualityDialogCtrl',
                        resolve: {
                            question: function() {
                                return question;
                            },
                            activeMarker: function() {
                                return $scope.activeMarker;
                            }
                        },
                        save: function(question, answer) {
                            if ($scope.activeMarker.answers.length > 3) { // update
                                $scope.activeMarker.answers[3] = answer;
                            } else { // new marker
                                $scope.activeMarker.answers.push(answer);
                            }  
                        },
                        showNext: function(question) {
                            $scope.dialog.$scope.close('showNextModal');
                            $scope.isAnswerValid = false;
                            $scope.updateCrosshair();
                        }
                    });

                    $scope.dialog.open().then(function(result) {
                        $scope.dialog = null;
                        if (result == 'cancel') {
                            $scope.removeLocation($scope.activeMarker);
                            $scope.activeMarker = false;
                            if (question) {
                                question.update = false;
                            }
                            $scope.updateCrosshair();

                        } else if (result === 'showNextModal') {
                            $scope.isAnswerValid = false;
                            $scope.showWhyQualityLocationDialog();
                        }
                    });
                };

                $scope.showWhyQualityLocationDialog = function(question) {
                    if (_.isUndefined(question)) {
                        question = _.findWhere($scope.survey.questions, {'slug': 'mapping-modal-5'});
                    }

                    $scope.dialog = $dialog.dialog({
                        backdrop: true,
                        keyboard: false,
                        backdropClick: false,
                        templateUrl: app.viewPath + 'views/locationWhyQualityModal.html',
                        controller: 'LocationWhyQualityDialogCtrl',
                        resolve: {
                            question: function() {
                                return question;
                            },
                            activeMarker: function() {
                                return $scope.activeMarker;
                            }
                        },
                        save: function(question, answer) {
                            if ($scope.activeMarker.answers.length > 4) { // update
                                $scope.activeMarker.answers[4] = answer;
                            } else { // new marker
                                $scope.activeMarker.answers.push(answer);
                            }  
                        },
                        showNext: function(question) {
                            $scope.dialog.$scope.close('showNextModal');
                            $scope.isAnswerValid = false;
                            $scope.updateCrosshair();
                        }
                    });

                    $scope.dialog.open().then(function(result) {
                        $scope.dialog = null;
                        if (result == 'cancel') {
                            $scope.removeLocation($scope.activeMarker);
                            $scope.activeMarker = false;
                            if (question) {
                                question.update = false;
                            }
                            $scope.updateCrosshair();

                        } else if (result === 'showNextModal') {
                            $scope.isAnswerValid = false;
                            $scope.showInaccessibleLocationDialog();
                        }
                    });
                };

                $scope.showInaccessibleLocationDialog = function(question) {
                    if (_.isUndefined(question)) {
                        question = _.findWhere($scope.survey.questions, {'slug': 'mapping-modal-6'});
                    }

                    $scope.dialog = $dialog.dialog({
                        backdrop: true,
                        keyboard: false,
                        backdropClick: false,
                        templateUrl: app.viewPath + 'views/locationInaccessibleModal.html',
                        controller: 'LocationInaccessibleDialogCtrl',
                        resolve: {
                            question: function() {
                                return question;
                            },
                            activeMarker: function() {
                                return $scope.activeMarker;
                            }
                        },
                        save: function(question, answer) {
                            if ($scope.activeMarker.answers.length > 5) { // update
                                $scope.activeMarker.answers[5] = answer;;
                            } else { // new marker
                                $scope.activeMarker.answers.push(answer);
                            }  
                            // do the following because it's the last modal question
                            $scope.activeMarker = false;
                            question.update = false;
                        },
                        showNext: function(question) {
                            $scope.dialog.$scope.close('askIfDone');
                            $scope.isAnswerValid = false;
                            $scope.updateCrosshair();
                        }
                    });

                    $scope.dialog.open().then(function(result) {
                        $scope.dialog = null;
                        if (result == 'cancel') {
                            $scope.removeLocation($scope.activeMarker);
                            $scope.activeMarker = false;
                            if (question) {
                                question.update = false;
                            }
                            $scope.updateCrosshair();

                        } else if (result === 'askIfDone') {
                            // do the following because it's the last modal question
                            $scope.showAddMoreDialog();    
                        }
                    });
                };


                $scope.showZoomAlert = function() {
                    var d = $dialog.dialog({
                        backdrop: true,
                        keyboard: false,
                        backdropClick: false,
                        backdropFade: true,
                        transitionClass: 'fade',
                        templateUrl: app.viewPath + 'views/zoomAlertModal.html',
                        controller: 'ZoomAlertCtrl'
                    });
                    d.open();
                };

                $scope.showOutOfBoundsAlert = function() {
                    var d = $dialog.dialog({
                        backdrop: true,
                        keyboard: false,
                        backdropClick: false,
                        backdropFade: true,
                        transitionClass: 'fade',
                        templateUrl: app.viewPath + 'views/outOfBoundsAlertModal.html',
                        controller: 'OutOfBoundsAlertCtrl'
                    });
                    d.open();
                };

                $scope.showActivities = function() {
                    $dialog.dialog({
                        backdrop: true,
                        keyboard: true,
                        backdropClick: false,
                        templateUrl: app.viewPath + 'views/activitiesModal.html',
                        scope: {
                            hoisted_options: $scope.getAnswer($scope.question.modalQuestion.hoist_answers.slug),
                            locations: $scope.locations,
                            editLocation: $scope.editMarker,
                            removeLocation: $scope.removeLocation,
                            showLocation: $scope.showLocation,
                            remainingActivities: $scope.getRemainingActivities()
                        },
                        controller: 'ActivitiesCtrl'
                    }).open();
                };

                $scope.showAddMoreDialog = function() {
                    var d = $dialog.dialog({
                        backdrop: true,
                        keyboard: false,
                        backdropClick: false,
                        templateUrl: app.viewPath + 'views/addMoreModal.html',
                        controller: 'addMoreDialogCtrl',
                        resolve: {
                            remainingActivities: function() {
                                return $scope.getRemainingActivities();
                            },
                            moreToAdd: function() {
                                return $scope.getRemainingRequiredActivities();
                            }
                        }
                    });

                    d.open().then(function(result) {
                        if (result === 'doneMapping') {
                            $scope.answerMapQuestion($scope.locations);

                        } else if (result === 'addMoreLocations') {
                            $scope.showMyActivitesPopover();
                            $timeout(function() {
                                // trigger the search modal to be open
                                jQuery("div[zoomto] input").click();
                            }, 300);
                        }
                    });
                };

                $scope.showDoneDialog = function() {
                    var d = $dialog.dialog({
                        backdrop: true,
                        keyboard: false,
                        backdropClick: false,
                        templateUrl: app.viewPath + 'views/doneModal.html',
                        controller: 'DoneDialogCtrl',
                        resolve: {
                            remainingActivities: function() {
                                return $scope.getRemainingActivities();
                            },
                            moreToAdd: function() {
                                return $scope.getRemainingRequiredActivities();
                            }
                        }
                    });

                    d.open().then(function(result) {
                        if (result == 'yes') {
                            $scope.answerMapQuestion($scope.locations);
                        }
                    });
                };

                $scope.myActivitiesPopoverShown = false;
                $scope.showMyActivitesPopover = function() {
                    // Only showing this popover once
                    if (!$scope.myActivitiesPopoverShown) {
                        $timeout(function() {
                            jQuery('.btn-my-activities').popover({
                                trigger: 'manual',
                                placement: 'bottom'
                            });
                            jQuery('.btn-my-activities').popover('show');
                            $scope.myActivitiesPopoverShown = true;
                        }, 500);
                    }
                };

                /**
                 * @return {array} Returns activities that the user had selected but has not
                 * yet mapped.
                 */
                $scope.getRemainingActivities = function() {
                    var selectedActivities = $scope.getAnswer('question-11');
                    // Filter out activities that have already been mapped.
                    var remainingActivities = _.difference(
                        _.pluck(selectedActivities, 'text'),
                        _.flatten(_.map($scope.locations, function(location) {
                            return _.pluck(location.answers[0], 'text');
                        })));

                    return angular.copy(remainingActivities);
                };

                $scope.getRemainingRequiredActivities = function() {
                    var requiredActivity = $scope.getAnswer('question-12').text,
                        remainingActivities = $scope.getRemainingActivities();
                    return _.findWhere(remainingActivities, requiredActivity); 
                }

                /**
                 * @return {string} Returns the color to be applied to the next marker.
                 */
                $scope.getNextColor = function() {
                    var availableColors = [],
                        colorPalette = [
                            'red',
                            'orange',
                            'green',
                            'darkgreen',
                            'darkred',
                            'blue',
                            'darkblue',
                            'purple',
                            'darkpurple',
                            'cadetblue'
                        ];

                    availableColors = angular.copy(colorPalette);
                    _.each($scope.locations, function(marker) {
                        if (_.has(marker, 'color')) {
                            availableColors = _.without(availableColors, marker.color);
                        }
                        if (availableColors.length == 0) {
                            // Recyle the colors if we run out.
                            availableColors = angular.copy(colorPalette);
                        }
                    });
                    return _.first(availableColors);
                };

                $scope.isCrosshairAlerting = false;

                $scope.isZoomedIn = function() {
                    return $scope.map.zoom >= $scope.question.min_zoom;
                };

            }
            if ($scope.question && $scope.question.rows) {
                $scope.question.options = [];
                _.each($scope.question.rows.split('\n'), function(row, index) {
                    var matches = _.filter($scope.answer || [], function(answer) {
                        return answer === row || answer.text === row;
                    });
                    var infoIcon = false;
                    if (_.string.endsWith(row, '*')) {
                        row = row.substr(0,row.length-1);
                        infoIcon = true;
                    }
                    $scope.question.options.push({
                        text: _.string.startsWith(row, '*') ? row.substr(1) : row,
                        label: _.string.slugify(row),
                        checked: matches.length ? true : false,
                        isGroupName: _.string.startsWith(row, '*'),
                        infoIcon: infoIcon
                    });
                });

                $scope.question.groupedOptions = [];
                var groupName = "";
                // nonVisibleGroups are for non-visible groups (groups that lack a header or title) that need to be randomized
                var nonVisibleGroups = [];
                var nonVisibleGroupsIndex = -1;
                _.each($scope.question.rows.split('\n'), function(row, index) {
                    var matches = _.filter($scope.answer || [], function(answer) {
                        return answer.text === row;
                    });
                    var isGroupName = _.string.startsWith(row, '*');
                    if (isGroupName && row.trim().substr(1) === "") {
                        nonVisibleGroupsIndex += 1;
                        nonVisibleGroups[nonVisibleGroupsIndex] = [];
                    } else {
                        if (nonVisibleGroupsIndex > -1) {
                            nonVisibleGroups[nonVisibleGroupsIndex].push({
                                text: row,
                                label: _.string.slugify(row),
                                checked: matches.length ? true : false
                            });
                        } else if (isGroupName) {
                            groupName = row.substr(1);
                            $scope.question.groupedOptions.push({
                                optionLabel: groupName,
                                options: []
                            });
                        } else if ($scope.question.groupedOptions.length > 0) {
                            _.findWhere($scope.question.groupedOptions, {
                                optionLabel: groupName
                            }).options.push({
                                text: row,
                                label: _.string.slugify(row),
                                checked: matches.length ? true : false
                            });
                        } 
                    }
                });
                if ($scope.question.randomize_groups) {
                    if (nonVisibleGroupsIndex > -1) {
                        $scope.question.options = _.flatten(_.shuffle(_.toArray(nonVisibleGroups)));
                    } else if ($scope.question.groupedOptions && $scope.question.groupedOptions.length) {
                        $scope.question.groupedOptions = _.shuffle(_.toArray($scope.question.groupedOptions));
                    } else { // no groups present -- randomize the list of options instead
                        $scope.question.options = _.shuffle(_.toArray($scope.question.options));
                    }
                    
                } else if (nonVisibleGroupsIndex > -1) {
                    $scope.question.options = _.flatten(_.toArray(nonVisibleGroups));
                }
            }
            // grid question controller
            if ($scope.question && $scope.question.type === 'grid') {
                // Prep row initial row data, each row containing values.
                // for activityLabel, activityText, cost and numPeople.
                if ($scope.question.options_from_previous_answer) {
                    $scope.question.options = $scope.getAnswer($scope.question.options_from_previous_answer);
                }


                if ($scope.question.options.length < 1) {
                    // Skip this question since we have no items to list.
                    $scope.gotoNextQuestion();
                }
                if ($scope.answer) {
                    $scope.answer = _.groupBy($scope.answer, 'text');
                } else {
                    $scope.answer = {};
                }
                $scope.question.selectedOptions = {};
                _.each($scope.question.options, function(value, key, list) {
                    list[key].activitySlug = value.label.replace(/-/g, '');
                    list[key].activityText = value.text;
                    _.each($scope.question.grid_cols, function(gridCol, i) {
                        var gridLabel = gridCol.label.replace(/-/g, '');
                        if ($scope.answer !== null && _.has($scope.answer, value.text)) {
                            list[key][gridLabel] = $scope.answer[value.text][0][gridLabel];
                            if (_.isArray($scope.answer[value.text][0][gridLabel])) {
                                _.each($scope.answer[value.text][0][gridLabel], function(answer) {
                                    if (!$scope.question.selectedOptions[gridLabel]) {
                                        $scope.question.selectedOptions[gridLabel] = {};

                                    }
                                    if (!$scope.question.selectedOptions[gridLabel][value.activitySlug]) {
                                        $scope.question.selectedOptions[gridLabel][value.activitySlug] = {};

                                    }
                                    $scope.question.selectedOptions[gridLabel][value.activitySlug][answer] = true;
                                });
                            }
                        }
                    });
                });
                // Configure grid.
                var gridCellTemplateDefault = '<div class="ngCellText" ng-class="col.colIndex()"><span ng-cell-text>{{COL_FIELD CUSTOM_FILTERS}}</span></div>';
                var costCellTemplate = '{{col.colDef.required}}<input class="colt{{$index}} input-block-level" ng-model="row.entity[col.field]"  max="{{col.colDef.max}}" min="{{col.colDef.min}}" ng-required="col.colDef.required" style="height: 100%;" type="number" step="any" }" value="{{row.getProperty(col.field)}}" onFocus="this.select();" onClick="this.select();"/>';
                var integerCellTemplate = '<input class="colt{{$index}} input-block-level" ng-required="col.colDef.required" max="{{col.colDef.max}}" min="{{col.colDef.min}}" ng-model="row.entity[col.field]" style="height: 100%;" type="number" step="1" }" value="{{row.getProperty(col.field)}}" onFocus="this.select();" onClick="this.select();"/>';
                var nameTemplate = '<input class="colt{{$index}} input-block-level" ng-model="row.entity[col.field]" style="height: 100%;" type="text"   ng-required="col.colDef.required" value="{{row.getProperty(col.field)}}"  }" />';
                var checkboxTemplate = '<input class="colt{{$index}} input-block-level" ng-model="row.entity[col.field]" style="height: 100%;" type="checkbox"  ng-required="col.colDef.required" value="{{row.getProperty(col.field)}}" />';
                //var selectTemplate = '<select class="colt{{$index}} input-block-level" ng-model="row.entity[col.field]" style="height: 100%;" value="{{row.getProperty(col.field)}}"  }"><option ng-repeat="option in row.entity[\'rows\']">{{option}}</option></select>';
                // var selectTemplate = '<div style="height:100%">{{col.field}}</div>'
                var selectTemplate = '<div class="ngCellText" ng-class="col.colIndex()"><span ng-cell-text><select class="colt{{$index}} input-block-level" ng-model="row.entity[col.field]"  ng-required="col.colDef.required" style="height: 100%;" value="{{row.getProperty(col.field)}}"  }"><option ng-repeat="option in col.colDef.options">{{option}}</option></select></span></div>';
                var multiSelectTemplate = '<div class="ngCellText" ng-class="col.colIndex()"><span ng-cell-text><select multiple="true" class="colt{{$index}} input-block-level" ng-model="row.entity[col.field]"  ng-required="{{col.colDef.required}}" style="height: 100%;" value="{{row.getProperty(col.field)}}"  }"><option ng-repeat="option in col.colDef.options" ng-selected="question.selectedOptions[col.colDef.field][row.entity.activitySlug][option]" value="{{option}}">{{option}}</option></select></span></div>';

                $scope.gridOptions = {
                    data: 'question.options',
                    enableSorting: false,
                    enableCellSelection: true,
                    canSelectRows: false,
                    multiSelect: false,
                    rowHeight: 50,
                    plugins: [new ngGridFlexibleHeightPlugin()],
                    rowTemplate: '<div ng-style="{\'z-index\': col.zIndex() }" ng-repeat="col in renderedColumns" ng-class="col.colIndex()" class="ngCell {{col.cellClass}}" ng-cell></div>',
                    columnDefs: [{
                        field: 'activityText',
                        displayName: " "
                    }]

                };

                _.each($scope.question.grid_cols, function(gridCol, i) {
                    var template, col = {
                            field: gridCol.label.replace(/-/g, ''),
                            displayName: gridCol.text,
                            slug: gridCol.label.replace(/-/g, ''),
                            required: gridCol.required || false,
                            max: gridCol.max,
                            min: gridCol.min
                        };
                    if (gridCol.type === 'integer') {
                        template = integerCellTemplate;
                    } else if (gridCol.type === 'number' || gridCol.type === 'currency') {
                        template = costCellTemplate;
                    } else if (gridCol.type === 'yes-no') {
                        template = checkboxTemplate;
                    } else if (gridCol.type === 'single-select') {
                        template = selectTemplate;
                        col.options = gridCol.rows.split('\n');
                    } else if (gridCol.type === 'multi-select') {
                        template = multiSelectTemplate;
                        col.options = gridCol.rows.split('\n');
                    } else {
                        template = nameTemplate;
                    }
                    col.cellTemplate = template
                    $scope.gridOptions.columnDefs.push(col);
                });
            }

            if ($scope.question && $scope.question.type === 'datepicker') {
                $scope.now = (new Date()).toString("MM/dd/yyyy");
                // if ($scope.answer) {
                //     $scope.answer = new Date($scope.answer);
                // }
            }
            if ($scope.question && $scope.question.type === 'timepicker') {
                $scope.now = $scope.answer || (new Date()).toString("HH:mm");
            }
            // if ($scope.question.foreach_question) {
            //     $scope.question.foreach = true;
            //     $scope.question.foreachAnswers = $scope.getAnswer($scope.question.foreach_question.slug);
            // } else {
            //     $scope.question.foreach = false;
            // }

            $scope.nextQuestionPath = $scope.getNextQuestionPath();
            // $scope.loading = false;
            $scope.gridValidated = false;
            if ($scope.question && $scope.question.type === 'grid') {
                // validate grid questions
                $scope.$watch('question', function(newValue) {
                    $scope.gridValidated = $scope.validateGrid($scope.question);
                }, true);
                $scope.gridValidated = $scope.validateGrid($scope.question);
            }

            // remove hoisted options from options list
            if ($scope.question && $scope.question.options && $scope.question.options.length && $scope.question.hoisted_options && $scope.question.hoisted_options.length) {
                _.each($scope.question.hoisted_options, function(option) {
                    $scope.question.options = _.filter($scope.question.options, function(item) {
                        return item.label !== option.label;
                    });
                });
            }

            if ($scope.question && $scope.question.slug === 'mapping-modal-1') {
                if ($scope.$parent.activeMarker.answers && $scope.$parent.activeMarker.answers.length) { // editing Location
                    if ($scope.question.hoisted_options && $scope.question.hoisted_options.length) {
                        _.each($scope.question.hoisted_options, function(option) {
                            if (_.findWhere($scope.$parent.activeMarker.answers[0], {text: option.text})) {
                                option.checked = true;
                            };
                        });
                    }
                    if ($scope.question.options && $scope.question.options.length) {
                        _.each($scope.question.options, function(option) {
                            if (_.findWhere($scope.$parent.activeMarker.answers[0], {text: option.text})) {
                                option.checked = true;
                            };
                        });
                    }
                }                
            } else if ($scope.question && $scope.question.slug === 'mapping-modal-2') {
                if ($scope.$parent.activeMarker.answers.length > 1) {
                    $scope.answer = $scope.$parent.activeMarker.answers[1];
                }
            } else if ($scope.question && $scope.question.slug === 'mapping-modal-3') {
                if ($scope.$parent.activeMarker.answers.length > 2) { // editing location
                    if ($scope.question.hoisted_options && $scope.question.hoisted_options.length) {
                        _.each($scope.question.hoisted_options, function(option) {
                            if (_.findWhere($scope.$parent.activeMarker.answers[2], {text: option.text})) {
                                option.checked = true;
                            };
                        });
                    }
                    if ($scope.question.options && $scope.question.options.length) {
                        _.each($scope.question.options, function(option) {
                            if (_.findWhere($scope.$parent.activeMarker.answers[2], {text: option.text})) {
                                option.checked = true;
                            };
                        });
                    }
                }      
            } else if ($scope.question && $scope.question.slug === 'mapping-modal-4') {
                if ($scope.$parent.activeMarker.answers.length > 3) { // editing location
                    if ($scope.question.options && $scope.question.options.length) {
                        _.each($scope.question.options, function(option) {
                            if ($scope.$parent.activeMarker.answers[3].text === option.text) {
                                option.checked = true;
                            };
                        });
                    }
                }
            } else if ($scope.question && $scope.question.slug === 'mapping-modal-5') {
                if ($scope.$parent.activeMarker.answers.length > 4) { // editing location
                    $scope.answer = $scope.$parent.activeMarker.answers[4];
                }
            } else if ($scope.question && $scope.question.slug === 'mapping-modal-6') {
                if ($scope.$parent.activeMarker.answers.length > 5) { // editing location
                    if ($scope.question.options && $scope.question.options.length) {
                        _.each($scope.question.options, function(option) {
                            if ($scope.$parent.activeMarker.answers[5].text === option.text) {
                                option.checked = true;
                            };
                        });
                    }
                }
            }

            // Update the progress bar width
            var questionNum = _.indexOf($scope.survey.questions, $scope.question) + 1;
            $scope.progressWidth = (questionNum / $scope.survey.questions.length) * 100;
        }; // end loadSurvey 

        $scope.viewPath = app.viewPath;
        if ($routeParams.uuidSlug && $routeParams.uuidSlug !== 'online' && !_.string.startsWith($routeParams.uuidSlug, 'offline') && app.offline) {
            $http.get(app.server + '/api/v1/survey/' + $routeParams.surveySlug + '/?format=json').success(function(data) {
                var responses = [];
                app.data = {
                    survey: data
                };
                $scope.loadSurvey({
                    survey: data,
                    responses: responses
                });
            });
        } else if ($routeParams && app.data && $routeParams.uuidSlug === app.data.uuid) {
            // online surveys that have already been started
            $scope.loadSurvey({
                survey: app.data.survey,
                responses: app.data.responses
            });
        } else if ($routeParams && _.string.startsWith($routeParams.uuidSlug, 'offline') && app.offline) {
            var ts = new Date();
            if ($routeParams.uuidSlug === 'offline') {
                $scope.answers = [];
                if (!app.respondents) {
                    app.respondents = {};
                }
                $routeParams.uuidSlug = ['offline', app.user.username, ts.getTime()].join('_');
                app.respondents[$routeParams.uuidSlug] = 'hapifish-' + $routeParams.uuidSlug;
                app.currentRespondent = {
                    uuid: $routeParams.uuidSlug,
                    survey: $routeParams.surveySlug,
                    ts: ts,
                    responses: []
                }
                $scope.saveState(app);
            }
            app.currentRespondent = JSON.parse(localStorage.getItem('hapifish-' + $routeParams.uuidSlug));
            if (!app.currentRespondent) {
                app.currentRespondent = {
                    responses: []
                }
            }

            $scope.loadSurvey({
                survey: _.findWhere(app.surveys, {
                    slug: $routeParams.surveySlug
                }),
                responses: app.currentRespondent.responses
            });
        } else {
            if ($routeParams.uuidSlug === 'online') {
                app.offline = false;

                $http.get(app.server + '/respond/' + $routeParams.surveySlug + '?get-uid=true').success(function(data) {
                    $location.path(['survey', $routeParams.surveySlug, data.uuid].join('/'));
                }).error(function(data, status, headers, config) {
                    $scope.survey.status = 'invalid';
                });

            } else {
                $http.get(app.server + '/api/v1/respondant/' + $routeParams.uuidSlug + '/?format=json').success(function(data) {
                    app.data = data;
                    $scope.loadSurvey(data);
                }).error(function(data, status, headers, config) {
                    $scope.survey.status = 'invalid';
                });
            }

        }
    });
