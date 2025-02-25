import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocaldbService {
  constructor() { }

  initializeCredentials() {
    const users = {
      admin: { email: 'admin@admin.cl', password: 'admin', nombre: 'admin', rol: 'admin', institucion: 'Admin' },
      alumno: { email: 'rodrigo@duocuc.cl', password: 'duoc', nombre: 'Rodrigo Carcamo', rol: 'alumno', institucion: 'DuocUC' },
      profesor: { email: 'profesor@profesor.duoc.cl', password: 'duoc', nombre: 'Luis Morales', rol: 'profesor', institucion: 'DuocUC' },
      inacapAlumno: { email: 'alumno@inacap.cl', password: 'inacap2024', nombre: 'Carlos Garcia', rol: 'alumno', institucion: 'Inacap' },
      inacapProfesor: { email: 'profesor@profesor.inacap.cl', password: 'inacap2024', nombre: 'María Rodriguez', rol: 'profesor', institucion: 'Inacap' },
      otroAlumno: { email: 'alumno@otroalumno.cl', password: 'otro2024', nombre: 'Ana Lopez', rol: 'alumno', institucion: 'Otra' },
      otroProfesor: { email: 'profesor@otroprofesor.cl', password: 'otro2024', nombre: 'Pedro Gonzalez', rol: 'profesor', institucion: 'Otra' },
      otrotro: { email: 'mat.gonzalez6@duocuc.cl', password: 'uwu', nombre: 'Matias Gonzalez', rol: 'Alumno', institucion: 'DuocUC' },
      otrotroo: { email: 'ri@duocuc.cl', password: '1234', nombre: 'Ricardo Salinas', rol: 'Alumno', institucion: 'DuocUC' },
    };
    localStorage.setItem('users', JSON.stringify(users));
  }

  getUsers() {
    const users = localStorage.getItem('users');
    return users ? JSON.parse(users) : {};
  }

  guardarUsuario(nuevoUsuario: { nombre: string; email: string; password: string; rol: string; institucion: string }) {
    const users = this.getUsers();
    users[nuevoUsuario.email] = nuevoUsuario;
    localStorage.setItem('users', JSON.stringify(users));
  }

  initializeHistorial() {
    const loggedInUserEmail = localStorage.getItem('loggedInUser');
    if (loggedInUserEmail && !localStorage.getItem(`historialAsistencias_${loggedInUserEmail}`)) {
      localStorage.setItem(`historialAsistencias_${loggedInUserEmail}`, JSON.stringify([]));
    }
  }

  guardarAsistencia(asistencia: { fecha: string; hora: string; nombre: string; institucion: string; curso: string }) {
    const loggedInUserEmail = localStorage.getItem('loggedInUser');
    if (!loggedInUserEmail) return;
    const historialAsistencias = this.getHistorialAsistencias(loggedInUserEmail);
    historialAsistencias.push(asistencia);
    localStorage.setItem(`historialAsistencias_${loggedInUserEmail}`, JSON.stringify(historialAsistencias));
  }

  getHistorialAsistencias(email: string) {
    const historialAsistencias = localStorage.getItem(`historialAsistencias_${email}`);
    return historialAsistencias ? JSON.parse(historialAsistencias) : [];
  }

  getHistorialAsistenciasActual() {
    const loggedInUserEmail = localStorage.getItem('loggedInUser');
    return loggedInUserEmail ? this.getHistorialAsistencias(loggedInUserEmail) : [];
  }

  getNombreUsuario() {
    const users = this.getUsers();
    const loggedInUserEmail = localStorage.getItem('loggedInUser');
    const user = Object.keys(users).find(key => users[key].email === loggedInUserEmail);
    return user ? users[user].nombre : '';
  }

  getInstitucionUsuario() {
    const users = this.getUsers();
    const loggedInUserEmail = localStorage.getItem('loggedInUser');
    const user = Object.keys(users).find(key => users[key].email === loggedInUserEmail);
    return user ? users[user].institucion : '';
  }
  
}
