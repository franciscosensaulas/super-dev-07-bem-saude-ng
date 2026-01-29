import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Button } from "primeng/button";
import { InputTextModule } from "primeng/inputtext";
import { SelectModule } from "primeng/select";
import { TableModule } from "primeng/table";
import { RecepcionistaResponseModel } from '../../../models/recepcionista.model';
import { RegistroStatusTag } from '../../../core/components/registro-status-tag/registro-status-tag';
import { AutoFocusModule } from 'primeng/autofocus';
import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'app-list',
  imports: [Button, InputTextModule, SelectModule, FormsModule, TableModule, RegistroStatusTag, AutoFocusModule, DialogModule],
  templateUrl: './list.html',
})
export class List {
  filtros = ["Todos", "Ativos", "Inativos"];
  filtroSelecionado: string = "Todos";
  pesquisa: string = "";
  visible = false;

  recepcionistas: RecepcionistaResponseModel[] = [
    {
      id: 1,
      nome: "Ana Paula Silva",
      status: true
    },
    {
      id: 2,
      nome: "Bruno Almeida",
      status: true
    },
    {
      id: 3,
      nome: "Carla Mendes",
      status: false
    },
    {
      id: 4,
      nome: "Daniela Rocha",
      status: true
    },
    {
      id: 5,
      nome: "Eduardo Santos",
      status: false
    }
  ];

  showDialog(){
    this.visible = true;
  }
}
