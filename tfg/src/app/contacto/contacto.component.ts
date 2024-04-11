import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FirebaseService } from '../services/firebase/firebase.service';

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css'],
})
export class ContactoComponent {
  contactForm: FormGroup;
  mi_email = 'bogdanandrei.szasz@gmail.com';
  data_base: string = 'rolenroll_db';
  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private firebaseService: FirebaseService
  ) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required],
    });
  }

  copyEmailToClipboard() {
    navigator.clipboard.writeText(this.mi_email).then(() => {
      this.snackBar.open('Email copiado al portapapeles', 'Cerrar', {
        duration: 2000,
      });
    });
  }

  onSubmit() {
    if (this.contactForm.valid) {
      // Enviar a firebase
      try {
        this.firebaseService.addContactMessage({
          name: this.contactForm.value.name,
          email: this.contactForm.value.email,
          message: this.contactForm.value.message,
        });
        this.snackBar.open('Message sent successfully!', 'Close', {
          duration: 2000,
        });

        // Limpiar formulario
        this.contactForm.reset();
      } catch (error) {
        this.snackBar.open('Error sending message!', 'close', {
          duration: 2000,
        });
      }
    }
  }
}
