import { Component, OnInit } from '@angular/core';
import { Cliente } from 'src/app/models/cliente';
import { Tecnico } from 'src/app/models/tecnico';
import { ClienteService } from 'src/app/services/clientes.service';
import { TecnicosService } from 'src/app/services/tecnicos.service';

@Component({
  selector: 'app-order-service-create',
  templateUrl: './order-service-create.component.html',
  styleUrls: ['./order-service-create.component.css']
})
export class OrderServiceCreateComponent implements OnInit {

  selected = '';

  tecnicos: Tecnico[] = [];
  clientes: Cliente[] = [];

  constructor(private tecnicoService: TecnicosService,
    private clienteService: ClienteService) { }

  ngOnInit(): void {
    this.listarTecnicos();
    this.listarClientes();
  }

  public listarTecnicos(): void {
    this.tecnicoService.findAll().subscribe(ret => {
      this.tecnicos = ret;
    })
  }

  public listarClientes(): void {
    this.clienteService.findAll().subscribe(ret => {
      this.clientes = ret;
    })
  }

}
