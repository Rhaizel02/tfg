import { Component } from '@angular/core';
import { Participant, STATUSES_VALUES } from '../../interfaces/participant';

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
  newStatus: string = '';
  possible_statuses = STATUSES_VALUES;  

  addParticipant() {
    console.log(this.possible_statuses);
    this.participants.push({ ...this.newParticipant, id: Date.now() }); // Usamos timestamp como ID simple
    this.participants.sort((a, b) => b.initiative - a.initiative); // Ordenamos por iniciativa
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
    participant.hp -= amount;
  }

  // Método para añadir un estado
  addStatus(participant: Participant, status: string): void {
    if (participant.statuses.indexOf(status) === -1) {
      participant.statuses.push(status);
    }
  }
}
