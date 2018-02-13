var functionBarState = 0; // 0 is hidden; 1 is shown
var currentLang = "EN";
var chronologicalToggle = 1; // 0 is decreasing order; 1 is increasing order

$(window).on('load', function() {
    displayTimelinePoints(true);

    $('[data-toggle="tooltip"]').tooltip();

    $('.timeline-splice').click(disableEmptyModals);

    var musicSource = document.getElementById('relaxing-audio');
    musicSource.play();

    $('.ion-pause').on('click', pauseMusic);

    $('.ion-play').on('click', playMusic);

    $('.musicSlider').on('change', changeMusicTime);

    setInterval(updateSliderPosition, 1000);

    $('.pulldown-menu').on('click', toggleFunctionBar);

    $('.language-chooser .page-item').on('click', changeDisplayLanguage);

    $('.chronological-switch').on('change', toggleSwitchValue);

    $('.my-headshot').on('click', displayPersonalModal);

});

//  timeline slice and related elements' heights recalculated on resize
$(window).on('resize', repositionTimelinePoints);

$(window).on('resize', resizeVideos);

function resizeVideos() {
    var aspectRatio = 560/315;

    var modalWidth = $('#timeline-details-modal .modal-body').width();

    var videoWidth = modalWidth;
    var videoHeight = videoWidth / aspectRatio;

    $('#language-video').attr('width', videoWidth);
    $('#language-video').attr('height', videoHeight);

    $('#self-intro-video').attr('width', videoWidth);
    $('#self-intro-video').attr('height', videoHeight);
}

function displayPersonalModal() {
    $('#timeline-details-modal .modal-title').text(personalDetails.title);
    $('#timeline-details-modal .modal-body').html(personalDetails.html);

    $('.language-video-times a').on('click', function (event) {
        var language = event.currentTarget.className.split('-')[0];
        var timeSkippedLink = languageVideoLink + '&start=' + languageVideoTimes[language];

        $('#language-video').attr('src', timeSkippedLink);
    });

    $('.self-intro-video-times a').on('click', function (event) {
        var questionNumber = event.currentTarget.className.split('-')[2];
        var timeSkippedLink = selfIntroVideoLink + '&start=' + selIntroVideoTimes[questionNumber];

        $('#self-intro-video').attr('src', timeSkippedLink);
    });
}

function toggleSwitchValue() {
    chronologicalToggle = $('.chronological-switch input').is(':checked');

    repositionTimelinePoints();
}

function changeDisplayLanguage(event) {
    currentLang = event.currentTarget.innerText.trim();

    $('.language-chooser .page-item').each(function unhighlightPageItems() {
        $(this).removeClass('active');
    });
    $(this).addClass('active');

    repositionTimelinePoints();
}

function toggleFunctionBar() {
    if (!functionBarState) {
        $('.function-bar').addClass('show-function-bar');
        $(this).addClass('show-pulldown-menu');
        functionBarState = 1;
    } else {
        $('.function-bar').removeClass('show-function-bar');
        $(this).removeClass('show-pulldown-menu');
        functionBarState = 0;
    }
}

function updateSliderPosition() {
    var musicSource = document.getElementById('relaxing-audio');
    var currentTime = musicSource.currentTime;
    var duration = musicSource.duration;
    var musicSliderValue = currentTime / duration * 100;

    $('.musicSlider').val(musicSliderValue);
}

function changeMusicTime() {
    var musicSource = document.getElementById('relaxing-audio');
    var sliderValue = $('.musicSlider').val();
    var trackLength = musicSource.duration;

    musicSource.currentTime = trackLength * (sliderValue / 100);
}

function playMusic() {
    document.getElementById('relaxing-audio').play();
    $(this).css('display', 'none');
    $('.ion-pause').css('display', 'initial');
}

function pauseMusic() {
    document.getElementById('relaxing-audio').pause();
    $(this).css('display', 'none');
    $('.ion-play').css('display', 'initial');
}

function repositionTimelinePoints() {
    var timelinePointsCount = 0;

    for (point in timelinePoints[currentLang]) {
        timelinePointsCount++;
        $('#' + point).remove();
    }

    displayTimelinePoints(chronologicalToggle);

    $('.timeline-splice').click(disableEmptyModals);
}

function disableEmptyModals(event) {
    var originId = event.currentTarget.id;
    var modalBodyText = timelinePoints[currentLang][originId]['long'];

    if (modalBodyText === '') {
        event.stopPropagation();
    }

    $('#timeline-details-modal .modal-title').text(originId);
    $('#timeline-details-modal .modal-body').html(modalBodyText);
}

function displayTimelinePoints(reverseTimeline) {
    //  get number of data points
    var timelinePointsCount = 0;
    var timelineKeys = [];

    for (point in timelinePoints[currentLang]) {
        timelinePointsCount++;
        timelineKeys.push(point);
    }

    if (reverseTimeline) {
        timelineKeys.reverse();
    }

    //  clone the timeline-splice div layer that many times
    var loopCount = 0;

    for ( ; loopCount < timelinePointsCount; loopCount++) {
        var clonedLayer = (chronologicalToggle) ? ($('#original-timeline-splice-reverse').clone())
                                                : ($('#original-timeline-splice').clone());

        if (chronologicalToggle && loopCount === 0) {
            clonedLayer.find('hr').remove();
            clonedLayer.find('.project-details').remove();
        }

        if (!chronologicalToggle && loopCount === timelinePointsCount - 1) {
            clonedLayer.find('hr').remove();
            clonedLayer.find('.project-details').remove();
        }

        // assign each layer an id based on the year
        clonedLayer.attr('id', timelineKeys[loopCount]);
        clonedLayer.css('display', 'block');

        // fill in the respective fields
        clonedLayer.find('.date-year').html(timelineKeys[loopCount]);
        clonedLayer.find('.summary-text').html(timelinePoints[currentLang][timelineKeys[loopCount]]['short']);

        //  append to main timeline
        clonedLayer.appendTo('.main-timeline');

        //  adjust the timeline hr, splice and whole layer heights
        var summaryBoxHeight = (clonedLayer.find('.project-details').height()) ? clonedLayer.find('.project-details').height() : 0 ;
        clonedLayer.find('hr').css('height', summaryBoxHeight + 'px');
        clonedLayer.css('height', (summaryBoxHeight + 30) + 'px');
        clonedLayer.find('.project-details').css('bottom', (summaryBoxHeight + 50) + 'px');
    }
}