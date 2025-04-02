import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-g-maceta',
  templateUrl: './g-maceta.page.html',
  styleUrls: ['./g-maceta.page.scss'],
  standalone: false
})
export class GMacetaPage implements OnInit {

  lista_btn = [{nombre: "Boton1",
    imagen: "assets/icon/favicon.png"
   },
   {nombre: "Boton2",
    imagen: "assets/icon/ejemplo 1.png"
   },
   {nombre: "Boton3",
    imagen: "assets/icon/ejemplo-deforme.jpg"
   }]

  constructor() { }

  ngOnInit() {
  }

  agregarBoton(){
    const nuevoBoton = {
      nombre: "Boton" + " "+ (this.lista_btn.length +1),
      imagen: "assets/icon/gato_meme.webp"
    }
    this.lista_btn.push(nuevoBoton)
  }
  // lista de tipo "lista (any), de tamaño que va a tener cada grupo dentro de la matriz de la lista"
  //lista es lo que quiero dividir en grupos
  agruparBotones(lista: any[], tamano: number): any[][] {
    // .reduce es un método de los arrays que nos permite transformar un array en un solo valor (en este caso, un array de subarrays).
    return lista.reduce((acc, item, index) => {
    // acc (acumulador), item (elemento actual de la lista), index (posicion del elemento en la lista)
    const grupoIndex = Math.floor(index / tamano);
    if (!acc[grupoIndex]) {
      acc[grupoIndex] = [];
    }
    acc[grupoIndex].push(item);
    return acc;
    }, []);
  }
}
