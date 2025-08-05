
const hobbies = [
    "🎨 Painting and Drawing 🎨",
    "📚 Reading Books 📚",
    "🎮 Video Gaming 🎮",
    "🏃‍♂️ Running/Jogging 🏃‍♂️",
    "🧘‍♀️ Yoga and Meditation 🧘‍♀️",
    "🎵 Playing Musical Instruments 🎵",
    "📸 Photography 📸",
    "🍳 Cooking and Baking 🍳",
    "🌱 Gardening 🌱",
    "🎯 Archery 🎯",
    "🏊‍♀️ Swimming 🏊‍♀️",
    "🎪 Circus Arts 🎪",
    "🧩 Puzzle Solving 🧩",
    "🎭 Acting/Theater 🎭",
    "🏋️‍♂️ Weightlifting 🏋️‍♂️",
    "🎨 Pottery and Ceramics 🎨",
    "📝 Creative Writing 📝",
    "🪄 Magic Tricks 🪄",
    "🏃‍♀️ Hiking 🏃‍♀️",
    "🎨 Digital Art 🎨",
    "🎪 Dancing 🎪",
    "🎯 Board Games 🎯",
    "🎨 Knitting/Crocheting 🎨",
    "🥋 Martial Arts 🥋",
    "📱 Coding/Programming 📱",
    "🎨 Jewelry Making 🎨",
    "🎪 Rock Climbing 🎪",
    "🎨 Calligraphy 🎨",
    "🎪 Bird Watching 🎪",
    "🎨 Woodworking 🎨",
    "🎪 Chess 🎪",
    "🎨 Origami 🎨",
    "🎪 Astronomy 🎪",
    "🎨 Model Building 🎨",
    "🎪 Geocaching 🎪",
    "🎨 Soap Making 🎨",
    "🎪 Beekeeping 🎪",
    "🎨 Candle Making 🎨",
    "🎪 Fishing 🎪",
    "🎨 Quilting 🎨",
    "🎯 Archery 🎯",
    "🎨 Leather Crafting 🎨",
    "🎪 Skateboarding 🎪",
    "🎨 Embroidery 🎨",
    "🎪 Surfing 🎪",
    "🎨 Glass Blowing 🎨",
    "🎪 Parkour 🎪",
    "🎨 Pottery 🎨",
    "🎪 Mountain Biking 🎪"
];

// Array of emojis for slot machine animation
const slotEmojis = ["🎨", "🎮", "📚", "🎵", "🎪", "🎯", "🏃‍♂️", "🧘‍♀️", "📸", "🍳", "🌱", "🏊‍♀️", "🎭", "🏋️‍♂️", "📝", "🏃‍♀️", "🎪", "🎯", "📱"];

// Function to extract the first emoji from a string
function getFirstEmoji(str) {
    // Match the first emoji in the string
    const emojiMatch = str.match(/[\u{1F600}-\u{1F64F}]|[\u{1F300}-\u{1F5FF}]|[\u{1F680}-\u{1F6FF}]|[\u{1F1E0}-\u{1F1FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]/u);
    return emojiMatch ? emojiMatch[0] : "🎨"; // Default fallback
}

function showDateTime() {
    const reel1 = document.getElementById('reel1');
    const reel2 = document.getElementById('reel2');
    const reel3 = document.getElementById('reel3');

    let spinCount = 0;
    const maxSpins = 10;
    const spinInterval = setInterval(() => {
        reel1.textContent = slotEmojis[Math.floor(Math.random() * slotEmojis.length)];
        reel2.textContent = slotEmojis[Math.floor(Math.random() * slotEmojis.length)];
        reel3.textContent = slotEmojis[Math.floor(Math.random() * slotEmojis.length)];
        
        spinCount++;
        
        if (spinCount >= maxSpins) {
            clearInterval(spinInterval);
            
            const randomHobby = hobbies[Math.floor(Math.random() * hobbies.length)];
            const firstEmoji = getFirstEmoji(randomHobby);
            
            reel1.textContent = firstEmoji;
            reel2.textContent = firstEmoji;
            reel3.textContent = firstEmoji;
            
            setTimeout(() => {
                document.getElementById("your-new-hobby-button").innerHTML = randomHobby;
            }, 200);
        }
    }, 100);
}
