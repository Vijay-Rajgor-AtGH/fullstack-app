import { Component, OnInit, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { environment } from '../environments/environment';

interface Message {
  id?: number;
  text: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css' // Remove this line if you don't have an app.component.css file
})
export class AppComponent implements OnInit {
  private http = inject(HttpClient);
  messages = signal<Message[]>([]);
  newText = '';

  ngOnInit() {
    this.loadMessages();
  }

  loadMessages() {
    this.http.get<Message[]>(environment.apiUrl).subscribe(data => this.messages.set(data));
  }

  addMessage() {
    if (!this.newText.trim()) return;
    this.http.post<Message>(environment.apiUrl, { text: this.newText }).subscribe(() => {
      this.newText = '';
      this.loadMessages();
    });
  }
}

