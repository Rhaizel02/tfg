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
    this.firebase.getItems().subscribe((items) => {
      console.log(items);
    });
  }
}
