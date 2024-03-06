import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Producto } from '../model/producto.model';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  private productosCollection: AngularFirestoreCollection<Producto>;
  productos: Observable<Producto[]>;

  constructor(private firestore: AngularFirestore) {
    this.productosCollection = this.firestore.collection<Producto>('productos');
    this.productos = this.productosCollection.valueChanges({ idField: 'id' });
  }

  // Método para obtener todos los productos
  getProductos(): Observable<Producto[]> {
    return this.productos;
  }

  // Método para agregar un nuevo producto
  async agregarProducto(producto: Producto): Promise<any> {
    const numProductos = await this.productosCollection.ref.get().then(snapshot => snapshot.size);
    producto.id = (numProductos + 1).toString();
    return this.productosCollection.add(producto);
  }

  // Método para obtener un producto por su ID
  getProductoById(id: string): Observable<Producto | undefined> {
    return this.productosCollection.doc<Producto>(id).valueChanges().pipe(
      map(producto => producto ? { ...producto, id } as Producto : undefined)
    );
  }

  // Método para actualizar un producto
  actualizarProducto(id: string, data: any): Promise<void> {
    return this.productosCollection.doc(id).update(data);
  }
// Resta la cantidad vendida del stock del producto
actualizarStock(productoId: string, cantidadVendida: number): void {
  const productoRef = this.productosCollection.doc(productoId);
  this.firestore.firestore.runTransaction(transaction => {
    return transaction.get(productoRef.ref).then(doc => {
      if (doc.exists) {
        const producto = doc.data() as Producto;
        const nuevoStock = producto.stock - cantidadVendida;
        if (nuevoStock >= 0) {
          transaction.update(productoRef.ref, { stock: nuevoStock });
        } else {
          throw new Error('No hay suficiente stock disponible para completar la venta.');
        }
      } else {
        throw new Error('El producto no existe en la base de datos.');
      }
    });
  }).then(() => {
    console.log('Stock actualizado correctamente.');
  }).catch(error => {
    console.error('Error al actualizar el stock:', error);
  });
}
  // Método para eliminar un producto
  eliminarProducto(id: string): Promise<void> {
    return this.productosCollection.doc(id).delete();
  }
}
