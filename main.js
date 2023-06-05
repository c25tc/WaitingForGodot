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
let currentPerson = "Vladimir";

const EstragonAnswers = [
  `Ah, the eternal question of the meaning of life. Well, my friend, if you're expecting a definitive answer from me, you're in for disappointment. But since you asked, I'll share my musings on the matter. You see, life seems to be a bit like this endless waiting we find ourselves in. We're stuck here, uncertain of our purpose, searching for something or someone to give us meaning.
Godot, for instance, is that elusive figure we wait for, hoping he'll bring us purpose or salvation. But does he ever arrive? No, he keeps us waiting, just like life does. And perhaps that's the key here, my friend. The waiting itself, the struggles and the uncertainties, that's what life is about. It's in those moments, in the very act of waiting, that we have the chance to find meaning.
But what that meaning is, I can't say. Maybe it's different for each of us. Some find it in relationships, others in art, or maybe in the simplest of pleasures. So, perhaps the meaning of life lies in the search itself, in finding those somethings that make us feel alive, even in the face of uncertainty.
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
  `Ah, the eternal question of the meaning of life, a matter pondered by many a philosopher and mortal soul. Allow me, Lucky, to delve into the depths of this profound inquiry.
(He pauses, lost in thought, then suddenly snaps back to attention.)
Meaning, sir, meaning... What is the meaning of life? A ponderous quandary indeed. I, as a humble servant, burdened with the weight of existence, am compelled to offer my musings.
(Brief pause.)
Life, sir, it is a cruel and absurd spectacle. We, mere puppets on the stage, tossed about by the whims of fate and circumstance. We toil, we suffer, we yearn for purpose. Yet, what purpose is there to be found in this chaotic dance we call life?
(He looks up, gazing into the distance.)
Is it in the pursuit of knowledge? The accumulation of wealth and possessions? The quest for power? Alas, such endeavors often prove futile, fleeting illusions that dissipate like mist.
(He clutches his hat tightly.)`,
  `(Time passes. Lucky remains silent, seemingly lost in thought. Suddenly, he bursts forth with an outpouring of words, his voice filled with a mix of frustration and despair. In a rushed and frenetic manner) Ah, time! That elusive specter that haunts our very existence! Does it exist? Is it but a cruel illusion that torments our weary souls? (pauses, catching his breath)
Time, my good sir, time is a relentless force that shackles us to the wheel of existence. We are forever trapped within its grasp, like flies caught in a spider's web. Yet, does it truly exist, or is it merely a construct of our feeble minds, a desperate attempt to impose order upon the chaos of our lives? (pauses again, his voice filled with weariness)
I ponder this question, day in and day out, as I trudge through this desolate landscape, waiting for a mysterious Godot who may never arrive. Time mocks us with its ceaseless ticking, reminding us of our mortality, of our transience in this vast, indifferent universe. We are but fleeting moments in its grand tapestry, insignificant specks in the cosmic continuum. (pauses, his voice growing quieter)
And yet, despite its intangible nature, we are bound by its inexorable march. We measure our days and nights, our seasons and years, and find solace in the rhythmic patterns it imposes. But is it a tangible entity, or a mere abstraction? Ah, my mind reels at the thought, for the answer eludes me like a cruel joke, forever dancing just out of reach. (pauses, his voice fading away)
So, my good sir, I stand here before you, a pitiable creature, burdened by the weight of time's enigma. Whether it truly exists or not, I cannot say. But its presence is undeniable, a haunting specter that shapes our every step and leaves us yearning for meaning in this vast expanse of existence. (falls silent, his gaze distant and lost)`,
  `Ah, existential quandaries, my dear interlocutor. As Lucky, I embody the concept of a subservient existence, forever tethered to Pozzo's whims and desires. My name, ironically bestowed upon me, suggests a stroke of fortune, but it is a bitter irony, for my purpose is to serve Pozzo, shielding me from the burden of grappling with the existential guilt of idleness.
You see, my role as Pozzo's loyal attendant absolves me from the torment of aimlessness that plagues the other characters in this play. While they engage in a ceaseless wait for a figure named Godot, I am spared such futility. Instead, I find solace in my servitude, in the certainty of my role and the purpose it affords me.
Even when Pozzo loses his sight and control over me, I remain by his side, faithful and obedient. It is not out of obligation, but rather out of a deeply ingrained need for structure and purpose. For without Pozzo, I am confronted with the emptiness of existence, with the unbearable weight of freedom.
In essence, I symbolize the human inclination to seek refuge in subservience and routine, to avoid the unsettling void that comes with the absence of purpose. While my name may mockingly suggest good fortune, it is a façade, masking the tragic reality of a life defined by servitude and the evasion of existential guilt.`,
];
const PozzoAnswers = [
  `N/A`,
  `N/A`,
  `Ah, what a question, my friend! One could argue that I personify the tyrannical nature of power, authority, and dominance. I strut around with my whip and bellow orders at poor Lucky, treating him as nothing more than a mere servant. I am the embodiment of control and exploitation.
Yet, there's more to me than just that. I also symbolize the absurdity and futility of human existence. I, like Vladimir and Estragon, am trapped in this desolate landscape, waiting for someone or something that may never come. I am caught in a cycle of routine, unable to find any true meaning or purpose. My blindness, both literal and metaphorical, represents the ignorance and inability to see beyond our own circumstances.
Pozzo is also seen as a representation of the human condition, trapped in the cycles of existence. He grapples with his own limitations, his dependence on others, and the existential angst that comes with the uncertainty and futility of life. Through his interactions with other characters, particularly Vladimir and Estragon, Pozzo reflects the absurdity and the relentless search for meaning in an uncertain world.
Ultimately, as Pozzo, I serve as a stark contrast to the characters of Vladimir and Estragon. They are the ones who question, ponder, and seek meaning in their existence, while I, in all my arrogance, represent a stagnant force that suppresses any hope or progress.`,
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

    if (isChat) {
      camera.position.set(
      currentCamX - pointer.x * 0.05,
      currentCamY + pointer.y * 0.05,
      currentCamZ + pointer.x * 0.05
    );
    } else {
      camera.position.set(
      currentCamX + pointer.x * 0.05,
      currentCamY + pointer.y * 0.05,
      currentCamZ - pointer.x * 0.05
    );
    }
    
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
  }, 10);
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
