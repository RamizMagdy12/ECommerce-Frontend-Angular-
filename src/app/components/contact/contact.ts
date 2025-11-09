import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-contact',
  imports: [CommonModule, FormsModule],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
})
export class Contact {
  name: string = '';
  email: string = '';
  message: string = '';

  sendMessage() {
    if (this.name && this.email && this.message) {
      Swal.fire({
        title: "✅ Your message has been sent successfully!",
        text: "Thank you for contacting us 💬",
        icon: "success",
        confirmButtonText: "OK",
        confirmButtonColor: "#3085d6",
        background: "#f0f9ff",
        color: "#333",
        showClass: {
          popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp'
        }
      });
      this.name = '';
      this.email = '';
      this.message = '';
    } else {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "⚠️ Please fill in all fields before sending.",
        confirmButtonText: "OK",
        confirmButtonColor: "#d33",
        background: "#fff5f5",
        color: "#333",
        showClass: {
          popup: 'animate__animated animate__shakeX'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOut'
        }
      });
    }
  }
}
