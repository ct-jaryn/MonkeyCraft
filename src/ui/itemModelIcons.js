const ITEM_DEFS = {
  dirt: { model: "minecraft:block/dirt" },
  grass: { model: "minecraft:block/grass_block", tint: "grass" },
  stone: { model: "minecraft:block/stone" },
  sand: { model: "minecraft:block/sand" },
  wood: { model: "minecraft:block/oak_log" },
  crafting_table: { model: "minecraft:block/crafting_table" },
  plank: { model: "minecraft:block/oak_planks" },
};

const BLOCK_MODELS = {
  "minecraft:block/dirt": {
    textures: { all: "minecraft:block/dirt" },
  },
  "minecraft:block/grass_block": {
    textures: {
      particle: "minecraft:block/dirt",
      bottom: "minecraft:block/dirt",
      top: "minecraft:block/grass_block_top",
      side: "minecraft:block/grass_block_side",
      overlay: "minecraft:block/grass_block_side_overlay",
    },
  },
  "minecraft:block/stone": {
    textures: { all: "minecraft:block/stone" },
  },
  "minecraft:block/sand": {
    textures: { all: "minecraft:block/sand" },
  },
  "minecraft:block/oak_log": {
    textures: {
      end: "minecraft:block/oak_log_top",
      side: "minecraft:block/oak_log",
    },
  },
  "minecraft:block/crafting_table": {
    textures: {
      down: "minecraft:block/oak_planks",
      east: "minecraft:block/crafting_table_side",
      north: "minecraft:block/crafting_table_front",
      particle: "minecraft:block/crafting_table_front",
      south: "minecraft:block/crafting_table_side",
      up: "minecraft:block/crafting_table_top",
      west: "minecraft:block/crafting_table_front",
    },
  },
  "minecraft:block/oak_planks": {
    textures: { all: "minecraft:block/oak_planks" },
  },
};

const TEXTURE_PRIORITY = [
  "particle",
  "front",
  "north",
  "side",
  "all",
  "top",
  "end",
  "up",
  "south",
  "west",
  "east",
  "down",
];

function textureRefToUrl(textureRef) {
  const texturePath = textureRef.replace("minecraft:", "../../assets/minecraft/textures/");
  return new URL(`${texturePath}.png`, import.meta.url).href;
}

export function resolveHotbarIcon(itemId) {
  const itemDef = ITEM_DEFS[itemId];
  if (!itemDef) return null;

  const modelDef = BLOCK_MODELS[itemDef.model];
  if (!modelDef?.textures) return null;

  for (const key of TEXTURE_PRIORITY) {
    const textureRef = modelDef.textures[key];
    if (!textureRef) continue;
    return {
      url: textureRefToUrl(textureRef),
      tint: itemDef.tint || null,
    };
  }

  return null;
}
