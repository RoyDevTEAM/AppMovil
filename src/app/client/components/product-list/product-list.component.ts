import { Component, OnInit } from '@angular/core';
import { Producto } from '../../../core/model/producto.model';
import { ProductoService } from '../../../core/services/producto.service';
import { CarritoService } from '../../../core/services/carrito.service';
import { AuthService } from '../../../core/services/auth.service';
import { Observable } from 'rxjs';


@Component({
  
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  productos: Producto[] = [];
  isAdmin$!: Observable<boolean>; // Observable para comprobar si el usuario es administrador
  isLoggedIn$!: Observable<boolean>; // Observable para comprobar si el usuario está autenticado
  usuarioActual: any; // Datos del usuario actual

  constructor(
    private productoService: ProductoService,
    private carritoService: CarritoService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.obtenerProductos();
    this.isAdmin$ = this.authService.isAdmin(); // Obtener estado de administrador
    this.isLoggedIn$ = this.authService.isLoggedIn(); // Obtener estado de autenticación
    this.authService.usuarioActual$.subscribe(usuario => {
      this.usuarioActual = usuario; // Capturar los datos del usuario actual
    });
  }

  obtenerProductos(): void {
    this.productoService.getProductos().subscribe(productos => {
      this.productos = productos;
    });
  }

  agregarAlCarrito(producto: Producto): void {
    this.carritoService.agregarAlCarrito(producto);
    console.log('Producto agregado al carrito:', producto);
  }
}
