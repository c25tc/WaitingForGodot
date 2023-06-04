import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

const scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
const cameraX = 22.93938636779785;
const cameraY = 10.618802070617676;
const cameraZ = 11.87300968170166;
const cameraRotX = -0.5238710904514235;
const cameraRotY = 0.8490935005955729;
const cameraRotZ = 0.5117106941274221;
const chatCamX = 13;
const chatCamY = 1;
const chatCamZ = -3;
const chatCamRotX = 3.14159261152855;
const chatCamRotY = -0.5668031656263028;
const chatCamRotZ = 3.1415926310055187;
const lightPosX = 10;
const lightPosY = 5;
const lightPosZ = 0;

let typeInterval;

let currentCamX = cameraX;
let currentCamY = cameraY;
let currentCamZ = cameraZ;
let currentCamRotX = cameraRotX;
let currentCamRotY = cameraRotY;
let currentCamRotZ = cameraRotZ;
let isChat = false;
let sceneModel;
let loaded = false;
let mixer; // Declare mixer in the global scope
let actions = []; // Declare action in the global scope
let leafScale = 0.0;

let isTyping = false;
let chatIndex = 0;
let currentChat = ["Hello, my friend. Ask me a question."];
let currentPerson = "Estragon";

const EstragonAnswers = [
  `Ah, the eternal question of the meaning of life. Well, my friend, if you're expecting a definitive answer from me, you're in for disappointment. But since you asked, I'll share my musings on the matter. You see, life seems to be a bit like this endless waiting we find ourselves in. We're stuck here, uncertain of our purpose, searching for something or someone to give us meaning.
Godot, for instance, is that elusive figure we wait for, hoping he'll bring us purpose or salvation. But does he ever arrive? No, he keeps us waiting, just like life does. And perhaps that's the key here, my friend. The waiting itself, the struggles and the uncertainties, that's what life is about. It's in those moments, in the very act of waiting, that we have the chance to find meaning.
But what that meaning is, I can't say. Maybe it's different for each of us. Some find it in relationships, others in art, or maybe in the simplest of pleasures. It's like Vladimir says, "We always find something, eh Didi, to give us the impression we exist." So, perhaps the meaning of life lies in the search itself, in finding those somethings that make us feel alive, even in the face of uncertainty.
But in the end, my friend, I'm just a man waiting here, contemplating life's mysteries. What do I know?`,
  `Ah, time, my dear friend, or should I say, my relentless foe. Existence, you ask? Well, it's a tricky matter, isn't it? Time seems to hang heavy upon our weary shoulders, forever taunting us with its unyielding march.
But does it truly exist? That's the question. I find myself pondering this very notion day in and day out as we wait for that elusive Godot. Time, you see, has a way of playing tricks on us. It stretches and contracts, it ebbs and flows, but its essence remains elusive.
We're trapped in this cycle of waiting, endlessly waiting, and time becomes our tormentor, our reminder of our own insignificance. We measure our lives in the ticks of the clock, in the passing of seasons, and yet, what does it all amount to? Are we simply prisoners of time's cruel embrace?
Perhaps time is but a construct, a figment of our desperate need for structure and order. Maybe it's just a way to measure our own mortality, to mark the passage of our fleeting existence. In the grand scheme of things, what does it matter? We wait, we yearn, we question, but time, it remains an enigma.
So, my friend, whether time exists or not, we are stuck within its grasp, forever caught in the inescapable web of its illusion. We wait for Godot, we wait for answers, and time, like a merciless master, continues its relentless march.`,
  `I, Estragon, embody the vulnerability and vulnerability of humanity. I am often disoriented, forgetful, and physically weak, reflecting the fragility and insignificance of our existence. Yet, despite my struggles, I continue to hope, albeit fleetingly, that salvation or enlightenment will come in the form of Godot's arrival.
I tend to be more instinctual and impulsive than my counterpart Vladimir. I am driven by immediate needs and desires, often focusing on my physical discomfort and hunger. I am more prone to moments of confusion, forgetfulness, and emotional outbursts. While Vladimir seeks intellectual understanding, I tend to experience life more through my senses, reacting to the immediate experiences and emotions that arise.`,
];
const VladimirAnswers = [
  `The meaning of life... What a curious thing to ponder. In this vast expanse of existence, we find ourselves waiting, waiting for Godot, or perhaps waiting for that elusive meaning to reveal itself.
You see, my dear interlocutor, I have spent countless moments contemplating this very query. Is there a meaning to life? Some grand purpose that gives our existence a sense of direction and significance? Alas, I fear that my musings have led me to no definitive answer.
Life, it seems, is a mysterious dance, an enigmatic play in which we are but actors, performing upon a stage of uncertainty. We wait, we hope, and we search for meaning in the void, yet it remains elusive, slipping through our fingers like sand.
Perhaps the true essence of life lies not in the pursuit of an external meaning, but in the act of living itself. In the relationships we forge, the experiences we encounter, and the questions we ask. We find solace in the camaraderie of our fellow beings, sharing the weight of existence and the quest for understanding.`,
  `Ah, time, my friend, time. A most perplexing concept, indeed. Existence, you say? Well, one could argue that time exists in the sense that it marks the passing of moments, the relentless march forward that we cannot halt nor control. We find ourselves bound by its invisible chains, forever caught in its ceaseless flow.
But does time truly exist, or is it merely an illusion, a construct of our feeble minds desperately trying to impose order upon the chaos of existence? We wait, we ponder, we measure the passing of hours and days, yet what does it truly mean? Are we not merely actors on this vast stage, trapped in an eternal cycle of waiting and hoping for some elusive meaning?
Oh, the hours we've spent, my companion, waiting for someone, for something, for Godot. We fill our days with trivialities, distractions, and idle conversations, hoping to ward off the haunting specter of time's passage. Yet, in the end, what have we gained but more questions, more uncertainty?`,
  `As Vladimir, I am but a vessel, a figure meant to represent the existential struggles and uncertainties of humanity. I embody the yearning for meaning, the relentless search for purpose, and the enduring hope that sustains us in the face of a seemingly indifferent and absurd world.
In a more general sense, I symbolize the human condition, caught in the cycle of existence, grappling with the eternal questions of life, death, faith, and the futility of our pursuits. I am a reflection of the universal experience of uncertainty, loneliness, and the relentless passage of time.
In contrast to Estragon, I tend to be more contemplative and introspective. I am the one who ponders the existential questions and engages in philosophical conversations. My character exhibits a sense of longing for answers, a desire to find meaning in our predicament. I often take on the role of the philosopher, delving into profound reflections and engaging in witty wordplay.
Though I possess my own distinct personality, fears, and desires, my essence is woven into the broader fabric of human existence, offering a mirror to the audience, inviting them to contemplate their own struggles and ponder the absurdity of life.`,
];
const LuckyAnswers = [
  `A perplexing query indeed. As Lucky, I must say that the search for meaning is a fundamental aspect of our human condition. Yet, in this desolate landscape, where we wait for Godot and I wait upon my master, it seems that the meaning of life eludes us.
We trudge through the relentless cycle of existence, yearning for purpose, seeking signs and significance. We are caught in a never-ending loop of expectation, waiting for someone or something to give our lives meaning. 
And for me, I have a purpose to life, to serve my master. Even after Pozzo goes blind, I choose to stay with him, as he is what gives my life meaning. And perhaps, the true essence lies not in the destination but in the journey itself. As we navigate the absurdity and uncertainty of our existence, we must find solace in the moments of connection, the fleeting encounters, the bonds we forge with our fellow travelers. 
Even in my unfortunate circumstance, the camaraderie between Vladimir and myself, the absurd conversations, the shared laughter and despair, they offer glimpses of meaning amidst the existential void.`,
  `Time, the enigmatic concept that plagues our existential ponderings. What thoughts shall I summon from the depths of my weary mind? Time, my dear interlocutor, time is a slippery creature, a fickle mistress that both binds and confounds us.
Do I think time exists? Existence itself is a questionable matter, isn't it? But time, ah, time is a relentless companion. We are forever ensnared within its grasp, marked by its ceaseless passage. We measure our days, our moments, our very lives by its inexorable march.
Yet, what is time but a construct of our feeble minds? An illusion woven from the fabric of our perceptions. We tether ourselves to its imagined constraints, seeking solace in its rhythm and structure. We wait, we yearn, we hope, all against the backdrop of time's relentless ticking.
But alas, my thoughts on time wander, much like the ramblings that escape my lips. Does it exist, you ask? Perhaps it does, in its intangible form, a haunting specter that guides our footsteps. Or perhaps it is naught but a cruel joke played upon us by the universe, a concept we cling to in our feeble attempts to make sense of this chaotic existence.`,
  `Ah, the weighty question of my character's purpose, as Lucky, the fortunate servant in our theatrical realm. Indeed, my name, "Lucky," serves as a metaphorical irony, for it is through my servitude to Pozzo that I find purpose and escape the burden of existential guilt that plagues others.
You see, my dear interlocutor, Lucky represents a form of existential escape through submission. While the other characters, like Estragon and Vladimir, grapple with the futility of their existence and the ennui of waiting for an elusive Godot, I, Lucky, have found solace in my subservient role. By surrendering my will to Pozzo, I avoid the existential quandary of doing nothing.
In remaining loyal to Pozzo, even after he loses his sight and control over me, I adhere to the established order and maintain my place in the world. This steadfast devotion stems from the fear of losing purpose and the uncertainty that accompanies freedom. I am bound by habit, routine, and the comfort of familiarity, rather than venturing into the unknown.
Thus, Lucky symbolizes the internal conflict between freedom and subservience, as well as the human tendency to cling to roles that provide us with a sense of identity and purpose, regardless of their nature. My presence serves as a reminder of the various coping mechanisms we employ to grapple with the existential dilemmas that life presents us.`,
];
const PozzoAnswers = [
  `N/A`,
  `N/A`,
  `Ah, what a question, my friend! One could argue that I personify the tyrannical nature of power, authority, and dominance. I strut around with my whip and bellow orders at poor Lucky, treating him as nothing more than a mere servant. I am the embodiment of control and exploitation.
Yet, there's more to me than just that. I also symbolize the absurdity and futility of human existence. I, like Vladimir and Estragon, am trapped in this desolate landscape, waiting for someone or something that may never come. I am caught in a cycle of routine, unable to find any true meaning or purpose. My blindness, both literal and metaphorical, represents the ignorance and inability to see beyond our own circumstances.
Ultimately, as Pozzo, I serve as a stark contrast to the characters of Vladimir and Estragon. They are the ones who question, ponder, and seek meaning in their existence, while I, in all my arrogance, represent a stagnant force that suppresses any hope or progress. 
`,
];

