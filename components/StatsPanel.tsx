import { Armour, CharacterClass, CharacterStats, Talisman, Weapon } from "./types"

interface Props {
    characterClass: CharacterClass,
    characterLevelStats: any,
    armours: Armour[],
    weapons: Weapon[],
    talismans: Talisman[]
}

function StatsPanel({characterClass, characterLevelStats, armours, weapons, talismans} : Props) {
  const hp = calculateHP(characterClass, characterLevelStats, talismans);
  const fp = calculateFP(characterClass, characterLevelStats, talismans);
  const stamina = calculateStamina(characterClass, characterLevelStats, talismans);
  const equipLoad = calculateEquipLoad(characterClass, characterLevelStats, talismans);
  const totalWeight = calculateWeight(armours, talismans, weapons);
  const poise = calculatePoise(armours, talismans);
  const discovery = calculateDiscovery(characterClass, characterLevelStats, talismans);

  return (
    <div className="stats-panel">
      <div>
        <strong>HP</strong> {hp}
      </div>
      <div>
        <strong>FP</strong> {fp}
      </div>
      <div>
        <strong>Stamina</strong> {stamina}
      </div>
      <div>
        <strong>Equip Load</strong> {totalWeight} / {equipLoad}
      </div>
      <div>
        <strong>Poise</strong> {poise}
      </div>
      <div>
        <strong>Discovery</strong> {discovery}
      </div>
    </div>
  )
}

export default StatsPanel

function calculateHP(characterClass: CharacterClass, characterLevelStats: CharacterStats, talismans: Talisman[]) {
  const vigorLevel = +characterClass.stats.vigor + +characterLevelStats.vigor;

  let hp = 0;
  if (vigorLevel < 26) {
    hp = 300 + 500*(((vigorLevel-1)/24)**1.5);
  }
  else if (vigorLevel < 41) {
    hp = 800 + 650*(((vigorLevel-25)/15)**1.1);
  }
  else if (vigorLevel < 61) {
    hp = 1450 + 450*(1 - (1 - ((vigorLevel - 40)/20))**1.2);
  }
  else {
    hp = 1900 + 200*(1 - (1 - ((vigorLevel - 60)/39))**1.2);
  }

  hp = Math.floor(hp);

  talismans.forEach(talisman => {
    if (talisman && talisman.statChange?.hp != null) hp *= talisman.statChange.hp;
  });

  return Math.floor(hp);
}

function calculateFP(characterClass: CharacterClass, characterLevelStats: CharacterStats, talismans: Talisman[]) {
  const mindLevel = +characterClass.stats.mind + +characterLevelStats.mind;

  let fp = 0;
  if (mindLevel < 16) {
    fp = 50 + 45*((mindLevel - 1)/14);
  }
  else if (mindLevel < 36) {
    fp = 95 + 105*((mindLevel - 15)/20);
  }
  else if (mindLevel < 61) {
    fp = 200 + 150*(1 - (1 - ((mindLevel - 35)/25)**1.2));
  }
  else {
    fp = 350 + 100*((mindLevel - 60)/39);
  }

  fp = Math.floor(fp);

  talismans.forEach(talisman => {
    if (talisman && talisman.statChange?.fp != null) fp *= talisman.statChange.fp;
  });

  return Math.floor(fp);
}

function calculateStamina(characterClass: CharacterClass, characterLevelStats: CharacterStats, talismans: Talisman[]) {
  const enduranceLevel = +characterClass.stats.endurance + +characterLevelStats.endurance;

  let stamina = 0;
  if (enduranceLevel < 16) {
    stamina = 80 + 25*((enduranceLevel - 1)/14);
  }
  else if (enduranceLevel < 36) {
    stamina = 105 + 25*((enduranceLevel - 15)/15);
  }
  else if (enduranceLevel < 61) {
    stamina = 130 + 25*((enduranceLevel - 30)/20);
  }
  else {
    stamina = 155 + 15*((enduranceLevel - 50)/49);
  }

  stamina = Math.floor(stamina);

  talismans.forEach(talisman => {
    if (talisman && talisman.statChange?.stamina != null) stamina *= talisman.statChange.stamina;
  });

  return Math.floor(stamina);
}

function calculateEquipLoad(characterClass: CharacterClass, characterLevelStats: CharacterStats, talismans: Talisman[]) {
  const enduranceLevel = +characterClass.stats.endurance + +characterLevelStats.endurance;

  let equipLoad = 0;
  
  if (enduranceLevel < 26) {
    equipLoad = 45 + 27*((enduranceLevel - 8)/17);
  }
  else if (enduranceLevel < 61) {
    equipLoad = 72 + 48*(((enduranceLevel - 25)/35)**1.1);
  }
  else {
    equipLoad = 120 + 40*((enduranceLevel - 60)/39);
  }

  equipLoad = Math.floor(equipLoad);

  talismans.forEach(talisman => {
    if (talisman && talisman.statChange?.equipLoad != null) equipLoad *= talisman.statChange.equipLoad;
  });

  return equipLoad.toFixed(1);
}

function calculateWeight(armours: Armour[], talismans: Talisman[], weapons: Weapon[]) {
  let totalWeight = 0;

  armours.forEach(armour => {
    if (armour != null) totalWeight += armour.weight;
  });

  weapons.forEach(weapon => {
    if (weapon != null) totalWeight += weapon.weight;
  });

  talismans.forEach(talisman => {
    if(talisman != null) totalWeight += talisman.weight;
  })
  return totalWeight.toFixed(1);
}

function calculatePoise(armours: Armour[], talismans: Talisman[]) {
  let poise = 0;

  armours.forEach(armour => {
    if (armour != null) poise += armour.resistance[4].amount;
  });
  
  talismans.forEach(talisman => {
    if (talisman && talisman.statChange?.poise != null) poise *= talisman.statChange.poise;
  });

  return Math.floor(poise);
}

function calculateDiscovery(characterClass: CharacterClass, characterLevelStats: CharacterStats, talismans: Talisman[]) {
  const arcaneLevel = +characterClass.stats.arcane + +characterLevelStats.arcane;
  let discovery = 100;

  talismans.forEach(talisman => {
    if (talisman && talisman.statChange?.discovery != null) discovery += talisman.statChange.discovery;
  });

  return (discovery + arcaneLevel).toFixed(1);
}