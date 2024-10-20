import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  productos: any[] = [];
  productosFiltrados: any[] = [];
  productoSeleccionado = {
    nombre: '',
    descripcion: '',
    precioCosto: null,
    precioVenta: null,
    imagenUrl: ''
  };
  editando = false;
  indiceEdicion: number | null = null;
  busqueda = '';

  constructor() {
    this.cargarProductos();
  }

  // Cargar productos desde el localStorage
  cargarProductos() {
    const productosGuardados = localStorage.getItem('productos');
    if (productosGuardados) {
      this.productos = JSON.parse(productosGuardados);
      this.productosFiltrados = [...this.productos];
    }
  }

  // Guardar productos en el localStorage
  guardarProductos() {
    localStorage.setItem('productos', JSON.stringify(this.productos));
  }

  // Agregar o editar producto
  agregarOEditarProducto() {
    if (this.editando && this.indiceEdicion !== null) {
      // Editar producto existente
      this.productos[this.indiceEdicion] = { ...this.productoSeleccionado };
    } else {
      // Agregar nuevo producto
      this.productos.push({ ...this.productoSeleccionado });
    }

    // Reiniciar formulario y estado
    this.resetearFormulario();
    this.guardarProductos();
    this.filtrarProductos();
  }

  // Editar producto
  editarProducto(indice: number) {
    this.productoSeleccionado = { ...this.productos[indice] };
    this.editando = true;
    this.indiceEdicion = indice;
  }

  // Eliminar producto
  eliminarProducto(indice: number) {
    this.productos.splice(indice, 1);
    this.guardarProductos();
    this.filtrarProductos();
  }

  // Buscar productos
  buscarProductos(event: any) {
    const query = event.target.value.toLowerCase();
    this.productosFiltrados = this.productos.filter(producto =>
      producto.nombre.toLowerCase().includes(query)
    );
  }

  // Filtrar productos después de agregar/eliminar
  filtrarProductos() {
    this.productosFiltrados = [...this.productos];
  }

  // Reiniciar formulario
  resetearFormulario() {
    this.productoSeleccionado = {
      nombre: '',
      descripcion: '',
      precioCosto: null,
      precioVenta: null,
      imagenUrl: ''
    };
    this.editando = false;
    this.indiceEdicion = null;
  }
}
