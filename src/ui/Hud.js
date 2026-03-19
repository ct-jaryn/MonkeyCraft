import { PLACEABLE_BLOCKS } from "../constants.js";
import { resolveHotbarIcon } from "./itemModelIcons.js";

export class Hud {
  constructor() {
    this.hudEl = document.getElementById("hud");
    this.welcomeScreenEl = document.getElementById("welcome-screen");
    this.startButtonEl = document.getElementById("start-game-button");
    this.welcomeStatusEl = document.getElementById("welcome-status");
    this.tipsEl = document.getElementById("tips");
    this.statusEl = document.getElementById("status");
    this.hotbarEl = document.getElementById("hotbar");
    this.hotbarLabelEl = document.getElementById("hotbar-label");
    this.hotbarXpFillEl = document.getElementById("hotbar-xp-fill");
    this.healthBarEl = document.getElementById("health-bar");
    this.hungerBarEl = document.getElementById("hunger-bar");
    this.toolboxEl = document.getElementById("toolbox");
    this.inventoryListEl = document.getElementById("inventory-list");
    this.recipeListEl = document.getElementById("recipe-list");
    this.selectedLabel = "泥土";
    this.selectedHotbarIndex = 0;
    this.miningLabel = "";
    this.miningProgress = 0;
    this.inventorySummary = "";
    this.hotbarItems = PLACEABLE_BLOCKS.slice(0, 9);
    this.toolboxOpen = false;
    this.health = 10;
    this.hunger = 10;

    this.renderHotbar({});
    this.renderVitals();
  }

  waitForStart(onStart) {
    if (!this.startButtonEl) return;
    this.startButtonEl.disabled = false;
    this.startButtonEl.onclick = () => {
      this.startButtonEl.disabled = true;
      onStart?.();
    };
  }

  setWelcomeStatus(text) {
    if (this.welcomeStatusEl) {
      this.welcomeStatusEl.textContent = text;
    }
  }

  hideWelcome() {
    this.welcomeScreenEl?.classList.add("hidden");
    this.hudEl?.classList.remove("hidden");
  }

  setPointerLock(locked) {
    if (!this.tipsEl) return;
    this.tipsEl.textContent = locked
      ? "WASD 移动 | Space 跳跃 | Shift 冲刺 | 左键挖掘 | 右键放置 | 1-6 切换方块 | E 工具箱"
      : "点击屏幕开始 | WASD 移动 | Space 跳跃 | Shift 冲刺 | 左键挖掘 | 右键放置 | 1-6 切换方块 | E 工具箱";
  }

  setSelectedBlock(label) {
    this.selectedLabel = label;
    this.renderHotbarLabel();
  }

  setSelectedHotbar(index) {
    this.selectedHotbarIndex = Math.max(0, Math.min(8, index || 0));
    this.renderHotbar();
  }

  setMiningProgress(label, progress) {
    this.miningLabel = label || "";
    this.miningProgress = Math.max(0, Math.min(1, progress || 0));
    this.renderHotbarLabel();
  }

  setVitals({ health, hunger }) {
    if (typeof health === "number") {
      this.health = Math.max(0, Math.min(10, Math.floor(health)));
    }
    if (typeof hunger === "number") {
      this.hunger = Math.max(0, Math.min(10, Math.floor(hunger)));
    }
    this.renderVitals();
  }

  setInventory(items, labels) {
    if (!this.inventoryListEl) return;
    const entries = Object.entries(items || {}).filter(([, count]) => count > 0);
    this.inventoryListEl.innerHTML = "";

    if (entries.length === 0) {
      const empty = document.createElement("div");
      empty.className = "toolbox-empty";
      empty.textContent = "背包为空，先去挖点方块。";
      this.inventoryListEl.appendChild(empty);
      this.inventorySummary = "背包空";
      this.renderHotbar({});
      return;
    }

    const grid = document.createElement("div");
    grid.className = "slot-grid";

    const summary = [];
    for (const [id, count] of entries) {
      const row = document.createElement("div");
      row.className = "slot-item";
      const name = labels?.[id] || id;
      row.title = `${name} x${count}`;

      const badge = document.createElement("div");
      badge.className = "slot-badge";
      badge.textContent = name.slice(0, 2).toUpperCase();

      const amount = document.createElement("div");
      amount.className = "slot-count";
      amount.textContent = String(count);

      row.appendChild(badge);
      row.appendChild(amount);
      grid.appendChild(row);
      summary.push(`${name}:${count}`);
    }
    this.inventoryListEl.appendChild(grid);
    this.inventorySummary = summary.slice(0, 4).join(" ");
    this.renderHotbar(items || {});
  }