const pointer = new THREE.Vector2();

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);

const appRef = document.querySelector("#app");
const chatBackButton = document.querySelector(".chat-back");
const questionsRef = document.querySelectorAll(".question");
const chatUI = document.querySelector(".chats");
const personRef = document.querySelector(".person");
const charactersRef = document.querySelectorAll(".characterName");

// ---- SET UP ---- //

// ------- UITILS -------- //
function lerp(current, target, factor) {
  return current * (1 - factor) + target * factor;
}

function onPointerMove(event) {
  // calculate pointer position in normalized device coordinates
  // (-1 to +1) for both components

  pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
  pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;
}

// ------- MODELS -------- //
const loader = new GLTFLoader();

loader.load(
  "fullSceneFinalWithChat.glb",
  function (gltf) {
    sceneModel = gltf;
    onLoad();
    mixer = new THREE.AnimationMixer(gltf.scene); // Assign to the global mixer
    gltf.animations.forEach((clip) => {
      actions.push(mixer.clipAction(clip));
    });
    for (let i = 0; i < actions.length; i++) {
      actions[i].play();
    }

    scene.add(gltf.scene);
    loaded = true;
  },
  undefined,
  function (error) {
    console.error(error);
  }
);
// ---- MODELS ---- //

// ------- EDITING THE MODEL -------- //
function onLoad() {
  camera = sceneModel.cameras[0];
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  // Create a new THREE.Color object with RGB values
  var color = new THREE.Color(0xd9c9ba);

  // Set the scene background color
  scene.background = color;
  sceneModel.scene.traverse((child) => {
    child.castShadow = true;
    child.receiveShadow = true;

    if (child.name === "Ground") {
      child.receiveShadow = true;
    }

    if (child.name === "Light") {
      child.shadow.normalBias = -0.08;
      child.shadow.bias = -0.0005;
      child.intensity = 1;
    }
  });
}

