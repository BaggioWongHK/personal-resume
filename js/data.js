var personalDetails = {
    'title': 'Personal details',
    'html': '<p><strong>Basic details</strong></p>\n' +
    '<p><strong>Name</strong>: Baggio Wong<br /><strong>Email</strong>: baggio.wong.hk@gmail.com<br /><strong>Nationality</strong>: Canadian / Hong Kong<br /><strong>GitHub</strong>: <a href="https://github.com/baggiowong" target="_blank">https://github.com/baggiowong</a> (old), <a href="https://github.com/baggiowonghk" target="_blank">https://github.com/baggiowonghk</a> (current)</p>' +
    '<p><strong>FAQ&rsquo;s</strong></p>\n' +
    '<p><iframe id="self-intro-video" width="468" height="263" src="https://www.youtube.com/embed/v9xN-cMuFz4" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe></p>\n' +
    '<p class="self-intro-video-times"><a href="#" class="self-intro-1">00:38</a> What do you have to offer? What are your strengths and weaknesses?<br /><a href="#" class="self-intro-2">05:11</a> What are you looking for?<br /><a href="#" class="self-intro-3">07:10</a> Why China instead of the US or UK?&nbsp;<br /><a href="#" class="self-intro-4">09:51</a> Why take a gap year and what did you do? Why teach instead of code after graduation?<br /><a href="#" class="self-intro-5">13:19</a> Why did you choose to study software? Languages? Marketing?&nbsp;<br /><a href="#" class="self-intro-6">18:33</a> Why did you decide to come (back) here? Why not continue with what you&rsquo;re doing?&nbsp;<br /><a href="#" class="self-intro-7">21:06</a> Who do you identify as?</p>' +
    '<p><strong>Technologies</strong></p>\n' +
    '<p><strong>Fairly familiar</strong>: Java, Javascript, AngularJS, Angular<br /><strong>Have written</strong>: PHP, NodeJS (Express.js), jQuery, MySQL<br /><strong>Want to learn</strong>: Python, React, software testing</p>\n' +
    '<p><strong>Natural languages</strong></p>\n' +
    '<p><strong>Native</strong>: English, Cantonese, Mandarin<br /><strong>Conversational</strong>: Japanese, French, Korean<br /><strong>Basic</strong>: Spanish</p>\n' +
    '<p><strong>Me speaking seven languages</strong></p>\n' +
    '<p><iframe id="language-video" src="https://www.youtube.com/embed/6vbVAU2Fx40?rel=0" width="468" height="263" frameborder="0" allowfullscreen="allowfullscreen"></iframe></p>\n' +
    '<p class="language-video-times"><a href="#" class="en-portion">0:04</a> English<br /><a href="#" class="zh-portion">2:06</a> Mandarin<br /><a href="#" class="yu-portion">3:55</a> Cantonese<br /><a href="#" class="es-portion">5:16</a> Spanish<br /><a href="#" class="ko-portion">6:45</a> Korean<br /><a href="#" class="fr-portion">8:22</a> French<br /><a href="#" class="jp-portion">10:31</a> Japanese</p>' +
    '<p><strong>Hobbies</strong></p>\n' +
    '<ul>\n' +
    '<li>Language learning - currently on French, moving on to Spanish next! :)</li>\n' +
    '<li>TV shows - Scandal, HTGAWM, Supernatural my top three now</li>\n' +
    '<li>Badminton, but haven&rsquo;t played in a while :(</li>\n' +
    '</ul>',
};

var languageVideoLink = 'https://www.youtube.com/embed/6vbVAU2Fx40?rel=0';

var languageVideoTimes = {
    'en': 4,
    'zh': 126,
    'yu': 235,
    'es': 316,
    'ko': 405,
    'fr': 502,
    'jp': 631,
};

var selfIntroVideoLink = 'https://www.youtube.com/embed/v9xN-cMuFz4?rel=0';

var selIntroVideoTimes = { // key represents question number, starting from 1
    1: 38,
    2: 311,
    3: 430,
    4: 591,
    5: 799,
    6: 1113,
    7: 1266,
};

var timelinePoints = {
    'EN': timelineEN,
    'ZH': timelineZH,
};