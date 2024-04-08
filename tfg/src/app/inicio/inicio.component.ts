import { Component } from '@angular/core';
import { FirebaseService } from '../services/firebase/firebase.service';
@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent {
  constructor(private firebase: FirebaseService) {}
  ngOnInit(): void {
    console.log(this.firebase.getItems());
    // crear documento pasando un objeto
    this.firebase.createDocument({ name: 'test', value: 1 });
  }
}
