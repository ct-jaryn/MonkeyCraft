const SOUND_LIBRARY = {
  grass: {
    hit: [1, 2, 3, 4, 5, 6].map((n) => new URL(`../../assets/minecraft/sounds/step/grass${n}.ogg`, import.meta.url).href),
    break: [1, 2, 3, 4].map((n) => new URL(`../../assets/minecraft/sounds/dig/grass${n}.ogg`, import.meta.url).href),
    place: [1, 2, 3, 4].map((n) => new URL(`../../assets/minecraft/sounds/dig/grass${n}.ogg`, import.meta.url).href),
  },
  gravel: {
    hit: [1, 2, 3, 4].map((n) => new URL(`../../assets/minecraft/sounds/step/gravel${n}.ogg`, import.meta.url).href),
    break: [1, 2, 3, 4].map((n) => new URL(`../../assets/minecraft/sounds/dig/gravel${n}.ogg`, import.meta.url).href),
    place: [1, 2, 3, 4].map((n) => new URL(`../../assets/minecraft/sounds/dig/gravel${n}.ogg`, import.meta.url).href),
  },
  sand: {
    hit: [1, 2, 3, 4, 5].map((n) => new URL(`../../assets/minecraft/sounds/step/sand${n}.ogg`, import.meta.url).href),
    break: [1, 2, 3, 4].map((n) => new URL(`../../assets/minecraft/sounds/dig/sand${n}.ogg`, import.meta.url).href),
    place: [1, 2, 3, 4].map((n) => new URL(`../../assets/minecraft/sounds/dig/sand${n}.ogg`, import.meta.url).href),
  },
  stone: {
    hit: [1, 2, 3, 4, 5, 6].map((n) => new URL(`../../assets/minecraft/sounds/step/stone${n}.ogg`, import.meta.url).href),
    break: [1, 2, 3, 4].map((n) => new URL(`../../assets/minecraft/sounds/dig/stone${n}.ogg`, import.meta.url).href),
    place: [1, 2, 3, 4].map((n) => new URL(`../../assets/minecraft/sounds/dig/stone${n}.ogg`, import.meta.url).href),
  },
  wood: {
    hit: [1, 2, 3, 4, 5, 6].map((n) => new URL(`../../assets/minecraft/sounds/step/wood${n}.ogg`, import.meta.url).href),
    break: [1, 2, 3, 4].map((n) => new URL(`../../assets/minecraft/sounds/dig/wood${n}.ogg`, import.meta.url).href),
    place: [1, 2, 3, 4].map((n) => new URL(`../../assets/minecraft/sounds/dig/wood${n}.ogg`, import.meta.url).href),
  },
};

const BLOCK_SOUND_GROUP = {
  bedrock: "stone",
  stone: "stone",
  dirt: "gravel",
  grass: "grass",
  sand: "sand",
  water: "sand",
  wood: "wood",
  oak_log: "wood",
  birch_log: "wood",
  crafting_table: "wood",
  leaves: "grass",
  oak_leaves: "grass",
  birch_leaves: "grass",
  short_grass: "grass",
  sugar_cane: "grass",
  flower_red: "grass",
  flower_yellow: "grass",
  flower_blue: "grass",
  flower_white: "grass",
};

const MUSIC_TRACKS = [
  new URL("../../assets/minecraft/sounds/music/game/sweden.ogg", import.meta.url).href,
  new URL("../../assets/minecraft/sounds/music/game/minecraft.ogg", import.meta.url).href,
  new URL("../../assets/minecraft/sounds/music/game/subwoofer_lullaby.ogg", import.meta.url).href,
  new URL("../../assets/minecraft/sounds/music/game/mice_on_venus.ogg", import.meta.url).href,
];

export class Sfx {
  constructor() {
    this.unlocked = false;
    this.music = null;
    this.musicStarted = false;
    this.musicQueue = [];
  }

  prime() {
    this.unlocked = true;
    this.startMusic();
  }

  resolveSet(blockType, action) {
    const group = BLOCK_SOUND_GROUP[blockType] || "stone";
    return SOUND_LIBRARY[group]?.[action] || SOUND_LIBRARY.stone[action];
  }

  playFromSet(urls, volume = 0.42) {
    if (!this.unlocked || !Array.isArray(urls) || urls.length === 0) return;
    const url = urls[Math.floor(Math.random() * urls.length)];
    const audio = new Audio(url);
    audio.volume = volume;
    audio.play().catch(() => {});
  }

  playMineTick(blockType = "stone") {
    this.playFromSet(this.resolveSet(blockType, "hit"), 0.34);
  }

  playBreak(blockType = "stone") {
    this.playFromSet(this.resolveSet(blockType, "break"), 0.46);
  }

  playPlace(blockType = "stone") {
    this.playFromSet(this.resolveSet(blockType, "place"), 0.32);
  }

  buildMusicQueue() {
    const queue = [...MUSIC_TRACKS];
    for (let i = queue.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [queue[i], queue[j]] = [queue[j], queue[i]];
    }
    return queue;
  }

  playNextMusicTrack() {
    if (!this.unlocked) return;
    if (this.musicQueue.length === 0) {
      this.musicQueue = this.buildMusicQueue();
    }
    const next = this.musicQueue.shift();
    if (!next) return;

    if (!this.music) {
      this.music = new Audio();
      this.music.volume = 0.24;
      this.music.addEventListener("ended", () => this.playNextMusicTrack());
    }

    this.music.src = next;
    this.music.play().catch(() => {});
  }

  startMusic() {
    if (!this.unlocked || this.musicStarted) return;
    this.musicStarted = true;
    this.playNextMusicTrack();
  }
}
