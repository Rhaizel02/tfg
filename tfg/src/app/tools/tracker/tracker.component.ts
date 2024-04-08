import { Component } from '@angular/core';
import { Participant } from '../../interfaces/participant';

@Component({
  selector: 'app-tracker',
  templateUrl: './tracker.component.html',
  styleUrls: ['./tracker.component.css'],
})
export class TrackerComponent {
  [x: string]: any;
  participants: Participant[] = [];
  newParticipant: Participant = {
    id: 0,
    name: '', 
    isEnemy: false,
    initiative: 0,
    initiative_bonus: 0,
    ac : 0,
    hp: 0,
    statuses: [],
  };
  newStatus: string = 'DEAFENED';
  possible_statuses = ['DEAFENED',
  'BLINDED',
  'CHARMED',
  'FRIGHTENED',
  'GRAPPLED',
  'INCAPACITATED',
  'INVISIBLE',
  'PARALYZED',
  'PETRIFIED',
  'POISONED',
  'PRONE',
  'RESTRAINED',
  'STUNNED',
  'UNCONSCIOUS',
  'EXHAUSTION',]

  addParticipant() {
    console.log(this.possible_statuses);
    this.participants.push({ ...this.newParticipant, id: Date.now() }); // Usamos timestamp como ID simple
    this.sortParticipants();
    this.newParticipant = {
      id: 0,
      name: '',
      isEnemy: false,
      initiative: 0,
      initiative_bonus: 0,
      ac : 0,
      hp: 0,
      statuses: [],
    }; // Reset
  }

  sortParticipants() {
    this.participants.sort((a, b) => (b.initiative+b.initiative_bonus) - (a.initiative+a.initiative_bonus));
  }

  removeParticipant(id: number) {
    this.participants = this.participants.filter(
      (participant) => participant.id !== id
    );
  }

  trackByParticipants(index: number, participant: Participant): number {
    return participant.id;
  }

  removeStatus(participant: Participant, statusToRemove: string): void {
    participant.statuses = participant.statuses.filter(
      (status) => status !== statusToRemove
    );
  }

  subtractHp(participant: Participant, amount: number): void {
    if(!isNaN(amount))
      participant.hp -= amount;
  }

  // Método para añadir un estado
  addStatus(participant: Participant, status: string): void {
    if (participant.statuses.indexOf(status) === -1) {
      participant.statuses.push(status);
    }
  }

  clearAll(){
    this.participants = [];
  }

  rerollInitiative(){
    this.participants.forEach(participant => {
      participant.initiative = Math.floor(Math.random() * 20) + 1;
    });
    this.sortParticipants();
  }
}