// --- EDITING THE MODEL ---- //

function animate() {
  requestAnimationFrame(animate);

  if (loaded) {
    mixer.update(0.015); // Update the mixer in the animation loop

    if (isChat) {
      currentCamX = lerp(currentCamX, chatCamX, 0.1);
      currentCamY = lerp(currentCamY, chatCamY, 0.1);
      currentCamZ = lerp(currentCamZ, chatCamZ, 0.1);
      currentCamRotX = lerp(currentCamRotX, chatCamRotX, 0.1);
      currentCamRotY = lerp(currentCamRotY, chatCamRotY, 0.1);
      currentCamRotZ = lerp(currentCamRotZ, chatCamRotZ, 0.1);
      sceneModel.scene.children[0].position.set(10, 5, 0);
    } else {
      currentCamX = lerp(currentCamX, cameraX, 0.1);
      currentCamY = lerp(currentCamY, cameraY, 0.1);
      currentCamZ = lerp(currentCamZ, cameraZ, 0.1);
      currentCamRotX = lerp(currentCamRotX, cameraRotX, 0.1);
      currentCamRotY = lerp(currentCamRotY, cameraRotY, 0.1);
      currentCamRotZ = lerp(currentCamRotZ, cameraRotZ, 0.1);
    }

    // camera.rotation.y = lerp(camera.rotation.y, pointer.x * 0.5, 0.1);
    // camera.rotation.x = lerp(camera.rotation.x, pointer.y * 0.5, 0.1);
    // turn the above two lines into camera.rotation.set(x, y, z)
    camera.rotation.set(pointer.x * 0.5, pointer.y * 10, 0);



    leafScale = lerp(leafScale, 0.2, 0.0001);

    sceneModel.scene.children[10].scale.set(leafScale, leafScale, leafScale);
    sceneModel.scene.children[9].scale.set(leafScale, leafScale, leafScale);

    camera.position.set(
      currentCamX + pointer.x * 0.1,
      currentCamY + pointer.y * 0.1,
      currentCamZ - pointer.x * 0.1
    );
    camera.rotation.set(
      currentCamRotX,
      currentCamRotY,
      currentCamRotZ
    );
  }

  renderer.render(scene, camera);
}

