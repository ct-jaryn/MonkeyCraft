export const WORLD_CONFIG = {
  chunkSize: 16,
  maxHeight: 64,
  renderDistance: 3,
  seed: 1337,
};

export const PLAYER_CONFIG = {
  height: 1.7,
  radius: 0.35,
  walkSpeed: 5.5,
  sprintSpeed: 8.0,
  jumpSpeed: 6.5,
  gravity: 16,
};

export const BLOCKS = {
  bedrock: { color: 0x4b4b4b, solid: true, breakTime: Infinity, breakable: false },
  grass: { color: 0x65b84f, solid: true, breakTime: 0.45 },
  dirt: { color: 0x8b5a2b, solid: true, breakTime: 0.4 },
  stone: { color: 0x8f8f8f, solid: true, breakTime: 1.2 },
  sand: { color: 0xd8c07a, solid: true, breakTime: 0.35 },
  wood: { color: 0x8a5a2a, solid: true, breakTime: 0.85 },
  leaves: { color: 0x3f8f45, solid: true, breakTime: 0.2 },
  oak_log: { color: 0x8a5a2a, solid: true, breakTime: 0.85, drop: "wood" },
  oak_leaves: { color: 0x3f8f45, solid: true, breakTime: 0.2, drop: "leaves" },
  birch_log: { color: 0xd7cfb8, solid: true, breakTime: 0.85, drop: "wood" },
  birch_leaves: { color: 0x87b84d, solid: true, breakTime: 0.2, drop: "leaves" },
  crafting_table: { color: 0x9f6e3a, solid: true, breakTime: 1.0 },
  short_grass: { color: 0x6ea64d, solid: false, occludes: false, breakTime: 0.03, renderType: "cross" },
  flower_red: { color: 0xd74444, solid: false, occludes: false, breakTime: 0.05, renderType: "cross" },
  flower_yellow: { color: 0xe0c23f, solid: false, occludes: false, breakTime: 0.05, renderType: "cross" },
  flower_blue: { color: 0x4b82d8, solid: false, occludes: false, breakTime: 0.05, renderType: "cross" },
  flower_white: { color: 0xe9eef2, solid: false, occludes: false, breakTime: 0.05, renderType: "cross" },
};

export const PLACEABLE_BLOCKS = ["dirt", "grass", "stone", "sand", "wood", "crafting_table"];

export const BLOCK_LABELS = {
  bedrock: "基岩",
  grass: "草方块",
  dirt: "泥土",
  stone: "石头",
  sand: "沙子",
  wood: "木头",
  leaves: "树叶",
  oak_log: "橡木",
  oak_leaves: "橡树叶",
  birch_log: "桦木",
  birch_leaves: "桦树叶",
  crafting_table: "合成台",
  short_grass: "草丛",
  flower_red: "红花",
  flower_yellow: "黄花",
  flower_blue: "蓝花",
  flower_white: "白花",
};

export const ITEM_LABELS = {
  ...BLOCK_LABELS,
  plank: "木板",
};

export const RECIPES = [
  {
    id: "plank_from_wood",
    name: "木头 -> 木板 x4",
    inputs: { wood: 1 },
    outputs: { plank: 4 },
  },
  {
    id: "table_from_plank",
    name: "木板 x4 -> 合成台",
    inputs: { plank: 4 },
    outputs: { crafting_table: 1 },
  },
  {
    id: "wood_from_leaves",
    name: "树叶 x2 -> 木头",
    inputs: { leaves: 2 },
    outputs: { wood: 1 },
  },
];
