import { Injectable } from '@angular/core';
import { IUser } from '../interfaces/iuser';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
   private users: IUser[] = JSON.parse(localStorage.getItem('users') || '[]');
   private currentUserSubject = new BehaviorSubject<IUser | null>(
    JSON.parse(localStorage.getItem('currentUser') || 'null')
  );
  currentUser$ = this.currentUserSubject.asObservable();
  register(user: IUser): boolean {
    const exists = this.users.find(u => u.email === user.email);
    if (exists) return false;

    this.users.push(user);
    localStorage.setItem('users', JSON.stringify(this.users));
    return true;
  }

  login(email: string, password: string): boolean {
    const user = this.users.find(u => u.email === email && u.password === password);
    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user));
      this.currentUserSubject.next(user); // ✅ نحدث القيمة هنا
      return true;
    }
    return false;
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null); // ✅ نحدث الحالة
  }
  getCurrentUser() {
    return this.currentUserSubject.value;
  }

  isLoggedIn(): boolean {
    return !!this.currentUserSubject.value;
  }
}