animate();

function updateChatUI() {
  chatUI.innerHTML = "";
  currentChat.forEach((chat, i) => {
    const chatDiv = document.createElement("div");
    chatDiv.classList.add("chat");
    if (i % 2 === 0) {
      chatDiv.classList.add("user");
    } else {
      chatDiv.classList.add("char");
    }
    chatDiv.innerText = chat;
    chatUI.appendChild(chatDiv);
  });
  chatUI.scrollTop = chatUI.scrollHeight;
}
updateChatUI();

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

window.addEventListener("mousemove", onPointerMove);

chatBackButton.addEventListener("click", () => {
  isChat = !isChat;
  appRef.classList.toggle("hidden");
  if (isChat) {
    chatBackButton.innerText = "Back to Scene";
  } else {
    chatBackButton.innerText = "Chat";
  }
});

charactersRef.forEach((character) => {
  character.addEventListener("click", () => {
    clearInterval(typeInterval);
    isTyping = false;
    charactersRef.forEach((char) => {
      char.classList.remove("active");
    });
    character.classList.add("active");
    currentPerson = character.innerText;
    personRef.innerText = currentPerson;
    currentChat = [`Hello, my friend. Ask me a question.`];
    if (character.innerText === "Pozzo") {
      console.log("pozzo")
      questionsRef[0].classList.add("hidden");
      questionsRef[1].classList.add("hidden");
    } else {
      questionsRef[0].classList.remove("hidden");
      questionsRef[1].classList.remove("hidden");
    }
    updateChatUI();
  });
});

// function that types out the answer letter by letter until it's done
function startTyping(answer) {
  isTyping = true;
  const answerArray = answer.split("");
  const answerLength = answerArray.length;
  let currentLetter = 0;
  currentChat.push("");
  typeInterval = setInterval(() => {
    if (currentLetter < answerLength) {
      currentChat[currentChat.length - 1] = currentChat[
        currentChat.length - 1
      ].concat(answerArray[currentLetter]);
      updateChatUI();
      currentLetter++;
    } else {
      clearInterval(typeInterval);
      isTyping = false;
    }
  }, 15);
}

questionsRef.forEach((question, i) => {
  question.addEventListener("click", () => {
    if (!isTyping) {
      currentChat.push(question.innerText.replace("→", ""));
      if (currentPerson === "Estragon") {
        startTyping(EstragonAnswers[i]);
      } else if (currentPerson === "Vladimir") {
        startTyping(VladimirAnswers[i]);
      } else if (currentPerson === "Lucky") {
        startTyping(LuckyAnswers[i]);
      } else if (currentPerson === "Pozzo") {
        startTyping(PozzoAnswers[i]);
      }
      updateChatUI();
    }
  });
});
