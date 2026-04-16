/**
 * Generates a random task and punishment pair.
 * Returns a template literal containing the HTML structure.
 */
function getNewHtml() {
    const tasks = [
        // --- Social Chaos & Acting ---
        'Convince a stranger you are a time traveler from 1920',
        'Ask someone for directions to the nearest "intergalactic portal"',
        'Join another table and act like you have been friends with them for years',
        'High-five 5 different strangers in under 60 seconds',
        'Ask a stranger for their best "Dad Joke" and react like it is the funniest thing ever',
        'Convince someone the moon is actually an egg',
        'Speak in a Shakespearean accent for the next 10 minutes',
        'Try to "sell" a napkin to the table like it is a high-end luxury product',
        'Give a 30-second dramatic eulogy for your last meal',
        'Sing "Happy Birthday" to a random person in the room',
        'Narrate your own life like a nature documentary for 2 minutes',
        'Pretend to be a ghost haunting the table for the next round',
        'Speak only in rhymes for the next 5 minutes',
        'Give a review of the current room as if you are a world-class food critic',
        'Mime how to make a complicated sandwich without speaking',
        'Pretend to be a waiter and try to "refill" everyone’s water with an empty bottle',
        'Act like you are on a cooking show while eating your next snack',
        'Tell a story about a fictional childhood pet named "Barnaby"',
        'Explain a complex scientific concept using only one-syllable words',
        'Propose to a random object on the table with a 30-second speech',
        'Pretend you have a very important, top-secret phone call using a shoe',
        'Act like you just discovered fire for the first time',
        'Critique everyone’s outfit as if you are a high-fashion designer',
        'Try to convince the person to your left that you can see their aura',
        'React to everything someone says with "That’s what the squirrels want you to think"',

        // --- Physical & Skill Challenges ---
        'Do 20 pushups immediately',
        'Balance a coaster on your head for a full minute without it falling',
        'Recite the alphabet backward without a single mistake',
        'Arm wrestle the person to your right',
        'Try to lick your own elbow',
        'Stand on one leg until your next turn',
        'Do a "slow-motion" walk across the room and back',
        'Try to juggle three napkins for at least 5 seconds',
        'Do your best impression of a chicken for 30 seconds',
        'Challenge the person opposite you to a thumb war',
        'Draw a portrait of someone at the table using your non-dominant hand',
        'Balance three pens on the back of your hand simultaneously',
        'Walk like a penguin for 30 seconds',
        'Do 15 jumping jacks while explaining why you like cheese',
        'Try to stack 5 different items from the table into a tower',
        'Hold a plank for 60 seconds while someone narrates it like a sporting event',
        'Perform a "dramatic hair flip" every time you speak for 5 minutes',
        'Stare at a wall intensely for 30 seconds without blinking',
        'Mime an entire conversation with an invisible person sitting next to you',
        'Make a crown out of napkins and wear it for the next 10 minutes',

        // --- Trivia & Mental Games ---
        'Name 10 types of fruit in under 10 seconds',
        'Explain the plot of a famous movie as badly as possible',
        'Tell the table a "secret" that sounds fake but is actually true',
        'Invent a new holiday and explain its traditions to the group',
        'Give a 1-minute "TED Talk" on why pineapples belong on pizza',
        'Name 5 countries starting with the letter "B" in 5 seconds',
        'Try to guess everyone’s middle names at the table',
        'Tell a "Dad joke" that actually makes someone groan',
        'Describe a color to the group without using its name',
        'List 7 things you would take to a desert island in 15 seconds',

        // --- Miscellaneous Absurdity ---
        'Whisper everything you say for the next round',
        'Swap one shoe with the person to your left for 10 minutes',
        'Shadowbox your own reflection for a full minute',
        'Communicate only through interpretive dance for the next 2 minutes',
        'Make a beatbox beat for 20 seconds while someone else raps about napkins',
        'Every time you speak, you must end your sentence with "meow"',
        'Act like a "human statue" and don’t move until someone says your name',
        'See how many napkins you can balance on your head while sitting still',
        'Do your best "supervillain" laugh at a random interval',
        'Try to make the person to your left laugh without touching them',
        'Sing the chorus of a popular song in a very high-pitched voice',
        'Recite a poem about a potato',
        'Do your best impression of a celebrity of the group’s choice',
        'Describe your dream vacation in extreme detail for 1 minute',
        'Make a sound like a mythical creature every time you drink'
    ];

const punishments = [
        'Do 20 star jumps while yelling "I am a champion"',
        'Wear your socks on your hands for the next 10 minutes',
        'Address everyone as "Your Majesty" until your next turn',
        'Do a lap of the room in slow motion',
        'Let the person to your left draw a unibrow on you',
        'Stand on one leg for the entire next round',
        'Talk to your drink as if it’s breaking up with you',
        'Try to touch your nose with your tongue 10 times',
        'Do your best impression of a vacuum cleaner for 30 seconds',
        'Call a random contact and sing "Happy Birthday" then hang up',
        'Hold a plank for 45 seconds',
        'Balance a spoon on your nose for 30 seconds',
        'Walk like a crab for a full lap of the table',
        'Every sentence must end with "over and out" for 5 minutes',
        'Mime your life story in 60 seconds',
        'Wear your jacket backward and zipped up for 10 minutes',
        'Do 15 squats while maintain eye contact with someone',
        'Give a 2-minute lecture on why forks are better than spoons',
        'Pretend to be a human statue for 2 minutes',
        'Recite the alphabet backward while hopping',
        'Speak in a pirate accent until the next round',
        'Do 10 pushups right now',
        'Let the group post a random emoji to your social media',
        'Exchange a piece of clothing with the person to your right',
        'Sit on the floor for the next 10 minutes',
        'Act like a chicken until someone gives you a high five',
        'Try to juggle three random items from the table',
        'Stare at a wall and apologize to it for 1 minute',
        'Mime that you are stuck in a glass box',
        'Attempt a headstand (or just a really low bow)',
        'Wink at everyone who walks past for 3 minutes',
        'Talk like you have a heavy cold for the next round',
        'Act like a waiter and try to take a fake order',
        'Recite a poem about a potato with deep emotion',
        'Do your best "evil villain" laugh every time someone speaks',
        'Only use your non-dominant hand for the next 15 minutes',
        'Pretend your hand is a puppet and have a conversation with it',
        'Make a crown out of napkins and wear it',
        'Do a dramatic death scene right now',
        'Bark like a dog whenever someone says "drink"',
        'High-five 5 strangers in a row',
        'Spin around 10 times and try to walk in a straight line',
        'Explain the plot of a movie using only sound effects',
        'Keep your eyes closed for the next 2 minutes',
        'Pretend you are an opera singer for your next sentence',
        'Do 20 mountain climbers',
        'Let the group rewrite your dating app bio (temporary)',
        'Try to balance 3 coasters on your head',
        'Speak only in rhymes for 5 minutes',
        'Do your best impression of a celebrity the group picks',
        'Narrate what the person next to you is doing',
        'Make a funny face and keep it for 1 minute',
        'Pretend you are a cat and try to "pounce" on a napkin',
        'Tell a joke, and if no one laughs, do 10 more squats',
        'Sing your next 3 sentences to the tune of "Twinkle Twinkle"',
        'Give a dramatic reading of a random text message',
        'Pretend you are in a high-speed car chase',
        'Act like you just won an Oscar for "Best Table Sitter"',
        'Do a "robot dance" for 1 minute',
        'Try to whistle a famous song through a mouthful of air',
        'Bow every time you stand up or sit down',
        'Keep a "straight face" while the group tries to make you laugh',
        'Pretend you are a sports car and make engine noises',
        'Talk to an inanimate object for 60 seconds',
        'Do a burpee every time someone laughs for the next 3 mins',
        'Attempt to do the "moonwalk"',
        'Explain why the earth might actually be a donut',
        'Only communicate through emojis on your phone for 2 mins',
        'Act like you are swimming whenever you move',
        'Give the table a "blessing" in a made-up language'
    ];
    
    // Math.floor provides a more even distribution than Math.round
    const task = tasks[Math.floor(Math.random() * tasks.length)];
    const punishment = punishments[Math.floor(Math.random() * punishments.length)];

    return `
        <div class="content-wrapper">
            <h2>The Challenge</h2>
            <b>${task}</b>
            <br><br>
            <h2>The Forfeit</h2>
            <i>${punishment}</i>
        </div>
    `;
}

/**
 * Initializes the game and sets up the event listeners.
 */
function main() {
    // Find the main container in the DOM
    const root = document.getElementById('main');
    
    // Create a dedicated area for the text so it doesn't overwrite the button
    const displayArea = document.createElement('div');
    root.appendChild(displayArea);

    // Create and configure the "Next" button
    const button = document.createElement('button');
    button.innerText = 'Next Challenge...';
    
    // Add the click listener to update only the displayArea
    button.addEventListener('click', () => {
        displayArea.innerHTML = getNewHtml();
    });

    // Run once on load to populate the first challenge
    displayArea.innerHTML = getNewHtml();
    
    // Add the button to the bottom of the main container
    root.appendChild(button);
}

// Entry point
main();