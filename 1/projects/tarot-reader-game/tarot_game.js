const tarot_cards = {
  1: ["The Fool",
      "in the past, you took a leap of faith or started a new journey with innocence and curiosity.",
      "currently, you're in a phase of openness, spontaneity, or uncertainty requiring trust in the unknown.",
      "soon, a new beginning or bold choice will guide you toward growth and discovery.", 
      "00-TheFool"
  ],
  2: ["The Magician",
      "you previously discovered your talents or began harnessing your potential to manifest desires.",
      "now, you have the tools and power to influence your environment and take purposeful action.",
      "your skills and focus will soon open opportunities for powerful creation and success.", 
      "01-TheMagician"
  ],
  3: ["The High Priestess",
      "you were guided by intuition or hidden knowledge, learning to trust your inner voice.",
      "currently, you're in a state of reflection or secrecy, with deeper truths unfolding beneath the surface.",
      "ahead lies a time of spiritual awakening, mystery, or inner wisdom guiding your path.", 
      "02-TheHighPriestess"
  ],
  4: ["The Empress",
      "you nurtured creativity, relationships, or physical wellbeing, cultivating abundance.",
      "you're currently in a fertile phase of creation, connection, or emotional depth.",
      "a period of growth, harmony, or new life will blossom in your near future.",
      "03-TheEmpress"
  ],
  5: ["The Emperor",
      "structure, leadership, or authority shaped your past, offering discipline and direction.",
      "at present, stability and control are central to your circumstances or responsibilities.",
      "you will establish a firm foundation through order, logic, or protective strength.",
      "04-TheEmperor"
  ],
  6: ["The Hierophant",
      "tradition, guidance, or spiritual teachings influenced your earlier path.",
      "currently, you're aligning with conventional values or seeking wisdom through mentors or systems.",
      "in the future, structured learning or adherence to shared beliefs will shape your growth.",
      "05-TheHierophant"
  ],
  7: ["The Lovers",
      "a meaningful connection or significant choice influenced your emotional or moral development.",
      "now, you're focused on love, unity, or aligning your actions with your values.",
      "a deep commitment or pivotal decision will define your future direction.",
      "06-TheLovers"
  ],
  8: ["The Chariot",
      "you triumphed over challenges through willpower, determination, and direction.",
      "at present, you're navigating conflict or momentum, balancing forces to maintain control.",
      "victory and forward movement are on the horizon, powered by focused drive.",
      "07-TheChariot"
  ],
  9: ["Strength",
      "in the past, you showed courage, patience, and inner resilience to overcome adversity.",
      "now, you're being called to meet challenges with compassion and calm determination.",
      "your future success will come through gentle strength and emotional mastery.",
      "08-Strength"
  ],
  10: ["The Hermit",
      "you withdrew for reflection, gaining wisdom from solitude or inner searching.",
      "presently, introspection and quiet contemplation are guiding your decisions.",
      "spiritual insight and a clearer path will emerge through thoughtful withdrawal.",
      "09-TheHermit"
  ],
  11: ["Wheel of Fortune",
      "past events brought unexpected changes, driven by fate or cycles beyond your control.",
      "currently, you're at a turning point where luck, timing, or destiny are in motion.",
      "change is coming. Stay adaptable as fortune brings new opportunities or tests.",
      "10-WheelOfFortune"
  ],
  12: ["Justice",
      "you faced consequences or made decisions based on fairness and truth.",
      "now is a time for accountability, truth, or legal or ethical matters coming to light.",
      "a fair outcome will emerge as long as integrity and balance are maintained.",
      "11-Justice"
  ],
  13: ["The Hanged Man",
      "you once paused or sacrificed something in order to gain deeper insight.",
      "now, you're in a liminal space of surrender, waiting, or changed perspective.",
      "a shift in view or a voluntary release will lead to spiritual growth.",
      "12-TheHangedMan"
  ],
  14: ["Death",
      "a significant ending or transformation occurred, clearing the way for renewal.",
      "you're in a phase of letting go, facing necessary change or loss.",
      "rebirth and liberation will follow, allowing space for a new beginning.",
      "13-Death"
  ],
  15: ["Temperance",
      "in the past, you learned the value of patience, moderation, and integration.",
      "currently, you're blending different aspects of your life to find balance.",
      "healing and harmony will guide your next steps through cooperation and peace.",
      "14-Temperance"
  ],
  16: ["The Devil",
      "you once faced temptation, attachment, or self imposed limitations.",
      "at present, you're becoming aware of unhealthy patterns or illusions of control.",
      "breaking free from fear or obsession will empower your future liberation.",
      "15-TheDevil"
  ],
  17: ["The Tower",
      "an unexpected upheaval shattered illusions and forced dramatic change.",
      "now, you're experiencing or bracing for disruption that clears the old for the new.",
      "transformation and awakening will follow the collapse of outdated structures.",
      "16-TheTower"
  ],
  18: ["The Star",
      "after hardship, you found renewed hope or a glimpse of inspiration.",
      "currently, healing and faith are lighting your path forward.",
      "a bright future awaits, filled with spiritual clarity and optimism.",
      "17-TheStar"
  ],
  19: ["The Moon",
      "confusion, dreams, or emotional uncertainty colored your past experience.",
      "you're navigating illusions or the unknown, requiring trust in your intuition.",
      "mystery and insight will surface, but discernment will be key to clarity.",
      "18-TheMoon"
  ],
  20: ["The Sun",
      "you experienced joy, success, or clarity that brought fulfillment.",
      "now is a time of confidence, happiness, and growth.",
      "brilliant outcomes and truth will shine in your future, clearing doubts.",
      "19-TheSun"
  ],
  21: ["Judgement",
      "you reviewed your actions or were called to account, gaining deeper awareness.",
      "currently, you are facing a pivotal reckoning or call to purpose.",
      "renewal and awakening will soon lead to liberation and alignment with your true self.",
      "20-Judgement"
  ],
  22: ["The World",
      "you reached a state of completion or wholeness after a long journey.",
      "now, you're integrating lessons and celebrating milestones.",
      "a new cycle will begin soon, built on your achieved unity and fulfillment.",
      "21-TheWorld"
  ],
  23: ["Ace of Wands",
      "in the past, a surge of inspiration or a passionate new beginning sparked ambition or creativity.",
      "currently, you're encountering bold ideas or enthusiasm that drive you toward action.",
      "soon, a new project or opportunity will ignite your passions and lead to dynamic growth.",
      "Wands01"
  ],
  24: ["Two of Wands",
      "previously, you stepped beyond your comfort zone and began to plan for expansion or new adventures.",
      "now, you're evaluating your options and preparing for a leap forward with strategic thinking.",
      "in the future, decisive planning will open doors to exciting developments and greater purpose.",
      "Wands02"
  ],
  25: ["Three of Wands",
      "you laid the groundwork and began to see your intentions take form, leading to momentum.",
      "at present, you're observing the results of past actions and gaining perspective on what's ahead.",
      "continued patience and long term vision will yield success and broader horizons.",
      "Wands03"
  ],
  26: ["Four of Wands",
      "there was a period of celebration, homecoming, or solid achievement in your past.",
      "you're currently enjoying stability, family support, or communal joy.",
      "a forthcoming event will bring joy, unity, or a significant milestone worth celebrating.",
      "Wands04"
  ],
  27: ["Five of Wands",
      "you faced disagreements or internal conflict that challenged your beliefs and direction.",
      "now, you're amidst tension, competition, or clashing priorities that demand clarity.",
      "through perseverance and communication, resolution and understanding will be achieved.",
      "Wands05"
  ],
  28: ["Six of Wands",
      "you overcame challenges and were recognized for your efforts or leadership.",
      "currently, you're enjoying confidence, support, or public acknowledgment of your success.",
      "greater visibility and reward are coming if you remain humble and grounded.",
      "Wands06"
  ],
  29: ["Seven of Wands",
      "you previously had to defend your stance or maintain progress despite resistance.",
      "right now, you're challenged to hold your ground and affirm your convictions.",
      "future obstacles will be overcome with resilience and self assurance.",
      "Wands07"
  ],
  30: ["Eight of Wands",
      "there was a rapid shift or breakthrough that accelerated progress or communication.",
      "at present, things are moving swiftly; opportunities, messages, or momentum are flowing.",
      "expect fast developments that require quick thinking and decisive movement.",
      "Wands08"
  ],
  31: ["Nine of Wands",
      "you've endured hardships and guarded what matters most, despite feeling worn.",
      "you're currently in a defensive posture, staying alert and protecting your gains.",
      "your determination will be rewarded, bringing closure and victory over adversity.",
      "Wands09"
  ],
  32: ["Ten of Wands",
      "you carried heavy burdens or responsibilities that tested your endurance.",
      "now, you're likely feeling overwhelmed or nearing exhaustion from accumulated stress.",
      "soon, relief will come, allowing you to release burdens and regain balance.",
      "Wands10"
  ],
  33: ["Page of Wands",
      "a sense of wonder and the urge to explore new passions defined your past growth.",
      "currently, you're receiving inspiration or starting a journey of creative exploration.",
      "in the future, fresh ideas and a curious spirit will guide you toward exciting beginnings.",
      "Wands11"
  ],
  34: ["Knight of Wands",
      "you pursued goals with intense passion, energy, and perhaps impulsiveness.",
      "right now, you're charging ahead with boldness and ambition.",
      "continued momentum will bring success, though balance and planning are key to avoid burnout.",
      "Wands12"
  ],
  35: ["Queen of Wands",
      "you embodied confidence and warmth, using intuition and charisma to uplift yourself and others.",
      "currently, you're attracting others through vibrant energy and inner strength.",
      "leadership and magnetic influence will shape your future positively.",
      "Wands13"
  ],
  36: ["King of Wands",
      "you mastered your vision and took bold steps to lead with purpose and strategy.",
      "now, you're in a position of authority, shaping your world through creativity and direction.",
      "visionary leadership and courage will guide you to long term success.",
      "Wands14"
  ],
  37: ["Ace of Cups",
      "in the past, a powerful emotional awakening or the beginning of a deep connection shaped your heart's path.",
      "right now, you're open to love, healing, or spiritual renewal that is flowing freely.",
      "a profound new emotional experience or relationship is emerging, bringing joy and receptivity.",
      "Cups01"
  ],
  38: ["Two of Cups",
      "you experienced a meaningful union or moment of emotional harmony with another person.",
      "currently, mutual understanding and heartfelt connection are at the forefront of your experience.",
      "a loving partnership or important reconciliation is on the horizon, deepening emotional bonds.",
      "Cups02"
  ],
  39: ["Three of Cups",
      "joyful moments of friendship, celebration, or support played a key role in your emotional past.",
      "now, you're surrounded by love, companionship, or a time of reunion and shared happiness.",
      "an upcoming celebration or gathering will bring emotional uplift and communal joy.",
      "Cups03"
  ],
  40: ["Four of Cups",
      "you once felt emotionally withdrawn or discontented, overlooking blessings around you.",
      "currently, you're introspective or apathetic, possibly missing new emotional opportunities.",
      "awareness and openness will reveal a meaningful offering that can restore your emotional balance.",
      "Cups04"
  ],
  41: ["Five of Cups",
      "you experienced grief, disappointment, or emotional loss that left a lasting impression.",
      "now, you may be dwelling on what's gone, unable to see what still remains.",
      "healing will come when you shift focus to the support and love that's still present.",
      "Cups05"
  ],
  42: ["Six of Cups",
      "nostalgia, childhood memories, or past emotional bonds shaped your inner world.",
      "you're currently revisiting the past, perhaps through memory, reunion, or inner child healing.",
      "reconnecting with old joys or innocence will help you find emotional grounding and peace.",
      "Cups06"
  ],
  43: ["Seven of Cups",
      "you were once caught in fantasy, illusion, or indecision, overwhelmed by emotional choices.",
      "currently, you're facing many emotional or creative options; some real, others deceptive.",
      "clarity and focus will guide you to the right choice and emotional fulfillment.",
      "Cups07"
  ],
  44: ["Eight of Cups",
      "you walked away from something emotionally unfulfilling, seeking deeper meaning.",
      "right now, you're on a journey of emotional withdrawal or seeking spiritual truth.",
      "your path will lead to personal insight, even if it requires leaving comfort behind.",
      "Cups08"
  ],
  45: ["Nine of Cups",
      "you experienced emotional satisfaction or contentment from personal or relational fulfillment.",
      "currently, your wishes are being granted or your emotional needs are being met.",
      "joy, self love, and the realization of heartfelt desires are coming your way.",
      "Cups09"
  ],
  46: ["Ten of Cups",
      "a period of harmony, family unity, or lasting love enriched your emotional life.",
      "you're in a phase of deep emotional fulfillment, shared happiness, and peace.",
      "enduring joy, connection, or a fulfilling relationship is forming or solidifying soon.",
      "Cups10"
  ],
  47: ["Page of Cups",
      "you embraced emotional vulnerability or creative sensitivity, beginning to explore your inner world.",
      "currently, you're receiving intuitive messages or beginning a phase of emotional openness.",
      "a gentle offering or emotional message will bring inspiration and heartfelt expression.",
      "Cups11"
  ],
  48: ["Knight of Cups",
      "you once pursued love or ideals with romantic passion and emotional intensity.",
      "right now, you're following your heart, driven by dreams and emotional conviction.",
      "an offer of love or a creative mission will guide your next steps toward soulful fulfillment.",
      "Cups12"
  ],
  49: ["Queen of Cups",
      "you developed emotional intelligence, deep empathy, and nurturing compassion.",
      "currently, you're embodying calm, intuitive care, and emotional balance for yourself and others.",
      "your compassionate leadership and insight will bring healing and harmony to those around you.",
      "Cups13"
  ],
  50: ["King of Cups",
      "you learned to balance deep emotions with calm authority, becoming a source of emotional support.",
      "now, you are in control of your feelings and able to offer wise, mature guidance to others.",
      "a steady heart and emotional mastery will allow you to lead and love with integrity.",
      "Cups14"
  ],
  51: ["Ace of Swords",
      "a moment of mental clarity or truth helped you cut through confusion and chart a new path.",
      "you’re experiencing a breakthrough in understanding, communication, or a decision that demands honesty.",
      "a powerful realization or truth will soon emerge, offering clarity and the ability to take decisive action.",
      "Swords01"
  ],
  52: ["Two of Swords",
      "you once avoided a choice or suppressed conflicting thoughts, leading to emotional or mental stagnation.",
      "you’re caught in indecision, struggling to reconcile conflicting truths or perspectives.",
      "a decision will need to be made—resolution will come when you confront the truth and act with clarity.",
      "Swords02"
  ],
  53: ["Three of Swords",
      "heartbreak, betrayal, or painful truth shaped your emotional development.",
      "you’re dealing with emotional pain, separation, or sorrow that requires healing.",
      "recovery and emotional resilience will follow once the pain is fully acknowledged and released.",
      "Swords03"
  ],
  54: ["Four of Swords",
      "you retreated from stress or conflict to find peace and gather strength.",
      "it’s time for rest, reflection, and recovery—don’t rush forward just yet.",
      "stillness and quietude will allow you to gain the insight needed for wise action.",
      "Swords04"
  ],
  55: ["Five of Swords",
      "a conflict or win at all costs attitude may have brought tension or regret.",
      "you may be entangled in conflict or dealing with the fallout of miscommunication or ego battles.",
      "ethical reflection will guide your next move—sometimes the best win is walking away.",
      "Swords05"
  ],
  56: ["Six of Swords",
      "you left behind emotional or mental turbulence in search of healing and stability.",
      "you’re in transition—moving away from difficulty toward calmer waters.",
      "peace and emotional clarity will come through continued movement and letting go.",
      "Swords06"
  ],
  57: ["Seven of Swords",
      "deception or avoidance influenced your actions or experiences.",
      "secrets, strategy, or evasive behavior may be at play—either by you or someone else.",
      "hidden truths will surface; you’ll need to act with caution and cleverness.",
      "Swords07"
  ],
  58: ["Eight of Swords",
      "limiting beliefs or fear once made you feel stuck or powerless.",
      "you’re caught in a mental prison—trapped by fear or indecision.",
      "freedom will come when you realize that the barriers are largely self imposed.",
      "Swords08",
  ],
  59: ["Nine of Swords",
      "anxiety, guilt, or mental anguish may have overwhelmed you.",
      "you may be experiencing worry, sleeplessness, or mental distress.",
      "facing your fears directly will bring emotional release and healing.",
      "Swords09"
  ],
  60: ["Ten of Swords",
      "a painful ending or betrayal brought a sense of devastation—but also the seed of renewal.",
      "you may feel defeated or burned out—the lowest point in a situation.",
      "the worst is over. From here, only recovery, healing, and a new beginning await.",
      "Swords10"
  ],
  61: ["Page of Swords",
      "you began asking questions, exploring ideas, or watching and learning from your environment.",
      "curiosity and the desire for truth are guiding you—be alert and mindful.",
      "a message, idea, or discovery is coming that will challenge or inspire your thinking.",
      "Swords11"
  ],
  62: ["Knight of Swords",
      "you charged ahead with intensity and focus, possibly at the expense of caution.",
      "you’re moving swiftly—motivated by a strong idea or goal.",
      "bold action will be required—just be sure your energy is directed wisely and not recklessly.",
      "Swords12"
  ],
  63: ["Queen of Swords",
      "experiences shaped you into a discerning, wise, and emotionally intelligent thinker.",
      "you’re being called to lead with logic, clarity, and calm truth.",
      "success will come through setting clear boundaries and speaking your truth with compassion.",
      "Swords13"
  ],
  64: ["King of Swords",
      "you gained authority or control through logic, discipline, and intellectual strength.",
      "you’re in a position to make clear, fair decisions and guide others with reason.",
      "leadership and clarity of thought will be crucial—act with integrity and rational judgment.",
      "Swords14"
  ],
  65: ["Ace of Pentacles",
      "a new financial or material opportunity began—perhaps a job, investment, or lifestyle shift.",
      "you’re being offered a chance to build something stable and valuable in the real world.",
      "a new beginning will emerge in your material life—health, career, or security will flourish if nurtured.",
      "Pentacles01"
  ],
  66: ["Two of Pentacles",
      "you managed multiple responsibilities or financial fluctuations with flexibility and resilience.",
      "you're juggling priorities—balance and time management are essential now.",
      "greater equilibrium will come, but you'll need to stay adaptable and organized to maintain it.",
      "Pentacles02"
  ],
  67: ["Three of Pentacles",
      "you laid a foundation through teamwork, learning, or shared goals.",
      "collaboration is essential—your skills are valued, and cooperation leads to progress.",
      "a project will evolve successfully through expert advice and aligned partnerships.",
      "Pentacles03"
  ],
  68: ["Four of Pentacles",
      "you clung tightly to security, possessions, or control—possibly out of fear or scarcity.",
      "you may be resisting change, holding on too tightly to money, status, or comfort.",
      "stability will remain, but growth depends on your willingness to release what no longer serves you.",
      "Pentacles04"
  ],
  69: ["Five of Pentacles",
      "you went through hardship—financial, physical, or emotional loss and isolation.",
      "you may be feeling unsupported or struggling with material or health challenges.",
      "recovery and support will arrive, but you must seek help and believe you're worthy of assistance.",
      "Pentacles05"
  ],
  70: ["Six of Pentacles",
      "you gave or received generosity—balancing power dynamics in material or emotional ways.",
      "fairness, support, or charity is at play—giving and receiving should be in balance.",
      "you’ll find yourself in a position to help or be helped—trust the cycle of mutual exchange.",
      "Pentacles06"
  ],
  71: ["Seven of Pentacles",
      "you invested time and effort into something with long term potential—possibly waiting on results.",
      "you're assessing progress and questioning if your current path is worth the effort.",
      "rewards will come through patience, perseverance, and wise evaluation of your direction.",
      "Pentacles07"
  ],
  72: ["Eight of Pentacles",
      "you committed to learning, improving, or developing a skill or craft.",
      "you are focused on diligent work or mastering something through discipline.",
      "your dedication will pay off, continued effort will lead to expertise and financial growth.",
      "Pentacles08"
  ],
  73: ["Nine of Pentacles",
      "you established independence through smart choices and sustained effort.",
      "you are enjoying or are close to enjoying material success, self sufficiency, and peace.",
      "a period of comfort, luxury, and personal accomplishment is ahead, self worth will flourish.",
      "Pentacles09"
  ],
  74: ["Ten of Pentacles",
      "a strong foundation, family legacy, or long term planning shaped your current security.",
      "you’re focused on building lasting stability, family wealth, or long term success.",
      "prosperity, legacy, and long term security are within reach—invest wisely and honor your roots.",
      "Pentacles10"
  ],
  75: ["Page of Pentacles",
      "a new opportunity in study, health, or finances sparked your curiosity and ambition.",
      "you’re laying the groundwork for future prosperity through learning or planning.",
      "a new project or financial path will open—dedication and focus will ensure success.",
      "Pentacles11"
  ],
  76: ["Knight of Pentacles",
      "steady, responsible effort defined your approach—slow but dependable progress was made.",
      "you’re in a phase of methodical work, routine and persistence are your allies.",
      "consistent effort will bring tangible results—stick with the plan and avoid shortcuts.",
      "Pentacles12"
  ],
  77: ["Queen of Pentacles",
      "you nurtured your resources and created comfort for yourself and others.",
      "you're managing responsibilities with warmth, practicality, and care—balancing home and work.",
      "abundance and nurturing stability will grow, you’ll be able to support others from a secure place.",
      "Pentacles13"
  ],
  78: ["King of Pentacles",
      "you built authority or financial security through discipline and wise management.",
      "you are (or should be) focused on leadership, prosperity, and grounded decision making.",
      "success and stability are coming—your efforts will create lasting wealth and influence.",
      "Pentacles14"
  ]
};

