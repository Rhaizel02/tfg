import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css']
})
export class ContactoComponent {
  contactForm: FormGroup;
  mi_email = 'bogdanandrei.szasz@gmail.com';
  constructor(private fb: FormBuilder, private snackBar: MatSnackBar) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required],
    });
  }

  copyEmailToClipboard() {
    navigator.clipboard.writeText(this.mi_email).then(() => {
      this.snackBar.open('Email copiado al portapapeles', 'Cerrar', { duration: 2000 });
    });
  }

  onSubmit() {
    if (this.contactForm.valid) {
      // Aquí iría la lógica para enviar la información del formulario, como un servicio HTTP
      console.log(this.contactForm.value);
      this.contactForm.reset();
      this.snackBar.open('Mensaje enviado con éxito', 'Cerrar', { duration: 2000 });

      // Enviar a firebase

      

    }
  }
}
