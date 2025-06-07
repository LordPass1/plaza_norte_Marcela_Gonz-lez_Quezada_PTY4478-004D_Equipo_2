import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-agregar-planta',
  templateUrl: './agregar-planta.component.html',
  styleUrls: ['./agregar-planta.component.scss'],
})
export class AgregarPlantaComponent  implements OnInit {

  metodoIngreso = 'manual';
  plantaManual: any = {};
  fotoPreview: string | null = null;
  infoIdentificada: any = null;

  constructor(private plantasService: PlantasService) { }

  ngOnInit() {}

  tomarFoto() {
    
  }

  identificarPlanta() {
    this.plantasService.identificarPlantaPorImagen(this.fotoPreview).subscribe(data => {
      this.infoIdentificada = data;
    });
  }

  guardarPlantaManual() {
    // lógica para guardar la planta manualmente
  }
}
