import { Component } from '@angular/core';

@Component({
  selector: 'app-clientes',
  templateUrl: 'clientes.page.html',
  styleUrls: ['clientes.page.scss'],
})
export class ClientesPage {
  clientes: any[] = [];
  clientesFiltrados: any[] = [];
  clienteSeleccionado = {
    nombre: '',
    direccion: '',
    telefono: '',
    correo: '',
    fotoUrl: ''
  };
  editando = false;
  indiceEdicion: number | null = null;
  busqueda = '';

  constructor() {
    this.cargarClientes();
  }

  // Cargar clientes desde el localStorage
  cargarClientes() {
    const clientesGuardados = localStorage.getItem('clientes');
    if (clientesGuardados) {
      this.clientes = JSON.parse(clientesGuardados);
      this.clientesFiltrados = [...this.clientes];
    }
  }

  // Guardar clientes en el localStorage
  guardarClientes() {
    localStorage.setItem('clientes', JSON.stringify(this.clientes));
  }

  // Agregar o editar cliente
  agregarOEditarCliente() {
    if (this.editando && this.indiceEdicion !== null) {
      // Editar cliente existente
      this.clientes[this.indiceEdicion] = { ...this.clienteSeleccionado };
    } else {
      // Agregar nuevo cliente
      this.clientes.push({ ...this.clienteSeleccionado });
    }

    // Reiniciar formulario y estado
    this.resetearFormulario();
    this.guardarClientes();
    this.filtrarClientes();
  }

  // Editar cliente
  editarCliente(indice: number) {
    this.clienteSeleccionado = { ...this.clientes[indice] };
    this.editando = true;
    this.indiceEdicion = indice;
  }

  // Eliminar cliente
  eliminarCliente(indice: number) {
    this.clientes.splice(indice, 1);
    this.guardarClientes();
    this.filtrarClientes();
  }

  // Buscar clientes
  buscarClientes(event: any) {
    const query = event.target.value.toLowerCase();
    this.clientesFiltrados = this.clientes.filter(cliente =>
      cliente.nombre.toLowerCase().includes(query)
    );
  }

  // Filtrar clientes después de agregar/eliminar
  filtrarClientes() {
    this.clientesFiltrados = [...this.clientes];
  }

  // Reiniciar formulario
  resetearFormulario() {
    this.clienteSeleccionado = {
      nombre: '',
      direccion: '',
      telefono: '',
      correo: '',
      fotoUrl: ''
    };
    this.editando = false;
    this.indiceEdicion = null;
  }
}
