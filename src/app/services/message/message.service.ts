import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  successMessage: string | null = null;

  setSuccessMessage(message: string): void {
    this.successMessage = message;
  }

  getSuccessMessage(): string | null {
    return this.successMessage;
  }

  clearSuccessMessage(): void {
    this.successMessage = null;
  }
}