// Helper to get a random integer between min and max (inclusive)
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function drawTarotReading() {
    const spread = {};

    const randomPast = getRandomInt(1, 78);
    spread.past = tarot_cards[randomPast];

    const randomPresent = getRandomInt(1, 78);
    spread.present = tarot_cards[randomPresent];

    const randomFuture = getRandomInt(1, 78);
    spread.future = tarot_cards[randomFuture];
}

function showPastCard() {
    const card = document.getElementById('pastCardContainer');
    card.classList.remove('reveal'); 
    void card.offsetWidth; 
    const img = document.getElementById('pastImg');
    img.src = `./images/${spread.past[4]}.jpg`;
    img.alt = spread.past[0];
    document.getElementById('pastCard').innerHTML = `<span class="card-title">${spread.past[0]}</span>: ${spread.past[1]}`;
    card.classList.add('reveal');
}

function showPresentCard() {
    const card = document.getElementById('presentCardContainer');
    card.classList.remove('reveal');
    void card.offsetWidth;
    const img = document.getElementById('presentImg');
    img.src = `./images/${spread.present[4]}.jpg`;
    img.alt = spread.present[0];
    document.getElementById('presentCard').innerHTML = `<span class="card-title">${spread.present[0]}</span>: ${spread.present[2]}`;
    card.classList.add('reveal');
}

