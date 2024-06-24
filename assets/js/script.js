function pickingMode() {
    $('#screen').html(`
    <div class='modal'>
        <div id='modal-controls'>
            <div id='clickimages'>
                <div id='leftclick'>
                    <div></div>
                    <p class='desktop-controls'><span class='highlight'>Left click</span> on an apple to pick it.</p>
                    <p class='mobile-controls'><span class='highlight'>Tap</span> on an apple to pick it.</p>
                    </div>
                <div id='rightclick'>
                    <div></div>
                    <p class='desktop-controls'><span class='highlight'>Right click</span> on an apple to drop it to the ground.</p>
                    <p class='mobile-controls'><span class='highlight'>Swipe down</span> on an apple to drop it to the ground.</p>
                </div>
            </div>
            <div id='gamestart' class='prevent-select'>
                <p>START THE DAY!</p>
            </div>       
            </div>
    </div>

    <div id='tree-bg-div'></div>
    <div id='content'>
        <div id='timer-div' class='prevent-select'>
            <h1>8:00</h1>
        </div>
        <div id='apple-div'>
            
        </div>
        <div id='apple-bin' class='prevent-select'>
            <img src='assets/images/bin.png'>
        </div>
    </div>
    `);
    $('#screen').removeClass('start-screen').addClass('picking-screen');
};

$('#start-button').on('click', pickingMode);

$(document).contextmenu(function() {
    return false;
});

/*-----------*/

let binApples = 0;

function applesAppear() {

    let applePositionTop = Math.floor(Math.random()*100) + '%';
    let applePositionLeft = Math.floor(Math.random()*100) + '%';

    function appleType() {
    
        let applePicturesArray = [`<img src="assets/images/apple.png" class="apple-picture prevent-select" style="top:${applePositionTop}; left:${applePositionLeft}"></img>`, `<img src="assets/images/apple2.png" class="apple-picture prevent-select" style="top:${applePositionTop}; left:${applePositionLeft}">`, `<img src="assets/images/apple3.png" class="apple-picture prevent-select" style="top:${applePositionTop}; left:${applePositionLeft}">`, `<img src="assets/images/apple-bad.png" class="apple-picture bad-apple prevent-select" style="top:${applePositionTop}; left:${applePositionLeft}">`, `<img src="assets/images/apple-bad2.png" class="apple-picture bad-apple prevent-select" style="top:${applePositionTop}; left:${applePositionLeft}">`, `<img src="assets/images/apple-bad3.png" class="apple-picture bad-apple prevent-select" style="top:${applePositionTop}; left:${applePositionLeft}">`];
    
        let appleNum = Math.floor(Math.random()*100)+1;
    
        console.log(appleNum);
    
        switch (true) {
            case (appleNum <= 17):
                console.log('1');
                return applePicturesArray[0];
            case (appleNum <= 34):
                console.log('2');
                return applePicturesArray[1];
            case (appleNum <= 51):
                console.log('3');
                return applePicturesArray[2];
            case (appleNum <= 67):
                console.log('4');
                return applePicturesArray[3];
            case (appleNum <= 83):
                console.log('5');
                return applePicturesArray[4];
            case (appleNum <= 100):
                console.log('6');
                return applePicturesArray[5];
        }
    
    }

    console.log(appleType());

    let applePicture = `${appleType()}`;
    $('#apple-div').append(applePicture);

    console.log(applePositionTop, applePositionLeft);

}

function newTree(){
    let appleAmount = Math.floor(Math.random() * 35.99 + 5);
    console.log(appleAmount);
    for (let i = 0; i < appleAmount; i++) {
        applesAppear();
      }
} 

$(document).on('click', '#gamestart', newTree);
$(document).on('click', '#gamestart', timer);
$(document).on('click', '#gamestart', (function(){
    $('.modal').remove();
  }));

let applesPicked = 0;
let badApples = 0;

function pickApple(){
    applesPicked++;
    binApples++;
    if ($(this).hasClass("bad-apple")){
        badApples++;
    }
    console.log(applesPicked);
    console.log(binApples);
    console.log(badApples);
    $(this).animate({height: '+=50px', width: '+=50px'});
    $(this).animate({height: '1px', width: '1px', opacity: 0}).promise().done(function() {
        $(this).remove();
        console.log('Apple removed');
        showBinFullnessLevel();
        nextBin();
        nextTree();    
    });
}

$(document).on('click', '.apple-picture', pickApple);

function dropApple(){
    $(this).animate({top: '+=200', opacity: 0}).promise().done(function() {
        $(this).remove();
        console.log('Apple removed');
        nextTree();    
    });
}

