import { Component } from '@angular/core';
import { Player } from 'src/app/interfaces/player';
import { Enemy } from 'src/app/interfaces/enemy';
import { XPThresholds } from 'src/app/interfaces/xpthresholds';

const xpThresholdsByLevel: { [level: number]: XPThresholds } ={
  1: { easy: 25, medium: 50, hard: 75, deadly: 100 },
  2: { easy: 50, medium: 100, hard: 150, deadly: 200 },
  3: { easy: 75, medium: 150, hard: 225, deadly: 400 },
  4: { easy: 125, medium: 250, hard: 375, deadly: 500 },
  5: { easy: 250, medium: 500, hard: 750, deadly: 1100 },
  6: { easy: 300, medium: 600, hard: 900, deadly: 1400 },
  7: { easy: 350, medium: 750, hard: 1100, deadly: 1700 },
  8: { easy: 450, medium: 900, hard: 1400, deadly: 2100 },
  9: { easy: 550, medium: 1100, hard: 1600, deadly: 2400 },
  10: { easy: 600, medium: 1200, hard: 1900, deadly: 2800 },
  11: { easy: 800, medium: 1600, hard: 2400, deadly: 3600 },
  12: { easy: 1000, medium: 2000, hard: 3000, deadly: 4500 },
  13: { easy: 1100, medium: 2200, hard: 3400, deadly: 5100 },
  14: { easy: 1250, medium: 2500, hard: 3800, deadly: 5700 },
  15: { easy: 1400, medium: 2800, hard: 4300, deadly: 6400 },
  16: { easy: 1600, medium: 3200, hard: 4800, deadly: 7200 },
  17: { easy: 2000, medium: 3900, hard: 5900, deadly: 8800 },
  18: { easy: 2100, medium: 4200, hard: 6300, deadly: 9500 },
  19: { easy: 2400, medium: 4900, hard: 7300, deadly: 10900 },
  20: { easy: 2800, medium: 5700, hard: 8500, deadly: 12700 },
};

type Multipliers = {
  [key: number]: number;
};


const encounterMultipliers: Multipliers = {
  1: 1,
  2: 1.5,
  3: 2,
  7: 2.5,
  11: 3,
  15: 4,
};

@Component({
  selector: 'app-encounter-calculator',
  templateUrl: './encounter-calculator.component.html',
  styleUrl: './encounter-calculator.component.css'
})
export class EncounterCalculatorComponent {
  

  players: Player[] = [];
  enemies: Enemy[] = [];
  difficulty: string = 'deadly';
  enemyXp: number[] = [];

  addPlayer(name : HTMLInputElement, level: HTMLInputElement) {
    if(name.value && level.value){
      let n = name.value;
      let l = level.valueAsNumber;
      name.value = '';
      level.value = '';
      this.players.push({ name: n, level: l});
      this.calculateDifficulty();
    }
  }

  addEnemy(name : HTMLInputElement, xp: HTMLInputElement) {
    let n = name.value;
    let x = xp.valueAsNumber;
    name.value = '';
    xp.value = '';
    this.enemies.push({ name: n, xp: x});
    this.enemyXp.push(x);
    this.calculateDifficulty();
  }

  getDifficultyClass(difficulty: string): string {
    return {
      'easy': 'bg-green-500 text-white',
      'medium': 'bg-blue-500 text-white',
      'hard': 'bg-orange-500 text-white',
      'deadly': 'bg-red-500 text-white',
    }[difficulty] || 'bg-gray-500 text-white';
  }

  getDifficultyWidth(difficulty: string): string {
    const difficultyWidthMap: { [key: string]: string } = {
      'easy': '25%', // Representing 25% difficulty
      'medium': '50%', // Representing 50% difficulty
      'hard': '75%', // Representing 75% difficulty
      'deadly': '100%' // Representing 100% difficulty
    };
    return difficultyWidthMap[difficulty] || '0%';
  }


  removePlayer(p : Player) {
    this.players = this.players.filter(player => player !== p);
    this.calculateDifficulty();
  }

  removeEnemy(e : Enemy) {
    const index = this.enemies.indexOf(e);
    this.enemies.splice(index, 1);
    this.enemyXp.splice(index, 1);
    this.calculateDifficulty();
  }

  calculateDifficulty() {
    const partyThresholds: XPThresholds = { easy: 0, medium: 0, hard: 0, deadly: 0 };
    for (const player of this.players) {
      for (const difficulty of Object.keys(partyThresholds) as (keyof XPThresholds)[]) {
        partyThresholds[difficulty] += xpThresholdsByLevel[player.level][difficulty];
      }
    }
    


    const totalXp = this.enemyXp.reduce((acc, xp) => acc + xp, 0);

    const monsterCount = this.enemies.length;
    // const xpMultiplier = encounterMultipliers[Number(Object.keys(encounterMultipliers).reverse().find(count => monsterCount >= Number(count))!)] || 1;
    // const adjustedXp = totalXp * xpMultiplier;

    const keys = Object.keys(encounterMultipliers).map(Number).reverse();
    const xpMultiplierKey = keys.find(key => monsterCount >= key);
    const xpMultiplier = xpMultiplierKey ? encounterMultipliers[xpMultiplierKey] : 1;
  
  

    const adjustedXp = totalXp * xpMultiplier;

    let calculatedDifficulty: keyof XPThresholds | 'deadly' = 'deadly';
    for (const [difficulty, threshold] of Object.entries(partyThresholds)) {
      if (adjustedXp < threshold) {
        calculatedDifficulty = difficulty as keyof XPThresholds;
        break;
      }
    }

    this.difficulty = calculatedDifficulty;
  }
}