  setRecipes(recipes, labels, onCraft, canCraft = null) {
    if (!this.recipeListEl) return;
    this.recipeListEl.innerHTML = "";
    for (const recipe of recipes || []) {
      const row = document.createElement("div");
      row.className = "recipe-item";

      const label = document.createElement("div");
      label.className = "recipe-name";
      label.textContent = recipe.name || recipe.id;

      const req = document.createElement("div");
      req.className = "recipe-need";
      req.textContent = Object.entries(recipe.inputs || {})
        .map(([id, count]) => `${labels?.[id] || id}x${count}`)
        .join(" + ");

      const button = document.createElement("button");
      button.textContent = "合成";
      const craftable = typeof canCraft === "function" ? !!canCraft(recipe) : true;
      button.disabled = !craftable;
      button.addEventListener("click", () => onCraft?.(recipe.id));

      const left = document.createElement("div");
      left.className = "recipe-left";
      left.appendChild(label);
      left.appendChild(req);

      row.appendChild(left);
      row.appendChild(button);
      this.recipeListEl.appendChild(row);
    }
  }

  toggleToolbox() {
    this.toolboxOpen = !this.toolboxOpen;
    this.toolboxEl?.classList.toggle("hidden", !this.toolboxOpen);
    return this.toolboxOpen;
  }

  renderHotbar(items = null) {
    if (!this.hotbarEl) return;
    if (items) {
      this.hotbarInventory = items;
    }
    const inventory = this.hotbarInventory || {};
    this.hotbarEl.innerHTML = "";

    for (let i = 0; i < 9; i++) {
      const itemId = this.hotbarItems[i] || "";
      const slot = document.createElement("div");
      slot.className = `hotbar-slot${i === this.selectedHotbarIndex ? " is-selected" : ""}${itemId ? "" : " is-empty"}`;

      if (itemId) {
        const icon = document.createElement("div");
        icon.className = "hotbar-icon";
        const iconDef = resolveHotbarIcon(itemId);
        if (iconDef?.url) {
          icon.style.backgroundImage = `url("${iconDef.url}")`;
          if (iconDef.tint === "grass") {
            icon.style.filter = "hue-rotate(-8deg) saturate(1.1) brightness(1.02)";
          }
        } else {
          icon.textContent = itemId.slice(0, 2).toUpperCase();
        }

        const count = document.createElement("div");
        count.className = "hotbar-count";
        const amount = inventory[itemId] || 0;
        count.textContent = amount > 0 ? String(amount) : "";

        slot.appendChild(icon);
        slot.appendChild(count);
      }

      this.hotbarEl.appendChild(slot);
    }

    const xpFill = Math.min(100, Math.max(8, Object.keys(inventory).length * 12));
    if (this.hotbarXpFillEl) {
      this.hotbarXpFillEl.style.width = `${xpFill}%`;
    }
    this.renderHotbarLabel();
  }

  renderHotbarLabel() {
    if (!this.hotbarLabelEl) return;
    if (this.miningProgress > 0 && this.miningLabel) {
      this.hotbarLabelEl.textContent = `${this.miningLabel} ${Math.floor(this.miningProgress * 100)}%`;
      return;
    }
    this.hotbarLabelEl.textContent = this.selectedLabel || "";
  }

  renderVitals() {
    if (this.healthBarEl) {
      this.healthBarEl.innerHTML = "";
      for (let i = 0; i < 10; i++) {
        const heart = document.createElement("div");
        heart.className = `vital-icon heart${i < this.health ? " is-filled" : ""}`;
        this.healthBarEl.appendChild(heart);
      }
    }

    if (this.hungerBarEl) {
      this.hungerBarEl.innerHTML = "";
      for (let i = 0; i < 10; i++) {
        const hunger = document.createElement("div");
        hunger.className = `vital-icon hunger${i < this.hunger ? " is-filled" : ""}`;
        this.hungerBarEl.appendChild(hunger);
      }
    }
  }

  renderStatus(player, worldStats) {
    this.statusEl.textContent = `${Math.floor(player.pos.x)}, ${Math.floor(player.pos.y)}, ${Math.floor(player.pos.z)}`;
  }
}