$(document).on('contextmenu', '.apple-picture', dropApple);
$(document).on('swipedown', '.apple-picture', dropApple);
/* $('.apple-picture').bind('swipedown', dropApple); */

function nextBin(){
    
    if (binApples >= 43){
        binApples = 0;
        let windowWidth = $(window).width();
        let binWidth = $('#apple-bin').outerWidth();
        let finalMarginLeft = (windowWidth - binWidth) / 2;
        
        $('#apple-bin').animate({marginLeft: 0, opacity: 0}, 'slow', function() {
            $(this).css({marginLeft: '100%'});
        });
        $('#apple-bin').animate({marginLeft: finalMarginLeft, opacity: 1}, 'slow');
    }
}

function showBinFullnessLevel(){
    switch(true){
        case (binApples < 15):
            $('#apple-bin').html(`
                <img src='assets/images/bin2.png'></img>
            `);
            break;
        case (binApples < 30):
            $('#apple-bin').html(`
                <img src='assets/images/bin3.png'></img>
            `);
            break;
        case (binApples < 43):
            $('#apple-bin').html(`
                <img src='assets/images/bin4.png'></img>
            `);
            break;
        case (binApples == 43):
            $('#apple-bin').html(`
                <img src='assets/images/bin5.png'></img>
            `);
            break;
    }
}

function nextTree(){
    if ($('#apple-div').children().length === 0) {
        console.log('yeah');

        let windowWidth = $(window).width();
        let binWidth = $('#tree-bg-div').outerWidth();
        let finalMarginLeft = (windowWidth - binWidth) / 2;
        
        $('#tree-bg-div').animate({marginLeft: '-100%'}, 'slow', function() {
            $(this).css({marginLeft: '100%'});
        });
        $('#tree-bg-div').animate({marginLeft: finalMarginLeft}, 'slow', function(){
            newTree();
        });
    
        

        console.log('yeah yeah');
    }
}

function timer() {
    let seconds = 0;

    let interval = setInterval(displayTime, 1000);

    function displayTime(){
        seconds++;
        console.log(seconds);
        switch(true){
            case (seconds < 5):
                $('#timer-div h1').html('8:00');
                break;
            case (seconds < 10):
                $('#timer-div h1').html('8:15');
                break;
            case (seconds < 15):
                $('#timer-div h1').html('8:30');
                break;
            case (seconds < 20):
                $('#timer-div h1').html('8:45');
                break;
            case (seconds < 25):
                $('#timer-div h1').html('9:00');
                break;
            case (seconds < 30):
                $('#timer-div h1').html('9:15');
                break;
            case (seconds < 35):
                $('#timer-div h1').html('9:30');
                break;
            case (seconds < 40):
                $('#timer-div h1').html('9:45');
                break;
            case (seconds < 45):
                $('#timer-div h1').html('10:00');
                break;
            case (seconds < 50):
                $('#timer-div h1').html('10:15');
                break;
            case (seconds < 55):
                $('#timer-div h1').html('10:30');
                break;
            case (seconds < 60):
                $('#timer-div h1').html('10:45');
                break;
            case (seconds < 65):
                $('#timer-div h1').html('11:00');
                break;
            case (seconds < 70):
                $('#timer-div h1').html('11:15');
                break;
            case (seconds < 75):
                $('#timer-div h1').html('11:30');
                break;
            case (seconds < 80):
                $('#timer-div h1').html('11:45');
                break;
            case (seconds < 85):
                $('#timer-div h1').html('12:00');
                break;
            case (seconds < 90):
                $('#timer-div h1').html('12:15');
                break;
            case (seconds < 95):
                $('#timer-div h1').html('12:30');
                break;
            case (seconds < 100):
                $('#timer-div h1').html('12:45');
                break;
            case (seconds < 105):
                $('#timer-div h1').html('13:00');
                break;
            case (seconds < 110):
                $('#timer-div h1').html('13:15');
                break;
            case (seconds < 115):
                $('#timer-div h1').html('13:30');
                break;
            case (seconds < 120):
                $('#timer-div h1').html('13:45');
                break;
            case (seconds < 125):
                $('#timer-div h1').html('14:00');
                break;
            case (seconds < 130):
                $('#timer-div h1').html('14:15');
                break;
            case (seconds < 135):
                $('#timer-div h1').html('14:30');
                break;
            case (seconds < 140):
                $('#timer-div h1').html('14:45');
                break;
            case (seconds < 145):
                $('#timer-div h1').html('15:00');
                break;
            case (seconds < 150):
                $('#timer-div h1').html('15:15');
                break;
            case (seconds < 155):
                $('#timer-div h1').html('15:30');
                break;
            case (seconds < 160):
                $('#timer-div h1').html('15:45');
                break;
            case (seconds >= 165):
                $('#timer-div h1').html('16:00');
                endScreen();
                clearInterval(interval);
                break;
        }
    }
}

