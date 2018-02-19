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

/**
 * @description Dynamically resize YouTube video embeds
 * as the window resizes. The aspect ratio is based on
 * YouTube videos' default ratio in the embed code,
 * 560 x 315.
 */
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

/**
 * @description The data is filled in respectively in the
 * popup modal. Time skip links handlers are added here
 * for two respective videos in the modal. Note that they
 * are added here because these time skip links only exist
 * after the HTML have been set in the modal.
 */
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

/**
 * @description This repositions all timeline points in
 * chronological or reverse chronological order based on
 * the chronological toggle value (which is the slider
 * element in the slide down function bar).
 */
function toggleSwitchValue() {
    chronologicalToggle = $('.chronological-switch input').is(':checked');

    repositionTimelinePoints();
}

/**
 * @description This grabs the currently selected language
 * (the default is English), and changes the display language
 * of the timeline points based on the language input. This
 * also changes the highlighted language in the language bar.
 * Note that interface elements are not changed - ONLY timeline
 * elements have translations available currently.
 * @param {MouseEvent} event
 */
function changeDisplayLanguage(event) {
    currentLang = event.currentTarget.innerText.trim();

    $('.language-chooser .page-item').each(function unhighlightPageItems() {
        $(this).removeClass('active');
    });
    $(this).addClass('active');

    repositionTimelinePoints();
}

/**
 * @description This toggles the function bar when the
 * down arrow is clicked.
 */
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

/**
 * @description This calculates the time of the music track playing
 * as a percentage of the entire track length, and moves the
 * slider button to its appropriate position in the music slider.
 */
function updateSliderPosition() {
    var musicSource = document.getElementById('relaxing-audio');
    var currentTime = musicSource.currentTime;
    var duration = musicSource.duration;
    var musicSliderValue = currentTime / duration * 100;

    $('.musicSlider').val(musicSliderValue);
}

/**
 * @description This grabs the current slider value, and
 * based on its position relative to the whole slider, changes
 * the background music track to the appropriate position.
 */
function changeMusicTime() {
    var musicSource = document.getElementById('relaxing-audio');
    var sliderValue = $('.musicSlider').val();
    var trackLength = musicSource.duration;

    musicSource.currentTime = trackLength * (sliderValue / 100);
}

/**
 * @description Pressing this changes the pause icon to a
 * play icon and plays the music track.
 */
function playMusic() {
    document.getElementById('relaxing-audio').play();
    $(this).css('display', 'none');
    $('.ion-pause').css('display', 'initial');
}

/**
 * @description Pressing this changes the play icon to a
 * pause icon and pauses the music track.
 */
function pauseMusic() {
    document.getElementById('relaxing-audio').pause();
    $(this).css('display', 'none');
    $('.ion-play').css('display', 'initial');
}

/**
 * @description This removes all the timeline points, and
 * repositions them again. We do this to reflect changes
 * in settings, such as chronological order and display
 * language.
 */
function repositionTimelinePoints() {
    var timelinePointsCount = 0;

    for (point in timelinePoints[currentLang]) {
        timelinePointsCount++;
        $('#' + point).remove();
    }

    displayTimelinePoints(chronologicalToggle);

    $('.timeline-splice').click(disableEmptyModals);
}

/**
 * @description When clicking on a timeline event, a modal
 * should appear, containing the relevant data relative to
 * the timeline box associated with the modal. However, if
 * the timeline box is originally empty, we disable the
 * modal from popping up in the first place.
 * @param {MouseEvent} event
 */
function disableEmptyModals(event) {
    var originId = event.currentTarget.id;
    var modalBodyText = timelinePoints[currentLang][originId]['long'];

    if (modalBodyText === '') {
        event.stopPropagation();
    }

    $('#timeline-details-modal .modal-title').text(originId);
    $('#timeline-details-modal .modal-body').html(modalBodyText);
}

/**
 * @description This is the main function body that displays
 * the timeline points along the vertical timeline dynamically.
 * When the window resizes, these need to be re-calculated so
 * each vertical stretch of the whole timeline matches the height
 * of the box containing the text associated with each year along
 * the timeline.
 * @param reverseTimeline
 */
function displayTimelinePoints(reverseTimeline) {
    //  get number of data points
    var timelinePointsCount = 0;
    var timelineKeys = [];

    //  all the years in the timeline array
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

        //  the "now" box in reverse order is just a dot, we remove the stretch of
        //  vertical line and the box associated with other lines
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