function showFutureCard() {
    const card = document.getElementById('futureCardContainer');
    card.classList.remove('reveal');
    void card.offsetWidth;
    const img = document.getElementById('futureImg');
    img.src = `./images/${spread.future[4]}.jpg`;
    img.alt = spread.future[0];
    document.getElementById('futureCard').innerHTML = `<span class="card-title">${spread.future[0]}</span>: ${spread.future[3]}`;
    card.classList.add('reveal');
}

// Draw cards
const spread = {};

const randomPast = getRandomInt(1, 78);
spread.past = tarot_cards[randomPast];
console.log(`The card you pulled for your past is the ${spread.past[0]}, which means ${spread.past[1]}`);

const randomPresent = getRandomInt(1, 78);
spread.present = tarot_cards[randomPresent];
console.log(`The card you pulled for the present is the ${spread.present[0]}, which means ${spread.present[2]}`);

const randomFuture = getRandomInt(1, 78);
spread.future = tarot_cards[randomFuture];
console.log(`The card you pulled for your future is the ${spread.future[0]}, which means ${spread.future[3]}`);

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('pastImg').src = './images/CardBacks.jpg';
    document.getElementById('presentImg').src = './images/CardBacks.jpg';
    document.getElementById('futureImg').src = './images/CardBacks.jpg';

    drawTarotReading();

    document.getElementById('pastCardContainer').onclick = function() {
        showPastCard();
    };
    document.getElementById('presentCardContainer').onclick = function() {
        showPresentCard();
    };
    document.getElementById('futureCardContainer').onclick = function() {
        showFutureCard();
    };
});