function endScreen () {
    
    let badApplePercentage = 0;
    if (applesPicked > 0) {
        badApplePercentage = Math.floor((badApples / applesPicked) * 100);
    }

    let binsPicked = 0;
    if (applesPicked > 0) {
        binsPicked = (applesPicked/43).toFixed(1);
    }

    $('#screen').html(`
    <div id ='win-fail-div' class='prevent-select'>
    </div>
    <div id='outcome-text-div'>
        <div>
            <h2>You have picked ${binsPicked} bins of apples.</h2>
            <h2><span id='rotten-percentage'>${badApplePercentage}%</span> of them were rotten... <span id='rotten-appraisal'><span></h2>
            <h2>Your supervisor <span id='supervisor-span'></span></h2>
            <h2>"<span id='supervisor-says'></span>", he says to you.</h2>
            <h2>The work day is over. <span id='what-next-span'></span></h2>
        </div>
    </div>
    <div id='score-div'class='prevent-select'>
        <p>TOTAL SCORE: <span id='score-span'></span></p>
    </div>
    <div id='tryagain'class='prevent-select'>
        <p>GIVE IT ANOTHER GO!</p>
    </div>
        `);
    
    $('#screen').removeClass('picking-screen').addClass('end-screen');

    if (applesPicked >= 151 && badApplePercentage <= 5){
        $('#win-fail-div').html(`
            <h1>APPLE VICTORIA!</h1>
        `)
        $('#supervisor-span').html('is very pleased with your work.');
        $('#supervisor-says').html('Good speed, good fruit quality; you\'ve done well, kid');
        $('#what-next-span').html('Give yourself a pat on the back - you\'ve earned it! As you retreat to your caravan to enjoy the rest of your day, you wonder if you can be even better tomorrow?...');
        $('#score-span').html(applesPicked);
    } else if (applesPicked >= 151 && badApplePercentage > 5){
        $('#win-fail-div').html(`
            <h1>APPLE DEFEAT!</h1>
        `)
        $('#supervisor-span').html('is not impressed.');
        $('#supervisor-says').html('Good speed, but the fruit quality is awful. Would you buy these apples? I would not. We can\'t do much with them');
        $('#what-next-span').html('The supervisor was probably right - although the beauty standards for apples are unreasonably high, most people still prefer their fruits without mushy bits, mould, or worms. You\'ll need to do better tomorrow...');
        $('#score-span').html('0');
    } else if (applesPicked < 151 && badApplePercentage <= 5){
        $('#win-fail-div').html(`
            <h1>APPLE DEFEAT!</h1>
        `)
        $('#supervisor-span').html('looks slightly disappointed.');
        $('#supervisor-says').html('Good quality, but you really need to speed up. The farm will take losses if you don\'t, and the owners won\'t be happy about that...');
        $('#what-next-span').html('As you go back to your caravan, you hear your peers bragging about how much they picked today. If they can do it, surely you can get there, too? Tomorrow, you think to yourself. You will be faster tomorrow.');
        $('#score-span').html('0');
    } else {
        $('#win-fail-div').html(`
            <h1>APPLE DEFEAT!</h1>
        `)
        $('#supervisor-span').html('looks at you in disbelief.');
        $('#supervisor-says').html('You spent all day picking THAT? The quality is appaling, and you haven\'t even picked 3,5 bins. What am I supposed to do with you?');
        $('#what-next-span').html('You don\'t know what your supervisor will do with you, but you sure hope it doesn\'t involve being sent to the packhouse. There is a reason everybody hates it there. You better do much, MUCH better tomorrow...');
        $('#score-span').html('0');
    }

    if (badApples == 0){
        $('#rotten-percentage').html('None');
        $('#rotten-appraisal').html('Very impressive! Such commendable attention to detail!');
    } else if (badApplePercentage == 0){
        $('#rotten-percentage').html('Hardly any');
        $('#rotten-appraisal').html('Good. This is what we want.');
    } else if (badApplePercentage <= 5){
        $('#rotten-percentage').html(`${badApplePercentage}%`);
        $('#rotten-appraisal').html('This will do.');
    } else {
        $('#rotten-percentage').html(`${badApplePercentage}%`);
        $('#rotten-appraisal').html('Sadly, this is below satisfactory.');
    }


    
    console.log(badApplePercentage);
}


$(document).on('click', '#tryagain p', function(){
    $('#screen').removeClass('end-screen').addClass('picking-screen');
    binApples = 0;
    applesPicked = 0;
    badApples = 0;
    pickingMode();
});